// The tracked scalar-state checkpoint (`makeScalarStateTracker`) against
// the query checkpoint it replaces, on a real headless-gl WebGL2 context.
//
// Contract:
//   1. After any sequence of state calls through the recorder, the tracked
//      checkpoint emits the same calls, with the same args, in the same
//      order as the query checkpoint (getParameter / isEnabled /
//      getVertexAttrib on the shadow).
//   2. Taking it makes no synchronous queries on the shadow.
//   3. Where GL clamps or converts (depthRange, stencil masks, float32
//      colours), the args may differ, but replaying them on a receiver
//      leaves it in the shadow's state.

import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import gl from 'gl'
import * as THREE from 'three'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import type { NetGLCall, NetGLEncodedValue } from './messages'
import { captureCheckpoint, makeBindingTracker } from './checkpoint'
import { makeNetGLRecorderSession } from './recorder'
import { makeNetGLReplay } from './replay'

const W = 32
const H = 32

const QUERIES = new Set(['getParameter', 'isEnabled', 'getVertexAttrib'])

// Every context a test makes, freed after it: headless-gl contexts hold
// native GL resources until destroyed, and other suites share the display.
const contexts: WebGL2RenderingContext[] = []
afterEach(() => {
  for (const c of contexts.splice(0)) {
    ;(c.getExtension('STACKGL_destroy_context') as { destroy(): void } | null)?.destroy()
  }
})

