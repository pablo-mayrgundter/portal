// deck.gl / luma.gl host adapter: the globe view math against deck's own
// GlobeViewport, and the state-leak regression on a real luma device
// (headless-gl): a guest that enables CULL_FACE or changes blend, depth or
// colour-mask state must not change deck's next draw.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import { _GlobeViewport as GlobeViewport, WebMercatorViewport } from '@deck.gl/core'
import { makeNetGLGuestContext } from '../guest-context'
import type { NetGLTransport } from '../renderer'
import { projectToPixels, sphereToEcef, type NetGLLayerView } from '../layer-view'
import { makeNetGLThreeOverlayGuest } from './three-overlay'
import {
  attachNetGLDeckLayer,
  globeFrameOfViewport,
  globeLayerView,
  type DeckLike,
  type DeckViewportLike,
  type LumaDeviceLike
} from './luma'

const W = 64
const H = 48

const makeGlobe = (props: Record<string, number> = {}): DeckViewportLike =>
  new GlobeViewport({ width: W, height: H, longitude: -40, latitude: 25, zoom: 0.4, pitch: 20, bearing: 15, farZMultiplier: 4, ...props }) as unknown as DeckViewportLike

describe('globeLayerView — deck GlobeViewport → ECEF view', () => {
  it('measures a uniform scale of a rotation, and deck\'s sphere radius', () => {
    const frame = globeFrameOfViewport(makeGlobe())!
    expect(frame).not.toBeNull()
    expect(frame.earthRadius).toBeCloseTo(6370972, 3)
    expect(frame.unitsPerMetre).toBeCloseTo(256 / 6370972, 15)
  })

  it('projects ECEF points where deck projects their longitude, latitude and altitude', () => {
    const cases: Array<Record<string, number>> = [{}, { zoom: 3, pitch: 50, bearing: -70, longitude: 120, latitude: -60 }]
    for (const props of cases) {
      const vp = makeGlobe(props) as DeckViewportLike & {
        project(xyz: number[]): number[]
        viewProjectionMatrix: number[]
      }
      const pr = 2
      const view = globeLayerView(vp, { timeMs: 0, drawingBufferWidth: W * pr, drawingBufferHeight: H * pr })!
      expect(view.pixelRatio).toBe(pr)
      expect(view.viewport).toEqual([0, 0, W * pr, H * pr])
      // The view is rigid: its 3×3 is orthonormal.
      const m = view.viewMatrix
      const col = (c: number) => [m[c * 4], m[c * 4 + 1], m[c * 4 + 2]]
      for (const c of [0, 1, 2]) expect(Math.hypot(...col(c))).toBeCloseTo(1, 12)
      const R = view.earth!.radius
      const lng0 = (props as { longitude?: number }).longitude ?? -40
      const lat0 = (props as { latitude?: number }).latitude ?? 25
      for (const [dl, db, alt] of [[0, 0, 0], [5, -3, 4e5], [-8, 6, 2e6], [2, 2, 3.5e7]]) {
        const lng = lng0 + dl
        const lat = lat0 + db
        const [px, py] = vp.project([lng, lat, alt])
        const [gx, gy, gz] = projectToPixels(view, sphereToEcef(lng, lat, alt, R))
        expect(gx).toBeCloseTo(px * pr, 6)
        expect(gy).toBeCloseTo((H - py) * pr, 6)
        // Same clip-space depth as deck's own view-projection.
        const c = vp.projectPosition([lng, lat, alt])
        const v = vp.viewProjectionMatrix
        const z = v[2] * c[0] + v[6] * c[1] + v[10] * c[2] + v[14]
        const w = v[3] * c[0] + v[7] * c[1] + v[11] * c[2] + v[15]
        expect(gz).toBeCloseTo(z / w, 9)
      }
    }
  })

  it('returns null for a viewport that is not linear in ECEF (Web Mercator)', () => {
    const vp = new WebMercatorViewport({ width: W, height: H, longitude: 0, latitude: 0, zoom: 1 }) as unknown as DeckViewportLike
    expect(globeLayerView(vp, { timeMs: 0, drawingBufferWidth: W, drawingBufferHeight: H })).toBeNull()
  })
})

// --- luma.gl on headless-gl ---------------------------------------------

const initDom = (): JSDOM => {
  const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
  const g = globalThis as unknown as { window?: unknown; document?: unknown; self?: unknown }
  if (!g.window) g.window = dom.window
  if (!g.document) g.document = dom.window.document
  if (!g.self) g.self = dom.window
  return dom
}

