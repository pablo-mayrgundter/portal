import express, { type Request, type Response } from 'express'
import * as THREE from 'three'
import { decodeCameraPose } from '@portal/portal-core'
import {
  colorBufferToPNG,
  type HeadlessFrameMessage
} from '@portal/portal-headless-three'
import { buildDrosteCascade } from './scenes/droste'

// ---------------------------------------------------------------------------
// Snapshot proxy: HTTP service that renders portal-compliant scenes server-
// side and returns PNGs. Sets up the celestiary-style social-preview use
// case — a crawler hits this proxy with a permalink, gets back an image
// representing the actual scene at that pose.
//
// V1 ships a single built-in scene (the Droste cascade) so we have something
// concrete and self-contained to test against. Future work: load arbitrary
// portal-compliant scene modules from external URLs.
//
// Each /render request creates fresh GL contexts (one per cascade level) and
// tears them down after responding. That's expensive (~50–150 ms of
// overhead) but trivial; for high-throughput use, swap in a context pool.
// ---------------------------------------------------------------------------

const DEFAULT_W = 480
const DEFAULT_H = 320
const MAX_W = 1600
const MAX_H = 1200
const DEFAULT_DEPTH = 2
const MAX_DEPTH = 8 // server-side cap; the underlying cascade allows up to 12

const DEFAULT_POSE: { position: [number, number, number]; forward: [number, number, number] } = {
  position: [0, 0, 3],
  forward: [0, 0, -1]
}

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
  const depth = clampInt(req.query.depth, DEFAULT_DEPTH, 0, MAX_DEPTH)
  const width = clampInt(req.query.w, DEFAULT_W, 16, MAX_W)
  const height = clampInt(req.query.h, DEFAULT_H, 16, MAX_H)

  // Pose: ?pose=px,py,pz,fx,fy,fz (matches encodeCameraPose's wire format).
  // Falls back to a sensible "looking at origin from z=3" pose.
  const decoded = decodeCameraPose(typeof req.query.pose === 'string' ? req.query.pose : null)
  const pose = decoded
    ? { position: decoded.position, forward: decoded.forward }
    : DEFAULT_POSE

  const cam = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
  cam.updateProjectionMatrix()

  const cascade = buildDrosteCascade(depth, width, height)
  let frameMsg: HeadlessFrameMessage | null = null
  cascade.hostTransport.onMessage((msg) => {
    if (msg.type === 'portal:frame') frameMsg = msg as unknown as HeadlessFrameMessage
  })
  cascade.hostTransport.post({
    type: 'portal:setPose',
    pose: { ...pose, up: [0, 1, 0] },
    projection: Array.from(cam.projectionMatrix.elements),
    viewport: { width, height },
    time: 0
  })

  if (!frameMsg) {
    cascade.cleanup()
    res.status(500).send('cascade did not produce a frame')
    return
  }

  const fm = frameMsg as unknown as HeadlessFrameMessage
  const png = colorBufferToPNG(fm.color, fm.width, fm.height)
  cascade.cleanup()

  const elapsed = Date.now() - t0
  res.set('Content-Type', 'image/png')
  res.set('X-Render-MS', String(elapsed))
  res.set('X-Render-Depth', String(depth))
  res.send(png)
}

const handleHealth = (_req: Request, res: Response): void => {
  res.json({ ok: true, scenes: ['droste'], maxDepth: MAX_DEPTH })
}

const app = express()
app.get('/health', handleHealth)
app.get('/render', handleRender)
// Default scene shortcut: future work will dispatch on ?scene=name.
app.get('/render/droste', handleRender)

const PORT = parseInt(process.env.PORT ?? '3030', 10)
app.listen(PORT, () => {
  console.log(`[snapshot-proxy] listening on http://localhost:${PORT}`)
  console.log(
    `  GET /render?depth=N&pose=px,py,pz,fx,fy,fz&w=480&h=320  →  PNG`
  )
  console.log(`  GET /health  →  JSON status`)
})
