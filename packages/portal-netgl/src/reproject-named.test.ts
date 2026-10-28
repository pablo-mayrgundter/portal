// Named screen targets (RFC 0003 §4.2) on a real GL (headless-gl): a
// Cesium-like guest draws its scene into a target of its own and copies it
// to the screen with a full-screen quad whose shader declares
// `netgl_reproject` without applying it (the exemption). Drawn for view A
// and composed at view B with `targets: 'named'`, the frame matches the
// guest's own frame for B; with the default `'screen'` it stays at A. A 2×
// frame composed at 1× is scaled once, by the copy's viewport remap, not
// again inside the named target.

import { describe, it, expect } from 'vitest'
import gl from 'gl'
import { makeNetGLHostReceiver, type NetGLReceiverReprojectConfig } from './host-receiver'
import type { NetGLCall, NetGLEncodedValue, NetGLFrameEnd } from './messages'
import type { NetGLTransport } from './renderer'
import { reprojection } from './reproject'

const W = 32
const H = 32

const FB = 0x8D40
const ARRAY = 0x8892
const STATIC = 0x88E4
const FLOAT = 0x1406
const TEX_2D = 0x0DE1
const RGBA = 0x1908
const UBYTE = 0x1401
const COLOR0 = 0x8CE0
const COLOR_BIT = 0x4000
const TRIANGLES = 4
const VERTEX = 0x8B31
const FRAGMENT = 0x8B30
const MIN_FILTER = 0x2801
const MAG_FILTER = 0x2800
const NEAREST = 0x2600

const h = (id: number): NetGLEncodedValue => ({ __netgl_handle: id })
const f32 = (a: number[]): NetGLEncodedValue => {
  const arr = new Float32Array(a)
  return { __netgl_typedarray: 'Float32Array', buffer: arr.buffer, offset: 0, length: arr.length } as unknown as NetGLEncodedValue
}

// Column-major matrices.
const perspective = (fovy: number, aspect: number, near: number, far: number): number[] => {
  const f = 1 / Math.tan(fovy / 2)
  return [f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) / (near - far), -1, 0, 0, (2 * far * near) / (near - far), 0]
}
// A camera at (x, y, z) looking down -z.
const viewAt = (x: number, y: number, z: number): number[] => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -x, -y, -z, 1]
const mul = (a: number[], b: number[]): number[] => {
  const o = new Array(16).fill(0)
  for (let c = 0; c < 4; c += 1) for (let r = 0; r < 4; r += 1) for (let k = 0; k < 4; k += 1) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]
  return o
}

const P = perspective(Math.PI / 3, W / H, 0.5, 20)
const VIEW_A = viewAt(0, 0, 3)
const VIEW_B = viewAt(0.45, 0.3, 2.6)

const SCENE_VS = `#version 300 es
in vec3 position;
uniform mat4 mvp;
void main() { gl_Position = mvp * vec4(position, 1.0); }`
const SCENE_FS = `#version 300 es
precision mediump float;
out vec4 color;
void main() { color = vec4(0.0, 1.0, 0.0, 1.0); }`
// The copy: declares the host's uniform and never applies it, so the
// replay neither wraps it nor moves it.
const COPY_VS = `#version 300 es
in vec2 corner;
out vec2 uv;
uniform mat4 netgl_reproject;
void main() { uv = corner * 0.5 + 0.5; gl_Position = vec4(corner, 0.0, 1.0); }`
const COPY_FS = `#version 300 es
precision mediump float;
in vec2 uv;
uniform sampler2D scene;
out vec4 color;
void main() { color = texture(scene, uv); }`

