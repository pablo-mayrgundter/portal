// Wire-recording sibling of `makeNetGLProxy`. Same Proxy-around-shadow
// approach, but instead of dispatching each call to a second context held
// directly in memory, the recorder emits a serialised `NetGLCall` over an
// opaque `post` function. A separate replay engine (see `replay.ts`)
// consumes the call stream and re-executes against the receiver's GL
// context.
//
// Splitting recorder from replay is what makes the spike a stand-in for the
// real iframe path: the `post` boundary maps onto a `PortalTransport.post`
// call in production (postMessage, Worker structured-clone, WebRTC
// datachannel, etc.). The recorder doesn't know which transport carries the
// stream; it just produces structured-clone-safe `NetGLCall`s.

import type { NetGLCall, NetGLEncodedValue } from './messages'
import { captureCheckpoint, makeBindingTracker } from './checkpoint'

// Pure state queries — three calls these, the shadow answers, no wire
// traffic. The receiver doesn't need to know what three asked.
const SHADOW_ONLY = new Set<string>([
  'getParameter',
  'getError',
  'getContextAttributes',
  'isContextLost',
  'getSupportedExtensions',
  // NOT getExtension: WebGL extensions are opt-in per context, and some
  // gate what the receiver will accept (EXT_color_buffer_float gates
  // rendering to float targets, EXT_float_blend gates blending into
  // them). The call ships so the receiver enables the same set. A
  // three.js host happens to enable most of these for itself; a Cesium
  // guest needs them regardless of what the host does.
  //
  // Known gap: methods called on the returned extension *object*
  // (e.g. WEBGL_multi_draw.multiDrawArraysWEBGL) bypass the Proxy and
  // only run on the shadow.
  'getShaderParameter',
  'getProgramParameter',
  'getActiveUniform',
  'getActiveAttrib',
  'getActiveUniforms',
  'getActiveUniformBlockParameter',
  'getActiveUniformBlockName',
  'getShaderInfoLog',
  'getProgramInfoLog',
  // Location/index queries return small primitives that, for identically
  // compiled+linked programs on identical GL impls, match across contexts.
  // Three uses the shadow's value as both the local lookup key and the
  // argument it later passes to side-effecting calls; the receiver
  // recovers the same numeric value independently when it re-links.
  'getAttribLocation',
  'getUniformBlockIndex',
  'getFragDataLocation',
  'getUniformIndices',
  'getUniform',
  'isProgram',
  'isShader',
  'isBuffer',
  'isTexture',
  'isFramebuffer',
  'isRenderbuffer',
  'isVertexArray',
  'isSampler',
  'isSync',
  'isQuery',
  'isTransformFeedback',
  'getBufferParameter',
  'getFramebufferAttachmentParameter',
  'getRenderbufferParameter',
  'getSamplerParameter',
  'getTexParameter',
  'getVertexAttrib',
  'getVertexAttribOffset',
  'getQueryParameter',
  'getQuery',
  'getSyncParameter',
  'getInternalformatParameter',
  'getIndexedParameter',
  'getTransformFeedbackVarying',
  'checkFramebufferStatus',
  // Client-memory readback. The shadow has executed every draw, so it holds
  // the guest's rendered result and answers these correctly (Cesium's
  // picking and pickPosition-driven camera control depend on it). Shipping
  // them would stall the host's GPU for a result nobody reads. The
  // PIXEL_PACK_BUFFER form of readPixels is the exception — see
  // `isShadowOnly` below.
  'readPixels',
  'getBufferSubData',
  'clientWaitSync'
])

// `readPixels(x, y, w, h, format, type, offset)` — the PIXEL_PACK_BUFFER
// form — writes into a GPU buffer that later calls may consume, so it has
// to replay. Every other readPixels form writes into client memory.
const isShadowOnly = (name: string, args: readonly unknown[]): boolean => {
  if (!SHADOW_ONLY.has(name)) return false
  if (name === 'readPixels') return typeof args[6] !== 'number'
  return true
}

