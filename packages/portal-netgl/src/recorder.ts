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
import { captureCheckpoint, makeBindingTracker, makeScalarStateTracker } from './checkpoint'

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

// Calls that only write pixels: what `shadowDraws: false` keeps off the
// shadow (they still ship). Nothing later reads their effect on GL state,
// only on the framebuffer: copyTexImage2D stays, since it defines a
// texture level's size and format.
const DRAWS = new Set<string>([
  'drawArrays',
  'drawElements',
  'drawArraysInstanced',
  'drawElementsInstanced',
  'drawRangeElements',
  'clear',
  'clearBufferfv',
  'clearBufferiv',
  'clearBufferuiv',
  'clearBufferfi',
  'blitFramebuffer'
])

// `readPixels(x, y, w, h, format, type, offset)` — the PIXEL_PACK_BUFFER
// form — writes into a GPU buffer that later calls may consume, so it has
// to replay. Every other readPixels form writes into client memory.
const isShadowOnly = (name: string, args: readonly unknown[]): boolean => {
  if (!SHADOW_ONLY.has(name)) return false
  if (name === 'readPixels') return typeof args[6] !== 'number'
  return true
}

// WebGL2's source-offset overloads: a typed array plus an element offset
// (and for some a length) into it. The recorder replaces the array with a
// view of just the elements the call reads and drops the offset and length,
// so only those bytes cross the wire: `bufferSubData(target, dst, src,
// srcOffset, length)` for 1,000 changed vertices of a 100,000-vertex array
// ships 1,000. Each entry: [the data argument's index, the offset's index,
// whether a length follows the offset].
const SOURCE_OFFSET: Record<string, readonly [number, number, boolean]> = {
  bufferData: [1, 3, true],
  bufferSubData: [2, 3, true],
  texImage2D: [8, 9, false],
  texSubImage2D: [8, 9, false],
  texImage3D: [9, 10, false],
  texSubImage3D: [10, 11, false],
  compressedTexImage2D: [6, 7, true],
  compressedTexSubImage2D: [7, 8, true],
  compressedTexImage3D: [7, 8, true],
  compressedTexSubImage3D: [9, 10, true],
  uniform1fv: [1, 2, true],
  uniform2fv: [1, 2, true],
  uniform3fv: [1, 2, true],
  uniform4fv: [1, 2, true],
  uniform1iv: [1, 2, true],
  uniform2iv: [1, 2, true],
  uniform3iv: [1, 2, true],
  uniform4iv: [1, 2, true],
  uniform1uiv: [1, 2, true],
  uniform2uiv: [1, 2, true],
  uniform3uiv: [1, 2, true],
  uniform4uiv: [1, 2, true],
  uniformMatrix2fv: [2, 3, true],
  uniformMatrix3fv: [2, 3, true],
  uniformMatrix4fv: [2, 3, true],
  uniformMatrix2x3fv: [2, 3, true],
  uniformMatrix3x2fv: [2, 3, true],
  uniformMatrix2x4fv: [2, 3, true],
  uniformMatrix4x2fv: [2, 3, true],
  uniformMatrix3x4fv: [2, 3, true],
  uniformMatrix4x3fv: [2, 3, true]
}

// Uncompressed texture uploads from a typed array read a block whose size
// follows from the dimensions, format, type and unpack state; the rest of
// the array isn't read. [width, height, depth (−1: 2D), format, type, data].
const TEX_EXTENT: Record<string, readonly [number, number, number, number, number, number]> = {
  texImage2D: [3, 4, -1, 6, 7, 8],
  texSubImage2D: [4, 5, -1, 6, 7, 8],
  texImage3D: [3, 4, 5, 7, 8, 9],
  texSubImage3D: [5, 6, 7, 8, 9, 10]
}

// vertexAttrib*v read the first N elements of their array.
const ATTRIB_ELEMENTS: Record<string, number> = {
  vertexAttrib1fv: 1,
  vertexAttrib2fv: 2,
  vertexAttrib3fv: 3,
  vertexAttrib4fv: 4,
  vertexAttribI4iv: 4,
  vertexAttribI4uiv: 4
}

