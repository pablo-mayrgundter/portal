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
