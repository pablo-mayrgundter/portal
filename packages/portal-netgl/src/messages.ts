// Serialised form of a single GL call. Args are encoded such that the wire
// can carry primitives, GL resource handles (as opaque netglIDs), typed
// arrays / ArrayBuffers (the WebGL data-upload path), and the small handful
// of nested structures the WebGL2 API uses.
//
// `returnId`, when present, signals to the replay engine that this call's
// return value (a GL resource or location) should be stored under that ID
// so subsequent calls can reference it.

export type NetGLEncodedValue =
  | number
  | string
  | boolean
  | null
  | { __netgl_handle: number }
  | { __netgl_typedarray: string; buffer: ArrayBuffer; offset: number; length: number }
  | { __netgl_arraybuffer: ArrayBuffer }
  // Image source envelope (HTMLImageElement / HTMLCanvasElement /
  // HTMLVideoElement / ImageBitmap / ImageData → ImageData on the receiver).
  // Sender converts the DOM source to raw RGBA bytes via a 2D canvas;
  // receiver wraps the bytes in an ImageData (which texImage2D /
  // texSubImage2D accept as an alternative to the original DOM source).
  | { __netgl_imagedata: true; width: number; height: number; buffer: ArrayBuffer }
  | NetGLEncodedValue[]

export type NetGLCall = {
  /** WebGL2 method name. */
  name: string
  /** Args encoded per the rules above. */
  args: NetGLEncodedValue[]
  /**
   * If set, the recipient should store this call's return value under this
   * ID. Used for `createBuffer`, `createTexture`, `createProgram`,
   * `createShader`, `createFramebuffer`, `createRenderbuffer`,
   * `createVertexArray`, `createSampler`, `createTransformFeedback`,
   * `createQuery`, `getUniformLocation`, and `fenceSync`.
   */
  returnId?: number
}

/**
 * End-of-frame marker posted by the sender after a complete render() pass.
 * Lets the receiver buffer in-flight NetGLCalls until a coherent frame is
 * available and then replay the whole batch atomically — necessary when
 * the receiver shares its GL context with other renderers that would
 * otherwise interleave calls between the sender's useProgram and uniform
 * sets, breaking program-location associations.
 */
export type NetGLFrameEnd = { type: 'netgl:frame-end' }

/** Union of every message kind the NetGL protocol sends on the wire. */
export type NetGLWireMessage = NetGLCall | NetGLFrameEnd

/** Type guard: is this wire message a NetGLCall (rather than a marker)? */
export const isNetGLCall = (msg: unknown): msg is NetGLCall =>
  typeof msg === 'object' && msg !== null && typeof (msg as { name?: unknown }).name === 'string'

/** Type guard: is this wire message a frame-end marker? */
export const isNetGLFrameEnd = (msg: unknown): msg is NetGLFrameEnd =>
  typeof msg === 'object' && msg !== null && (msg as { type?: unknown }).type === 'netgl:frame-end'