// Components per pixel, by format.
const FORMAT_COMPONENTS: Record<number, number> = {
  0x1903: 1, // RED
  0x8d94: 1, // RED_INTEGER
  0x8227: 2, // RG
  0x8228: 2, // RG_INTEGER
  0x1907: 3, // RGB
  0x8d98: 3, // RGB_INTEGER
  0x1908: 4, // RGBA
  0x8d99: 4, // RGBA_INTEGER
  0x1906: 1, // ALPHA
  0x1909: 1, // LUMINANCE
  0x190a: 2, // LUMINANCE_ALPHA
  0x1902: 1 // DEPTH_COMPONENT
}
// Bytes per component, by type.
const TYPE_BYTES: Record<number, number> = {
  0x1400: 1, // BYTE
  0x1401: 1, // UNSIGNED_BYTE
  0x1402: 2, // SHORT
  0x1403: 2, // UNSIGNED_SHORT
  0x1404: 4, // INT
  0x1405: 4, // UNSIGNED_INT
  0x1406: 4, // FLOAT
  0x140b: 2, // HALF_FLOAT
  0x8d61: 2 // HALF_FLOAT_OES
}
// Bytes per pixel of the packed types, whatever the format.
const PACKED_BYTES: Record<number, number> = {
  0x8363: 2, // UNSIGNED_SHORT_5_6_5
  0x8033: 2, // UNSIGNED_SHORT_4_4_4_4
  0x8034: 2, // UNSIGNED_SHORT_5_5_5_1
  0x8368: 4, // UNSIGNED_INT_2_10_10_10_REV
  0x8c3b: 4, // UNSIGNED_INT_10F_11F_11F_REV
  0x8c3e: 4, // UNSIGNED_INT_5_9_9_9_REV
  0x84fa: 4, // UNSIGNED_INT_24_8
  0x8dad: 8 // FLOAT_32_UNSIGNED_INT_24_8_REV
}

const pixelBytes = (format: unknown, type: unknown): number | null => {
  if (typeof format !== 'number' || typeof type !== 'number') return null
  if (PACKED_BYTES[type]) return PACKED_BYTES[type]
  const c = FORMAT_COMPONENTS[format]
  const b = TYPE_BYTES[type]
  return c && b ? c * b : null
}

/** The unpack state a texture upload from client memory reads with. */
export type NetGLUnpackState = {
  alignment: number
  rowLength: number
  imageHeight: number
  skipPixels: number
  skipRows: number
  skipImages: number
}

const GL_UNPACK = {
  ALIGNMENT: 0x0cf5,
  ROW_LENGTH: 0x0cf2,
  IMAGE_HEIGHT: 0x806e,
  SKIP_PIXELS: 0x0cf4,
  SKIP_ROWS: 0x0cf3,
  SKIP_IMAGES: 0x806d
} as const

/** WebGL's defaults: rows aligned to 4 bytes, no row length, no skips. */
export const DEFAULT_UNPACK: NetGLUnpackState = {
  alignment: 4,
  rowLength: 0,
  imageHeight: 0,
  skipPixels: 0,
  skipRows: 0,
  skipImages: 0
}

/**
 * Bytes an upload of `width × height × depth` pixels of `bpp` bytes reads
 * from its source under `unpack` (the WebGL 2 spec's rules, §4.3.1 of the
 * ES 3.0 spec): the last pixel of the last row of the last image, skips
 * included. 0 for an empty upload.
 */
export const unpackExtent = (
  width: number,
  height: number,
  depth: number,
  bpp: number,
  unpack: NetGLUnpackState
): number => {
  if (width <= 0 || height <= 0 || depth <= 0) return 0
  const rowPixels = unpack.rowLength > 0 ? unpack.rowLength : width
  const align = unpack.alignment
  const rowStride = Math.ceil((rowPixels * bpp) / align) * align
  const imageRows = unpack.imageHeight > 0 ? unpack.imageHeight : height
  const imageStride = rowStride * imageRows
  return (
    (unpack.skipImages + depth - 1) * imageStride +
    (unpack.skipRows + height - 1) * rowStride +
    (unpack.skipPixels + width) * bpp
  )
}

type ElementView = ArrayBufferView & {
  length: number
  BYTES_PER_ELEMENT: number
  subarray(begin: number, end?: number): ElementView
}

const isElementView = (v: unknown): v is ElementView => ArrayBuffer.isView(v) && !(v instanceof DataView)

/**
 * `args` rewritten so the call's typed array holds exactly the elements the
 * call reads (same call, same result), or `args` itself:
 *   - a source-offset overload becomes its plain form over the referenced
 *     elements (offset and length dropped);
 *   - an uncompressed texture upload is cut after the last byte it reads,
 *     given `unpack` (the unpack state at the call; omit it to trim the
 *     front only);
 *   - vertexAttrib*v keeps the elements it reads.
 * Left alone when an offset or length is out of range, so the receiver sees
 * the call the shadow rejected.
 */
