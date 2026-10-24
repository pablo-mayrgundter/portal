// Host reprojection: the vertex-shader rewrite (GLSL ES 1.00 and 3.00, and
// that both compile), the correction C = VP_now · VP_f⁻¹ (identity for an
// unchanged view; a world point drawn for the old view lands where the new
// view puts it), and the replay's uniform handling on a mock context.

import { describe, it, expect } from 'vitest'
import gl from 'gl'
import { _GlobeViewport as GlobeViewport } from '@deck.gl/core'
import { globeLayerView, type DeckViewportLike } from './frameworks/luma'
import { mat4Multiply, mat4TransformVec4, projectToPixels, sphereToEcef, type NetGLLayerView } from './layer-view'
import type { NetGLCall } from './messages'
import { makeNetGLReplay } from './replay'
import { NETGL_REPROJECT_UNIFORM, declaresReprojection, isIdentity, mat4Invert, reprojectVertexShader, reprojection } from './reproject'

const VS_100 = `precision mediump float;
attribute vec3 position;
uniform mat4 mvp;
// main() is where it happens
void main(void) {
  gl_Position = mvp * vec4(position, 1.0);
  gl_PointSize = 3.0;
}`

const VS_300 = `#version 300 es
#define USE_THING 1
precision highp float;
in vec3 position;
uniform mat4 mvp;
void main();
#ifdef USE_THING
void main() { gl_Position = mvp * vec4(position, 1.0); }
#else
void main() { gl_Position = vec4(0.0); }
#endif`

