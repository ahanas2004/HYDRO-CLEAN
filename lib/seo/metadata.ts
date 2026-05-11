/**
 * SEO Metadata Generator
 *
 * Converts raw WordPress SEO data into Next.js `Metadata` objects.
 * Every page calls `generateMetaFromWP()` inside its `generateMetadata()`.
 *
 * This is the ONLY place in the Next.js codebase that touches metadata
 * construction — all other pages just import and call this function.
 */

import type { Metadata } from 'next'
import type { WPSeoMeta, WPPage } from './types'
import { wpFetch } from './client'
import { PAGE_SEO_QUERY, POST_SEO_QUERY } from './queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com'
const SITE_NAME = 'Hydroclean Systems'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

// ─── Primary Metadata Generator ───────────────────────────────────────────────
export function generateMetaFromWP(
  seo: WPSeoMeta,
  overrides: Partial<Metadata> = {}
): Metadata {
  const robots = buildRobots(seo)
  const ogImage = seo.opengraphImage?.sourceUrl ?? DEFAULT_OG_IMAGE
  const twImage = seo.twitterImage?.sourceUrl ?? ogImage

  return {
    title: seo.title || SITE_NAME,
    description: seo.metaDesc,
    keywords: seo.metaKeywords,
    alternates: {
      canonical: seo.canonical || undefined,
    },
    robots,
    openGraph: {
      title: seo.opengraphTitle || seo.title,
      description: seo.opengraphDescription || seo.metaDesc,
      url: seo.opengraphUrl || seo.canonical,
      siteName: seo.opengraphSiteName ?? SITE_NAME,
      type: (seo.opengraphType as 'website' | 'article') || 'website',
      images: [
        {
          url: ogImage,
          width: seo.opengraphImage?.mediaDetails?.width ?? 1200,
          height: seo.opengraphImage?.mediaDetails?.height ?? 630,
          alt: seo.opengraphImage?.altText ?? seo.title,
        },
      ],
    },
    twitter: {
      card: seo.twitterCard ?? 'summary_large_image',
      title: seo.twitterTitle || seo.opengraphTitle || seo.title,
      description: seo.twitterDescription || seo.opengraphDescription || seo.metaDesc,
      images: [twImage],
    },
    ...overrides,
  }
}

// ─── Robots Builder ───────────────────────────────────────────────────────────
function buildRobots(seo: WPSeoMeta): Metadata['robots'] {
  const noindex = seo.metaRobotsNoindex === 'noindex'
  const nofollow = seo.metaRobotsNofollow === 'nofollow'

  return {
    index: !noindex,
    follow: !nofollow,
    googleBot: {
      index: !noindex,
      follow: !nofollow,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  }
}

// ─── Page Metadata Fetcher (for app/*/page.tsx generateMetadata) ──────────────
export async function fetchPageMeta(uri: string): Promise<Metadata> {
  try {
    const data = await wpFetch<{ page: WPPage }>(PAGE_SEO_QUERY, {
      variables: { id: uri, idType: 'URI' },
      revalidate: 300,
      tags: [`page-seo-${uri.replace(/\//g, '-')}`],
    })

    if (!data?.page?.seo) return fallbackMeta(uri)

    return generateMetaFromWP(data.page.seo)
  } catch (err) {
    console.error('[SEO] fetchPageMeta error for', uri, err)
    return fallbackMeta(uri)
  }
}

// ─── Post Metadata Fetcher ────────────────────────────────────────────────────
export async function fetchPostMeta(slug: string): Promise<Metadata> {
  try {
    const data = await wpFetch<{ post: WPPage }>(POST_SEO_QUERY, {
      variables: { id: slug, idType: 'SLUG' },
      revalidate: 300,
      tags: [`post-seo-${slug}`],
    })

    if (!data?.post?.seo) return fallbackMeta(slug)

    const seo = data.post.seo
    const meta = generateMetaFromWP(seo)

    // Enrich article OG type
    if (meta.openGraph) {
      meta.openGraph.type = 'article'
      if (data.post.date) {
        ;(meta.openGraph as Record<string, unknown>)['publishedTime'] = data.post.date
      }
      if (data.post.modified) {
        ;(meta.openGraph as Record<string, unknown>)['modifiedTime'] = data.post.modified
      }
    }

    return meta
  } catch (err) {
    console.error('[SEO] fetchPostMeta error for', slug, err)
    return fallbackMeta(slug)
  }
}

// ─── Fallback Meta (hardcoded defaults when WP is unreachable) ────────────────
function fallbackMeta(path: string): Metadata {
  return {
    title: `${SITE_NAME} | Industrial Oil Filtration India`,
    description:
      "India's trusted partner for industrial oil filtration. Reduce oil costs by 40%, cut downtime by 25%. ISO certified.",
    alternates: { canonical: `${SITE_URL}${path}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${SITE_NAME} | Clean Oil. Peak Performance.`,
      description:
        'Precision filtration systems trusted by Tata Motors, Mahindra, JSW Steel.',
      url: `${SITE_URL}${path}`,
      siteName: SITE_NAME,
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: 'Industrial oil filtration solutions India.',
      images: [DEFAULT_OG_IMAGE],
    },
  }
}
