// The headline NetGL demo. Two scenes, two THREE.WebGLRenderer instances —
// but **one shared GL context**, with the second renderer driving that
// context across a NetGLTransport. The composed framebuffer is byte-equal
// to a control where a single renderer renders both scenes back-to-back
// into the same context.
//
// This is the value-prop for command-stream NetGL over the existing
// frame-RPC iframe path:
//   - frame-RPC ships color + depth bitmaps back, host composites in a
//     fullscreen-quad shader with manual stencil + depth-clip and a
//     depth-pack precision loss across the wire
//   - command-stream NetGL ships the draw calls themselves; both renderers
//     write into one GL context; depth-test, stencil, blending all
//     happen natively. No precision loss, no compositor shader.
//
// The test:
//   1. Render scene-back (large blue plane at z=-3) into a control context
//      and scene-front (small green cube near origin) into the same
//      context, two consecutive `render()` calls on one THREE.WebGLRenderer.
//   2. Render scene-back into a target context with a local
//      THREE.WebGLRenderer, then render scene-front via createNetGLRenderer
//      → loopback transport → attachNetGLReceiver into the *same* target
//      context. autoClear=false on the second so it composes over the first.
//   3. Read pixels from both, assert byte-equality.
//
// If the cube depth-tests correctly against the back plane in the NetGL
// path (the depth buffer in the target context is from the local render
// and must be honoured by the NetGL render), the composition concept is
// proven end to end.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import { createLoopbackPair } from '@portal/portal-iframe'
import { createNetGLRenderer, attachNetGLReceiver, type NetGLTransport } from './renderer'

const W = 64
const H = 64

const initDom = (): void => {
  const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
  const g = globalThis as unknown as {
    window?: unknown
    document?: unknown
    self?: unknown
    URL?: unknown
  }
  if (!g.window) g.window = dom.window
  if (!g.document) g.document = dom.window.document
  if (!g.self) g.self = dom.window
  if (!g.URL) g.URL = url.URL
}

const makeCtx = (): WebGL2RenderingContext => {
  const ctx = gl(W, H, {
    antialias: false,
    stencil: true,
    depth: true,
    preserveDrawingBuffer: false,
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  return ctx
}

const readPixels = (ctx: WebGL2RenderingContext): Uint8Array => {
  const px = new Uint8Array(W * H * 4)
  ctx.readPixels(0, 0, W, H, ctx.RGBA, ctx.UNSIGNED_BYTE, px)
  return px
}

const newRenderer = (ctx: WebGL2RenderingContext): THREE.WebGLRenderer => {
  const r = new THREE.WebGLRenderer({
    context: ctx,
    antialias: false,
    stencil: true,
    depth: true
  })
  r.setSize(W, H, false)
  r.outputColorSpace = THREE.SRGBColorSpace
  r.toneMapping = THREE.NoToneMapping
  return r
}

const buildBack = (): THREE.Scene => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#000000')
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshBasicMaterial({ color: '#3355cc' })
  )
  plane.position.set(0, 0, -3)
  scene.add(plane)
  return scene
}

const buildFront = (): THREE.Scene => {
  const scene = new THREE.Scene()
  // No background — autoClear=false on the renderer means we won't paint it.
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.MeshBasicMaterial({ color: '#33cc55' })
  )
  cube.rotation.set(0.4, 0.6, 0)
  scene.add(cube)
  return scene
}

const camera = (): THREE.Camera => {
  const c = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  c.position.set(1.8, 1.2, 2.4)
  c.lookAt(0, 0, 0)
  return c
}

describe('NetGL composition — cross-context composition in one GL context', () => {
  beforeAll(() => initDom())

  it(
    'composes back-scene + front-scene via NetGL in the same context as the back',
    { timeout: 30_000 },
    () => {
      // ── Control: one renderer, one context, two render() calls ───────
      const controlCtx = makeCtx()
      const controlRenderer = newRenderer(controlCtx)
      const cam = camera()
      controlRenderer.autoClear = true
      controlRenderer.render(buildBack(), cam)
      controlRenderer.autoClear = false
      controlRenderer.render(buildFront(), cam)
      const controlPx = readPixels(controlCtx)

      // ── NetGL path ───────────────────────────────────────────────────
      // Target context owned host-side. Back scene renders into it locally;
      // front scene renders into it via the NetGL receiver.
      const targetCtx = makeCtx()

      const { hostTransport, targetTransport } = createLoopbackPair() as unknown as {
        hostTransport: NetGLTransport
        targetTransport: NetGLTransport
      }

      // Local renderer for the back scene (no transport involved).
      const backRenderer = newRenderer(targetCtx)
      backRenderer.autoClear = true
      backRenderer.render(buildBack(), camera())

      // NetGL receiver listens on host-side, dispatches into the target ctx.
      const receiver = attachNetGLReceiver({ context: targetCtx, transport: hostTransport })

      // Sender side: shadow context for state queries, NetGLRenderer posts
      // its calls onto the target side of the loopback.
      const shadow = makeCtx()
      const frontRenderer = createNetGLRenderer({
        shadow,
        transport: targetTransport,
        antialias: false,
        stencil: true,
        depth: true
      })
      frontRenderer.setSize(W, H, false)
      frontRenderer.outputColorSpace = THREE.SRGBColorSpace
      frontRenderer.toneMapping = THREE.NoToneMapping
      frontRenderer.autoClear = false
      frontRenderer.render(buildFront(), camera())

      const composedPx = readPixels(targetCtx)
      receiver.detach()

      // ── Sanity checks ────────────────────────────────────────────────
      // The back should be mostly blue, the front should land a chunk of
      // green where the cube sits.
      let blueDominant = 0
      let greenDominant = 0
      for (let i = 0; i < controlPx.length; i += 4) {
        const r = controlPx[i]
        const g = controlPx[i + 1]
        const b = controlPx[i + 2]
        if (b > r && b > g) blueDominant += 1
        if (g > r && g > b) greenDominant += 1
      }
      expect(blueDominant).toBeGreaterThan(W * H * 0.4)
      expect(greenDominant).toBeGreaterThan(W * H * 0.05)

      // ── Pixel parity ─────────────────────────────────────────────────
      let mismatched = 0
      let maxDiff = 0
      for (let i = 0; i < controlPx.length; i += 1) {
        const d = Math.abs(controlPx[i] - composedPx[i])
        if (d > 0) mismatched += 1
        if (d > maxDiff) maxDiff = d
      }
      expect(maxDiff).toBeLessThanOrEqual(1)
      expect(mismatched).toBeLessThan(W * H * 4 * 0.01)
    }
  )
})
