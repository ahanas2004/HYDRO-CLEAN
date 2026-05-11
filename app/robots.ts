/**
 * Dynamic robots.txt — managed from WordPress
 *
 * Next.js App Router route: app/robots.ts
 * Fetches robots rules from WordPress Yoast SEO settings.
 * Falls back to sensible production defaults if WP is unreachable.
 *
 * Revalidation: 10 minutes
 */

import type { MetadataRoute } from 'next'
import { wpFetch } from '@/lib/seo/client'
import { ROBOTS_QUERY } from '@/lib/seo/queries'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com'

export const revalidate = 600

export default async function robots(): Promise<MetadataRoute.Robots> {
  // ── Default production rules ─────────────────────────────────────────────
  const defaultRobots: MetadataRoute.Robots = {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/wp-admin/',
          '/wp-login.php',
          '/wp-json/',
          '/_next/static/',
          '/api/',
          '/admin/',
          '/?s=',          // Search results
          '/*?*utm_*',     // UTM params
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }

  try {
    // Try to fetch custom robots rules from WordPress
    const data = await wpFetch<{ seo: { robots: string } }>(ROBOTS_QUERY, {
      revalidate: 600,
      tags: ['robots-txt'],
    })

    // If WordPress has custom rules, parse and merge them
    if (data?.seo?.robots) {
      // Yoast returns a string like "index, follow, max-snippet:-1"
      // For full custom robots.txt, parse line by line
      const customRules = parseWPRobots(data.seo.robots)
      if (customRules) {
        return { ...defaultRobots, ...customRules }
      }
    }
  } catch {
    // Silently fall back to defaults
  }

  return defaultRobots
}

// ─── Parse WordPress custom robots.txt string ─────────────────────────────────
function parseWPRobots(raw: string): Partial<MetadataRoute.Robots> | null {
  // If it's a full custom robots.txt from Yoast premium,
  // it comes as multi-line text. Parse User-agent and Disallow/Allow blocks.
  if (!raw.includes('User-agent:')) return null

  const blocks = raw.split(/\n\n+/).filter(Boolean)
  const rules: MetadataRoute.Robots['rules'] = []

  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean)
    const agents: string[] = []
    const allows: string[] = []
    const disallows: string[] = []

    for (const line of lines) {
      if (line.startsWith('User-agent:')) agents.push(line.replace('User-agent:', '').trim())
      else if (line.startsWith('Allow:')) allows.push(line.replace('Allow:', '').trim())
      else if (line.startsWith('Disallow:')) disallows.push(line.replace('Disallow:', '').trim())
    }

    if (agents.length) {
      rules.push({
        userAgent: agents.length === 1 ? agents[0] : agents,
        allow: allows.length ? allows : undefined,
        disallow: disallows.length ? disallows : undefined,
      })
    }
  }

  return rules.length ? { rules } : null
}