describe('reprojectVertexShader', () => {
  it('GLSL ES 1.00: renames main, appends the uniform and a new main', () => {
    const out = reprojectVertexShader(VS_100)!
    expect(out).not.toBeNull()
    expect(out.startsWith('precision mediump float;')).toBe(true)
    expect(out).toContain('void netgl_main(void) {')
    expect(out).toContain(`uniform highp mat4 ${NETGL_REPROJECT_UNIFORM};`)
    expect(out).toMatch(/void main\(\) \{\n\s+netgl_main\(\);/)
    expect(out).toContain(`gl_Position = ${NETGL_REPROJECT_UNIFORM} * netgl_p;`)
    // Exactly one main left: the wrapper's.
    expect(out.match(/\bmain\s*\(/g)).toHaveLength(1)
  })

  it('GLSL ES 3.00: #version stays first; prototypes and preprocessor branches are renamed', () => {
    const out = reprojectVertexShader(VS_300)!
    expect(out.startsWith('#version 300 es\n')).toBe(true)
    expect(out).toContain('void netgl_main();')
    expect(out.match(/void netgl_main\(\) \{/g)).toHaveLength(2)
    expect(out.match(/\bmain\s*\(/g)).toHaveLength(1)
    // The #endif is closed before the wrapper starts.
    expect(out.indexOf('#endif')).toBeLessThan(out.indexOf(`uniform highp mat4 ${NETGL_REPROJECT_UNIFORM}`))
  })

  it('leaves alone a source without main, one whose main is only in a comment, and one already rewritten', () => {
    expect(reprojectVertexShader('float f(float x) { return x; }')).toBeNull()
    expect(reprojectVertexShader('// void main() {}\nfloat f() { return 1.0; }')).toBeNull()
    expect(reprojectVertexShader(reprojectVertexShader(VS_100)!)).toBeNull()
    // `domain(` isn't main.
    expect(reprojectVertexShader('float domain(float x) { return x; }\nvoid main() { gl_Position = vec4(domain(1.0)); }')).toContain('domain(1.0)')
  })

  it('both rewrites compile and link on a real GL (headless-gl)', () => {
    const ctx = gl(4, 4, { createWebGL2Context: true } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
    if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
    const fs100 = 'precision mediump float;\nvoid main() { gl_FragColor = vec4(1.0); }'
    const fs300 = '#version 300 es\nprecision mediump float;\nout vec4 c;\nvoid main() { c = vec4(1.0); }'
    for (const [vs, fs] of [[VS_100, fs100], [VS_300, fs300]]) {
      const v = ctx.createShader(ctx.VERTEX_SHADER)!
      ctx.shaderSource(v, reprojectVertexShader(vs)!)
      ctx.compileShader(v)
      expect(ctx.getShaderParameter(v, ctx.COMPILE_STATUS), ctx.getShaderInfoLog(v) ?? '').toBe(true)
      const f = ctx.createShader(ctx.FRAGMENT_SHADER)!
      ctx.shaderSource(f, fs)
      ctx.compileShader(f)
      const p = ctx.createProgram()!
      ctx.attachShader(p, v)
      ctx.attachShader(p, f)
      ctx.linkProgram(p)
      expect(ctx.getProgramParameter(p, ctx.LINK_STATUS), ctx.getProgramInfoLog(p) ?? '').toBe(true)
      expect(ctx.getUniformLocation(p, NETGL_REPROJECT_UNIFORM)).not.toBeNull()
    }
  })
})

const W = 800
const H = 500
const globe = (props: Record<string, number>): DeckViewportLike =>
  new GlobeViewport({ width: W, height: H, longitude: -40, latitude: 25, zoom: 1.2, pitch: 0, bearing: 0, ...props }) as unknown as DeckViewportLike
const viewOf = (props: Record<string, number>): NetGLLayerView =>
  globeLayerView(globe(props), { timeMs: 0, drawingBufferWidth: W, drawingBufferHeight: H })!

const toPixels = (view: NetGLLayerView, clip: number[]): [number, number, number] => {
  const [vx, vy, vw, vh] = view.viewport
  return [vx + ((clip[0] / clip[3] + 1) / 2) * vw, vy + ((clip[1] / clip[3] + 1) / 2) * vh, clip[2] / clip[3]]
}

describe('reprojection — C = VP_now · VP_frame⁻¹', () => {
  it('is the identity when the view is unchanged', () => {
    const a = viewOf({})
    const b = viewOf({})
    const c = reprojection(a, b)!
    expect(isIdentity(c)).toBe(true)
    expect(isIdentity(reprojection(a, a)!)).toBe(true)
  })

  it('a world point drawn for the old view, corrected, lands where the new view puts it', () => {
    const R = 6370972
    const moves: Array<Record<string, number>> = [
      { longitude: -38.5, latitude: 25.4 }, // a pan
      { zoom: 1.5 }, // a zoom: deck's near and far move too
      { zoom: 0.9, pitch: 30, bearing: 20, longitude: -42 } // all at once
    ]
    const from = viewOf({})
    const VPf = mat4Multiply(from.projectionMatrix, from.viewMatrix)
    for (const move of moves) {
      const to = viewOf(move)
      const C = reprojection(from, to)!
      expect(isIdentity(C)).toBe(false)
      const VPn = mat4Multiply(to.projectionMatrix, to.viewMatrix)
      for (const [lng, lat, alt] of [[-40, 25, 0], [-30, 30, 5.5e5], [-55, 10, 2e7], [-41, 24, 3.6e7]]) {
        const p = [...sphereToEcef(lng, lat, alt, R), 1]
        const old = mat4TransformVec4(VPf, p)
        const corrected = toPixels(to, mat4TransformVec4(C, old))
        const want = projectToPixels(to, p)
        expect(corrected[0]).toBeCloseTo(want[0], 6)
        expect(corrected[1]).toBeCloseTo(want[1], 6)
        expect(corrected[2]).toBeCloseTo(want[2], 9)
        // The homogeneous clip coordinates agree too (so clipping does).
        const direct = mat4TransformVec4(VPn, p)
        const viaC = mat4TransformVec4(C, old)
        for (let i = 0; i < 4; i += 1) expect(viaC[i]).toBeCloseTo(direct[i], 6 - Math.max(0, Math.round(Math.log10(Math.abs(direct[i]) + 1))))
      }
    }
  })

  it('also holds in float32, as the GPU applies it, to well under a pixel', () => {
    const from = viewOf({})
    const to = viewOf({ longitude: -39, zoom: 1.3 })
    const C32 = Float32Array.from(reprojection(from, to)!)
    const VPf = mat4Multiply(from.projectionMatrix, from.viewMatrix)
    const p = [...sphereToEcef(-35, 28, 5.5e5, 6370972), 1]
    const old = Float32Array.from(mat4TransformVec4(VPf, p))
    const got = toPixels(to, mat4TransformVec4(C32, Array.from(old)))
    const want = projectToPixels(to, p)
    expect(Math.hypot(got[0] - want[0], got[1] - want[1])).toBeLessThan(0.01)
  })

  it('mat4Invert inverts a projection and returns null for a singular matrix', () => {
    const v = viewOf({})
    const inv = mat4Invert(v.projectionMatrix)!
    const id = mat4Multiply(v.projectionMatrix, inv)
    for (let i = 0; i < 16; i += 1) expect(id[i]).toBeCloseTo(i % 5 === 0 ? 1 : 0, 9)
    expect(mat4Invert(new Array(16).fill(0))).toBeNull()
  })
})

// --- The replay's side, on a recording mock context -----------------------

type Logged = { name: string; args: unknown[] }
const mockGl = (opts: { compiles?: boolean } = {}): { gl: WebGL2RenderingContext; log: Logged[] } => {
  const log: Logged[] = []
  let n = 0
  const gl = new Proxy(
    {},
    {
      get(_t, prop: string) {
        return (...args: unknown[]) => {
          log.push({ name: prop, args })
          if (prop.startsWith('create')) return { id: ++n, kind: prop }
          if (prop === 'getUniformLocation') return args[1] === NETGL_REPROJECT_UNIFORM ? { loc: 'netgl' } : { loc: args[1] }
          if (prop === 'getShaderParameter') return opts.compiles ?? true
          return undefined
        }
      }
    }
  ) as unknown as WebGL2RenderingContext
  return { gl, log }
}

const VERTEX = 0x8b31
const FRAGMENT = 0x8b30
const h = (id: number) => ({ __netgl_handle: id })

// A guest's program set-up, then two draws: one to the screen, one into
// its own framebuffer.
const setup: NetGLCall[] = [
  { name: 'createShader', args: [VERTEX], returnId: 1 },
  { name: 'shaderSource', args: [h(1), VS_100] },
  { name: 'compileShader', args: [h(1)] },
  { name: 'createShader', args: [FRAGMENT], returnId: 2 },
  { name: 'shaderSource', args: [h(2), 'void main() { gl_FragColor = vec4(1.0); }'] },
  { name: 'compileShader', args: [h(2)] },
  { name: 'createProgram', args: [], returnId: 3 },
  { name: 'attachShader', args: [h(3), h(1)] },
  { name: 'attachShader', args: [h(3), h(2)] },
  { name: 'linkProgram', args: [h(3)] },
  { name: 'createFramebuffer', args: [], returnId: 4 }
]
const draws: NetGLCall[] = [
  { name: 'useProgram', args: [h(3)] },
  { name: 'drawArrays', args: [0, 0, 3] },
  { name: 'bindFramebuffer', args: [0x8d40, h(4)] },
  { name: 'drawArrays', args: [0, 0, 3] },
  { name: 'bindFramebuffer', args: [0x8d40, null] },
  { name: 'drawArrays', args: [0, 0, 3] }
]

describe('makeNetGLReplay({ reproject: true })', () => {
  const C = [1.01, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.02, -0.01, 0, 1]

  it('rewrites vertex shaders only, and gives screen draws C and the guest\'s own targets the identity', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of setup) replay(c)
    const sources = log.filter((l) => l.name === 'shaderSource').map((l) => l.args[1] as string)
    expect(sources[0]).toContain(NETGL_REPROJECT_UNIFORM)
    expect(sources[1]).not.toContain(NETGL_REPROJECT_UNIFORM)
    replay.setReprojection(C)
    log.length = 0
    for (const c of draws) replay(c)
    const sets = log.filter((l) => l.name === 'uniformMatrix4fv').map((l) => Array.from(l.args[2] as Float32Array))
    // Screen: C; RT: identity; screen again: C.
    expect(sets).toHaveLength(3)
    expect(sets[0]).toEqual(Array.from(Float32Array.from(C)))
    expect(isIdentity(sets[1])).toBe(true)
    expect(sets[2]).toEqual(Array.from(Float32Array.from(C)))
    // The uniform is set before its draw, with the program in use.
    const names = log.map((l) => l.name)
    expect(names.indexOf('uniformMatrix4fv')).toBeLessThan(names.indexOf('drawArrays'))
    expect(replay.reprojectStats).toMatchObject({ shaders: 1, skipped: 0, fallbacks: 0, correctedDraws: 2 })
  })

  it('sets nothing again while the correction is unchanged, and the identity after null', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of setup) replay(c)
    replay.setReprojection(C)
    replay(draws[0])
    replay(draws[1])
    replay(draws[1])
    expect(log.filter((l) => l.name === 'uniformMatrix4fv')).toHaveLength(1)
    replay.setReprojection(null)
    replay(draws[1])
    const sets = log.filter((l) => l.name === 'uniformMatrix4fv')
    expect(sets).toHaveLength(2)
    expect(isIdentity(Array.from(sets[1].args[2] as Float32Array))).toBe(true)
  })

  it('a rewrite that doesn\'t compile goes back to the guest\'s source', () => {
    const { gl, log } = mockGl({ compiles: false })
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of setup) replay(c)
    const sources = log.filter((l) => l.name === 'shaderSource').map((l) => l.args[1] as string)
    expect(sources).toHaveLength(3)
    expect(sources[0]).toContain(NETGL_REPROJECT_UNIFORM)
    expect(sources[1]).toBe(VS_100)
    replay.setReprojection(C)
    log.length = 0
    for (const c of draws) replay(c)
    expect(log.filter((l) => l.name === 'uniformMatrix4fv')).toHaveLength(0)
    expect(replay.reprojectStats.fallbacks).toBe(1)
  })

  it('off by default: sources pass through and no uniform is set', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl)
    for (const c of setup) replay(c)
    replay.setReprojection(C)
    for (const c of draws) replay(c)
    expect(log.filter((l) => l.name === 'shaderSource').map((l) => l.args[1])).toEqual([VS_100, 'void main() { gl_FragColor = vec4(1.0); }'])
    expect(log.filter((l) => l.name === 'uniformMatrix4fv' || l.name === 'getShaderParameter')).toHaveLength(0)
  })
})

