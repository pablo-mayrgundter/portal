// Sub-frames: one guest drawn several times inside one host frame, as Cesium
// calls an external renderer once per depth frustum, drawing its own
// geometry (and resetting its state) in between.
//
// A three.js guest (which caches GL state and never resets it) draws three
// sub-frames per host frame through `makeNetGLImmediateLink`; between them
// the host renders into its own target and leaves the shared context's
// state scrambled. The guest's state must be right at the start of each
// sub-frame: the result must be byte-equal to the same three draws on a
// pristine context.
//
// The test also measures what each sub-frame costs, per boundary:
//   - endFrame():                 frame-end + checkpoint, posted while the
//                                 link is closed, so cloned and queued
//   - subFrame():                 frame-end, checkpoint deferred to the
//                                 guest's next call, inside the next window
//   - endFrame({checkpoint:false}): no restore at all (and wrong pixels)

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import { makeNetGLGuestContext } from './guest-context'
import { makeNetGLImmediateLink } from './immediate-link'
import { isNetGLCall, isNetGLFrameEnd } from './messages'

const W = 48
const H = 48
const SUB_FRAMES = 3

const initDom = (): void => {
  const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
  const g = globalThis as unknown as { window?: unknown; document?: unknown; self?: unknown; URL?: unknown }
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
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  return ctx
}

// A context wrapper that counts method calls (all, and the synchronous
// queries by name).
const SYNC_QUERIES = new Set(['getParameter', 'isEnabled', 'getVertexAttrib'])
const counting = (ctx: WebGL2RenderingContext): { gl: WebGL2RenderingContext; calls: number; queries: number } => {
  const c = { gl: ctx, calls: 0, queries: 0 }
  c.gl = new Proxy(ctx, {
    get(target, prop) {
      const v = Reflect.get(target, prop)
      if (typeof v !== 'function') return v
      return (...args: unknown[]) => {
        c.calls += 1
        if (SYNC_QUERIES.has(prop as string)) c.queries += 1
        return (v as (...a: unknown[]) => unknown).apply(target, args)
      }
    }
  })
  return c
}

const readPixels = (ctx: WebGL2RenderingContext): Uint8Array => {
  const px = new Uint8Array(W * H * 4)
  ctx.readPixels(0, 0, W, H, ctx.RGBA, ctx.UNSIGNED_BYTE, px)
  return px
}

const checker = (a: [number, number, number], b: [number, number, number]): THREE.DataTexture => {
  const data = new Uint8Array([...a, 255, ...b, 255, ...b, 255, ...a, 255])
  const t = new THREE.DataTexture(data, 2, 2, THREE.RGBAFormat)
  t.needsUpdate = true
  return t
}

const newRenderer = (context: WebGL2RenderingContext): THREE.WebGLRenderer => {
  const r = new THREE.WebGLRenderer({ context, antialias: false, stencil: true, depth: true })
  r.setSize(W, H, false)
  r.outputColorSpace = THREE.SRGBColorSpace
  r.toneMapping = THREE.NoToneMapping
  return r
}

// The guest: one scene per sub-frame (a "frustum's slice"), each a cube
// with its own texture at its own place, one camera. The first sub-frame
// clears (scene background); the others draw over it.
type Guest = { scenes: THREE.Scene[]; cubes: THREE.Mesh[]; camera: THREE.PerspectiveCamera }
const buildGuest = (): Guest => {
  const colours: Array<[[number, number, number], [number, number, number]]> = [
    [[255, 200, 0], [0, 90, 255]],
    [[0, 255, 120], [120, 0, 60]],
    [[250, 250, 250], [200, 20, 20]]
  ]
  const scenes: THREE.Scene[] = []
  const cubes: THREE.Mesh[] = []
  for (let i = 0; i < SUB_FRAMES; i += 1) {
    const scene = new THREE.Scene()
    if (i === 0) scene.background = new THREE.Color('#102030')
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), new THREE.MeshBasicMaterial({ map: checker(...colours[i]) }))
    cube.position.x = (i - 1) * 0.9
    scene.add(cube)
    scenes.push(scene)
    cubes.push(cube)
  }
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.set(0, 0.6, 3)
  camera.lookAt(0, 0, 0)
  return { scenes, cubes, camera }
}

const pose = (g: Guest, frame: number): void => {
  g.cubes.forEach((c, i) => c.rotation.set(0.4 + frame * 0.3 + i, 0.6 + frame * 0.2, 0))
}

