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
import {
  NETGL_PIXEL_SCALE_UNIFORM,
  NETGL_REPROJECT_UNIFORM,
  NETGL_VIEWPORT_SCALE_UNIFORM,
  declaresReprojection,
  declaresScales,
  isIdentity,
  mat4Invert,
  reprojectVertexShader,
  reprojection,
  writesPointSize
} from './reproject'

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

// --- Pixel sizes after a pixel-ratio change (0.6.7) ----------------------

// 0.6.5's wrapper, verbatim: a shader that doesn't write gl_PointSize must
// still get exactly this.
const WRAPPER_065 = `
// portal-netgl host reprojection (replay \`reproject\`): C = VP_now * VP_frame^-1.
uniform highp mat4 netgl_reproject;
void main() {
  netgl_main();
  highp vec4 netgl_p = gl_Position;
  if (!(netgl_p.w > 0.0 && all(greaterThan(abs(netgl_p.xyz), vec3(netgl_p.w))))) {
    gl_Position = netgl_reproject * netgl_p;
  }
}
`

describe('reprojectVertexShader — gl_PointSize', () => {
  it('a shader that doesn\'t write gl_PointSize is wrapped exactly as 0.6.5 wrapped it', () => {
    const src = 'attribute vec3 position;\nuniform mat4 mvp;\n// gl_PointSize = 2.0; (a comment)\nvoid main() { gl_Position = mvp * vec4(position, 1.0); }'
    expect(writesPointSize(src)).toBe(false)
    expect(reprojectVertexShader(src)).toBe(src.replace(/\bmain(\s*\()/g, 'netgl_main$1') + WRAPPER_065)
    expect(reprojectVertexShader(VS_300)).toBe(VS_300.replace(/\bmain(\s*\()/g, 'netgl_main$1') + WRAPPER_065)
  })

  it('one that writes it gets the uniform, and gl_PointSize scaled after the guest\'s main', () => {
    expect(writesPointSize(VS_100)).toBe(true)
    expect(writesPointSize('void main() { gl_PointSize *= 2.0; }')).toBe(true)
    expect(writesPointSize('void main() { gl_PointSize=1.0; }')).toBe(true)
    expect(writesPointSize('void main() { if (gl_PointSize == 1.0) {} }')).toBe(false)
    expect(writesPointSize('/* gl_PointSize = 1.0; */ void main() {}')).toBe(false)
    const out = reprojectVertexShader(VS_100)!
    expect(out).toContain(`uniform highp float ${NETGL_PIXEL_SCALE_UNIFORM};`)
    const body = out.slice(out.lastIndexOf('void main()'))
    expect(body.indexOf('netgl_main();')).toBeLessThan(body.indexOf(`gl_PointSize *= ${NETGL_PIXEL_SCALE_UNIFORM};`))
    expect(body.indexOf(`gl_Position = ${NETGL_REPROJECT_UNIFORM} * netgl_p;`)).toBeLessThan(body.indexOf('gl_PointSize *='))
    // Only the wrapper's part differs from 0.6.5's.
    expect(out.replace(`uniform highp float ${NETGL_PIXEL_SCALE_UNIFORM};\n`, '').replace(`  gl_PointSize *= ${NETGL_PIXEL_SCALE_UNIFORM};\n`, '')).toBe(
      VS_100.replace(/\bmain(\s*\()/g, 'netgl_main$1') + WRAPPER_065
    )
  })

  it('compiles and links on a real GL, GLSL ES 1.00 and 3.00, with the uniform active (headless-gl)', () => {
    const ctx = gl(4, 4, { createWebGL2Context: true } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
    if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
    const vs300 = '#version 300 es\nin vec3 position;\nuniform float size;\nvoid main() { gl_Position = vec4(position, 1.0); gl_PointSize = size; }'
    const fs100 = 'precision mediump float;\nvoid main() { gl_FragColor = vec4(1.0); }'
    const fs300 = '#version 300 es\nprecision mediump float;\nout vec4 c;\nvoid main() { c = vec4(1.0); }'
    for (const [vs, fs] of [[VS_100, fs100], [vs300, fs300]]) {
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
      expect(ctx.getUniformLocation(p, NETGL_PIXEL_SCALE_UNIFORM)).not.toBeNull()
    }
  })
})

describe('declaresScales — an opted-in shader\'s pixel and viewport scales', () => {
  it('recognises each declaration by its type, not in a comment', () => {
    expect(declaresScales('uniform float netgl_pixelScale;\nuniform highp vec2 netgl_viewportScale;')).toEqual({ pixel: true, viewport: true })
    expect(declaresScales('uniform mediump float  netgl_pixelScale ;')).toEqual({ pixel: true, viewport: false })
    expect(declaresScales('// uniform float netgl_pixelScale;\nuniform vec2 netgl_viewportScale;')).toEqual({ pixel: false, viewport: true })
    expect(declaresScales('uniform vec2 netgl_pixelScale; uniform float netgl_viewportScale;')).toEqual({ pixel: false, viewport: false })
    expect(declaresScales(VS_OPT_IN)).toEqual({ pixel: false, viewport: false })
  })
})

describe('makeNetGLReplay({ reproject: true }) — setPixelScale', () => {
  const sets1f = (log: Logged[]) => log.filter((l) => l.name === 'uniform1f')
  const lookups = (log: Logged[], name: string) => log.filter((l) => l.name === 'getUniformLocation' && l.args[1] === name)

  it('a wrapped shader that writes gl_PointSize gets the scale before its screen draws, and 1 into its own framebuffers', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of setup) replay(c)
    replay.setPixelScale(0.5)
    log.length = 0
    for (const c of draws) replay(c)
    // Screen: 0.5; RT: 1; screen again: 0.5. Each before its draw.
    expect(sets1f(log).map((l) => l.args)).toEqual([[{ loc: NETGL_PIXEL_SCALE_UNIFORM }, 0.5], [{ loc: NETGL_PIXEL_SCALE_UNIFORM }, 1], [{ loc: NETGL_PIXEL_SCALE_UNIFORM }, 0.5]])
    const names = log.map((l) => l.name)
    expect(names.indexOf('uniform1f')).toBeLessThan(names.indexOf('drawArrays'))
    expect(lookups(log, NETGL_PIXEL_SCALE_UNIFORM)).toHaveLength(1)
    expect(replay.reprojectStats.scaledDraws).toBe(2)
  })

  it('sets nothing again while the scale holds, and 1 after null', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of setup) replay(c)
    replay.setPixelScale(2)
    replay(draws[0])
    replay(draws[1])
    replay(draws[1])
    expect(sets1f(log).map((l) => l.args[1])).toEqual([2])
    replay.setPixelScale(null)
    replay(draws[1])
    replay(draws[1])
    expect(sets1f(log).map((l) => l.args[1])).toEqual([2, 1])
    // A link resets the program's uniforms: set again at its next draw.
    replay(setup[9])
    replay(draws[1])
    expect(sets1f(log).map((l) => l.args[1])).toEqual([2, 1, 1])
  })

  it('a shader that doesn\'t write gl_PointSize: no lookup, no set, the same calls whatever the scale', () => {
    const noPoints: NetGLCall[] = setup.map((c) => (c.name === 'shaderSource' && c.args[1] === VS_100 ? { ...c, args: [c.args[0], VS_300] } : c))
    const runWith = (scale: number | null) => {
      const { gl, log } = mockGl()
      const replay = makeNetGLReplay(gl, { reproject: true })
      for (const c of noPoints) replay(c)
      replay.setReprojection(C)
      replay.setPixelScale(scale)
      for (const c of draws) replay(c)
      return log.map((l) => ({ name: l.name, args: l.args.map((a) => (a instanceof Float32Array ? Array.from(a) : a)) }))
    }
    const plain = runWith(null)
    expect(plain.filter((l) => l.name === 'uniform1f')).toHaveLength(0)
    expect(plain.filter((l) => l.name === 'getUniformLocation' && l.args[1] === NETGL_PIXEL_SCALE_UNIFORM)).toHaveLength(0)
    expect(runWith(0.5)).toEqual(plain)
    expect(runWith(1)).toEqual(plain)
  })

  it('a scale of 1 after the first set adds nothing per frame: the frames\' calls are those without setPixelScale', () => {
    const frameCalls = (scale: boolean) => {
      const { gl, log } = mockGl()
      const replay = makeNetGLReplay(gl, { reproject: true })
      for (const c of setup) replay(c)
      for (const c of draws) replay(c) // the first frame: the one set of 1 after the link
      log.length = 0
      for (let f = 0; f < 3; f += 1) {
        if (scale) replay.setPixelScale(1)
        for (const c of draws) replay(c)
        if (scale) replay.setPixelScale(null)
      }
      return log.map((l) => l.name)
    }
    expect(frameCalls(true)).toEqual(frameCalls(false))
    expect(frameCalls(true)).not.toContain('uniform1f')
  })

  const C = [1.01, 0, 0, 0, 0, 0.99, 0, 0, 0, 0, 1, 0, 0.02, -0.01, 0, 1]
  const VS_SCALES = `uniform highp mat4 netgl_reproject;
uniform float netgl_pixelScale;
uniform vec2 netgl_viewportScale;
uniform mat4 mvp;
uniform vec2 uResolution;
attribute vec3 position;
void main() {
  vec4 a = netgl_reproject * (mvp * vec4(position, 1.0));
  a.xy += vec2(3.0 * netgl_pixelScale) / (0.5 * uResolution * netgl_viewportScale) * a.w;
  gl_Position = a;
}`
  const scalesSetup: NetGLCall[] = [
    { name: 'createShader', args: [VERTEX], returnId: 21 },
    { name: 'shaderSource', args: [h(21), VS_SCALES] },
    { name: 'compileShader', args: [h(21)] },
    { name: 'createShader', args: [FRAGMENT], returnId: 22 },
    { name: 'shaderSource', args: [h(22), 'void main() { gl_FragColor = vec4(1.0); }'] },
    { name: 'compileShader', args: [h(22)] },
    { name: 'createProgram', args: [], returnId: 23 },
    { name: 'attachShader', args: [h(23), h(21)] },
    { name: 'attachShader', args: [h(23), h(22)] },
    { name: 'linkProgram', args: [h(23)] },
    // The guest's own lookups (three's), and its values for a host that doesn't reproject.
    { name: 'getUniformLocation', args: [h(23), NETGL_REPROJECT_UNIFORM], returnId: 24 },
    { name: 'getUniformLocation', args: [h(23), NETGL_PIXEL_SCALE_UNIFORM], returnId: 25 },
    { name: 'getUniformLocation', args: [h(23), NETGL_VIEWPORT_SCALE_UNIFORM], returnId: 26 },
    { name: 'getUniformLocation', args: [h(23), 'uResolution'], returnId: 27 },
    { name: 'createFramebuffer', args: [], returnId: 28 }
  ]
  const scalesDraws: NetGLCall[] = [
    { name: 'useProgram', args: [h(23)] },
    { name: 'uniformMatrix4fv', args: [h(24), false, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]] },
    { name: 'uniform1f', args: [h(25), 1] },
    { name: 'uniform2f', args: [h(26), 1, 1] },
    { name: 'uniform2fv', args: [h(26), [1, 1]] },
    { name: 'uniform2f', args: [h(27), 200, 100] },
    { name: 'drawArrays', args: [0, 0, 6] },
    { name: 'bindFramebuffer', args: [0x8d40, h(28)] },
    { name: 'drawArrays', args: [0, 0, 6] }
  ]

  it('an opted-in shader that declares the scales gets the frame\'s, and the guest\'s own sets are dropped', () => {
    const { gl, log } = mockGl()
    const replay = makeNetGLReplay(gl, { reproject: true })
    for (const c of scalesSetup) replay(c)
    // A frame drawn at 2× (200×100) composed at 1× (100×50).
    replay.setReprojection(C)
    replay.setViewportRemap({ from: [0, 0, 200, 100], to: [0, 0, 100, 50] })
    replay.setPixelScale(0.5)
    log.length = 0
    for (const c of scalesDraws) replay(c)
    const mat = (a: unknown) => (a instanceof Float32Array ? (isIdentity(Array.from(a)) ? 'identity' : 'C') : a)
    const host = log.filter((l) => l.name.startsWith('uniform')).map((l) => [l.name, ...l.args.map(mat)])
    expect(host).toEqual([
      // The guest's own resolution goes through.
      ['uniform2f', { loc: 'uResolution' }, 200, 100],
      // Before the screen draw, at the replay's own locations: the frame's values.
      ['uniform1f', { loc: NETGL_PIXEL_SCALE_UNIFORM }, 0.5],
      ['uniform2f', { loc: NETGL_VIEWPORT_SCALE_UNIFORM }, 0.5, 0.5],
      ['uniformMatrix4fv', { loc: 'netgl' }, false, 'C'],
      // Into its own framebuffer: 1, (1, 1) and the identity.
      ['uniform1f', { loc: NETGL_PIXEL_SCALE_UNIFORM }, 1],
      ['uniform2f', { loc: NETGL_VIEWPORT_SCALE_UNIFORM }, 1, 1],
      ['uniformMatrix4fv', { loc: 'netgl' }, false, 'identity']
    ])
    expect(replay.reprojectStats).toMatchObject({ optIn: 1, guestSetsDropped: 4, scaledDraws: 1 })
  })

  it('declaring neither scale, an opted-in shader makes 0.6.5\'s calls', () => {
    const runWith = (scaled: boolean) => {
      const { gl, log } = mockGl()
      const replay = makeNetGLReplay(gl, { reproject: true })
      for (const c of [
        { name: 'createShader', args: [VERTEX], returnId: 31 },
        { name: 'shaderSource', args: [h(31), VS_OPT_IN] },
        { name: 'createProgram', args: [], returnId: 33 },
        { name: 'attachShader', args: [h(33), h(31)] },
        { name: 'linkProgram', args: [h(33)] },
        { name: 'useProgram', args: [h(33)] }
      ] as NetGLCall[]) replay(c)
      replay.setReprojection(C)
      if (scaled) {
        replay.setViewportRemap({ from: [0, 0, 200, 100], to: [0, 0, 100, 50] })
        replay.setPixelScale(0.5)
      }
      replay({ name: 'drawArrays', args: [0, 0, 6] })
      return log.filter((l) => l.name !== 'viewport' && l.name !== 'scissor').map((l) => l.name)
    }
    expect(runWith(true)).toEqual(runWith(false))
    expect(runWith(true)).not.toContain('uniform1f')
  })
})