// Calls whose return value is an opaque GL resource (or location object) the
// caller will reference later. The recorder mints a netglID for each,
// associates it with the shadow's return value (so subsequent
// shadow-keyed args can be encoded), and ships `returnId` to the replay
// engine so it can keep its own ID → receiver-side handle map in sync.
const HANDLE_RETURNING = new Set<string>([
  'createBuffer',
  'createTexture',
  'createProgram',
  'createShader',
  'createFramebuffer',
  'createRenderbuffer',
  'createVertexArray',
  'createSampler',
  'createTransformFeedback',
  'createQuery',
  'getUniformLocation',
  'fenceSync'
])

export type NetGLRecorderSession = {
  /** The recorder Proxy. Hand this to the framework as its GL context. */
  gl: WebGL2RenderingContext
  /**
   * Post a state checkpoint: the calls that re-establish the shadow's
   * current GL state on the receiver. Call at every frame boundary (after
   * the frame-end marker) so each replayed batch starts from the guest's
   * own state regardless of what the host did to the shared context in
   * between. See `checkpoint.ts`.
   */
  checkpoint(): void
}

/**
 * Recorder Proxy without the session wrapper. Kept for callers that manage
 * frame boundaries themselves and don't want checkpoints (the three.js
 * guest resets three's state cache instead).
 */
export const makeNetGLRecorder = (
  shadow: WebGL2RenderingContext,
  post: (call: NetGLCall) => void
): WebGL2RenderingContext => makeNetGLRecorderSession(shadow, post).gl