// --- The opt-in convention ------------------------------------------------

const VS_OPT_IN = `uniform highp mat4 netgl_reproject;
uniform mat4 mvp;
attribute vec3 position;
attribute vec3 aEnd;
void main() {
  vec4 a = netgl_reproject * (mvp * vec4(position, 1.0));
  vec4 b = netgl_reproject * (mvp * vec4(aEnd, 1.0));
  gl_Position = a + vec4(normalize(b.xy - a.xy) * 0.01 * a.w, 0.0, 0.0);
}`

describe('declaresReprojection — a guest that applies netgl_reproject itself', () => {
  it('recognises the declaration, with or without a precision, and not in a comment or another name', () => {
    expect(declaresReprojection(VS_OPT_IN)).toBe(true)
    expect(declaresReprojection('uniform mat4 netgl_reproject;\nvoid main() {}')).toBe(true)
    expect(declaresReprojection('uniform  mediump  mat4  netgl_reproject ;')).toBe(true)
    expect(declaresReprojection('// uniform mat4 netgl_reproject;\nvoid main() {}')).toBe(false)
    expect(declaresReprojection('uniform mat4 netgl_reproject2;')).toBe(false)
    expect(declaresReprojection(VS_100)).toBe(false)
    expect(reprojectVertexShader(VS_OPT_IN)).toBeNull()
  })
})