export const trimSource = (name: string, args: unknown[], unpack?: NetGLUnpackState): unknown[] => {
  const attribN = ATTRIB_ELEMENTS[name]
  if (attribN !== undefined) {
    const data = args[1]
    if (!isElementView(data) || data.length <= attribN) return args
    return [args[0], data.subarray(0, attribN), ...args.slice(2)]
  }
  let out = args
  const spec = SOURCE_OFFSET[name]
  if (spec) {
    const [dataIndex, offsetIndex, hasLength] = spec
    const data = args[dataIndex]
    if (args.length > offsetIndex && isElementView(data)) {
      const offset = args[offsetIndex]
      const length = hasLength ? args[offsetIndex + 1] : undefined
      if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0 || offset > data.length) return args
      let end = data.length
      if (typeof length === 'number' && length > 0) {
        if (!Number.isInteger(length) || offset + length > data.length) return args
        end = offset + length
      }
      out = args.slice(0, offsetIndex)
      if (offset !== 0 || end !== data.length) out[dataIndex] = data.subarray(offset, end)
    }
  }
  const tex = TEX_EXTENT[name]
  if (tex && unpack) {
    const [wi, hi, di, fi, ti, dataIndex] = tex
    const data = out[dataIndex]
    // The plain form only: anything after the data (an offset left in place
    // because it was out of range) means the call wasn't rewritten.
    if (out.length !== dataIndex + 1 || !isElementView(data)) return out
    const w = out[wi]
    const h = out[hi]
    const d = di < 0 ? 1 : out[di]
    const bpp = pixelBytes(out[fi], out[ti])
    if (typeof w !== 'number' || typeof h !== 'number' || typeof d !== 'number' || bpp === null) return out
    const bytes = unpackExtent(w, h, d, bpp, unpack)
    if (bytes <= 0) return out
    const elements = Math.ceil(bytes / data.BYTES_PER_ELEMENT)
    if (elements >= data.length) return out
    if (out === args) out = args.slice()
    out[dataIndex] = data.subarray(0, elements)
  }
  return out
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

/**
 * Where the recorder sends each call. `transfer` lists buffers the recorder
 * made for this call alone (slices, copies, pixels read from an image):
 * they may be transferred rather than cloned. The app's own buffers are
 * never in it. `urgent` is set when the call holds an object of the app's
 * that must be serialised before the call returns (an `ImageBitmap`, which
 * the app may close right after the upload): a caller that holds calls
 * back (a batch) should send them now.
 */
export type NetGLRecorderPost = (call: NetGLCall, transfer?: ArrayBuffer[], urgent?: boolean) => void

export type NetGLRecorderSession = {
  /** The recorder Proxy. Hand this to the framework as its GL context. */
  gl: WebGL2RenderingContext
  /**
   * Copy every typed-array and ArrayBuffer argument when the call is
   * recorded, so the call can be held after it returns (batched) and still
   * carry the values it was made with: frameworks reuse scratch arrays for
   * uniforms, and a held reference would ship the last values written.
   * Each copy is the recorder's and goes in `transfer`. Off by default: a
   * call posted at once is cloned (or replayed, by an immediate link) while
   * its arguments are still valid, so nothing needs copying.
   */
  snapshot: boolean
  /**
   * Post a state checkpoint: the calls that re-establish the shadow's
   * current GL state on the receiver. Call at every frame boundary (after
   * the frame-end marker) so each replayed batch starts from the guest's
   * own state regardless of what the host did to the shared context in
   * between. See `checkpoint.ts`.
   */
  checkpoint(): void
  /**
   * Post the checkpoint later: just before the next call the recorder
   * ships (calls the shadow answers alone don't count), capturing the state
   * at that moment, or never if no call follows. `checkpoint()` cancels it.
   *
   * For a guest drawn several times inside one host frame through
   * `makeNetGLImmediateLink`: the guest's next draw happens inside the
   * host's next `link.frame()`, so the checkpoint replays at once instead
   * of being cloned and queued while the link is closed. See
   * `NetGLGuestContext.subFrame`.
   */
  deferCheckpoint(): void
}

