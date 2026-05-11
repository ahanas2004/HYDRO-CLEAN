/**
 * SEO Index — single import point for the entire SEO layer
 * import { fetchPageMeta, SchemaRenderer, Breadcrumbs, FAQSection } from '@/lib/seo'
 */

// Types
export type {
  WPSeoMeta, WPPage, WPPost, WPRedirect, WPSiteSettings,
  SitemapEntry, FAQSchema, BreadcrumbListSchema,
} from './types'

// GraphQL Queries
export {
  SEO_FRAGMENT, PAGE_SEO_QUERY, POST_SEO_QUERY,
  CATEGORY_SEO_QUERY, TAG_SEO_QUERY, AUTHOR_SEO_QUERY,
  SITEMAP_PAGES_QUERY, SITEMAP_POSTS_QUERY,
  REDIRECTS_QUERY, ROBOTS_QUERY, FAQ_SCHEMA_QUERY,
} from './queries'

// WP Client
export { wpFetch, wpRestFetch, wpFetchAll, revalidateWordPressTags } from './client'

// Metadata Generator
export { generateMetaFromWP, fetchPageMeta, fetchPostMeta } from './metadata'

// Schema
export {
  SchemaRenderer, buildFAQSchema, buildBreadcrumbSchema,
  buildArticleSchema, buildOrganizationSchema,
  buildLocalBusinessSchema, buildServiceSchema, composePageSchema,
} from './schema'
