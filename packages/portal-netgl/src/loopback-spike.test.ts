// The wire-layer NetGL spike. Where `three-spike.test.ts` proves the
// in-process proxy hits pixel parity by holding direct refs to both GL
// contexts, this test inserts a real PortalTransport between them: the
// recorder posts NetGLCalls onto `hostTransport`, the replay engine
// receives them off `targetTransport`. Same `createLoopbackPair` the
// headless cascade uses; same dispatch shape postMessage will have when
// the iframe path lands.
//
// Passing here proves the recorder produces a self-sufficient call stream
// — every reference resolves through netglIDs alone, no shared object
// graph between sender and receiver — and the replay engine reconstructs
// the same GPU state from that stream. That's the protocol working as a
// protocol.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import { createLoopbackPair } from '@portal/portal-iframe'
import { makeNetGLRecorder } from './recorder'
import { makeNetGLReplay } from './replay'
import type { NetGLCall } from './messages'

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

describe('NetGL recorder/replay over PortalTransport — wire spike', () => {
  beforeAll(() => initDom())

  it('renders the cube via recorded call stream through createLoopbackPair', { timeout: 30_000 }, () => {
    // Control: render the cube into a fresh GL context directly.
    const controlCtx = makeCtx()
    const controlRenderer = newRenderer(controlCtx)
    const controlScene = buildScene()
    controlRenderer.render(controlScene.scene, controlScene.camera)
    const controlPx = readPixels(controlCtx)

    // Wire path: shadow side, transport, receiver side.
    const shadow = makeCtx()
    const receiver = makeCtx()

    // PortalTransport's typed surface is the PortalMessage union; widen
    // it for our NetGL traffic. The runtime only checks `typeof === 'object'`,
    // so the loopback carries our calls verbatim.
    const { hostTransport, targetTransport } = createLoopbackPair() as unknown as {
      hostTransport: { post: (msg: NetGLCall) => void; onMessage: (l: (m: NetGLCall) => void) => () => void }
      targetTransport: { post: (msg: NetGLCall) => void; onMessage: (l: (m: NetGLCall) => void) => () => void }
    }

    const replay = makeNetGLReplay(receiver)
    // Replay listens on the target side of the loopback.
    targetTransport.onMessage((call) => replay(call))

    // Recorder posts on the host side.
    const wireGl = makeNetGLRecorder(shadow, (call) => hostTransport.post(call))

    const renderer = newRenderer(wireGl)
    const wireScene = buildScene()
    renderer.render(wireScene.scene, wireScene.camera)

    const wirePx = readPixels(receiver)

    // Sanity on control: cube did draw, and it's green-dominant.
    let controlNonZero = 0
    let controlSumR = 0
    let controlSumG = 0
    for (let i = 0; i < controlPx.length; i += 4) {
      if (controlPx[i] | controlPx[i + 1] | controlPx[i + 2]) controlNonZero += 1
      controlSumR += controlPx[i]
      controlSumG += controlPx[i + 1]
    }
    expect(controlNonZero).toBeGreaterThan(W * H * 0.1)
    expect(controlSumG).toBeGreaterThan(controlSumR)

    // Pixel parity: every channel within 1 of the control. Both pipelines
    // run identical inputs against identical headless-gl backends; the
    // recorder/replay round-trip should not perturb a single bit.
    let mismatched = 0
    let maxDiff = 0
    for (let i = 0; i < controlPx.length; i += 1) {
      const d = Math.abs(controlPx[i] - wirePx[i])
      if (d > 0) mismatched += 1
      if (d > maxDiff) maxDiff = d
    }
    expect(maxDiff).toBeLessThanOrEqual(1)
    expect(mismatched).toBeLessThan(W * H * 4 * 0.01)
  })
})
