/**
 * Breadcrumb Component — SEO-first
 *
 * Renders semantic breadcrumb navigation using data from WordPress.
 * Automatically injects BreadcrumbList JSON-LD schema.
 * Uses correct microdata attributes for Google.
 *
 * Usage:
 *   <Breadcrumbs items={page.seo.breadcrumbs} />
 *   <Breadcrumbs items={[
 *     { text: 'Home', url: '/' },
 *     { text: 'Services', url: '/services' },
 *     { text: 'Oil Filtration', url: '/services/oil-filtration' },
 *   ]} />
 */

import Link from 'next/link'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'
import type { WPBreadcrumb } from '@/lib/seo/types'

interface BreadcrumbsProps {
  items: WPBreadcrumb[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items?.length) return null

  const schema = buildBreadcrumbSchema(items)

  return (
    <>
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        // biome-ignore lint: required for JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...schema,
          }),
        }}
      />

      {/* Visual breadcrumb nav */}
      <nav
        aria-label="Breadcrumb"
        className={className}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: '0.8125rem',
          color: 'var(--text-secondary)',
        }}
      >
        {items.map((crumb, index) => {
          const isLast = index === items.length - 1

          return (
            <span
              key={crumb.url}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <meta itemProp="position" content={String(index + 1)} />

              {isLast ? (
                <span
                  itemProp="name"
                  aria-current="page"
                  style={{ color: 'var(--primary)', fontWeight: 600 }}
                >
                  {crumb.text}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.url}
                    itemProp="item"
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--primary)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--text-secondary)')
                    }
                  >
                    <span itemProp="name">{crumb.text}</span>
                  </Link>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    style={{ opacity: 0.4 }}
                  >
                    <path
                      d="M4 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </span>
          )
        })}
      </nav>
    </>
  )
}

// ─── Static breadcrumb builders (for non-WP pages) ────────────────────────────
export function buildStaticBreadcrumbs(
  ...segments: Array<{ text: string; url: string }>
): WPBreadcrumb[] {
  return [{ text: 'Home', url: '/' }, ...segments]
}
