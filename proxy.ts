/**
 * Redirect Sync Proxy
 *
 * Fetches WordPress redirects (Yoast Premium / Rank Math Pro / Redirection Plugin)
 * and applies them at the Next.js proxy level — before any page renders.
 *
 * This runs on the Vercel Edge Network, making redirects extremely fast.
 *
 * Architecture:
 * 1. On cold start / cache miss → fetch redirects from WP via API route (cached)
 * 2. Check if incoming URL matches any redirect
 * 3. Return 301/302/307/308 before Next.js even hydrates
 *
 * Cache: The redirect list is cached in-process for 5 minutes.
 * For instant invalidation, hit: POST /api/revalidate?tag=redirects
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Edge-compatible in-memory cache (per-edge-worker instance)
let redirectCache: Array<{ origin: string; target: string; code: number }> | null = null
let cacheTimestamp = 0
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

async function getRedirects(): Promise<typeof redirectCache> {
  const now = Date.now()

  if (redirectCache && now - cacheTimestamp < CACHE_TTL_MS) {
    return redirectCache
  }

  try {
    // Fetch from our own API route (which fetches from WP with ISR)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com'
    const res = await fetch(`${baseUrl}/api/seo/redirects`, {
      cache: 'no-store', // always fresh in proxy
    })

    if (res.ok) {
      redirectCache = await res.json()
      cacheTimestamp = now
    }
  } catch {
    // If fetch fails, use stale cache or empty array
    redirectCache = redirectCache ?? []
  }

  return redirectCache
}

// ─── Proxy ───────────────────────────────────────────────────────────────────
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  // Skip Next.js internals and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|webp|woff2?|css|js)$/)
  ) {
    return NextResponse.next()
  }

  try {
    const redirects = await getRedirects()

    if (redirects?.length) {
      // Normalize: strip trailing slash for comparison (except root)
      const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname

      for (const redirect of redirects) {
        const origin = redirect.origin.replace(/\/$/, '') || '/'

        // Exact match
        if (origin === normalizedPath) {
          const target = redirect.target.startsWith('http')
            ? redirect.target
            : `${process.env.NEXT_PUBLIC_SITE_URL}${redirect.target}`

          return NextResponse.redirect(
            new URL(target + (search || ''), request.url),
            { status: redirect.code || 301 }
          )
        }

        // Wildcard match (e.g., /blog/old-category/*)
        if (origin.endsWith('*')) {
          const prefix = origin.slice(0, -1)
          if (normalizedPath.startsWith(prefix)) {
            const remainder = normalizedPath.slice(prefix.length)
            const target = redirect.target.replace('*', remainder)
            const fullTarget = target.startsWith('http')
              ? target
              : `${process.env.NEXT_PUBLIC_SITE_URL}${target}`

            return NextResponse.redirect(
              new URL(fullTarget + (search || ''), request.url),
              { status: redirect.code || 301 }
            )
          }
        }
      }
    }
  } catch {
    // Never block a request due to redirect fetch failure
  }

  // Add security headers to all responses
  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'index, follow')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
