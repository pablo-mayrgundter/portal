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
  // ImageBitmap passes through structured clone unchanged; the receiver
  // uploads the same bitmap (same FLIP_Y / premultiply semantics).
  | { __netgl_imagebitmap: ImageBitmap }
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
export type NetGLFrameEnd = {
  type: 'netgl:frame-end'
  /**
   * The `layer:view` (its `viewId`) the frame was drawn for, when the
   * guest draws for a host's views. Lets an asynchronous host compose the
   * frame for that view (host reprojection) and measure its lag. Optional:
   * a host that reads it falls back to the view it had in flight.
   */
  viewId?: number
  /**
   * Which of the guest's draws for one view this frame is, when it draws
   * more than once for it (a second pass with other settings): a host
   * routes each into its own target (the receiver's `beforeFrame`).
   * Absent for the main draw.
   */
  part?: string
}

/** Union of every stream message kind the NetGL protocol sends on the wire. */
export type NetGLWireMessage = NetGLCall | NetGLFrameEnd | NetGLBatch

/** Type guard: is this wire message a NetGLCall (rather than a marker)? */
export const isNetGLCall = (msg: unknown): msg is NetGLCall =>
  typeof msg === 'object' && msg !== null && typeof (msg as { name?: unknown }).name === 'string'

/** Type guard: is this wire message a frame-end marker? */
export const isNetGLFrameEnd = (msg: unknown): msg is NetGLFrameEnd =>
  typeof msg === 'object' && msg !== null && (msg as { type?: unknown }).type === 'netgl:frame-end'


// --- Wire 2: batches and a MessageChannel ---------------------------------
//
// Wire 1 (0.5.0 and before) posts one message per call and per frame-end.
// Across origins each message costs about a millisecond on the receiving
// main thread whatever its size, so a frame of ~200 calls cost ~200 ms.
// Wire 2 sends a frame's stream items as one `netgl:batch`, over a
// `MessageChannel` port when the host offers one. It is negotiated in the
// `netgl:ready` handshake, so a wire-2 guest talks wire 1 to an older host
// and a wire-2 host accepts wire 1 from an older guest. DESIGN.md, "Wire
// protocol".

/** The highest wire version this build speaks. */
export const NETGL_WIRE_VERSION = 2

/** One item of the call stream: a call or a frame-end marker. */
export type NetGLStreamItem = NetGLCall | NetGLFrameEnd

/**
 * Wire 2: several stream items in one message, in order. A guest posts one
 * per frame (its calls since the last batch, then the frame-end); calls the
 * guest makes between frames ride the next batch. The receiver handles each
 * item exactly as if it had arrived alone.
 */
export type NetGLBatch = { type: 'netgl:batch'; batch: NetGLStreamItem[] }

/**
 * Wire 2, guest → host, the first message on the port the host transferred
 * in `netgl:ready-ack`. Everything the guest posted on the window before
 * it must be handled first: `after` is how many stream items the guest had
 * posted on the window when it switched, `seq` the `seq` of the
 * `netgl:ready` the port answered (the host counts from there).
 */
export type NetGLPortOpenMessage = { type: 'netgl:port'; seq: number; after: number }

/** Type guard: is this wire message a batch of stream items? */
export const isNetGLBatch = (msg: unknown): msg is NetGLBatch =>
  typeof msg === 'object' &&
  msg !== null &&
  (msg as { type?: unknown }).type === 'netgl:batch' &&
  Array.isArray((msg as { batch?: unknown }).batch)
