/**
 * Schema / JSON-LD Renderer System
 *
 * Renders all structured data as server-side <script type="application/ld+json">
 * tags. NEVER client-side injected. All schema data comes from WordPress.
 *
 * Usage in layout/page (Server Component):
 *   import { SchemaRenderer } from '@/lib/seo/schema'
 *   <SchemaRenderer schema={page.seo.schema} extras={[faqSchema, breadcrumbSchema]} />
 */

import type {
  WPSeoMeta,
  WPPage,
  FAQSchema,
  BreadcrumbListSchema,
  ArticleSchema,
  OrganizationSchema,
  LocalBusinessSchema,
  ServiceSchema,
  SchemaGraph,
  SchemaNode,
} from './types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com'
const ORG_NAME = 'Hydroclean Systems'

// ─── Main Schema Renderer Component (React Server Component) ──────────────────
interface SchemaRendererProps {
  /** Raw JSON-LD string from Yoast's schema.raw — already complete */
  wpSchemaRaw?: string
  /** Additional schema nodes to inject alongside WP schema */
  extras?: SchemaNode[]
}

export function SchemaRenderer({ wpSchemaRaw, extras = [] }: SchemaRendererProps) {
  const schemas: unknown[] = []

  // 1. Parse & inject Yoast full-page schema (already a complete @graph)
  if (wpSchemaRaw) {
    try {
      const parsed = JSON.parse(wpSchemaRaw)
      schemas.push(parsed)
    } catch {
      console.error('[Schema] Failed to parse Yoast schema.raw')
    }
  }

  // 2. Inject additional schema nodes individually
  extras.forEach((node) => {
    if (node && typeof node === 'object' && '@type' in node) {
      schemas.push({ '@context': 'https://schema.org', ...node })
    }
  })

  if (!schemas.length) return null

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // biome-ignore lint: dangerouslySetInnerHTML is required for JSON-LD
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0),
          }}
        />
      ))}
    </>
  )
}

// ─── FAQ Schema Builder ────────────────────────────────────────────────────────
export function buildFAQSchema(
  items: Array<{ question: string; answer: string }>
): FAQSchema {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// ─── Breadcrumb Schema Builder ─────────────────────────────────────────────────
export function buildBreadcrumbSchema(
  breadcrumbs: Array<{ text: string; url: string }>
): BreadcrumbListSchema {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.text,
      item: crumb.url.startsWith('http') ? crumb.url : `${SITE_URL}${crumb.url}`,
    })),
  }
}

// ─── Article Schema Builder ────────────────────────────────────────────────────
export function buildArticleSchema(page: WPPage): ArticleSchema {
  return {
    '@type': 'Article',
    headline: page.title,
    datePublished: page.date,
    dateModified: page.modified,
    author: {
      '@type': 'Person',
      name: page.author?.node.name ?? ORG_NAME,
      url: page.author?.node.slug
        ? `${SITE_URL}/author/${page.author.node.slug}`
        : undefined,
    },
    image: page.featuredImage?.node
      ? {
          '@type': 'ImageObject',
          url: page.featuredImage.node.sourceUrl,
          width: page.featuredImage.node.mediaDetails?.width,
          height: page.featuredImage.node.mediaDetails?.height,
        }
      : undefined,
  }
}

// ─── Organization Schema ────────────────────────────────────────────────────────
export function buildOrganizationSchema(
  opts: {
    name?: string
    url?: string
    logo?: string
    sameAs?: string[]
    phone?: string
  } = {}
): OrganizationSchema {
  return {
    '@type': 'Organization',
    name: opts.name ?? ORG_NAME,
    url: opts.url ?? SITE_URL,
    logo: opts.logo
      ? { '@type': 'ImageObject', url: opts.logo }
      : undefined,
    sameAs: opts.sameAs,
    contactPoint: opts.phone
      ? [
          {
            '@type': 'ContactPoint',
            telephone: opts.phone,
            contactType: 'customer service',
            areaServed: 'IN',
          },
        ]
      : undefined,
  }
}

// ─── Local Business Schema ─────────────────────────────────────────────────────
export function buildLocalBusinessSchema(): LocalBusinessSchema {
  return {
    '@type': ['LocalBusiness', 'ProfessionalService'],
    name: ORG_NAME,
    image: [`${SITE_URL}/images/facility.jpg`],
    telephone: process.env.NEXT_PUBLIC_PHONE ?? '+919840000000',
    email: process.env.NEXT_PUBLIC_EMAIL ?? 'info@hydrocleansystems.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: process.env.NEXT_PUBLIC_ADDRESS_STREET ?? '123 Industrial Area',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      postalCode: '600001',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  }
}

// ─── Service Schema Builder ──────────────────────────────────────────────────
export function buildServiceSchema(opts: {
  name: string
  description?: string
  serviceType?: string
  areaServed?: string
}): ServiceSchema {
  return {
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    provider: { '@type': 'Organization', name: ORG_NAME },
    areaServed: opts.areaServed ?? 'India',
    serviceType: opts.serviceType,
  }
}

// ─── Full Page Schema Composer ────────────────────────────────────────────────
/**
 * Builds a complete @graph schema for a page combining all relevant nodes.
 * Use this when Yoast's schema.raw is absent (e.g., custom post types).
 */
export function composePageSchema(nodes: SchemaNode[]): SchemaGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  }
}