const drawSubFrame = (r: THREE.WebGLRenderer, g: Guest, i: number): void => {
  r.autoClear = i === 0
  r.render(g.scenes[i], g.camera)
}

// The host between sub-frames: renders its own textured scene into its own
// target and leaves the context's state scrambled, as Cesium draws the
// rest of a frustum and the next one's opaque pass before calling again.
const hostTarget = new Map<WebGL2RenderingContext, THREE.WebGLRenderTarget>()
const hostDraws = (receiver: WebGL2RenderingContext): void => {
  const host = newRenderer(receiver)
  let rt = hostTarget.get(receiver)
  if (!rt) {
    rt = new THREE.WebGLRenderTarget(W, H)
    hostTarget.set(receiver, rt)
  }
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#ff00ff')
  scene.add(new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({ map: checker([10, 255, 10], [255, 10, 10]), transparent: true, opacity: 0.5 })
  ))
  const cam = new THREE.PerspectiveCamera(60, 1, 0.1, 10)
  cam.position.z = 2
  host.setRenderTarget(rt)
  host.render(scene, cam)
  // Left bound: the host's target. Then raw damage.
  const g = receiver
  g.enable(g.BLEND)
  g.blendFunc(g.ONE, g.ONE)
  g.enable(g.CULL_FACE)
  g.cullFace(g.FRONT)
  g.depthFunc(g.GREATER)
  g.colorMask(true, false, true, true)
  g.clearColor(1, 0, 0, 1)
  g.viewport(0, 0, 7, 9)
  g.enable(g.SCISSOR_TEST)
  g.scissor(3, 3, 10, 10)
  g.pixelStorei(g.UNPACK_ALIGNMENT, 1)
  g.activeTexture(g.TEXTURE3)
  g.useProgram(null)
  g.bindVertexArray(null)
}

type Boundary = 'endFrame' | 'subFrame' | 'none'
type SubFrameCost = {
  /** NetGLCalls replayed in the sub-frame's `link.frame()`: queue flush + live. */
  replayed: number
  /** Of those, flushed from the queue (each was structuredCloned). */
  cloned: number
  /** GL calls executed on the host context. */
  hostCalls: number
  /** getParameter / isEnabled / getVertexAttrib on the guest's shadow. */
  shadowQueries: number
}

const run = (boundary: Boundary, scalarState: 'tracked' | 'queried' = 'tracked'): { pixels: Uint8Array; costs: SubFrameCost[] } => {
  initDom()
  const host = makeCtx()
  const receiver = counting(host)
  const link = makeNetGLImmediateLink({ gl: receiver.gl })
  const shadow = counting(makeCtx())
  const guestCtx = makeNetGLGuestContext({
    canvas: { getContext: () => shadow.gl } as unknown as HTMLCanvasElement,
    transport: link.transport,
    scalarState
  })

  // Count NetGLCalls posted while the link's window is open (replayed live).
  let open = false
  let live = 0
  const post = link.transport.post
  link.transport.post = (msg) => {
    if (isNetGLFrameEnd(msg)) open = false
    else if (open && isNetGLCall(msg)) live += 1
    post(msg)
  }

  const guest = buildGuest()
  const renderer = newRenderer(guestCtx.gl)
  const costs: SubFrameCost[] = []

  for (const frame of [1, 2]) {
    pose(guest, frame)
    for (let i = 0; i < SUB_FRAMES; i += 1) {
      hostDraws(host)
      const cloned = link.queued
      live = 0
      const calls0 = receiver.calls
      const queries0 = shadow.queries
      link.frame(() => {
        open = true
        drawSubFrame(renderer, guest, i)
        if (boundary === 'endFrame') guestCtx.endFrame()
        else if (boundary === 'subFrame') guestCtx.subFrame()
        else guestCtx.endFrame({ checkpoint: false })
      })
      // Steady state only: frame 1 compiles and uploads.
      if (frame === 2) {
        costs.push({
          replayed: cloned + live,
          cloned,
          hostCalls: receiver.calls - calls0,
          shadowQueries: shadow.queries - queries0
        })
      }
    }
  }
  // The checkpoint the last boundary queued, if any, would replay at the
  // next host frame: it isn't part of this one's pixels.
  return { pixels: readPixels(host), costs }
}

const renderControl = (): Uint8Array => {
  initDom()
  const ctx = makeCtx()
  const r = newRenderer(ctx)
  const g = buildGuest()
  pose(g, 2)
  for (let i = 0; i < SUB_FRAMES; i += 1) drawSubFrame(r, g, i)
  return readPixels(ctx)
}