const makeCtx = (): WebGL2RenderingContext => {
  const ctx = gl(W, H, {
    antialias: false,
    stencil: true,
    depth: true,
    preserveDrawingBuffer: false,
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  contexts.push(ctx)
  return ctx
}

type Counted = { ctx: WebGL2RenderingContext; queries: { n: number }; canvas: EventTarget }

// The shadow as the recorder sees it, counting synchronous state queries.
// `canvas` stands in for the shadow's canvas (headless-gl has none), so the
// tests can fire context-loss events at it.
const counted = (raw: WebGL2RenderingContext): Counted => {
  const queries = { n: 0 }
  const canvas = Object.assign(new EventTarget(), { width: W, height: H })
  const ctx = new Proxy(raw, {
    get(target, prop) {
      if (prop === 'canvas') return canvas
      const value = Reflect.get(target, prop)
      if (typeof value !== 'function') return value
      return (...args: unknown[]): unknown => {
        if (QUERIES.has(prop as string)) queries.n += 1
        return (value as (...a: unknown[]) => unknown).apply(target, args)
      }
    }
  }) as WebGL2RenderingContext
  return { ctx, queries, canvas }
}

// Plain-value encoder for checkpoints taken outside a session (no handles
// in the scalar part).
const plain = (v: unknown): NetGLEncodedValue =>
  v == null ? null : Array.isArray(v) ? v.map(plain) : ArrayBuffer.isView(v) ? Array.from(v as unknown as ArrayLike<number>) : (v as NetGLEncodedValue)

// The scalar part of a checkpoint: from the first cap call on (the binding
// part never emits enable / disable).
const scalarPart = (calls: NetGLCall[]): NetGLCall[] => {
  const i = calls.findIndex((c) => c.name === 'enable' || c.name === 'disable')
  expect(i).toBeGreaterThanOrEqual(0)
  return calls.slice(i).map((c) => ({ name: c.name, args: c.args.map(plain) }))
}

const queryCheckpoint = (raw: WebGL2RenderingContext): NetGLCall[] =>
  scalarPart(captureCheckpoint(raw, makeBindingTracker(), plain))

type Rig = {
  raw: WebGL2RenderingContext
  gl: WebGL2RenderingContext
  queries: { n: number }
  canvas: EventTarget
  /** The session's tracked checkpoint, and how many queries it made. */
  tracked(): { calls: NetGLCall[]; queries: number }
}

const rig = (): Rig => {
  const raw = makeCtx()
  const { ctx, queries, canvas } = counted(raw)
  let out: NetGLCall[] = []
  const session = makeNetGLRecorderSession(ctx, (c) => out.push(structuredClone(c)))
  return {
    raw,
    gl: session.gl,
    queries,
    canvas,
    tracked() {
      out = []
      const before = queries.n
      session.checkpoint()
      return { calls: scalarPart(out), queries: queries.n - before }
    }
  }
}

const expectSameAsQuery = (r: Rig): void => {
  const { calls, queries } = r.tracked()
  expect(queries).toBe(0)
  expect(calls).toEqual(queryCheckpoint(r.raw))
}

// Replay `calls` onto a receiver the host has scribbled on, and read its
// state back with the query checkpoint. (No integer attribs through here:
// headless-gl's vertexAttribI4iv crashes on a plain array, which a
// browser's accepts.)
const replayedState = (calls: NetGLCall[]): NetGLCall[] => {
  const receiver = makeCtx()
  receiver.enable(receiver.BLEND)
  receiver.blendColor(0, 0, 0, 0)
  receiver.stencilFunc(receiver.NEVER, 0, 0)
  receiver.colorMask(false, true, false, true)
  receiver.viewport(1, 1, 2, 2)
  receiver.vertexAttrib4f(1, 9, 9, 9, 9)
  const replay = makeNetGLReplay(receiver)
  for (const c of calls) replay(c)
  return queryCheckpoint(receiver)
}

describe('ScalarStateTracker: the tracked checkpoint equals the query checkpoint', () => {
  beforeAll(() => {
    const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
    const g = globalThis as unknown as { window?: unknown; document?: unknown; self?: unknown; URL?: unknown }
    if (!g.window) g.window = dom.window
    if (!g.document) g.document = dom.window.document
    if (!g.self) g.self = dom.window
    if (!g.URL) g.URL = url.URL
  })

  it('at GL defaults, with no queries', () => {
    expectSameAsQuery(rig())
  })

  it('caps, including enable / disable of an enum it does not track', () => {
    const r = rig()
    const g = r.gl
    g.enable(g.BLEND)
    g.enable(g.CULL_FACE)
    g.enable(g.DEPTH_TEST)
    g.disable(g.DITHER)
    g.enable(g.POLYGON_OFFSET_FILL)
    g.enable(g.SAMPLE_ALPHA_TO_COVERAGE)
    g.enable(g.SCISSOR_TEST)
    g.enable(g.STENCIL_TEST)
    g.enable(g.RASTERIZER_DISCARD)
    g.disable(g.RASTERIZER_DISCARD)
    // Not a cap the checkpoint restores (PRIMITIVE_RESTART_FIXED_INDEX is
    // always on in WebGL2, and enable() of it is INVALID_ENUM).
    g.enable(0x8d69)
    g.disable(0x8d69)
    expectSameAsQuery(r)
  })

  it('blendFunc after blendFuncSeparate, and the reverse', () => {
    const r = rig()
    const g = r.gl
    g.blendFuncSeparate(g.SRC_ALPHA, g.ONE_MINUS_SRC_ALPHA, g.ONE, g.ZERO)
    expectSameAsQuery(r)
    g.blendFunc(g.DST_COLOR, g.ONE)
    expectSameAsQuery(r)
    g.blendFuncSeparate(g.CONSTANT_COLOR, g.ONE_MINUS_CONSTANT_COLOR, g.CONSTANT_ALPHA, g.ONE_MINUS_CONSTANT_ALPHA)
    expectSameAsQuery(r)
    // WebGL rejects a constant colour with a constant alpha (no change).
    g.blendFunc(g.CONSTANT_COLOR, g.CONSTANT_ALPHA)
    g.blendFuncSeparate(g.ONE_MINUS_CONSTANT_ALPHA, g.CONSTANT_COLOR, g.ONE, g.ONE)
    expectSameAsQuery(r)
  })

  it('blend equation and colour, colour mask as numbers', () => {
    const r = rig()
    const g = r.gl
    g.blendEquation(g.FUNC_SUBTRACT)
    expectSameAsQuery(r)
    g.blendEquationSeparate(g.FUNC_REVERSE_SUBTRACT, g.FUNC_ADD)
    g.blendColor(0.25, 0.5, 0.3, 1)
    // GLboolean args as numbers: the query answers booleans.
    ;(g.colorMask as (...a: unknown[]) => void)(1, 0, true, 0)
    expectSameAsQuery(r)
  })

  // headless-gl's WebGL2 sits on its WebGL1 validation and rejects MIN /
  // MAX and the derivative hint, core in a browser's WebGL2 (and it can't
  // turn their WebGL1 extensions on in a WebGL2 context). So: the calls.
  it('MIN / MAX blend equations and the derivative hint', () => {
    const r = rig()
    const g = r.gl
    g.blendEquationSeparate(g.MIN, g.MAX)
    g.hint(g.FRAGMENT_SHADER_DERIVATIVE_HINT, g.NICEST)
    const { calls } = r.tracked()
    expect(calls).toContainEqual({ name: 'blendEquationSeparate', args: [g.MIN, g.MAX] })
    expect(calls).toContainEqual({ name: 'hint', args: [g.FRAGMENT_SHADER_DERIVATIVE_HINT, g.NICEST] })
  })

  it('depth, clear values, rasterisation', () => {
    const r = rig()
    const g = r.gl
    g.clearColor(0.5, 0.25, 0, 1)
    g.clearDepth(0.5)
    g.clearStencil(3)
    g.cullFace(g.FRONT_AND_BACK)
    g.frontFace(g.CW)
    g.depthFunc(g.GEQUAL)
    ;(g.depthMask as (v: unknown) => void)(0)
    g.depthRange(0.25, 0.75)
    g.lineWidth(1)
    g.polygonOffset(1.5, 2)
    ;(g.sampleCoverage as (v: number, i: unknown) => void)(0.5, 1)
    g.hint(g.GENERATE_MIPMAP_HINT, g.NICEST)
    expectSameAsQuery(r)
    // Rejected by GL, so not tracked.
    g.depthRange(0.9, 0.1)
    g.lineWidth(0)
    g.lineWidth(-1)
    expectSameAsQuery(r)
  })

  it('separate-face stencil', () => {
    const r = rig()
    const g = r.gl
    g.stencilFunc(g.EQUAL, 1, 0xff)
    g.stencilOp(g.KEEP, g.REPLACE, g.INCR)
    g.stencilMask(0xff)
    expectSameAsQuery(r)
    g.stencilFuncSeparate(g.BACK, g.NOTEQUAL, 2, 0x0f)
    g.stencilOpSeparate(g.FRONT, g.ZERO, g.INVERT, g.DECR_WRAP)
    g.stencilMaskSeparate(g.BACK, 0x0f)
    expectSameAsQuery(r)
    g.stencilFuncSeparate(g.FRONT_AND_BACK, g.LESS, 4, 0x3f)
    g.stencilOpSeparate(g.BACK, g.INCR_WRAP, g.DECR, g.KEEP)
    g.stencilMaskSeparate(g.FRONT, 0x07)
    expectSameAsQuery(r)
    // A bad face changes nothing.
    g.stencilMaskSeparate(g.TEXTURE_2D, 0x01)
    expectSameAsQuery(r)
  })

  it('pixelStorei, booleans as booleans and numbers, invalid values rejected', () => {
    const r = rig()
    const g = r.gl
    g.pixelStorei(g.UNPACK_ALIGNMENT, 1)
    g.pixelStorei(g.PACK_ALIGNMENT, 2)
    ;(g.pixelStorei as (p: number, v: unknown) => void)(g.UNPACK_FLIP_Y_WEBGL, true)
    g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 2)
    g.pixelStorei(g.UNPACK_COLORSPACE_CONVERSION_WEBGL, g.NONE)
    g.pixelStorei(g.UNPACK_ROW_LENGTH, 16)
    g.pixelStorei(g.UNPACK_IMAGE_HEIGHT, 4)
    g.pixelStorei(g.UNPACK_SKIP_ROWS, 2)
    g.pixelStorei(g.UNPACK_SKIP_PIXELS, 1)
    g.pixelStorei(g.UNPACK_SKIP_IMAGES, 1)
    g.pixelStorei(g.PACK_ROW_LENGTH, 8)
    g.pixelStorei(g.PACK_SKIP_ROWS, 1)
    g.pixelStorei(g.PACK_SKIP_PIXELS, 3)
    expectSameAsQuery(r)
    ;(g.pixelStorei as (p: number, v: unknown) => void)(g.UNPACK_FLIP_Y_WEBGL, false)
    g.pixelStorei(g.UNPACK_ALIGNMENT, 3)
    g.pixelStorei(g.UNPACK_ROW_LENGTH, -1)
    g.pixelStorei(g.UNPACK_COLORSPACE_CONVERSION_WEBGL, 5)
    expectSameAsQuery(r)
  })

  it('every float vertexAttrib form', () => {
    const r = rig()
    const g = r.gl
    g.vertexAttrib1f(0, 0.5)
    g.vertexAttrib2f(1, 0.5, 0.3)
    g.vertexAttrib3f(2, 0.5, 0.25, 0.1)
    g.vertexAttrib4f(3, 0.5, 0.25, 0.125, 2)
    g.vertexAttrib1fv(4, new Float32Array([3]))
    g.vertexAttrib2fv(5, [3, 4])
    g.vertexAttrib3fv(6, new Float32Array([3, 4, 5]))
    g.vertexAttrib4fv(7, [3, 4, 5, 6])
    expectSameAsQuery(r)
    // Rejected: an index out of range, an array too short.
    g.vertexAttrib4f(g.getParameter(g.MAX_VERTEX_ATTRIBS) as number, 1, 1, 1, 1)
    g.vertexAttrib4fv(0, [1, 2])
    expectSameAsQuery(r)
  })

  // headless-gl's getVertexAttrib answers every CURRENT_VERTEX_ATTRIB from
  // its float-only JS mirror, so integer attribs can't be checked against
  // the query path here. A browser's WebGL2 answers Int32Array /
  // Uint32Array, which the seed reads into vertexAttribI4iv / I4uiv, the
  // calls checked below.
  it('integer vertexAttribs, and a float form over an integer one', () => {
    const r = rig()
    const g = r.gl
    g.vertexAttribI4i(8, -1, 2.7, -3, 4)
    g.vertexAttribI4iv(9, new Int32Array([-5, 6, -7, 8]))
    g.vertexAttribI4ui(10, 1, 2, 3, -1)
    g.vertexAttribI4uiv(11, new Uint32Array([5, 6, 7, 0xffffffff]))
    g.vertexAttribI4i(12, 1, 1, 1, 1)
    g.vertexAttrib2f(12, 0.5, 0.25)
    const { calls, queries } = r.tracked()
    expect(queries).toBe(0)
    expect(calls).toContainEqual({ name: 'vertexAttribI4iv', args: [8, [-1, 2, -3, 4]] })
    expect(calls).toContainEqual({ name: 'vertexAttribI4iv', args: [9, [-5, 6, -7, 8]] })
    expect(calls).toContainEqual({ name: 'vertexAttribI4uiv', args: [10, [1, 2, 3, 0xffffffff]] })
    expect(calls).toContainEqual({ name: 'vertexAttribI4uiv', args: [11, [5, 6, 7, 0xffffffff]] })
    expect(calls).toContainEqual({ name: 'vertexAttrib4fv', args: [12, [0.5, 0.25, 0, 1]] })
    // One call per index, in index order, as the query path emits them.
    const indices = calls.filter((c) => c.name.startsWith('vertexAttrib')).map((c) => c.args[0])
    expect(indices).toEqual([...indices.keys()])
  })

  it('viewport and scissor, negative sizes rejected', () => {
    const r = rig()
    const g = r.gl
    g.scissor(1, 2, 3, 4)
    g.viewport(5, 6, 7, 8)
    expectSameAsQuery(r)
    g.viewport(0, 0, -1, 4)
    g.scissor(0, 0, 4, -1)
    expectSameAsQuery(r)
  })

  it('a three.js frame', () => {
    const r = rig()
    const renderer = new THREE.WebGLRenderer({ context: r.gl, antialias: false, stencil: true, depth: true })
    renderer.setSize(W, H, false)
    const data = new Uint8Array([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 255, 255])
    const tex = new THREE.DataTexture(data, 2, 2, THREE.RGBAFormat)
    tex.needsUpdate = true
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#203040')
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ map: tex })))
    scene.add(
      new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
      )
    )
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(1.5, 1, 2)
    camera.lookAt(0, 0, 0)
    renderer.render(scene, camera)
    // headless-gl answers STENCIL_WRITEMASK 0xffffffff as 0x7fffffff and
    // three's clear colour comes back float32, so compare what the
    // checkpoints do rather than their args.
    const { calls, queries } = r.tracked()
    expect(queries).toBe(0)
    expect(replayedState(calls)).toEqual(queryCheckpoint(r.raw))
  })
})

