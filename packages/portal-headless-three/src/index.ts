import * as THREE from 'three'
import gl from 'gl'
import { JSDOM } from 'jsdom'
import { PNG } from 'pngjs'
import url from 'node:url'

// ---------------------------------------------------------------------------
// Headless three.js renderer for node.
//
// Stack: jsdom (provides `document`, `window`, `URL`, `self` globals that
// three.js touches at module load), `gl` (stack-gl's headless WebGL2 shim),
// `THREE.WebGLRenderer({context: glCtx})`, `pngjs` for PNG serialization on
// the way out.
//
// Three things confirmed by spike:
//   - gl 9.0.0-rc.10 honors `{stencil: true}` (8-bit stencil, 24-bit depth).
//   - `gl_FragDepth` works in #version 300 es shaders, depth test honors it.
//   - `createWebGL2Context: true` is honored despite the VERSION string
//     reporting "WebGL 1.0".
// Together: the iframe target's render pipeline (oblique clip, stencil
// halfspace mask, depth-pack to RGBA) ports verbatim to node, no fallback
// shader paths required. This is the v1 unit; portal recursion + composite
// add next.
// ---------------------------------------------------------------------------

let domInitialized = false

/**
 * Install jsdom-provided globals that three.js expects at import time. Three
 * touches `document` for canvas creation paths and `self` / `window` for a
 * handful of feature detections; without these, importing three throws at
 * module load even before any renderer is instantiated.
 *
 * Idempotent — calling more than once is a no-op so multiple renderers in a
 * single process share one global env.
 */
export const initDom = (): void => {
  if (domInitialized) return
  domInitialized = true
  const dom = new JSDOM('<!DOCTYPE html>', { pretendToBeVisual: true })
  const g = globalThis as unknown as {
    window?: unknown
    document?: unknown
    self?: unknown
    URL?: unknown
  }
  g.window = dom.window
  g.document = dom.window.document
  g.self = dom.window
  g.URL = url.URL
}

export type HeadlessRenderer = {
  renderer: THREE.WebGLRenderer
  glContext: WebGL2RenderingContext
  width: number
  height: number
  /**
   * Resize the underlying gl context AND the three renderer. The gl package
   * resizes its drawing buffer in place; three reads the new size on the
   * next setSize call.
   */
  resize(width: number, height: number): void
}

/**
 * Create a headless three.js renderer at the given size. Initialises jsdom
 * globals on first call.
 *
 * The resulting WebGL context has 8-bit stencil + 24-bit depth attached to
 * the default framebuffer, matching what the browser-side host expects. AA
 * is off because stack-gl's MSAA path has known issues
 * (https://github.com/stackgl/headless-gl/issues/30); recover quality with
 * an FXAA blit if needed (the iframe target's color blit shader ports here).
 */
export const createHeadlessRenderer = (width: number, height: number): HeadlessRenderer => {
  initDom()
  // Cast: stack-gl's typings are a subset of WebGL2 but accurate enough for
  // three. WebGLRenderer reads the context as a WebGL2RenderingContext-shape.
  const glCtx = gl(width, height, {
    antialias: false,
    stencil: true,
    depth: true,
    preserveDrawingBuffer: false,
    createWebGL2Context: true
  } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
  if (!glCtx) {
    throw new Error('headless-gl: could not create WebGL2 context')
  }
  const renderer = new THREE.WebGLRenderer({
    context: glCtx,
    antialias: false,
    stencil: true,
    depth: true
  })
  renderer.setSize(width, height, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.NoToneMapping
  renderer.autoClear = true

  const resize = (w: number, h: number): void => {
    // stack-gl's resize is on the gl extension — opt-in via getExtension.
    type Resizable = { resize: (w: number, h: number) => void }
    const ext = (glCtx as unknown as { getExtension: (n: string) => unknown }).getExtension(
      'STACKGL_resize_drawingbuffer'
    ) as Resizable | null
    ext?.resize(w, h)
    renderer.setSize(w, h, false)
  }

  return { renderer, glContext: glCtx, width, height, resize }
}

export {
  makeHeadlessTarget,
  makeHeadlessEndpoint,
  type HeadlessTarget,
  type HeadlessTargetConfig,
  type HeadlessEndpointConfig,
  type HeadlessPortalEndpoint,
  type HeadlessFrameMessage
} from './target'

/**
 * Pack a flat RGBA Uint8Array (origin bottom-left, OpenGL convention) into a
 * PNG Buffer (origin top-left). Used by the headless target's downstream
 * snapshot path.
 */
export const colorBufferToPNG = (
  data: Uint8Array,
  width: number,
  height: number
): Buffer => {
  const png = new PNG({ width, height })
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dst = (y * width + x) * 4
      const src = ((height - y - 1) * width + x) * 4
      png.data[dst] = data[src]
      png.data[dst + 1] = data[src + 1]
      png.data[dst + 2] = data[src + 2]
      png.data[dst + 3] = data[src + 3]
    }
  }
  return PNG.sync.write(png)
}

/**
 * Read the renderer's color attachment and return a PNG buffer. Performs the
 * standard WebGL Y-flip (OpenGL origin is bottom-left; PNGs are top-left)
 * during the byte copy. Reads from the currently-bound framebuffer, so call
 * after `renderer.setRenderTarget(null)` and `renderer.render(...)`.
 */
export const captureColorPNG = (h: HeadlessRenderer): Buffer => {
  const { glContext, width, height } = h
  const pixels = new Uint8Array(width * height * 4)
  glContext.readPixels(
    0,
    0,
    width,
    height,
    glContext.RGBA,
    glContext.UNSIGNED_BYTE,
    pixels
  )
  const png = new PNG({ width, height })
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dst = (y * width + x) * 4
      const src = ((height - y - 1) * width + x) * 4
      png.data[dst] = pixels[src]
      png.data[dst + 1] = pixels[src + 1]
      png.data[dst + 2] = pixels[src + 2]
      png.data[dst + 3] = pixels[src + 3]
    }
  }
  return PNG.sync.write(png)
}