// Ids: 1 scene vs, 2 scene fs, 3 scene program, 4 mvp loc, 5 quad vbo,
// 6 copy vs, 7 copy fs, 8 copy program, 9 corner vbo, 10 texture, 11 fbo.
const setup = (scale: number): NetGLCall[] => {
  const tw = W * scale
  const th = H * scale
  const shader = (id: number, type: number, src: string): NetGLCall[] => [
    { name: 'createShader', args: [type], returnId: id },
    { name: 'shaderSource', args: [h(id), src] },
    { name: 'compileShader', args: [h(id)] }
  ]
  return [
    ...shader(1, VERTEX, SCENE_VS),
    ...shader(2, FRAGMENT, SCENE_FS),
    { name: 'createProgram', args: [], returnId: 3 },
    { name: 'attachShader', args: [h(3), h(1)] },
    { name: 'attachShader', args: [h(3), h(2)] },
    { name: 'bindAttribLocation', args: [h(3), 0, 'position'] },
    { name: 'linkProgram', args: [h(3)] },
    { name: 'getUniformLocation', args: [h(3), 'mvp'], returnId: 4 },
    // A unit square at z = 0, two triangles.
    { name: 'createBuffer', args: [], returnId: 5 },
    { name: 'bindBuffer', args: [ARRAY, h(5)] },
    { name: 'bufferData', args: [ARRAY, f32([-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0]), STATIC] },
    ...shader(6, VERTEX, COPY_VS),
    ...shader(7, FRAGMENT, COPY_FS),
    { name: 'createProgram', args: [], returnId: 8 },
    { name: 'attachShader', args: [h(8), h(6)] },
    { name: 'attachShader', args: [h(8), h(7)] },
    { name: 'bindAttribLocation', args: [h(8), 1, 'corner'] },
    { name: 'linkProgram', args: [h(8)] },
    { name: 'createBuffer', args: [], returnId: 9 },
    { name: 'bindBuffer', args: [ARRAY, h(9)] },
    { name: 'bufferData', args: [ARRAY, f32([-1, -1, 3, -1, -1, 3]), STATIC] },
    // The scene target, at the frame's buffer size.
    { name: 'createTexture', args: [], returnId: 10 },
    { name: 'bindTexture', args: [TEX_2D, h(10)] },
    { name: 'texImage2D', args: [TEX_2D, 0, RGBA, tw, th, 0, RGBA, UBYTE, null] },
    { name: 'texParameteri', args: [TEX_2D, MIN_FILTER, NEAREST] },
    { name: 'texParameteri', args: [TEX_2D, MAG_FILTER, NEAREST] },
    { name: 'createFramebuffer', args: [], returnId: 11 },
    { name: 'bindFramebuffer', args: [FB, h(11)] },
    { name: 'framebufferTexture2D', args: [FB, COLOR0, TEX_2D, h(10), 0] },
    { name: 'bindFramebuffer', args: [FB, null] }
  ]
}

// One frame drawn for `view` at `scale`× the host's buffer.
const frame = (view: number[], scale: number): NetGLCall[] => {
  const tw = W * scale
  const th = H * scale
  return [
    // The scene, into its own target.
    { name: 'bindFramebuffer', args: [FB, h(11)] },
    { name: 'viewport', args: [0, 0, tw, th] },
    { name: 'clearColor', args: [0, 0, 0, 1] },
    { name: 'clear', args: [COLOR_BIT] },
    { name: 'useProgram', args: [h(3)] },
    { name: 'uniformMatrix4fv', args: [h(4), false, f32(mul(P, view))] },
    { name: 'bindBuffer', args: [ARRAY, h(5)] },
    { name: 'enableVertexAttribArray', args: [0] },
    { name: 'vertexAttribPointer', args: [0, 3, FLOAT, false, 0, 0] },
    { name: 'drawArrays', args: [TRIANGLES, 0, 6] },
    { name: 'disableVertexAttribArray', args: [0] },
    // The copy to the screen.
    { name: 'bindFramebuffer', args: [FB, null] },
    { name: 'viewport', args: [0, 0, tw, th] },
    { name: 'useProgram', args: [h(8)] },
    { name: 'activeTexture', args: [0x84C0] },
    { name: 'bindTexture', args: [TEX_2D, h(10)] },
    { name: 'bindBuffer', args: [ARRAY, h(9)] },
    { name: 'enableVertexAttribArray', args: [1] },
    { name: 'vertexAttribPointer', args: [1, 2, FLOAT, false, 0, 0] },
    { name: 'drawArrays', args: [TRIANGLES, 0, 3] },
    { name: 'disableVertexAttribArray', args: [1] }
  ]
}

