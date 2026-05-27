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

// Pure state queries — three calls these, the shadow answers, no wire
// traffic. The receiver doesn't need to know what three asked.
const SHADOW_ONLY = new Set<string>([
  'getParameter',
  'getError',
  'getContextAttributes',
  'isContextLost',
  'getSupportedExtensions',
  'getExtension',
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
  'checkFramebufferStatus'
])

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

export const makeNetGLRecorder = (
  shadow: WebGL2RenderingContext,
  post: (call: NetGLCall) => void
): WebGL2RenderingContext => {
  const handleToId = new Map<object, number>()
  let nextId = 1

  // Scratch 2D canvas reused across encodes to avoid GC churn when an app
  // uploads many textures per frame. Lazily created on first image-source
  // encode so worker contexts (no document) don't pay the cost up front.
  let scratch2d: CanvasRenderingContext2D | null = null
  const getScratch2d = (): CanvasRenderingContext2D => {
    if (!scratch2d) {
      if (typeof document === 'undefined') {
        throw new Error('NetGL recorder: image-source encoding needs a document (no scratch canvas in this realm)')
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
    // DOM image sources accepted by gl.texImage2D / gl.texSubImage2D.
    if (
      (typeof HTMLImageElement !== 'undefined' && arg instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement !== 'undefined' && arg instanceof HTMLCanvasElement) ||
      (typeof HTMLVideoElement !== 'undefined' && arg instanceof HTMLVideoElement) ||
      (typeof ImageBitmap !== 'undefined' && arg instanceof ImageBitmap)
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

  return new Proxy(shadow, {
    get(target, prop) {
      const value = Reflect.get(target, prop)
      if (typeof value !== 'function') return value
      const methodName = typeof prop === 'string' ? prop : String(prop)

      return function recorded(this: unknown, ...args: unknown[]): unknown {
        const result = (value as (...a: unknown[]) => unknown).apply(target, args)

        if (SHADOW_ONLY.has(methodName)) return result

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
}
