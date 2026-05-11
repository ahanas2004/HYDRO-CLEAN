/**
 * Dynamic Sitemap — Powered entirely by WordPress
 *
 * Next.js App Router route: app/sitemap.ts
 * Fetches ALL published pages + posts from WPGraphQL.
 * Respects per-page noindex directives from Yoast / RankMath.
 * Supports images in sitemap entries.
 *
 * Revalidation: every 10 minutes (ISR on the sitemap route itself).
 */

import type { MetadataRoute } from 'next'
import { wpFetchAll } from '@/lib/seo/client'
import { SITEMAP_PAGES_QUERY, SITEMAP_POSTS_QUERY } from '@/lib/seo/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com'

// Tell Next.js to revalidate this route every 10 minutes
export const revalidate = 600

interface WPSitemapNode {
  uri: string
  modified: string
  slug: string
  seo?: { metaRobotsNoindex: string; canonical?: string }
  featuredImage?: { node: { sourceUrl: string; altText: string } }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  // ── Static core pages (always index) ─────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ]
  entries.push(...staticPages)

  try {
    // ── WordPress Pages ────────────────────────────────────────────────────
    const wpPages = (await wpFetchAll(
      SITEMAP_PAGES_QUERY,
      'pages',
      { revalidate: 600, tags: ['sitemap-pages'] }
    )) as WPSitemapNode[]

    for (const page of wpPages) {
      // Skip noindex pages
      if (page.seo?.metaRobotsNoindex === 'noindex') continue
      // Skip pages that have a different canonical (duplicate)
      if (page.seo?.canonical && !page.seo.canonical.includes(SITE_URL)) continue
      // Skip special WP pages we handle statically above
      if (['home', 'front-page', ''].includes(page.slug)) continue

      const url = page.seo?.canonical ?? `${SITE_URL}${page.uri}`

      entries.push({
        url,
        lastModified: page.modified ? new Date(page.modified) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    // ── WordPress Posts ────────────────────────────────────────────────────
    const wpPosts = (await wpFetchAll(
      SITEMAP_POSTS_QUERY,
      'posts',
      { revalidate: 600, tags: ['sitemap-posts'] }
    )) as WPSitemapNode[]

    for (const post of wpPosts) {
      if (post.seo?.metaRobotsNoindex === 'noindex') continue

      const url = post.seo?.canonical ?? `${SITE_URL}${post.uri}`

      entries.push({
        url,
        lastModified: post.modified ? new Date(post.modified) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
        // Next.js supports images in sitemap via the images array
        ...(post.featuredImage?.node
          ? {
              images: [post.featuredImage.node.sourceUrl],
            }
          : {}),
      })
    }
  } catch (err) {
    // If WP is unreachable, return static pages only — never crash
    console.error('[Sitemap] WordPress fetch failed, using static fallback:', err)
  }

  // Deduplicate by URL
  const seen = new Set<string>()
  return entries.filter((e) => {
    if (seen.has(e.url)) return false
    seen.add(e.url)
    return true
  })
}
