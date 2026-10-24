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

// --- Host reprojection on headless-gl ----------------------------------

// A transport pair that queues: nothing arrives until `flush`, as with
// postMessage, so a frame can be rendered for one view and drained after
// the camera has moved. `strip` drops the frame-end's viewId, as a guest
// on an older portal-netgl sends it.
const queuedPair = (strip = false) => {
  const toHost: unknown[] = []
  const toGuest: unknown[] = []
  const hostL = new Set<(m: unknown) => void>()
  const guestL = new Set<(m: unknown) => void>()
  const on = (s: Set<(m: unknown) => void>) => (l: (m: unknown) => void) => {
    s.add(l)
    return () => {
      s.delete(l)
    }
  }
  const unTag = (m: unknown): unknown => {
    const t = m as { type?: string; batch?: unknown[]; viewId?: unknown }
    if (t?.type === 'netgl:frame-end') return { type: 'netgl:frame-end' }
    if (t?.type === 'netgl:batch') return { ...t, batch: t.batch!.map(unTag) }
    return m
  }
  const deliver = (q: unknown[], ls: Set<(m: unknown) => void>) => {
    while (q.length) {
      const m = q.shift()
      for (const l of ls) l(m)
    }
  }
  return {
    guest: { post: (m: unknown) => toHost.push(structuredClone(strip ? unTag(m) : m)), onMessage: on(guestL) } as NetGLTransport,
    host: { post: (m: unknown) => toGuest.push(structuredClone(m)), onMessage: on(hostL) } as NetGLTransport,
    flush() {
      for (let i = 0; i < 4 && (toHost.length || toGuest.length); i += 1) {
        deliver(toHost, hostL)
        deliver(toGuest, guestL)
      }
    }
  }
}

describe('attachNetGLDeckLayer({ reproject }) — the guest frame follows deck\'s camera', () => {
  let dom: JSDOM
  beforeAll(() => {
    dom = initDom()
  })

  const GREEN = [0, 255, 0]
  const isGreen = (px: Uint8Array, x: number, y: number): boolean => {
    const i = (Math.floor(y) * W + Math.floor(x)) * 4
    return px[i] === GREEN[0] && px[i + 1] === GREEN[1] && px[i + 2] === GREEN[2]
  }

  const run = async (reproject: boolean, strip = false) => {
    const host = await makeLumaHost(dom)
    let viewport = makeGlobe({ longitude: 0, latitude: 0, zoom: 0.3, pitch: 0, bearing: 0 })
    const deck = makeFakeDeck(host, viewport)
    deck.getViewports = () => [viewport]
    const pair = queuedPair(strip)
    const layer = attachNetGLDeckLayer(deck, { device: host.device, transport: pair.host, time: () => 0, reproject })
    const scene = new THREE.Scene()
    const R = 6370972
    const target = sphereToEcef(4, 3, 1e6, R)
    const points = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(target, 3)),
      new THREE.PointsMaterial({ color: 0x00ff00, size: 3, sizeAttenuation: false, depthTest: false, depthWrite: false })
    )
    points.frustumCulled = false
    scene.add(points)
    const shadowCanvas = { getContext: () => makeCtx(), style: {}, width: 1, height: 1 } as unknown as HTMLCanvasElement
    const guest = makeNetGLThreeOverlayGuest({ WebGLRenderer: THREE.WebGLRenderer, scene, camera: new THREE.PerspectiveCamera(), transport: pair.guest, canvas: shadowCanvas })
    guest.start()
    pair.flush() // ready, hello, acks

    deck.frame() // view A goes out
    pair.flush() // the guest's first frame (it deletes its shaders: never re-run)
    deck.frame() // drains it, and asks for A again
    const viewA = layer.lastView!
    pair.flush() // the guest renders A; its frame lands, undrained
    // The camera moves before deck draws again: a pan and a zoom.
    viewport = makeGlobe({ longitude: 9, latitude: 6, zoom: 0.45, pitch: 0, bearing: 0 })
    deck.frame() // drains the frame drawn for A into deck's view B
    const atB = host.read()
    const viewB = layer.lastView!
    const rB = layer.lastReprojection
    // No new frame: the next draw re-runs A's frame, at view C.
    viewport = makeGlobe({ longitude: -3, latitude: -2, zoom: 0.35, pitch: 0, bearing: 0 })
    deck.frame()
    const atC = host.read()
    const viewC = layer.lastView!
    layer.detach()
    guest.stop()
    return { target, viewA, viewB, viewC, atB, atC, rB, layer, receiver: layer.receiver! }
  }

  it('drains a frame drawn for the old view where deck\'s new view puts its points (and re-runs it at the next)', async () => {
    const { target, viewA, viewB, viewC, atB, atC, rB, layer, receiver } = await run(true)
    const [ax, ay] = projectToPixels(viewA, target)
    const [bx, by] = projectToPixels(viewB, target)
    const [cx, cy] = projectToPixels(viewC, target)
    // The moves are big enough to tell apart (more than the 3 px dot).
    expect(Math.hypot(bx - ax, by - ay)).toBeGreaterThan(6)
    expect(Math.hypot(cx - ax, cy - ay)).toBeGreaterThan(6)
    expect(isGreen(atB, bx, by)).toBe(true)
    expect(isGreen(atB, ax, ay)).toBe(false)
    expect(isGreen(atC, cx, cy)).toBe(true)
    expect(isGreen(atC, ax, ay)).toBe(false)
    // The guest tagged its frame: view 2 (1 was the warm-up).
    expect(receiver.drainedViews).toEqual([2])
    expect(rB?.viewId).toBe(2)
    expect(rB?.correction).not.toBeNull()
    expect(layer.stats.reprojectedFrames).toBe(2)
  })

  it('without the frame-end\'s viewId, the view in flight is the frame\'s', async () => {
    const { target, viewB, atB, receiver } = await run(true, true)
    const [bx, by] = projectToPixels(viewB, target)
    expect(isGreen(atB, bx, by)).toBe(true)
    expect(receiver.drainedViews).toEqual([2])
  })

  it('control: without reproject the frame stays at the old view\'s pixels', async () => {
    const { target, viewA, viewB, atB, layer } = await run(false)
    const [ax, ay] = projectToPixels(viewA, target)
    const [bx, by] = projectToPixels(viewB, target)
    expect(isGreen(atB, ax, ay)).toBe(true)
    expect(isGreen(atB, bx, by)).toBe(false)
    expect(layer.lastReprojection).toBeNull()
    expect(layer.stats.reprojectedFrames).toBe(0)
  })
})

