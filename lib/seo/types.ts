/**
 * Central SEO Type Definitions
 * All types mirror the data structure returned by WordPress (Yoast SEO / RankMath)
 * via WPGraphQL. Keep this in sync with the WordPress field map.
 */

// ─── Core Yoast / RankMath SEO Fragment ────────────────────────────────────
export interface WPSeoMeta {
  title: string
  metaDesc: string
  metaKeywords?: string
  canonical: string
  metaRobotsNoindex: 'index' | 'noindex'
  metaRobotsNofollow: 'follow' | 'nofollow'
  opengraphTitle: string
  opengraphDescription: string
  opengraphImage?: WPMediaItem
  opengraphType: string
  opengraphUrl: string  
  opengraphSiteName?: string
  twitterTitle: string
  twitterDescription: string
  twitterImage?: WPMediaItem
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player'
  schema?: WPSchemaRaw
  breadcrumbs?: WPBreadcrumb[]
  focusKeyphrase?: string
  readingTime?: number
}

// ─── Media / Image ──────────────────────────────────────────────────────────
export interface WPMediaItem {
  sourceUrl: string
  altText: string
  mediaDetails?: {
    width: number
    height: number
  }
}

// ─── Schema / JSON-LD ────────────────────────────────────────────────────────
export interface WPSchemaRaw {
  raw: string // raw JSON-LD string from Yoast full-page schema
}

export interface SchemaGraph {
  '@context': string
  '@graph': SchemaNode[]
}

export type SchemaNode =
  | WebPageSchema
  | ArticleSchema
  | OrganizationSchema
  | LocalBusinessSchema
  | FAQSchema
  | BreadcrumbListSchema
  | ProductSchema
  | ServiceSchema

interface BaseSchema {
  '@type': string | string[]
  '@id'?: string
}

export interface WebPageSchema extends BaseSchema {
  '@type': 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
  name: string
  description?: string
  url: string
  inLanguage?: string
}

export interface ArticleSchema extends BaseSchema {
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle'
  headline: string
  description?: string
  datePublished: string
  dateModified: string
  author: { '@type': 'Person'; name: string; url?: string }
  image?: { '@type': 'ImageObject'; url: string; width?: number; height?: number }
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization'
  name: string
  url: string
  logo?: { '@type': 'ImageObject'; url: string }
  sameAs?: string[]
  contactPoint?: Array<{
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    areaServed?: string
  }>
}

export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness' | string
  name: string
  image?: string[]
  telephone?: string
  email?: string
  address?: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: { '@type': 'GeoCoordinates'; latitude: number; longitude: number }
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }>
}

export interface FAQSchema extends BaseSchema {
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: { '@type': 'Answer'; text: string }
  }>
}

export interface BreadcrumbListSchema extends BaseSchema {
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item?: string
  }>
}

export interface ProductSchema extends BaseSchema {
  '@type': 'Product'
  name: string
  description?: string
  image?: string[]
  brand?: { '@type': 'Brand'; name: string }
  offers?: {
    '@type': 'Offer'
    priceCurrency: string
    price?: string
    availability: string
  }
}

export interface ServiceSchema extends BaseSchema {
  '@type': 'Service'
  name: string
  description?: string
  provider?: { '@type': 'Organization'; name: string }
  areaServed?: string
  serviceType?: string
}

// ─── Breadcrumbs ─────────────────────────────────────────────────────────────
export interface WPBreadcrumb {
  text: string
  url: string
}

// ─── Page Types returned from WP ─────────────────────────────────────────────
export interface WPPage {
  slug: string
  uri: string
  seo: WPSeoMeta
  title: string
  content?: string
  modified: string
  date: string
  author?: { node: { name: string; slug: string; seo?: WPSeoMeta } }
  featuredImage?: { node: WPMediaItem }
  categories?: { nodes: Array<{ name: string; slug: string; seo?: WPSeoMeta }> }
  tags?: { nodes: Array<{ name: string; slug: string; seo?: WPSeoMeta }> }
  faqItems?: Array<{ question: string; answer: string }>
  hreflang?: Array<{ locale: string; url: string }>
}

export interface WPPost extends WPPage {
  excerpt?: string
}

// ─── Redirect ────────────────────────────────────────────────────────────────
export interface WPRedirect {
  origin: string
  target: string
  code: 301 | 302 | 307 | 308
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────
export interface SitemapEntry {
  loc: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
  images?: Array<{ loc: string; title?: string; caption?: string }>
}

// ─── Global SEO Settings ─────────────────────────────────────────────────────
export interface WPSiteSettings {
  siteTitle: string
  siteDescription: string
  siteUrl: string
  seoTitleSeparator: string
  organizationName: string
  organizationLogo: WPMediaItem
  socialProfiles: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  googleSiteVerification?: string
  bingSiteVerification?: string
  robotsTxt?: string
  localBusiness?: LocalBusinessSchema
}
