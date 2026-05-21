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
    }
  }) as unknown as WebGL2RenderingContext
}