// --- The opt-in convention: a screen-space wide line --------------------

// A wide line as three's ShaderMaterial draws one: both endpoints to clip
// space, then a quad extruded by a width in pixels, perpendicular to the
// segment on screen. With `optIn` the shader declares `netgl_reproject`
// and corrects each endpoint before the extrusion; without, the replay
// wraps its main and corrects the extruded corners instead.
const wideLineVS = (optIn: boolean): string => `
${optIn ? 'uniform mat4 netgl_reproject;' : ''}
uniform float uWidth;
uniform vec2 uResolution;
attribute vec3 aEnd;
attribute vec2 aSide;
void main() {
  vec4 a = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vec4 b = projectionMatrix * modelViewMatrix * vec4(aEnd, 1.0);
  ${optIn ? 'a = netgl_reproject * a; b = netgl_reproject * b;' : ''}
  vec2 sa = a.xy / a.w * uResolution * 0.5;
  vec2 sb = b.xy / b.w * uResolution * 0.5;
  vec2 dir = normalize(sb - sa);
  vec2 n = vec2(-dir.y, dir.x);
  vec4 p = aSide.x < 0.5 ? a : b;
  p.xy += n * aSide.y * uWidth / uResolution * p.w;
  gl_Position = p;
}`

describe('attachNetGLDeckLayer({ reproject }) — a guest shader that applies netgl_reproject itself', () => {
  let dom: JSDOM
  beforeAll(() => {
    dom = initDom()
  })

  const run = async (optIn: boolean) => {
    const host = await makeLumaHost(dom)
    let viewport = makeGlobe({ longitude: 0, latitude: 0, zoom: 0.3, pitch: 0, bearing: 0 })
    const deck = makeFakeDeck(host, viewport)
    deck.getViewports = () => [viewport]
    const pair = queuedPair()
    const layer = attachNetGLDeckLayer(deck, { device: host.device, transport: pair.host, time: () => 0, reproject: true })
    const R = 6370972
    const p0 = sphereToEcef(-1, -4, 2e5, R)
    const p1 = sphereToEcef(9, 6, 2e5, R)
    // Every vertex carries both endpoints; aSide picks the end (x) and the side (y).
    const starts = [...p0, ...p0, ...p0, ...p0]
    const ends = [...p1, ...p1, ...p1, ...p1]
    const geometry = new THREE.BufferGeometry()
      .setAttribute('position', new THREE.Float32BufferAttribute(starts, 3))
      .setAttribute('aEnd', new THREE.Float32BufferAttribute(ends, 3))
      .setAttribute('aSide', new THREE.Float32BufferAttribute([0, -1, 0, 1, 1, 1, 1, -1], 2))
      .setIndex([0, 1, 2, 0, 2, 3])
    const uniforms: Record<string, THREE.IUniform> = { uWidth: { value: 6 }, uResolution: { value: new THREE.Vector2(W, H) } }
    // The guest's own identity, so it draws on a host that doesn't reproject.
    if (optIn) uniforms.netgl_reproject = { value: new THREE.Matrix4() }
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: wideLineVS(optIn),
      fragmentShader: 'void main() { gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); }',
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    const line = new THREE.Mesh(geometry, material)
    line.frustumCulled = false
    const scene = new THREE.Scene()
    scene.add(line)
    const shadowCanvas = { getContext: () => makeCtx(), style: {}, width: 1, height: 1 } as unknown as HTMLCanvasElement
    const guest = makeNetGLThreeOverlayGuest({ WebGLRenderer: THREE.WebGLRenderer, scene, camera: new THREE.PerspectiveCamera(), transport: pair.guest, canvas: shadowCanvas })
    guest.start()
    pair.flush()
    deck.frame()
    pair.flush() // the first frame (never re-run)
    deck.frame()
    pair.flush() // the frame for A, undrained
    // A pan and a zoom in: the line moves and gets longer, its width doesn't.
    viewport = makeGlobe({ longitude: 4, latitude: 2, zoom: 0.55, pitch: 0, bearing: 0 })
    deck.frame() // A's frame, composed at B
    const lagged = host.read()
    const corrected = layer.lastReprojection?.correction !== null
    pair.flush() // the guest's own frame for B
    deck.frame()
    const truth = host.read()
    const rs = layer.receiver!.replay.reprojectStats
    layer.detach()
    guest.stop()
    return { lagged, truth, corrected, rs }
  }

  const magenta = (px: Uint8Array, i: number): boolean => px[i] === 255 && px[i + 1] === 0 && px[i + 2] === 255
  const compare = (a: Uint8Array, b: Uint8Array) => {
    let onA = 0, onB = 0, both = 0
    for (let i = 0; i < a.length; i += 4) {
      const x = magenta(a, i)
      const y = magenta(b, i)
      onA += x ? 1 : 0
      onB += y ? 1 : 0
      both += x && y ? 1 : 0
    }
    return { onA, onB, both, differ: onA + onB - 2 * both }
  }
  // The line's width across, in pixels: the run of line pixels in the
  // middle column, measured perpendicular to the line by its slope.
  const columnRun = (px: Uint8Array): number => {
    const x = W / 2
    let n = 0
    for (let y = 0; y < H; y += 1) if (magenta(px, (y * W + x) * 4)) n += 1
    return n
  }

  it('opted in: the shader is left unwrapped, gets C, and its frame composed at the new view matches the guest\'s own', async () => {
    const { lagged, truth, corrected, rs } = await run(true)
    expect(corrected).toBe(true)
    expect(rs.optIn).toBeGreaterThan(0)
    // The guest's own identity was dropped, not drawn with.
    expect(rs.guestSetsDropped).toBeGreaterThan(0)
    const c = compare(lagged, truth)
    expect(c.onB).toBeGreaterThan(40)
    // Same pixels to within the edges' rounding, and the same width.
    expect(c.differ).toBeLessThanOrEqual(Math.ceil(c.onB * 0.03))
    expect(Math.abs(columnRun(lagged) - columnRun(truth))).toBeLessThanOrEqual(1)
  })

  it('control: wrapped, C after the extrusion scales the width', async () => {
    const { lagged, truth, corrected, rs } = await run(false)
    expect(corrected).toBe(true)
    expect(rs.optIn).toBe(0)
    const c = compare(lagged, truth)
    // Centred right but too wide (C's zoom applied to the pixel offset too).
    expect(columnRun(lagged)).toBeGreaterThan(columnRun(truth))
    expect(c.differ).toBeGreaterThan(Math.ceil(c.onB * 0.03))
  })
})
