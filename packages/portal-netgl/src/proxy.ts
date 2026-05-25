// In-process NetGL spike: a Proxy<WebGL2RenderingContext> that forwards every
// call to two contexts in parallel — a "shadow" the caller passes to three
// (which is where state queries and handle minting are answered from) and a
// "receiver" that mirrors execution. Resource handles returned by the shadow
// are interned in a table that maps them to the corresponding receiver
// handles, so subsequent calls referencing those handles can be re-keyed
// before being dispatched to the receiver.
//
// This skips the wire-serialization step deliberately. The goal of the spike
// is to validate the interception model — that three.js, given a Proxy in
// place of a real GL context, will issue a stream of calls coherent enough
// to be re-executed against a second context and produce the same pixels.
// Once that's proven, the receiver-side dispatch is replaced with a
// serialize-then-deserialize step and the same test runs across the wire.

export type NetGLProxyConfig = {
  shadow: WebGL2RenderingContext
  receiver: WebGL2RenderingContext
}

/**
 * Methods whose return value is a GL resource handle (or location). The
 * proxy captures both the shadow's and receiver's return values, interns the
 * pair in `handleTable`, and returns the shadow's value to three.
 */
const HANDLE_RETURNING_METHODS = new Set([
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
 * Methods that take a name + program and return a numeric attribute location.
 * Locations are program-specific GLints; given identical shader source and
 * link order, both contexts assign the same numbers. We forward the call to
 * both and assert they match in dev.
 */
const ATTRIB_LOCATION_METHODS = new Set(['getAttribLocation'])

export const makeNetGLProxy = (config: NetGLProxyConfig): WebGL2RenderingContext => {
  const { shadow, receiver } = config

  // shadow-side handle (or location) → receiver-side handle.
  // Plain Map (not WeakMap) so we can iterate for diagnostics. Three holds
  // strong refs to its GL resources until renderer.dispose() runs, at which
  // point explicit delete* calls clean up both sides.
  const handleTable = new Map<object, object>()

  const mapArg = (arg: unknown): unknown => {
    if (arg == null) return arg
    if (typeof arg !== 'object') return arg
    const mapped = handleTable.get(arg as object)
    return mapped !== undefined ? mapped : arg
  }

  return new Proxy(shadow, {
    get(target, prop, _receiver) {
      const value = Reflect.get(target, prop)
      if (typeof value !== 'function') {
        // GL constants (gl.ARRAY_BUFFER, gl.TRIANGLES, etc.) and the .canvas
        // property all flow through here. Always return the shadow's value.
        return value
      }
      const methodName = typeof prop === 'string' ? prop : String(prop)
      const receiverFn = (receiver as unknown as Record<string, unknown>)[methodName]

      return function netglProxiedCall(...args: unknown[]): unknown {
        // Map any WebGL object args from shadow-side to receiver-side handles.
        const mappedArgs = args.map(mapArg)

        // Execute on receiver first when the call has no return-value
        // dependency on shadow state. For resource creation we need both
        // sides' return values to intern the pair, so the order doesn't
        // matter — both are called regardless.
        let receiverResult: unknown = undefined
        if (typeof receiverFn === 'function') {
          receiverResult = (receiverFn as (...a: unknown[]) => unknown).apply(receiver, mappedArgs)
        }

        const shadowResult = (value as (...a: unknown[]) => unknown).apply(target, args)

        if (HANDLE_RETURNING_METHODS.has(methodName)) {
          if (
            shadowResult != null &&
            typeof shadowResult === 'object' &&
            receiverResult != null &&
            typeof receiverResult === 'object'
          ) {
            handleTable.set(shadowResult as object, receiverResult as object)
          }
        } else if (ATTRIB_LOCATION_METHODS.has(methodName)) {
          // GLint locations should match across contexts given identical
          // shader source + link order. If they don't, we'd need a per-program
          // attribute-location map. For now, surface the mismatch loudly.
          if (shadowResult !== receiverResult && shadowResult !== -1) {
            throw new Error(
              `NetGL: attrib location divergence for ${String(args[1])}: ` +
                `shadow=${shadowResult} receiver=${receiverResult}`
            )
          }
        }

        return shadowResult
      }
    }
  }) as unknown as WebGL2RenderingContext
}
