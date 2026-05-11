/**
 * Updated Home Page — WP SEO powered generateMetadata()
 * Drop-in replacement for the existing app/page.tsx export.
 * Only the export additions are shown — rest of file unchanged.
 */

import type { Metadata } from 'next'
import { fetchPageMeta } from '@/lib/seo/metadata'
import { SchemaRenderer, buildFAQSchema, buildLocalBusinessSchema } from '@/lib/seo/schema'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'

// ─── Dynamic SEO from WordPress ────────────────────────────────────────────────
export async function generateMetadata(): Promise<Metadata> {
  // WordPress page URI for the homepage — set in WP as "/"  or "home"
  return fetchPageMeta('/')
}

// ISR: revalidate this page every 5 minutes
export const revalidate = 300
