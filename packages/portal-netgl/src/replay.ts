// Replay sibling of `makeNetGLRecorder`. Consumes the `NetGLCall` stream and
// executes each call against a real `WebGL2RenderingContext`. Maintains its
// own netglID → receiver-side handle table so calls that reference a
// previously-created resource resolve to the right WebGLBuffer / Texture /
// etc. on this side of the wire.

import type { NetGLCall, NetGLEncodedValue } from './messages'

type TypedArrayCtor = new (
  buffer: ArrayBuffer,
  byteOffset: number,
  length: number
) => ArrayBufferView

const TYPED_ARRAY_CTORS: Record<string, TypedArrayCtor> = {
  Int8Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array
}

export type NetGLReplay = (call: NetGLCall) => void

export type NetGLReplayConfig = {
  /**
   * Remap viewport calls that target the default framebuffer (i.e. the
   * host canvas) to a different rect. Lets the host place an embedded
   * app's fullscreen render inside a specific region (e.g. the portal
   * door) without the embedded app needing to know about the host's
   * compositing scheme.
   *
   * Called once per `gl.viewport(x, y, w, h)` while the current
   * draw-framebuffer is null. Return the rect to actually apply
   * (`[x, y, w, h]` in pixel coords), or `null` to pass the sender's
   * original args through unchanged.
   *
   * Render-target viewport calls (current draw-framebuffer != null)
   * always pass through unchanged — sub-RT viewports are app-internal.
   */
  remapScreenViewport?: (
    x: number,
    y: number,
    w: number,
    h: number
  ) => readonly [number, number, number, number] | null
}

// WebGL constants we need at decode time. Hardcoded because we don't always
// have a context around (the replay closure does, but the decode logic is
// uniform). Values are from the GL spec, identical across WebGL1/WebGL2.
const GL_FRAMEBUFFER = 0x8D40
const GL_DRAW_FRAMEBUFFER = 0x8CA9

export const makeNetGLReplay = (
  receiver: WebGL2RenderingContext,
  config: NetGLReplayConfig = {}
): NetGLReplay => {
  const idToHandle = new Map<number, object>()
  // Current draw-framebuffer binding. Null = default framebuffer (host
  // canvas). Tracked here rather than read from gl.getParameter so we
  // don't trigger a synchronous query per call.
  let currentDrawFb: object | null = null

  const decodeArg = (arg: NetGLEncodedValue): unknown => {
    if (arg == null) return null
    const t = typeof arg
    if (t === 'number' || t === 'string' || t === 'boolean') return arg
    if (Array.isArray(arg)) return arg.map(decodeArg)
    if (typeof arg !== 'object') return arg
    const obj = arg as Record<string, unknown>
    if ('__netgl_handle' in obj) {
      const id = obj.__netgl_handle as number
      const handle = idToHandle.get(id)
      if (handle === undefined) {
        throw new Error(`NetGL replay: unknown handle id ${id}`)
      }
      return handle
    }
    if ('__netgl_typedarray' in obj) {
      const name = obj.__netgl_typedarray as string
      const ctor = TYPED_ARRAY_CTORS[name]
      if (!ctor) throw new Error(`NetGL replay: unknown typed-array ${name}`)
      return new ctor(
        obj.buffer as ArrayBuffer,
        obj.offset as number,
        obj.length as number
      )
    }
    if ('__netgl_arraybuffer' in obj) {
      return obj.__netgl_arraybuffer as ArrayBuffer
    }
    if ('__netgl_imagedata' in obj) {
      // ImageData envelope: sender converted an HTMLImageElement /
      // HTMLCanvasElement / HTMLVideoElement / ImageBitmap / ImageData to
      // raw pixels via a 2D canvas. Reconstruct an ImageData; texImage2D /
      // texSubImage2D both accept ImageData as an alternative to the
      // original DOM source.
      const width = obj.width as number
      const height = obj.height as number
      const buffer = obj.buffer as ArrayBuffer
      const data = new Uint8ClampedArray(buffer)
      return new ImageData(data, width, height)
    }
    throw new Error(`NetGL replay: unknown encoded value shape`)
  }

  return (call: NetGLCall): void => {
    let decodedArgs: unknown[]
    try {
      decodedArgs = call.args.map(decodeArg)
    } catch (err) {
      // Re-throw with call name so the cause is visible. The most common
      // shape is "unknown handle id N" while decoding an arg — that means
      // a handle-returning call (createTexture, createProgram,
      // getUniformLocation, etc.) referenced by this call never reached the
      // receiver. Usually means the sender's frame-batching dropped a
      // batch that contained the mint; see host main.ts's frame-end
      // concat logic.
      const msg = err instanceof Error ? err.message : String(err)
      throw new Error(`NetGL replay (decoding ${call.name}): ${msg}`)
    }

    // Track framebuffer binding so we know when subsequent viewport calls
    // target the host canvas (currentDrawFb === null) vs an offscreen RT.
    if (call.name === 'bindFramebuffer') {
      const target = decodedArgs[0] as number
      if (target === GL_FRAMEBUFFER || target === GL_DRAW_FRAMEBUFFER) {
        currentDrawFb = decodedArgs[1] as object | null
      }
    }

    // Door-fit viewport remap: when the sender targets the host canvas
    // (default FB) and the host has configured a remap, replace the
    // viewport call's args with the host-supplied rect. RT-targeted
    // viewports pass through unchanged.
    if (
      call.name === 'viewport' &&
      currentDrawFb === null &&
      config.remapScreenViewport
    ) {
      const [x, y, w, h] = decodedArgs as [number, number, number, number]
      const remapped = config.remapScreenViewport(x, y, w, h)
      if (remapped !== null) {
        decodedArgs = [remapped[0], remapped[1], remapped[2], remapped[3]]
      }
    }

    const method = (receiver as unknown as Record<string, (...a: unknown[]) => unknown>)[
      call.name
    ]
    if (typeof method !== 'function') {
      throw new Error(`NetGL replay: receiver has no method '${call.name}'`)
    }
    const result = method.apply(receiver, decodedArgs)
    if (
      call.returnId !== undefined &&
      result != null &&
      typeof result === 'object'
    ) {
      idToHandle.set(call.returnId, result)
    }
  }
}