export type NetGLRecorderSessionOptions = {
  /**
   * Where the checkpoint's scalar state (caps, blend, depth, stencil,
   * pixel-store, generic attribs, rects) comes from:
   *   - `'tracked'` (default): observed from the calls the recorder sees,
   *     seeded once from the shadow now. The checkpoint makes no
   *     synchronous calls on the shadow.
   *   - `'queried'`: read from the shadow with getParameter / isEnabled /
   *     getVertexAttrib at every checkpoint, ~80 synchronous GPU round
   *     trips. Use it if you change the shadow's state behind the recorder
   *     (calls on the shadow itself, or extension objects that set blend
   *     or caps state).
   */
  scalarState?: 'tracked' | 'queried'
  /**
   * Execute draws and clears (`drawArrays`, `drawElements`, their instanced
   * and range forms, `clear`, `clearBuffer*`, `blitFramebuffer`) on the
   * shadow as well as recording them. Default true. False records and
   * ships them as ever but skips them on the shadow, which then does none
   * of the guest's pixel work: state calls, uploads, handle minting and
   * queries still run there. The cost: the shadow's pixels are no longer
   * the guest's frame, so readback (`readPixels`, picking,
   * `getBufferSubData` after transform feedback, occlusion queries) answers
   * nothing meaningful, and draw-time GL errors aren't raised on it.
   */
  shadowDraws?: boolean
}

/**
 * Recorder Proxy without the session wrapper. Kept for callers that manage
 * frame boundaries themselves and don't want checkpoints (the three.js
 * guest resets three's state cache instead). Nothing is tracked for a
 * checkpoint it never takes.
 */
export const makeNetGLRecorder = (
  shadow: WebGL2RenderingContext,
  post: NetGLRecorderPost
): WebGL2RenderingContext => makeNetGLRecorderSession(shadow, post, { scalarState: 'queried' }).gl

