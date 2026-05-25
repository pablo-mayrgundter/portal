// In-process NetGL spike. Builds two real WebGL2 contexts (shadow + receiver)
// via stack-gl, wraps the shadow in a NetGL proxy, and verifies that calls
// issued through the proxy produce pixels on the receiver.
//
// The progression is:
//   1. Clear-only: prove every-call dispatch works end-to-end.
//   2. Manual triangle: prove resource creation + handle interning + draw.
//   3. (next session) THREE.WebGLRenderer through the proxy vs a control
//      render directly into a third context — pixel-parity assertion.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import { makeNetGLProxy } from './proxy'

const W = 64
const H = 64

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

describe('NetGL proxy — in-process spike', () => {
  let shadow: WebGL2RenderingContext
  let receiver: WebGL2RenderingContext
  let proxied: WebGL2RenderingContext

  beforeAll(() => {
    shadow = makeCtx()
    receiver = makeCtx()
    proxied = makeNetGLProxy({ shadow, receiver })
  })

  it('forwards clear-color calls to the receiver', () => {
    proxied.viewport(0, 0, W, H)
    proxied.clearColor(1, 0, 0, 1)
    proxied.clear(proxied.COLOR_BUFFER_BIT)

    const px = readPixels(receiver)
    expect(px[0]).toBe(255)
    expect(px[1]).toBe(0)
    expect(px[2]).toBe(0)
    expect(px[3]).toBe(255)
    // Middle pixel too — confirm the whole framebuffer cleared, not just (0,0).
    const mid = (H / 2) * W * 4 + (W / 2) * 4
    expect(px[mid + 0]).toBe(255)
    expect(px[mid + 1]).toBe(0)
  })

  it('renders a manual GL triangle through the proxy, pixels land on receiver', () => {
    const ctx = proxied

    ctx.viewport(0, 0, W, H)
    ctx.clearColor(0, 0, 0, 1)
    ctx.clear(ctx.COLOR_BUFFER_BIT)

    const vsSource = `#version 300 es
    in vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`
    const fsSource = `#version 300 es
    precision highp float;
    out vec4 fragColor;
    void main() { fragColor = vec4(0.0, 1.0, 0.0, 1.0); }`

    const vs = ctx.createShader(ctx.VERTEX_SHADER)!
    ctx.shaderSource(vs, vsSource)
    ctx.compileShader(vs)
    if (!ctx.getShaderParameter(vs, ctx.COMPILE_STATUS)) {
      throw new Error('vs compile: ' + ctx.getShaderInfoLog(vs))
    }

    const fs = ctx.createShader(ctx.FRAGMENT_SHADER)!
    ctx.shaderSource(fs, fsSource)
    ctx.compileShader(fs)
    if (!ctx.getShaderParameter(fs, ctx.COMPILE_STATUS)) {
      throw new Error('fs compile: ' + ctx.getShaderInfoLog(fs))
    }

    const prog = ctx.createProgram()!
    ctx.attachShader(prog, vs)
    ctx.attachShader(prog, fs)
    ctx.linkProgram(prog)
    if (!ctx.getProgramParameter(prog, ctx.LINK_STATUS)) {
      throw new Error('link: ' + ctx.getProgramInfoLog(prog))
    }
    ctx.useProgram(prog)

    const posLoc = ctx.getAttribLocation(prog, 'a_pos')
    const buf = ctx.createBuffer()!
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buf)
    // A big triangle that covers the centre of the framebuffer.
    const verts = new Float32Array([-0.7, -0.7, 0.7, -0.7, 0, 0.7])
    ctx.bufferData(ctx.ARRAY_BUFFER, verts, ctx.STATIC_DRAW)

    const vao = ctx.createVertexArray()!
    ctx.bindVertexArray(vao)
    ctx.enableVertexAttribArray(posLoc)
    ctx.vertexAttribPointer(posLoc, 2, ctx.FLOAT, false, 0, 0)

    ctx.drawArrays(ctx.TRIANGLES, 0, 3)

    const px = readPixels(receiver)
    // Middle pixel should be green; corners should be black.
    const mid = (H / 2) * W * 4 + (W / 2) * 4
    expect(px[mid + 0]).toBe(0)
    expect(px[mid + 1]).toBe(255)
    expect(px[mid + 2]).toBe(0)
    expect(px[mid + 3]).toBe(255)

    expect(px[0]).toBe(0)
    expect(px[1]).toBe(0)
    expect(px[2]).toBe(0)
  })
})
