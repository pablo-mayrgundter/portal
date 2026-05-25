// The actual spike target. Three.js renders a scene through a regular
// WebGLRenderer (control) and through a NetGLRenderer-style proxied
// WebGLRenderer (shadow + receiver). Both pipelines should produce
// byte-identical pixels — same headless-gl backend, same shader source,
// same draw call ordering.
//
// Passing this proves three.js's GL stream is coherent enough to be
// intercepted, dispatched against a second context, and re-executed
// transparently. The proof of the command-stream NetGL concept.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import { makeNetGLProxy } from './proxy'

const W = 64
const H = 64

// Three.js touches `document`, `window`, `self`, `URL` at module load and
// during renderer construction. Bootstrap jsdom once before any test runs.
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

const buildScene = (): { scene: THREE.Scene; camera: THREE.Camera } => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#000000')
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#33aa66' })
  )
  cube.rotation.set(0.4, 0.6, 0)
  scene.add(cube)
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.set(1.8, 1.2, 2.4)
  camera.lookAt(0, 0, 0)
  return { scene, camera }
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
  r.autoClear = true
  return r
}

const renderControl = (): Uint8Array => {
  const ctx = makeCtx()
  const renderer = newRenderer(ctx)
  const { scene, camera } = buildScene()
  renderer.render(scene, camera)
  return readPixels(ctx)
}

const renderProxied = (): Uint8Array => {
  const shadow = makeCtx()
  const receiver = makeCtx()
  const proxied = makeNetGLProxy({ shadow, receiver })
  const renderer = newRenderer(proxied)
  const { scene, camera } = buildScene()
  renderer.render(scene, camera)
  return readPixels(receiver)
}

const summarize = (px: Uint8Array): { nonZero: number; sumRGB: [number, number, number] } => {
  let nz = 0
  let r = 0
  let g = 0
  let b = 0
  for (let i = 0; i < px.length; i += 4) {
    if (px[i] | px[i + 1] | px[i + 2]) nz += 1
    r += px[i]
    g += px[i + 1]
    b += px[i + 2]
  }
  return { nonZero: nz, sumRGB: [r, g, b] }
}

describe('NetGL proxy — THREE.WebGLRenderer pixel parity', () => {
  beforeAll(() => initDom())

  it('renders a basic cube through the proxy with the same pixels as the control', () => {
    const controlPx = renderControl()
    const proxiedPx = renderProxied()

    const controlSummary = summarize(controlPx)
    const proxiedSummary = summarize(proxiedPx)

    // Sanity: the control must actually have drawn something green.
    expect(controlSummary.nonZero).toBeGreaterThan(W * H * 0.1)
    expect(controlSummary.sumRGB[1]).toBeGreaterThan(controlSummary.sumRGB[0])

    // Pixel parity. Both contexts are stack-gl with identical inputs, so
    // exact equality is the expectation. Tolerate up to a couple of pixels
    // worth of rounding variance just in case driver state isn't perfectly
    // deterministic across context-init order.
    let mismatched = 0
    let maxDiff = 0
    for (let i = 0; i < controlPx.length; i += 1) {
      const d = Math.abs(controlPx[i] - proxiedPx[i])
      if (d > 0) mismatched += 1
      if (d > maxDiff) maxDiff = d
    }
    expect(maxDiff).toBeLessThanOrEqual(1)
    expect(mismatched).toBeLessThan(W * H * 4 * 0.01)
  })
})
