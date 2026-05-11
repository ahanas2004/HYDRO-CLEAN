/**
 * Hreflang Tags Component
 *
 * Renders hreflang link tags for multilingual/multi-regional SEO.
 * Data comes from WordPress Polylang or WPML via WPGraphQL.
 *
 * Place inside <head> via layout.tsx or page generateMetadata.
 * Usage:
 *   In generateMetadata():
 *     return {
 *       ...generateMetaFromWP(seo),
 *       alternates: {
 *         canonical: seo.canonical,
 *         languages: buildHreflangAlternates(page.hreflang),
 *       }
 *     }
 */

import type { Metadata } from 'next'

interface HreflangEntry {
  locale: string   // e.g. 'en-IN', 'hi-IN', 'ta-IN'
  url: string
}

/**
 * Builds the alternates.languages object for Next.js Metadata.
 * Automatically adds x-default pointing to the primary locale URL.
 */
export function buildHreflangAlternates(
  translations: HreflangEntry[],
  defaultLocale = 'en-IN'
): NonNullable<NonNullable<Metadata['alternates']>['languages']> {
  if (!translations?.length) return {}

  const languages: Record<string, string> = {}

  translations.forEach(({ locale, url }) => {
    languages[locale] = url
  })

  // x-default points to the primary language version
  const defaultEntry = translations.find((t) => t.locale === defaultLocale)
  if (defaultEntry) {
    languages['x-default'] = defaultEntry.url
  } else if (translations.length > 0) {
    languages['x-default'] = translations[0].url
  }

  return languages
}

/**
 * Server Component that renders hreflang <link> tags inline.
 * Use when you need finer control than generateMetadata() provides.
 */
export function HreflangLinks({ translations }: { translations: HreflangEntry[] }) {
  if (!translations?.length) return null

  return (
    <>
      {translations.map(({ locale, url }) => (
        <link key={locale} rel="alternate" hrefLang={locale} href={url} />
      ))}
      {/* x-default */}
      <link rel="alternate" hrefLang="x-default" href={translations[0].url} />
    </>
  )
}
