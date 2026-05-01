import express, { type Request, type Response } from 'express'
import { DEFAULT_SCENE, SCENES } from './scenes/registry'

// ---------------------------------------------------------------------------
// Snapshot proxy: HTTP service that renders portal-compliant scenes server-
// side and returns PNGs. Sets up the celestiary-style social-preview use
// case — a crawler hits this proxy with a permalink, gets back an image
// representing the actual scene at that pose.
//
// Scenes are registered in scenes/registry.ts. /render?scene=NAME dispatches
// on the registry; legacy /render/droste keeps working for prior callers.
// /render with no scene defaults to the "pair" scene used by the three
// demos so the social-preview use case is one URL and one query param.
//
// Each /render request creates fresh GL contexts and tears them down after
// responding. That's expensive (~50–150 ms of overhead) but trivial; for
// high-throughput use, swap in a context pool.
// ---------------------------------------------------------------------------

const DEFAULT_W = 480
const DEFAULT_H = 320
const MAX_W = 1600
const MAX_H = 1200
const DEFAULT_DEPTH = 2
const MAX_DEPTH = 8 // server-side cap; the underlying cascade allows up to 12

const clampInt = (
  raw: unknown,
  fallback: number,
  min: number,
  max: number
): number => {
  const n = typeof raw === 'string' ? parseInt(raw, 10) : NaN
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, n))
}

const handleRender = (req: Request, res: Response): void => {
  const t0 = Date.now()
  const sceneName = (req.params.scene ?? req.query.scene ?? DEFAULT_SCENE) as string
  const scene = SCENES[sceneName]
  if (!scene) {
    res.status(404).send(`unknown scene: ${sceneName}`)
    return
  }

  const width = clampInt(req.query.w, DEFAULT_W, 16, MAX_W)
  const height = clampInt(req.query.h, DEFAULT_H, 16, MAX_H)
  const depth = clampInt(req.query.depth, DEFAULT_DEPTH, 0, MAX_DEPTH)
  const pose = typeof req.query.pose === 'string' ? req.query.pose : null

  try {
    const { png, meta } = scene.render({ width, height, pose, depth })
    const elapsed = Date.now() - t0
    res.set('Content-Type', 'image/png')
    res.set('X-Render-MS', String(elapsed))
    res.set('X-Render-Scene', scene.name)
    // Aggressive caching: scene + pose + w + h + depth are deterministic
    // inputs and the rendered PNG is byte-identical for the same query. A
    // social-share permalink doesn't change once shared, so a 1-day TTL
    // lets any intermediary (Fly's edge cache, Cloudflare, Facebook's own
    // image cache) absorb repeat traffic. Without this, FB re-fetches per
    // share and pays the 20 s cold-start each time → no preview.
    res.set('Cache-Control', 'public, max-age=86400, immutable')
    for (const [k, v] of Object.entries(meta)) res.set(k, v)
    res.send(png)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    res.status(500).send(`render failed: ${message}`)
  }
}

const handleHealth = (_req: Request, res: Response): void => {
  res.json({
    ok: true,
    scenes: Object.keys(SCENES),
    defaultScene: DEFAULT_SCENE,
    maxDepth: MAX_DEPTH
  })
}

const app = express()
app.get('/health', handleHealth)
app.get('/render', handleRender)
// Per-scene shortcut routes — equivalent to /render?scene=NAME but more
// permalink-friendly (e.g. /render/pair?pose=...).
app.get('/render/:scene', handleRender)

const PORT = parseInt(process.env.PORT ?? '3030', 10)
app.listen(PORT, () => {
  console.log(`[snapshot-proxy] listening on http://localhost:${PORT}`)
  console.log(`  scenes: ${Object.keys(SCENES).join(', ')}  (default: ${DEFAULT_SCENE})`)
  console.log(`  GET /render?scene=NAME&pose=px,py,pz,fx,fy,fz&w=480&h=320  →  PNG`)
  console.log(`  GET /render/NAME?pose=...&w=...&h=...                     →  PNG`)
  console.log(`  GET /render/droste?depth=N                                →  PNG`)
  console.log(`  GET /health                                               →  JSON status`)
})
