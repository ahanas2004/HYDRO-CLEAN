/**
 * API Route: POST /api/revalidate
 *
 * Webhook endpoint called by WordPress (via WP Action Hooks + HTTP API)
 * whenever a page/post is published, updated, or deleted.
 *
 * WordPress plugin configuration (functions.php or custom plugin):
 *
 *   add_action('save_post', function($post_id) {
 *     $post = get_post($post_id);
 *     if ($post->post_status !== 'publish') return;
 *     wp_remote_post('https://your-nextjs.com/api/revalidate', [
 *       'body' => json_encode([
 *         'secret' => 'YOUR_REVALIDATE_SECRET',
 *         'type'   => $post->post_type,
 *         'slug'   => $post->post_name,
 *         'uri'    => get_permalink($post_id),
 *       ]),
 *       'headers' => ['Content-Type' => 'application/json'],
 *     ]);
 *   });
 *
 * Security: Validates REVALIDATE_SECRET before processing.
 */

import { NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

const REVALIDATE_SECRET = process.env.REVALIDATE_SECRET

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // ── Security check ────────────────────────────────────────────────────
    if (!REVALIDATE_SECRET || body.secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const { type, slug, uri } = body
    const revalidated: string[] = []

    // ── Revalidate by cache tag (granular ISR) ────────────────────────────
    if (type === 'page' && uri) {
      const tag = `page-seo-${uri.replace(/\//g, '-')}`
      revalidateTag(tag, 'max')
      revalidated.push(`tag:${tag}`)

      // Also revalidate the actual Next.js page path
      const path = new URL(uri).pathname
      revalidatePath(path)
      revalidated.push(`path:${path}`)
    }

    if (type === 'post' && slug) {
      revalidateTag(`post-seo-${slug}`, 'max')
      revalidated.push(`tag:post-seo-${slug}`)

      // Blog post path (adjust if your blog lives at a different prefix)
      revalidatePath(`/blog/${slug}`)
      revalidated.push(`path:/blog/${slug}`)
    }

    // ── Sitemap and redirects always revalidated on any publish ──────────
    revalidateTag('sitemap-pages', 'max')
    revalidateTag('sitemap-posts', 'max')
    revalidateTag('redirects', 'max')
    revalidateTag('robots-txt', 'max')
    revalidatePath('/sitemap.xml')
    revalidated.push('sitemap', 'redirects', 'robots')

    // ── Schema-heavy pages (org info might change) ────────────────────────
    if (type === 'options' || type === 'seoSettings') {
      revalidatePath('/', 'layout')
      revalidated.push('layout')
    }

    return NextResponse.json({
      revalidated: true,
      items: revalidated,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('[Revalidate] Error:', err)
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 })
  }
}

// Also allow GET for easy manual testing in development
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const tag = searchParams.get('tag')
  const path = searchParams.get('path')

  if (!REVALIDATE_SECRET || secret !== REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (tag) revalidateTag(tag, 'max')
  if (path) revalidatePath(path)

  return NextResponse.json({ revalidated: true, tag, path })
}