describe('ScalarStateTracker: replaying the tracked checkpoint restores the shadow state', () => {
  it('including values GL clamps or converts', () => {
    const r = rig()
    const g = r.gl
    g.enable(g.STENCIL_TEST)
    g.blendColor(2, -1, 0.3, 0.7)
    g.clearColor(0.1, 0.2, 0.3, 0.4)
    g.depthRange(-1, 2)
    ;(g.sampleCoverage as (v: number, i: unknown) => void)(1.5, 'yes')
    g.clearDepth(3)
    g.stencilFunc(g.ALWAYS, 300, -1)
    g.stencilMaskSeparate(g.FRONT, -1)

    const { calls } = r.tracked()
    expect(replayedState(calls)).toEqual(queryCheckpoint(r.raw))
  })
})

describe('ScalarStateTracker: context loss', () => {
  it('reseeds from the shadow when its context is restored', () => {
    const r = rig()
    r.gl.enable(r.gl.CULL_FACE)
    r.gl.viewport(1, 2, 3, 4)
    // Stand in for a restore's reset to defaults (and anything else that
    // changes the shadow behind the recorder): set state on it directly.
    r.raw.disable(r.raw.CULL_FACE)
    r.raw.enable(r.raw.BLEND)
    r.raw.viewport(0, 0, W, H)
    expect(r.tracked().calls).not.toEqual(queryCheckpoint(r.raw))

    r.canvas.dispatchEvent(new Event('webglcontextlost'))
    // Calls on a lost context are no-ops: not tracked.
    r.gl.enable(r.gl.DEPTH_TEST)
    expect(r.tracked().calls).toContainEqual({ name: 'disable', args: [r.raw.DEPTH_TEST] })
    r.raw.disable(r.raw.DEPTH_TEST)
    r.canvas.dispatchEvent(new Event('webglcontextrestored'))
    expectSameAsQuery(r)

    // Tracking resumes after the restore.
    r.gl.enable(r.gl.SCISSOR_TEST)
    expectSameAsQuery(r)
  })
})

describe('recorder sessions', () => {
  it("scalarState: 'queried' keeps the query checkpoint", () => {
    const raw = makeCtx()
    const { ctx, queries } = counted(raw)
    const out: NetGLCall[] = []
    const session = makeNetGLRecorderSession(ctx, (c) => out.push(structuredClone(c)), { scalarState: 'queried' })
    // No seed for a session that queries.
    expect(queries.n).toBe(0)
    session.gl.enable(session.gl.BLEND)
    out.length = 0
    session.checkpoint()
    expect(queries.n).toBeGreaterThan(50)
    expect(scalarPart(out)).toEqual(queryCheckpoint(raw))
  })
})