export const makeNetGLRecorderSession = (
  shadow: WebGL2RenderingContext,
  post: (call: NetGLCall) => void
): NetGLRecorderSession => {
  const handleToId = new Map<object, number>()
  let nextId = 1
  // Object bindings, tracked from the call stream for the checkpoint.
  const bindings = makeBindingTracker()

  // Scratch 2D canvas reused across encodes to avoid GC churn when an app
  // uploads many textures per frame. Lazily created on first image-source
  // encode — worker realms have no `document` AND can't see
  // HTMLImageElement / HTMLCanvasElement / HTMLVideoElement anyway (they
  // can only be passed an ImageBitmap, which has its own no-canvas
  // encoding path via createImageBitmap → ArrayBuffer). The throw below
  // surfaces the unsupported case loudly rather than silently producing
  // a broken texture.
  let scratch2d: CanvasRenderingContext2D | null = null
  const getScratch2d = (): CanvasRenderingContext2D => {
    if (!scratch2d) {
      if (typeof document === 'undefined') {
        throw new Error(
          'NetGL recorder: image-source encoding needs a document. ' +
          'Worker hosts should convert image sources to ImageBitmap ' +
          'before passing to gl.texImage2D (and we can extend the encoder ' +
          'to take ImageBitmap directly with no 2D-canvas detour).'
        )
      }
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d', { willReadFrequently: true })
      if (!ctx) throw new Error('NetGL recorder: failed to get 2d context for scratch canvas')
      scratch2d = ctx
    }
    return scratch2d
  }

  /**
   * Convert an image-source DOM object (Image / Canvas / Video / ImageBitmap)
   * to an ImageData envelope. The receiver reconstructs an `ImageData` and
   * passes it to `texImage2D` / `texSubImage2D` — both accept ImageData as
   * an alternative to the original source. Synchronous via 2D canvas; works
   * for any source that's already loaded.
   */
  const encodeImageSource = (src: TexImageSource): NetGLEncodedValue => {
    const anySrc = src as unknown as {
      naturalWidth?: number
      naturalHeight?: number
      videoWidth?: number
      videoHeight?: number
      width: number
      height: number
    }
    const w = anySrc.naturalWidth ?? anySrc.videoWidth ?? anySrc.width
    const h = anySrc.naturalHeight ?? anySrc.videoHeight ?? anySrc.height
    if (!w || !h) {
      throw new Error(`NetGL recorder: image source has zero dims (${(src as object).constructor.name})`)
    }
    const ctx = getScratch2d()
    ctx.canvas.width = w
    ctx.canvas.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(src as CanvasImageSource, 0, 0)
    const data = ctx.getImageData(0, 0, w, h)
    return { __netgl_imagedata: true, width: w, height: h, buffer: data.data.buffer }
  }

  const encodeArg = (arg: unknown): NetGLEncodedValue => {
    if (arg == null) return null
    const t = typeof arg
    if (t === 'number' || t === 'string' || t === 'boolean') {
      return arg as number | string | boolean
    }
    if (t !== 'object') return null
    const handleId = handleToId.get(arg as object)
    if (handleId !== undefined) return { __netgl_handle: handleId }
    if (ArrayBuffer.isView(arg)) {
      const view = arg as ArrayBufferView & { length: number }
      return {
        __netgl_typedarray: view.constructor.name,
        buffer: view.buffer as ArrayBuffer,
        offset: view.byteOffset,
        length: view.length
      }
    }
    if (arg instanceof ArrayBuffer) return { __netgl_arraybuffer: arg }
    // ImageBitmap is structured-clonable, so it crosses postMessage as-is
    // and the receiver uploads the very same bitmap. That matters beyond
    // speed: WebGL ignores UNPACK_FLIP_Y / PREMULTIPLY_ALPHA /
    // COLORSPACE_CONVERSION for ImageBitmap sources but honours them for
    // ImageData, so converting a bitmap to ImageData would change the
    // upload's semantics (Cesium's imagery path would come out flipped).
    if (typeof ImageBitmap !== 'undefined' && arg instanceof ImageBitmap) {
      return { __netgl_imagebitmap: arg }
    }
    // DOM image sources accepted by gl.texImage2D / gl.texSubImage2D.
    if (
      (typeof HTMLImageElement !== 'undefined' && arg instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement !== 'undefined' && arg instanceof HTMLCanvasElement) ||
      (typeof HTMLVideoElement !== 'undefined' && arg instanceof HTMLVideoElement) ||
      (typeof OffscreenCanvas !== 'undefined' && arg instanceof OffscreenCanvas)
    ) {
      return encodeImageSource(arg as TexImageSource)
    }
    if (typeof ImageData !== 'undefined' && arg instanceof ImageData) {
      return { __netgl_imagedata: true, width: arg.width, height: arg.height, buffer: arg.data.buffer }
    }
    if (Array.isArray(arg)) return arg.map(encodeArg)
    // Unknown object — fall back to null. Most likely cause: a WebGL handle
    // we forgot to intern. Surface loudly during dev rather than silently
    // dropping it.
    throw new Error(`NetGL recorder: cannot encode argument of type ${(arg as object).constructor?.name}`)
  }

  const gl = new Proxy(shadow, {
    get(target, prop) {
      const value = Reflect.get(target, prop)
      if (typeof value !== 'function') return value
      const methodName = typeof prop === 'string' ? prop : String(prop)

      return function recorded(this: unknown, ...args: unknown[]): unknown {
        const result = (value as (...a: unknown[]) => unknown).apply(target, args)

        if (isShadowOnly(methodName, args)) return result
        bindings.observe(methodName, args)

        let returnId: number | undefined
        if (
          HANDLE_RETURNING.has(methodName) &&
          result != null &&
          typeof result === 'object'
        ) {
          returnId = nextId
          nextId += 1
          handleToId.set(result as object, returnId)
        }

        const encodedArgs = args.map(encodeArg)
        post({ name: methodName, args: encodedArgs, returnId })

        return result
      }
    },
    // Native WebGL2 setters (e.g. gl.drawingBufferColorSpace = 'srgb' from
    // three's outputColorSpace setter) are brand-checked at the C++ level —
    // `this instanceof WebGL2RenderingContext`. The default Proxy `set`
    // behaviour passes the Proxy as the receiver, which fails the brand check
    // with "Illegal invocation" in real browsers. Explicitly route the
    // assignment to the shadow so the native setter sees a real context.
    //
    // We don't ship property assignments over the wire — the receiver-side
    // renderer manages its own context-property state independently (both
    // sides set the same things from their own three configuration). If
    // mismatches show up, this is the place to also forward.
    set(target, prop, value) {
      return Reflect.set(target, prop, value, target)
    }
  }) as unknown as WebGL2RenderingContext

  return {
    gl,
    checkpoint() {
      for (const call of captureCheckpoint(shadow, bindings, encodeArg)) post(call)
    }
  }
}