const diff = (a: Uint8Array, b: Uint8Array): number => {
  let n = 0
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) n += 1
  return n
}

describe('sub-frames: a guest drawn several times in one host frame', () => {
  beforeAll(() => initDom())

  it('subFrame() renders byte-equal to a pristine control, and replays the same calls as endFrame() with none cloned', () => {
    const control = renderControl()
    const before = run('endFrame')
    const after = run('subFrame')
    const queried = run('endFrame', 'queried')
    const bare = run('none')

    const row = (label: string, c: SubFrameCost[]): string =>
      `${label.padEnd(30)} ${c.map((s) => `replayed ${s.replayed} (cloned ${s.cloned}), host GL ${s.hostCalls}, shadow queries ${s.shadowQueries}`).join(' | ')}`
    console.info([
      'calls per sub-frame, steady state (3 sub-frames of one host frame):',
      row('endFrame(), queried state', queried.costs),
      row('endFrame(), tracked state', before.costs),
      row('subFrame()', after.costs),
      row('endFrame({checkpoint:false})', bare.costs)
    ].join('\n'))

    // Correct with either boundary; wrong with no restore (the test bites).
    expect(diff(before.pixels, control)).toBe(0)
    expect(diff(after.pixels, control)).toBe(0)
    expect(diff(queried.pixels, control)).toBe(0)
    expect(diff(bare.pixels, control)).toBeGreaterThan(0)

    for (let i = 0; i < SUB_FRAMES; i += 1) {
      const b = before.costs[i]
      const a = after.costs[i]
      const n = bare.costs[i]
      // The restore is the same calls either way: only how they arrive differs.
      expect(a.replayed).toBe(b.replayed)
      expect(a.hostCalls).toBe(b.hostCalls)
      // endFrame() queues the whole checkpoint (cloned); subFrame() none.
      expect(b.cloned).toBe(b.replayed - n.replayed)
      expect(b.cloned).toBeGreaterThan(50)
      expect(a.cloned).toBe(0)
      // The tracked checkpoint makes no synchronous queries on the shadow.
      expect(b.shadowQueries).toBe(0)
      expect(a.shadowQueries).toBe(0)
      expect(queried.costs[i].shadowQueries).toBeGreaterThan(50)
    }
  })

  it('a deferred checkpoint goes out before the next shipped call, not before shadow-only queries', () => {
    const posted: string[] = []
    const shadow = makeCtx()
    const guestCtx = makeNetGLGuestContext({
      canvas: { getContext: () => shadow } as unknown as HTMLCanvasElement,
      transport: { post: (m) => { posted.push(isNetGLCall(m) ? m.name : (m as { type: string }).type) }, onMessage: () => () => {} }
    })
    const initial = posted.length
    expect(initial).toBeGreaterThan(50) // the startup checkpoint
    posted.length = 0
    guestCtx.gl.enable(guestCtx.gl.BLEND)
    guestCtx.subFrame()
    expect(posted).toEqual(['enable', 'netgl:frame-end'])
    guestCtx.gl.getParameter(guestCtx.gl.VIEWPORT) // answered by the shadow
    guestCtx.gl.getError()
    expect(posted).toHaveLength(2)
    guestCtx.gl.disable(guestCtx.gl.BLEND)
    // Checkpoint first (with BLEND still enabled), then the call.
    expect(posted).toHaveLength(2 + initial + 1)
    expect(posted[posted.length - 1]).toBe('disable')
    // One checkpoint per boundary: the next call goes out alone.
    guestCtx.gl.enable(guestCtx.gl.DEPTH_TEST)
    expect(posted).toHaveLength(2 + initial + 2)
  })

  it('endFrame() after subFrame() posts its checkpoint at once and drops the deferred one', () => {
    const posted: string[] = []
    const shadow = makeCtx()
    const guestCtx = makeNetGLGuestContext({
      canvas: { getContext: () => shadow } as unknown as HTMLCanvasElement,
      transport: { post: (m) => { posted.push(isNetGLCall(m) ? m.name : (m as { type: string }).type) }, onMessage: () => () => {} }
    })
    const initial = posted.length
    posted.length = 0
    guestCtx.subFrame()
    guestCtx.endFrame()
    expect(posted).toHaveLength(2 + initial)
    guestCtx.gl.enable(guestCtx.gl.BLEND)
    expect(posted).toHaveLength(2 + initial + 1)
  })
})
