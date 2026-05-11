/**
 * WordPress GraphQL Queries — Complete SEO Fragment Library
 *
 * These queries are the single source of truth for all SEO data fetched
 * from WordPress. Any new field Yoast / RankMath exposes must be added
 * HERE, not scattered across pages.
 */

// ─── Reusable SEO Fragment ───────────────────────────────────────────────────
export const SEO_FRAGMENT = /* GraphQL */ `
  fragment SeoFields on PostTypeSEO {
    title
    metaDesc
    metaKeywords
    canonical
    metaRobotsNoindex
    metaRobotsNofollow
    opengraphTitle
    opengraphDescription
    opengraphImage {
      sourceUrl
      altText
      mediaDetails { width height }
    }
    opengraphType
    opengraphUrl
    opengraphSiteName
    twitterTitle
    twitterDescription
    twitterImage {
      sourceUrl
      altText
      mediaDetails { width height }
    }
    twitterCard
    breadcrumbs {
      text
      url
    }
    schema {
      raw
    }
  }
`

// ─── Site-Wide Settings (run once, cache globally) ───────────────────────────
export const SITE_SETTINGS_QUERY = /* GraphQL */ `
  query SiteSettings {
    generalSettings {
      title
      description
      url
    }
    seoSettings: seo {
      webmaster {
        googleVerify
        bingVerify
      }
      social {
        twitter { username }
        facebook { url }
        instagram { url }
        linkedIn { url }
        youTube { url }
      }
      schema {
        logo {
          sourceUrl
          altText
          mediaDetails { width height }
        }
        companyName
        companyOrPerson
        wordpressSiteName
        siteUrl
        homeUrl
      }
      breadcrumbs {
        separator
        showBlogPage
      }
    }
  }
`

// ─── Home / Static Page SEO ───────────────────────────────────────────────────
export const PAGE_SEO_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query PageSeo($id: ID!, $idType: PageIdType = URI) {
    page(id: $id, idType: $idType) {
      id
      title
      slug
      uri
      modified
      date
      seo { ...SeoFields }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
    }
  }
`

// ─── Blog Post SEO ────────────────────────────────────────────────────────────
export const POST_SEO_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query PostSeo($id: ID!, $idType: PostIdType = URI) {
    post(id: $id, idType: $idType) {
      id
      title
      slug
      uri
      excerpt
      content
      modified
      date
      seo { ...SeoFields }
      author {
        node {
          name
          slug
          seo { ...SeoFields }
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
      categories {
        nodes {
          name
          slug
          seo { ...SeoFields }
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
    }
  }
`

// ─── Category Archive SEO ────────────────────────────────────────────────────
export const CATEGORY_SEO_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query CategorySeo($id: ID!, $idType: CategoryIdType = SLUG) {
    category(id: $id, idType: $idType) {
      id
      name
      slug
      description
      count
      seo { ...SeoFields }
    }
  }
`

// ─── Tag Archive SEO ─────────────────────────────────────────────────────────
export const TAG_SEO_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query TagSeo($id: ID!, $idType: TagIdType = SLUG) {
    tag(id: $id, idType: $idType) {
      id
      name
      slug
      description
      count
      seo { ...SeoFields }
    }
  }
`

// ─── Author Archive SEO ───────────────────────────────────────────────────────
export const AUTHOR_SEO_QUERY = /* GraphQL */ `
  ${SEO_FRAGMENT}
  query AuthorSeo($id: ID!, $idType: UserNodeIdTypeEnum = SLUG) {
    user(id: $id, idType: $idType) {
      id
      name
      slug
      description
      seo { ...SeoFields }
      avatar { url }
    }
  }
`

// ─── Sitemap — All URLs ───────────────────────────────────────────────────────
export const SITEMAP_PAGES_QUERY = /* GraphQL */ `
  query SitemapPages($after: String) {
    pages(first: 100, after: $after, where: { status: PUBLISH }) {
      pageInfo { hasNextPage endCursor }
      nodes {
        uri
        modified
        slug
        seo { metaRobotsNoindex canonical }
      }
    }
  }
`

export const SITEMAP_POSTS_QUERY = /* GraphQL */ `
  query SitemapPosts($after: String) {
    posts(first: 100, after: $after, where: { status: PUBLISH }) {
      pageInfo { hasNextPage endCursor }
      nodes {
        uri
        modified
        slug
        featuredImage { node { sourceUrl altText } }
        seo { metaRobotsNoindex canonical }
      }
    }
  }
`

// ─── Redirects (Yoast Premium / Rank Math) ───────────────────────────────────
export const REDIRECTS_QUERY = /* GraphQL */ `
  query Redirects {
    redirects {
      nodes {
        origin
        target
        code
      }
    }
  }
`

// ─── Robots.txt Settings ─────────────────────────────────────────────────────
export const ROBOTS_QUERY = /* GraphQL */ `
  query RobotsTxt {
    seo {
      robots
    }
  }
`

// ─── Custom FAQ ACF Fields (attached to pages/posts via ACF) ─────────────────
export const FAQ_SCHEMA_QUERY = /* GraphQL */ `
  query FaqSchema($id: ID!) {
    page(id: $id, idType: URI) {
      faqItems {
        question
        answer
      }
    }
  }
`

// ─── Hreflang (Polylang / WPML) ──────────────────────────────────────────────
export const HREFLANG_QUERY = /* GraphQL */ `
  query Hreflang($id: ID!) {
    page(id: $id, idType: URI) {
      translations {
        locale
        href
      }
    }
  }
`
