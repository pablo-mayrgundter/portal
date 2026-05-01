import express, { type Request, type Response, type NextFunction } from 'express'
import { Readable } from 'node:stream'
import * as cheerio from 'cheerio'

// ---------------------------------------------------------------------------
// Share proxy: a tiny HTTP service that sits in front of a static demo (e.g.
// hosted on GitHub Pages) and rewrites OG / Twitter image meta tags based on
// the request's `?pose=` query before returning the HTML to crawlers.
//
// Why this exists: GitHub Pages is pure static, so the social-preview meta
// tags it serves are baked at build time and always reference the same
// default-pose snapshot. When a user shares a permalink with `?pose=...`,
// crawlers (FB / X / Slack / Discord) read that bare HTML and miss the pose;
// the only JS-aware previewers see the right image. Putting this proxy in
// front lets the share URL be a Fly URL, and we substitute the pose into
// `og:image` / `twitter:image` content per request.
//
// The path layout mirrors the upstream 1:1. `GET /foo/bar?baz` fetches
// `${UPSTREAM_BASE}/foo/bar?baz`. HTML responses get the OG rewrite when a
// `?pose=` is present; everything else streams through unchanged. That makes
// this a full reverse proxy, not just an HTML rewriter — necessary because
// the browser also fetches `/assets/index-XXX.js` etc. under the same host.
//
// Stateless and idempotent. Add another instance for celestiary later by
// changing UPSTREAM_BASE.
// ---------------------------------------------------------------------------

const UPSTREAM_BASE = (
  process.env.UPSTREAM_BASE ?? 'https://pablo-mayrgundter.github.io/portal'
).replace(/\/$/, '')
const PORT = parseInt(process.env.PORT ?? '8080', 10)

// The path part of the upstream base (e.g. "/portal" for GH Pages). Used
// to avoid double-prefixing — the demo's built HTML already contains
// absolute asset paths starting with this prefix (because Vite was built
// with `base: '/portal/'` for GH Pages), and once those land on the share
// proxy the browser re-requests them at `/portal/...`. We forward those
// straight to the origin without re-prepending.
const UPSTREAM_ORIGIN = new URL(UPSTREAM_BASE).origin
const UPSTREAM_PATH = new URL(UPSTREAM_BASE).pathname.replace(/\/$/, '')

const resolveUpstreamUrl = (incomingUrl: string): string => {
  // incomingUrl includes path + query string ("/?pose=X" or "/portal/assets/foo.js?bar")
  if (UPSTREAM_PATH === '') return UPSTREAM_BASE + incomingUrl
  // If the incoming path already starts with the upstream path prefix, the
  // browser is requesting a built asset whose URL came from the served HTML
  // — keep the path as-is. Otherwise this is a "share root" request like
  // "/" or "/?pose=X" and needs the prefix added.
  const pathOnly = incomingUrl.split('?')[0]
  if (pathOnly === UPSTREAM_PATH || pathOnly.startsWith(UPSTREAM_PATH + '/')) {
    return UPSTREAM_ORIGIN + incomingUrl
  }
  return UPSTREAM_ORIGIN + UPSTREAM_PATH + incomingUrl
}

// Hop-by-hop headers we never forward (RFC 7230 §6.1) plus a couple that
// fetch() handles internally and re-setting them on the response would
// either double-encode or mismatch the body length.
const SKIP_RESPONSE_HEADERS = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'content-encoding',
  'content-length'
])

const isHtml = (contentType: string | null): boolean =>
  !!contentType && contentType.toLowerCase().includes('text/html')

const rewriteHtml = (html: string, pose: string): string => {
  const $ = cheerio.load(html)
  $('meta[property="og:image"], meta[name="twitter:image"]').each((_, el) => {
    const current = $(el).attr('content')
    if (!current) return
    try {
      const u = new URL(current)
      u.searchParams.set('pose', pose)
      $(el).attr('content', u.toString())
    } catch {
      // Malformed content URL — leave it. Better to ship the unmodified meta
      // tag than to crash the page render.
    }
  })
  return $.html()
}

const handleProxy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Build upstream URL with smart path-prefix handling so a single share
  // origin can serve both the entry HTML (incoming path "/") and the built
  // assets (incoming path "/portal/assets/...").
  const upstreamUrl = resolveUpstreamUrl(req.url)

  let upstreamRes: globalThis.Response
  try {
    upstreamRes = await fetch(upstreamUrl, {
      // Forward the user-agent so any upstream UA-based behavior (caching,
      // analytics) sees the original. We don't proxy other request headers
      // because GH Pages doesn't care and the surface stays small.
      headers: { 'user-agent': req.get('user-agent') ?? 'portal-share-proxy' },
      redirect: 'follow'
    })
  } catch (err) {
    next(err)
    return
  }

  // Mirror status + safe headers.
  upstreamRes.headers.forEach((value, key) => {
    if (SKIP_RESPONSE_HEADERS.has(key.toLowerCase())) return
    res.setHeader(key, value)
  })
  res.status(upstreamRes.status)

  const contentType = upstreamRes.headers.get('content-type')
  const pose = typeof req.query.pose === 'string' ? req.query.pose : null

  if (isHtml(contentType) && pose && upstreamRes.body) {
    // Buffer the small HTML, rewrite, send. Cheerio is sub-millisecond on
    // the demo's tiny <head> so no point streaming.
    const html = await upstreamRes.text()
    const rewritten = rewriteHtml(html, pose)
    res.setHeader('content-type', contentType ?? 'text/html; charset=utf-8')
    res.send(rewritten)
    return
  }

  // Non-HTML or no pose: stream upstream body to client. Web ReadableStream
  // → node Readable → pipe.
  if (!upstreamRes.body) {
    res.end()
    return
  }
  Readable.fromWeb(upstreamRes.body as never).pipe(res)
}

const handleHealth = (_req: Request, res: Response): void => {
  res.json({ ok: true, upstream: UPSTREAM_BASE })
}

const app = express()
app.get('/health', handleHealth)
app.use(handleProxy)

app.listen(PORT, () => {
  console.log(`[share-proxy] listening on :${PORT}`)
  console.log(`[share-proxy] upstream: ${UPSTREAM_BASE}`)
  console.log(`[share-proxy] rewriting og:image/twitter:image when ?pose= is present`)
})