export const makeNetGLRecorderSession = (
  shadow: WebGL2RenderingContext,
  post: NetGLRecorderPost,
  options: NetGLRecorderSessionOptions = {}
): NetGLRecorderSession => {
  const handleToId = new Map<object, number>()
  let nextId = 1
  // Object bindings, tracked from the call stream for the checkpoint.
  const bindings = makeBindingTracker()
  // Scalar state, seeded once from the shadow before the guest's first
  // call: the checkpoint then makes no synchronous queries.
  const state = (options.scalarState ?? 'tracked') === 'tracked' ? makeScalarStateTracker(shadow) : undefined
  let checkpointDeferred = false
  let snapshot = false
  const shadowDraws = options.shadowDraws ?? true
  // Per call: the buffers the encoder made (transferable), and whether an
  // argument is an app object that must be serialised now.
  let owned: ArrayBuffer[] = []
  let urgent = false
  // The unpack state, for trimming texture uploads to the bytes they read:
  // read from the shadow at the first upload that needs it, then followed
  // through pixelStorei. Null until then, or if the shadow can't say.
  let unpack: NetGLUnpackState | null = null
  let unpackRead = false
  const unpackState = (): NetGLUnpackState | null => {
    if (!unpackRead) {
      unpackRead = true
      try {
        const q = (pname: number, fallback: number): number => {
          const v = shadow.getParameter(pname) as unknown
          return typeof v === 'number' ? v : fallback
        }
        unpack = {
          alignment: q(GL_UNPACK.ALIGNMENT, 4),
          rowLength: q(GL_UNPACK.ROW_LENGTH, 0),
          imageHeight: q(GL_UNPACK.IMAGE_HEIGHT, 0),
          skipPixels: q(GL_UNPACK.SKIP_PIXELS, 0),
          skipRows: q(GL_UNPACK.SKIP_ROWS, 0),
          skipImages: q(GL_UNPACK.SKIP_IMAGES, 0)
        }
      } catch {
        unpack = null
      }
    }
    return unpack
  }
  const observeUnpack = (args: readonly unknown[]): void => {
    if (!unpack) return
    const [pname, v] = args
    if (typeof v !== 'number' && typeof v !== 'boolean') return
    const n = Number(v)
    switch (pname) {
      case GL_UNPACK.ALIGNMENT:
        if ([1, 2, 4, 8].includes(n)) unpack.alignment = n
        break
      case GL_UNPACK.ROW_LENGTH:
        if (n >= 0) unpack.rowLength = n
        break
      case GL_UNPACK.IMAGE_HEIGHT:
        if (n >= 0) unpack.imageHeight = n
        break
      case GL_UNPACK.SKIP_PIXELS:
        if (n >= 0) unpack.skipPixels = n
        break
      case GL_UNPACK.SKIP_ROWS:
        if (n >= 0) unpack.skipRows = n
        break
      case GL_UNPACK.SKIP_IMAGES:
        if (n >= 0) unpack.skipImages = n
        break
    }
  }

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
    // Pixels read for this call alone: the recorder's to transfer.
    owned.push(data.data.buffer as ArrayBuffer)
    return { __netgl_imagedata: true, width: w, height: h, buffer: data.data.buffer as ArrayBuffer }
  }

  // A fresh ArrayBuffer holding these bytes (never shared, even from a
  // SharedArrayBuffer), noted as the recorder's to transfer.
  const copyBytes = (buffer: ArrayBufferLike, byteOffset: number, byteLength: number): ArrayBuffer => {
    const copy = new Uint8Array(buffer, byteOffset, byteLength).slice().buffer
    owned.push(copy)
    return copy
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
      const buffer = view.buffer as ArrayBuffer
      // A view into part of a larger buffer (a framework's scratch pool, a
      // WASM heap) ships only its own bytes. The whole buffer would be
      // cloned across the transport otherwise: at best wasted copying, at
      // worst the guest's entire heap handed to another origin. The copy
      // is the recorder's, so it can be transferred.
      if (snapshot || view.byteLength < buffer.byteLength) {
        return {
          __netgl_typedarray: view.constructor.name,
          buffer: copyBytes(buffer, view.byteOffset, view.byteLength),
          offset: 0,
          length: view.length
        }
      }
      return {
        __netgl_typedarray: view.constructor.name,
        buffer,
        offset: view.byteOffset,
        length: view.length
      }
    }
    if (arg instanceof ArrayBuffer) {
      return { __netgl_arraybuffer: snapshot ? copyBytes(arg, 0, arg.byteLength) : arg }
    }
    // ImageBitmap is structured-clonable, so it crosses postMessage as-is
    // and the receiver uploads the very same bitmap. That matters beyond
    // speed: WebGL ignores UNPACK_FLIP_Y / PREMULTIPLY_ALPHA /
    // COLORSPACE_CONVERSION for ImageBitmap sources but honours them for
    // ImageData, so converting a bitmap to ImageData would change the
    // upload's semantics (Cesium's imagery path would come out flipped).
    if (typeof ImageBitmap !== 'undefined' && arg instanceof ImageBitmap) {
      // The app's, and it may close it as soon as the upload returns: a
      // closed bitmap can't be cloned, so it must be posted now.
      urgent = true
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
      const data = arg.data
      const buffer = snapshot ? copyBytes(data.buffer as ArrayBuffer, data.byteOffset, data.byteLength) : data.buffer
      return { __netgl_imagedata: true, width: arg.width, height: arg.height, buffer: buffer as ArrayBuffer }
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
        const shadowOnly = isShadowOnly(methodName, args)
        // A deferred checkpoint goes out before this call reaches the
        // shadow or the trackers, so it holds the state the call starts
        // from.
        if (checkpointDeferred && !shadowOnly) {
          checkpointDeferred = false
          postCheckpoint()
        }

        // Draws return nothing, so skipping one changes no answer.
        const result = shadowDraws || !DRAWS.has(methodName)
          ? (value as (...a: unknown[]) => unknown).apply(target, args)
          : undefined

        if (shadowOnly) return result
        bindings.observe(methodName, args)
        state?.observe(methodName, args)

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

        owned = []
        urgent = false
        if (methodName === 'pixelStorei') observeUnpack(args)
        const encodedArgs = trimSource(methodName, args, TEX_EXTENT[methodName] ? unpackState() ?? undefined : undefined).map(encodeArg)
        const call: NetGLCall = returnId === undefined
          ? { name: methodName, args: encodedArgs }
          : { name: methodName, args: encodedArgs, returnId }
        post(call, owned.length ? owned : undefined, urgent || undefined)

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

  const postCheckpoint = (): void => {
    owned = []
    urgent = false
    for (const call of captureCheckpoint(shadow, bindings, encodeArg, state)) post(call)
  }

  return {
    gl,
    get snapshot() {
      return snapshot
    },
    set snapshot(on: boolean) {
      snapshot = on
    },
    checkpoint() {
      checkpointDeferred = false
      postCheckpoint()
    },
    deferCheckpoint() {
      checkpointDeferred = true
    }
  }
}