const makeCtx = (): WebGL2RenderingContext => {
  const ctx = gl(W, H, { antialias: false, stencil: true, depth: true, createWebGL2Context: true } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  // headless-gl's WebGL2 answers null for ACTIVE_UNIFORM_BLOCKS, which
  // luma's shader reflection reads; no shader here uses uniform blocks.
  const gpp = ctx.getProgramParameter.bind(ctx)
  ;(ctx as unknown as { getProgramParameter: unknown }).getProgramParameter = (p: WebGLProgram, n: number) => {
    const v = gpp(p, n)
    return v === null && n === 0x8a36 ? 0 : v
  }
  return ctx
}

type LumaHost = {
  device: LumaDeviceLike & { submit(): void }
  gl: WebGL2RenderingContext
  draw(): void
  read(): Uint8Array
}

// A luma "deck": clears, then draws one clockwise (back-facing) triangle
// and one translucent quad with a pipeline that names no parameters, as a
// deck layer that relies on luma's defaults would.
const makeLumaHost = async (dom: JSDOM): Promise<LumaHost> => {
  const ctx = makeCtx()
  const canvas = dom.window.document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  Object.defineProperty(ctx, 'canvas', { value: canvas })
  const { webgl2Adapter } = await import('@luma.gl/webgl')
  const { Model } = await import('@luma.gl/engine')
  const device = (await webgl2Adapter.attach(ctx, { createCanvasContext: { canvas, autoResize: false } } as never)) as unknown as LumaDeviceLike & {
    submit(): void
    createBuffer(p: unknown): unknown
    beginRenderPass(p: unknown): { end(): void }
    getDefaultCanvasContext(): { getCurrentFramebuffer(): unknown }
  }
  const model = new Model(device as never, {
    vs: `#version 300 es
in vec2 pos;
void main() { gl_Position = vec4(pos, 0.5, 1.0); }`,
    fs: `#version 300 es
precision highp float;
out vec4 color;
void main() { color = vec4(0.9, 0.3, 0.1, 1.0); }`,
    bufferLayout: [{ name: 'pos', format: 'float32x2' }],
    // Clockwise: culled if CULL_FACE (BACK) leaks in.
    attributes: { pos: device.createBuffer({ data: new Float32Array([-0.9, -0.9, -0.9, 0.9, 0.9, -0.9]) }) as never },
    vertexCount: 3
  })
  return {
    device,
    gl: ctx,
    draw() {
      const pass = device.beginRenderPass({
        framebuffer: device.getDefaultCanvasContext().getCurrentFramebuffer(),
        clearColor: [0.02, 0.03, 0.05, 1],
        clearDepth: 1
      })
      model.draw(pass as never)
      pass.end()
      device.submit()
    },
    read() {
      const px = new Uint8Array(W * H * 4)
      ctx.readPixels(0, 0, W, H, ctx.RGBA, ctx.UNSIGNED_BYTE, px)
      return px
    }
  }
}

// The slice of a Deck the adapter needs; `frame()` is one deck redraw.
const makeFakeDeck = (host: LumaHost, viewport: DeckViewportLike): DeckLike & { frame(): void; redraws: number } => {
  const deck = {
    props: {} as { onAfterRender?: ((c: unknown) => void) | null },
    redraws: 0,
    setProps(p: { onAfterRender?: (c: unknown) => void }) {
      Object.assign(deck.props, p)
    },
    redraw() {
      deck.redraws += 1
    },
    getViewports: () => [viewport],
    frame() {
      host.draw()
      deck.props.onAfterRender?.({ device: host.device, gl: host.gl })
    }
  }
  return deck
}

const diffCount = (a: Uint8Array, b: Uint8Array): number => {
  let n = 0
  for (let i = 0; i < a.length; i += 1) if (a[i] !== b[i]) n += 1
  return n
}

const memoryPair = (): { guest: NetGLTransport; host: NetGLTransport } => {
  const toHost = new Set<(m: unknown) => void>()
  const toGuest = new Set<(m: unknown) => void>()
  const on = (s: Set<(m: unknown) => void>) => (l: (m: unknown) => void) => {
    s.add(l)
    return () => {
      s.delete(l)
    }
  }
  return {
    guest: { post: (m) => toHost.forEach((l) => l(structuredClone(m))), onMessage: on(toGuest) },
    host: { post: (m) => toGuest.forEach((l) => l(structuredClone(m))), onMessage: on(toHost) }
  }
}

const GL_CULL_FACE = 0x0b44
const GL_BLEND = 0x0be2
const GL_DEPTH_TEST = 0x0b71

describe('attachNetGLDeckLayer — luma state is restored after the guest', () => {
  let dom: JSDOM
  beforeAll(() => {
    dom = initDom()
  })

  // A three.js overlay guest, same page: its mesh is FrontSide (three
  // enables CULL_FACE) and transparent (BLEND), and its points sit at known
  // ECEF positions.
  const runImmediate = async (restore: 'luma-stack' | 'none') => {
    const host = await makeLumaHost(dom)
    const viewport = makeGlobe({ longitude: 0, latitude: 0, zoom: 0, pitch: 0, bearing: 0 })
    const deck = makeFakeDeck(host, viewport)
    const scene = new THREE.Scene()
    const shadowCanvas = { getContext: () => makeCtx(), style: {}, width: 1, height: 1 } as unknown as HTMLCanvasElement
    const R = 6370972
    const target = sphereToEcef(10, 5, 1e6, R)
    const points = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(target, 3)),
      new THREE.PointsMaterial({ color: 0x00ff00, size: 3, sizeAttenuation: false, depthWrite: false })
    )
    points.frustumCulled = false
    scene.add(points)
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1e6, 1e6), new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true, opacity: 0.5 }))
    quad.position.set(...sphereToEcef(-30, -20, 1e6, R))
    scene.add(quad)
    let guest: ReturnType<typeof makeNetGLThreeOverlayGuest> | null = null
    const layer = attachNetGLDeckLayer(deck, {
      device: host.device,
      restore,
      time: () => 0,
      render: (view) => {
        guest!.applyView(view)
        guest!.render()
      }
    })
    // The overlay guest on the link's transport; its shadow on headless-gl.
    guest = makeNetGLThreeOverlayGuest({
      WebGLRenderer: THREE.WebGLRenderer,
      scene,
      camera: new THREE.PerspectiveCamera(),
      transport: layer.transport,
      canvas: shadowCanvas
    })

    host.draw()
    const baseline = host.read()
    deck.frame() // host, then the guest
    const withGuest = host.read()
    const view = layer.lastView!
    deck.frame() // host again; the guest draws after the read below
    host.draw()
    const after = host.read()
    return { baseline, withGuest, after, view, target, layer }
  }

  it('immediate link: deck\'s next frame is bit-identical to one where the guest never ran', async () => {
    const { baseline, withGuest, after, view, target, layer } = await runImmediate('luma-stack')
    expect(layer.stats.guestFrames).toBe(2)
    expect(diffCount(baseline, withGuest)).toBeGreaterThan(0) // the guest drew
    expect(diffCount(baseline, after)).toBe(0)
    // The guest's point lands where deck's projection puts that ECEF point.
    const [x, y] = projectToPixels(view, target)
    const i = (Math.floor(y) * W + Math.floor(x)) * 4
    expect([withGuest[i], withGuest[i + 1], withGuest[i + 2]]).toEqual([0, 255, 0])
  })

  it('control: without push/popState the guest\'s CULL_FACE leaks into deck\'s next frame', async () => {
    const { baseline, after } = await runImmediate('none')
    expect(diffCount(baseline, after)).toBeGreaterThan(0)
  })

  it('host receiver (iframe path): blend, depth, cull and colour-mask leftovers are restored', async () => {
    for (const restore of ['luma-stack', 'none'] as const) {
      const host = await makeLumaHost(dom)
      const deck = makeFakeDeck(host, makeGlobe())
      const pair = memoryPair()
      const views: unknown[] = []
      pair.guest.onMessage((m) => views.push(m))
      const layer = attachNetGLDeckLayer(deck, { device: host.device, restore, transport: pair.host, time: () => 0 })
      const shadowCanvas = { getContext: () => makeCtx() } as unknown as HTMLCanvasElement
      const core = makeNetGLGuestContext({ canvas: shadowCanvas, transport: pair.guest })
      core.announce({ position: [0, 0, 0], normal: [0, 0, 1], up: [0, 1, 0] })
      const g = core.gl
      g.enable(GL_CULL_FACE)
      g.enable(GL_BLEND)
      g.blendFunc(g.ZERO, g.ONE)
      g.enable(GL_DEPTH_TEST)
      g.depthFunc(g.NEVER)
      g.colorMask(false, true, true, true)
      core.endFrame()

      host.draw()
      const baseline = host.read()
      deck.frame()
      host.draw()
      const after = host.read()
      expect(layer.stats.guestFrames).toBe(1)
      if (restore === 'luma-stack') expect(diffCount(baseline, after)).toBe(0)
      else expect(diffCount(baseline, after)).toBeGreaterThan(0)
      // The guest got one view after its frame was drained, and no second
      // one while that is unanswered.
      expect(views.filter((m) => (m as { type?: string }).type === 'layer:view')).toHaveLength(1)
      deck.frame()
      expect(views.filter((m) => (m as { type?: string }).type === 'layer:view')).toHaveLength(1)
      const msg = views.find((m) => (m as { type?: string }).type === 'layer:view') as { view: NetGLLayerView }
      expect(msg.view.frame).toBe('ecef')
      layer.detach()
    }
  })
})
