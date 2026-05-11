/**
 * WordPress GraphQL Client
 * Centralised fetcher with caching, revalidation, and error handling.
 *
 * Strategy:
 *  - Static/rarely-changing data  → revalidate: 3600  (1 hour ISR)
 *  - Page/Post SEO                → revalidate: 300   (5 min ISR)
 *  - Redirects/Robots             → revalidate: 600   (10 min ISR)
 *  - Draft/Preview mode           → no-store (bypass cache entirely)
 *
 * Environment variables (add to .env.local):
 *  NEXT_PUBLIC_WP_URL         = https://your-wordpress.com
 *  WP_GRAPHQL_ENDPOINT        = /graphql          (default WPGraphQL path)
 *  WP_AUTH_SECRET             = your-secret       (for draft mode)
 *  WP_REST_API_KEY            = your-api-key      (optional REST fallback)
 */

const WP_URL = process.env.NEXT_PUBLIC_WP_URL!
const GQL_ENDPOINT = process.env.WP_GRAPHQL_ENDPOINT ?? '/graphql'
const GQL_URL = `${WP_URL}${GQL_ENDPOINT}`

// ─── Core Fetcher ─────────────────────────────────────────────────────────────
interface FetchOptions {
  variables?: Record<string, unknown>
  revalidate?: number | false   // false = no-store (draft mode / live)
  tags?: string[]               // On-demand ISR tags (Next.js cache tags)
  preview?: boolean
}

export async function wpFetch<T = unknown>(
  query: string,
  options: FetchOptions = {}
): Promise<T> {
  const { variables, revalidate = 300, tags = [], preview = false } = options

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  // Include auth header for draft/preview requests
  if (preview && process.env.WP_AUTH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.WP_AUTH_TOKEN}`
  }

  const nextConfig: RequestInit['next'] = {}
  if (revalidate === false || preview) {
    nextConfig.revalidate = 0    // effectively no-store in Next.js 15+ App Router
  } else {
    nextConfig.revalidate = revalidate
    if (tags.length) nextConfig.tags = tags
  }

  const res = await fetch(GQL_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    next: nextConfig,
  })

  if (!res.ok) {
    throw new Error(
      `WPGraphQL fetch failed: ${res.status} ${res.statusText} — ${GQL_URL}`
    )
  }

  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> }

  if (json.errors?.length) {
    const messages = json.errors.map((e) => e.message).join('; ')
    // In production don't crash — log and return empty
    console.error('[WP SEO] GraphQL errors:', messages)
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`WPGraphQL errors: ${messages}`)
    }
  }

  return json.data as T
}

// ─── REST API Fallback (for non-GraphQL endpoints) ────────────────────────────
export async function wpRestFetch<T = unknown>(
  path: string,
  options: Pick<FetchOptions, 'revalidate' | 'tags'> = {}
): Promise<T> {
  const { revalidate = 600, tags = [] } = options
  const url = `${WP_URL}/wp-json${path}`

  const nextConfig: RequestInit['next'] = {
    revalidate,
    ...(tags.length ? { tags } : {}),
  }

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
      ...(process.env.WP_REST_API_KEY
        ? { 'X-WP-API-Key': process.env.WP_REST_API_KEY }
        : {}),
    },
    next: nextConfig,
  })

  if (!res.ok) {
    throw new Error(`WP REST fetch failed: ${res.status} — ${url}`)
  }

  return res.json() as Promise<T>
}

// ─── Paginated fetcher (auto-walks cursor pagination) ─────────────────────────
export async function wpFetchAll<T extends { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: unknown[] }>(
  query: string,
  dataKey: string,
  options: FetchOptions = {}
): Promise<unknown[]> {
  let allNodes: unknown[] = []
  let cursor: string | null = null
  let hasNextPage = true

  while (hasNextPage) {
    const data = await wpFetch<Record<string, T>>(query, {
      ...options,
      variables: { ...options.variables, after: cursor },
    })

    const collection = data[dataKey]
    allNodes = allNodes.concat(collection.nodes)
    hasNextPage = collection.pageInfo.hasNextPage
    cursor = collection.pageInfo.endCursor
  }

  return allNodes
}

// ─── On-demand revalidation helper (call from webhook API route) ───────────────
export async function revalidateWordPressTags(tags: string[]) {
  // Import here to keep this file edge-safe
  const { revalidateTag } = await import('next/cache')
  tags.forEach((tag) => revalidateTag(tag))
}
