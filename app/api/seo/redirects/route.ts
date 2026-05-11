/**
 * API Route: /api/seo/redirects
 * Fetches redirects from WordPress and serves them to the middleware.
 * ISR-cached for 10 minutes. Supports on-demand invalidation.
 */

import { NextResponse } from 'next/server'
import { wpFetch } from '@/lib/seo/client'
import { REDIRECTS_QUERY } from '@/lib/seo/queries'

export const revalidate = 600

export async function GET() {
  try {
    const data = await wpFetch<{
      redirects: { nodes: Array<{ origin: string; target: string; code: number }> }
    }>(REDIRECTS_QUERY, {
      revalidate: 600,
      tags: ['redirects'],
    })

    const redirects = data?.redirects?.nodes ?? []

    return NextResponse.json(redirects, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=60',
      },
    })
  } catch (err) {
    console.error('[API/redirects] Failed to fetch from WordPress:', err)
    // Return empty array — never 500, middleware must always get a response
    return NextResponse.json([], { status: 200 })
  }
}
