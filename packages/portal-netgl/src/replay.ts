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

export const makeNetGLReplay = (receiver: WebGL2RenderingContext): NetGLReplay => {
  const idToHandle = new Map<number, object>()

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
