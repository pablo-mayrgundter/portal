// Regression test for the shadow-canvas pinning bug.
//
// Before the fix, createNetGLRenderer passed `context: recorder` to
// THREE.WebGLRenderer but not `canvas`. Three's constructor fell back to
// createCanvasElement() and used THAT canvas for setSize(), while
// `gl.canvas` (read through the recorder proxy) still pointed at the
// shadow's untouched OffscreenCanvas. state.reset() then read the
// shadow's 1×1 dimensions and shipped gl.viewport(0,0,1,1) to the
// receiver every frame, clipping all draws to a single corner pixel.
//
// This test pins down two invariants the fix establishes:
//   1. renderer.domElement IS the shadow's canvas (not a fresh one).
//   2. renderer.setSize(W, H) resizes the shadow's canvas, so any
//      subsequent state.reset() reads correct dimensions.
//
// `gl@9` (the node WebGL2 shim) doesn't expose a `.canvas` property at
// all, so we install a tiny mock canvas on the shadow before the test.
// That's enough to exercise the canvas-pin code path — the real browser
// case uses OffscreenCanvas, but the wiring is the same.

import { describe, it, expect, beforeAll } from 'vitest'
import gl from 'gl'
import { JSDOM } from 'jsdom'
import url from 'node:url'
import { createNetGLRenderer, type NetGLTransport } from './renderer'

const initDom = (): void => {
  // Give jsdom a real URL — the default 'about:blank' is an opaque origin,
  // which makes three's localStorage access throw SecurityError on construct.
  const dom = new JSDOM('<!DOCTYPE html>', {
    pretendToBeVisual: true,
    url: 'http://localhost/'
  })
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

const makeCtxWithCanvas = (
  initialW: number,
  initialH: number
): { shadow: WebGL2RenderingContext; canvas: HTMLCanvasElement } => {
  const ctx = gl(initialW, initialH, {
    antialias: false,
    stencil: true,
    depth: true,
    preserveDrawingBuffer: false,
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
  // gl@9 doesn't expose .canvas the way browser WebGL2 does; install a real
  // jsdom HTMLCanvasElement so three's constructor can attach the standard
  // 'webglcontextlost' / 'webglcontextrestored' event listeners.
  const canvas = document.createElement('canvas')
  canvas.width = initialW
  canvas.height = initialH
  Object.defineProperty(ctx, 'canvas', { value: canvas, configurable: true })
  return { shadow: ctx, canvas }
}

const noopTransport: NetGLTransport = {
  post: () => {},
  onMessage: () => () => {}
}

describe('createNetGLRenderer canvas pinning', () => {
  beforeAll(() => initDom())

  it("uses the shadow's canvas as renderer.domElement, not a fresh one", () => {
    const { shadow, canvas } = makeCtxWithCanvas(1, 1)
    const renderer = createNetGLRenderer({
      shadow,
      transport: noopTransport,
      antialias: false
    })
    expect(renderer.domElement).toBe(canvas)
  })

  it('setSize resizes the shadow canvas so state.reset reads correct dims', () => {
    const { shadow, canvas } = makeCtxWithCanvas(1, 1)
    const renderer = createNetGLRenderer({
      shadow,
      transport: noopTransport,
      antialias: false
    })
    renderer.setSize(640, 480, false)
    expect(canvas.width).toBe(640)
    expect(canvas.height).toBe(480)
  })
})