const makeTransport = (): { transport: NetGLTransport; deliver: (msg: unknown) => void } => {
  const listeners = new Set<(msg: unknown) => void>()
  return {
    transport: {
      post() {},
      onMessage(l) {
        listeners.add(l)
        return () => listeners.delete(l)
      }
    },
    deliver: (msg) => listeners.forEach((l) => l(msg))
  }
}

const context = (): WebGL2RenderingContext => {
  const ctx = gl(W, H, { createWebGL2Context: true } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  return ctx
}

const read = (ctx: WebGL2RenderingContext): Uint8Array => {
  ctx.bindFramebuffer(FB, null)
  const out = new Uint8Array(W * H * 4)
  ctx.readPixels(0, 0, W, H, RGBA, UBYTE, out)
  return out
}
const green = (px: Uint8Array): number => {
  let n = 0
  for (let i = 0; i < px.length; i += 4) if (px[i + 1] > 128) n += 1
  return n
}
const differ = (a: Uint8Array, b: Uint8Array): number => {
  let n = 0
  for (let i = 0; i < a.length; i += 4) if ((a[i + 1] > 128) !== (b[i + 1] > 128)) n += 1
  return n
}

// Drain one guest frame into a fresh host context and read it back.
const compose = (opts: { view: number[]; scale: number; reproject?: NetGLReceiverReprojectConfig }): Uint8Array => {
  const ctx = context()
  const { transport, deliver } = makeTransport()
  const host = makeNetGLHostReceiver({ gl: ctx, transport, reproject: opts.reproject, onError: (e) => { throw e } })
  for (const c of setup(opts.scale)) deliver(c)
  for (const c of frame(opts.view, opts.scale)) deliver(c)
  const end: NetGLFrameEnd = {
    type: 'netgl:frame-end',
    viewId: 1,
    screenTargets: [11],
    viewMatrix: opts.view,
    projectionMatrix: P
  }
  deliver(end)
  ctx.clearColor(0, 0, 0, 1)
  ctx.clear(COLOR_BIT)
  expect(host.drain()).toBe(true)
  expect(ctx.getError()).toBe(0)
  return read(ctx)
}

// The correction from the frame-end's own view and projection to view B.
const toB = (end: NetGLFrameEnd) =>
  reprojection(
    { viewMatrix: end.viewMatrix!, projectionMatrix: end.projectionMatrix! },
    { viewMatrix: VIEW_B, projectionMatrix: end.projectionMatrix! }
  )

describe('reproject.targets: named (headless-gl)', () => {
  it('a Cesium-like frame drawn for A and composed at B matches its own frame for B', () => {
    const truth = compose({ view: VIEW_B, scale: 1 })
    const atA = compose({ view: VIEW_A, scale: 1 })
    const named = compose({ view: VIEW_A, scale: 1, reproject: { targets: 'named', correction: (_id, end) => toB(end) } })
    const screenOnly = compose({ view: VIEW_A, scale: 1, reproject: { correction: (_id, end) => toB(end) } })
    // The square covers a good part of the frame, and A and B put it apart.
    expect(green(truth)).toBeGreaterThan(80)
    expect(differ(truth, atA)).toBeGreaterThan(60)
    // Corrected inside the named target, the copy left where it is.
    expect(differ(named, truth)).toBeLessThanOrEqual(4)
    // 'screen' corrects only the (exempt) copy: the frame stays at A.
    expect(differ(screenOnly, atA)).toBe(0)
  })

  it('a 2× frame composed at 1× is scaled once, by the copy\'s viewport remap', () => {
    const truth = compose({ view: VIEW_B, scale: 1 })
    const remap = { from: [0, 0, 2 * W, 2 * H] as const, to: [0, 0, W, H] as const }
    const named = compose({
      view: VIEW_A,
      scale: 2,
      reproject: { targets: 'named', correction: (_id, end) => toB(end), viewport: () => remap, pixelScale: () => 0.5 }
    })
    expect(green(named)).toBeGreaterThan(80)
    // Downsampled from 2× by the copy: edges may land a pixel apart.
    expect(differ(named, truth)).toBeLessThanOrEqual(2 * (W + H) / 4)
  })
})