describe('makeNetGLReplay({ reproject: true }) — opted-in shaders', () => {
  const C = [1.01, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.02, -0.01, 0, 1]
  const optInSetup: NetGLCall[] = [
    { name: 'createShader', args: [VERTEX], returnId: 11 },
    { name: 'shaderSource', args: [h(11), VS_OPT_IN] },
    { name: 'compileShader', args: [h(11)] },
    { name: 'createShader', args: [FRAGMENT], returnId: 12 },
    { name: 'shaderSource', args: [h(12), 'void main() { gl_FragColor = vec4(1.0); }'] },
    { name: 'compileShader', args: [h(12)] },
    { name: 'createProgram', args: [], returnId: 13 },
    { name: 'attachShader', args: [h(13), h(11)] },
    { name: 'attachShader', args: [h(13), h(12)] },
    { name: 'linkProgram', args: [h(13)] },
    // The guest's own lookup and its identity (three's Matrix4 default).
    { name: 'getUniformLocation', args: [h(13), NETGL_REPROJECT_UNIFORM], returnId: 14 }
  ]
  const guestIdentity: NetGLCall = { name: 'uniformMatrix4fv', args: [h(14), false, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]] }
  const optInDraw: NetGLCall[] = [{ name: 'useProgram', args: [h(13)] }, guestIdentity, { name: 'drawArrays', args: [0, 0, 6] }]

  it('is left unwrapped, gets C before its screen draws, and the guest\'s own set is dropped', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of optInSetup) replay(c)
    expect(log.filter((l) => l.name === 'shaderSource').map((l) => l.args[1])[0]).toBe(VS_OPT_IN)
    // No compile check for a source the replay didn't change.
    expect(log.filter((l) => l.name === 'getShaderParameter')).toHaveLength(0)
    replay.setReprojection(C)
    log.length = 0
    for (const c of optInDraw) replay(c)
    const sets = log.filter((l) => l.name === 'uniformMatrix4fv')
    expect(sets).toHaveLength(1)
    expect(sets[0].args[0]).toEqual({ loc: 'netgl' }) // the replay's own lookup
    expect(Array.from(sets[0].args[2] as Float32Array)).toEqual(Array.from(Float32Array.from(C)))
    expect(replay.reprojectStats).toMatchObject({ shaders: 0, optIn: 1, guestSetsDropped: 1, correctedDraws: 1 })
  })

  it('gets the identity when there is no correction', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of optInSetup) replay(c)
    for (const c of optInDraw) replay(c)
    const sets = log.filter((l) => l.name === 'uniformMatrix4fv')
    expect(sets).toHaveLength(1)
    expect(isIdentity(Array.from(sets[0].args[2] as Float32Array))).toBe(true)
  })

  it('an ordinary shader beside it is still wrapped', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of [...setup, ...optInSetup]) replay(c)
    const sources = log.filter((l) => l.name === 'shaderSource').map((l) => l.args[1] as string)
    expect(sources[0]).toContain('netgl_main')
    expect(sources[2]).toBe(VS_OPT_IN)
    expect(replay.reprojectStats).toMatchObject({ shaders: 1, optIn: 1 })
  })

  it('without reproject, the guest\'s own identity goes through', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl)
    for (const c of [...optInSetup, ...optInDraw]) replay(c)
    const sets = log.filter((l) => l.name === 'uniformMatrix4fv')
    expect(sets).toHaveLength(1)
    // The guest's own call, as it made it (a plain array, not the replay's Float32Array).
    expect(Array.isArray(sets[0].args[2])).toBe(true)
  })
})
