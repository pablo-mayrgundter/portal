// Replay sibling of `makeNetGLRecorder`. Consumes the `NetGLCall` stream and
// executes each call against a real `WebGL2RenderingContext`. Maintains its
// own netglID → receiver-side handle table so calls that reference a
// previously-created resource resolve to the right WebGLBuffer / Texture /
// etc. on this side of the wire.

import type { NetGLCall, NetGLEncodedValue } from './messages'
import { makeScreenPolicyState, type NetGLScreenPolicy } from './screen-policy'

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

export type NetGLReplay = ((call: NetGLCall) => void) & {
  /**
   * Tell the replay the host has touched the shared GL context since the
   * last replayed call (its own render, stencil-mask paint, clearDepth).
   * The replay forgets which screen-policy overrides it believes are
   * applied and re-applies them before the next draw. Call before
   * draining each batch. Cheap; no GL calls.
   */
  invalidate(): void
}

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

  /**
   * Compositing overrides for draws that target the host's default
   * framebuffer: portal stencil, premultiplied blend, clear filtering.
   * Moves the "don't paint outside the door / don't wipe the host" rules
   * out of each framework's guest shim and into the host. See
   * `screen-policy.ts`. Default: no overrides.
   */
  screen?: NetGLScreenPolicy

  /**
   * Redirect the guest's default framebuffer to a host framebuffer. When
   * set, every `bindFramebuffer(target, null)` the guest issues binds this
   * instead (resolved per call, so it can follow a resizing render
   * target), and `BACK` in drawBuffers / readBuffer becomes
   * `COLOR_ATTACHMENT0`. Everything else still treats those draws as
   * "screen" draws: viewport remap and screen policy apply.
   *
   * For hosts that render their scene into an offscreen target and
   * composite it later — celestiary renders into an RT and then runs an
   * atmosphere pass to the canvas — the guest must land in that RT, next
   * to the host's depth and stencil, not on the canvas.
   */
  screenFramebuffer?: () => WebGLFramebuffer | null

  /**
   * @internal — debug-only hook with no API stability guarantee.
   *
   * Called with a one-line description of every viewport, scissor, and
   * SCISSOR_TEST enable/disable call as it replays. Useful while tracing
   * why a door-fit remap isn't sticking, but the exact line format,
   * what calls trigger it, and even whether it exists at all can change
   * across releases. Production code should leave this unset.
   */
  __debugTraceViewport?: (line: string) => void
}

// WebGL constants we need at decode time. Hardcoded because we don't always
// have a context around (the replay closure does, but the decode logic is
// uniform). Values are from the GL spec, identical across WebGL1/WebGL2.
const GL_FRAMEBUFFER = 0x8D40
const GL_DRAW_FRAMEBUFFER = 0x8CA9
const GL_SCISSOR_TEST = 0x0C11
const GL_DEPTH_BUFFER_BIT = 0x0100
const GL_DEPTH = 0x1801
const GL_DEPTH_STENCIL = 0x84F9
const GL_BACK = 0x0405
const GL_COLOR_ATTACHMENT0 = 0x8CE0

type Rect = readonly [number, number, number, number]

const DRAW_CALLS = new Set<string>([
  'drawArrays',
  'drawElements',
  'drawArraysInstanced',
  'drawElementsInstanced',
  'drawRangeElements',
  'clear',
  'clearBufferfv',
  'clearBufferiv',
  'clearBufferuiv',
  'clearBufferfi'
])

export const makeNetGLReplay = (
  receiver: WebGL2RenderingContext,
  config: NetGLReplayConfig = {}
): NetGLReplay => {
  const idToHandle = new Map<number, object>()
  // Current draw-framebuffer binding. Null = default framebuffer (host
  // canvas). Tracked here rather than read from gl.getParameter so we
  // don't trigger a synchronous query per call.
  let currentDrawFb: object | null = null
  // The sender's intended viewport before any host-side remap. Captured
  // from every viewport call. We re-issue this on the host after any
  // bindFramebuffer transition because the sender's WebGLState caches its
  // own viewport value and skips redundant gl.viewport calls when its
  // cached value matches the new target's intended viewport — but the
  // host's *actual* gl.viewport may have been remapped to the door rect
  // in the meantime, so without re-issuing we'd render the next bound
  // framebuffer at the wrong viewport. (Concretely: the sender's atm pass
  // sets viewport to door rect via our remap; then next frame's
  // setRenderTarget(rt) wants viewport = (0,0,W,H), three's cache says
  // "same as before" and skips, so the RT render runs at the door-rect
  // viewport on the host, populating only a tiny region of the RT.)
  let lastIntendedViewport: Rect | null = null
  // The viewport actually applied to the receiver right now (post-remap),
  // or null if unknown. Used to map scissor rects through the same
  // transform as the viewport, and to confine screen depth clears.
  let appliedViewport: Rect | null = null
  // Scissor, same idea: the sender's intended box, and whether the sender
  // has SCISSOR_TEST enabled.
  let lastIntendedScissor: Rect | null = null
  let scissorTestEnabled = false

  const policy = config.screen ? makeScreenPolicyState(receiver, config.screen) : null
  const depthOnlyClears = config.screen?.clear === 'depth-only'

  // Map a rect in the sender's intended-viewport space into the applied
  // (remapped) viewport. Identity when no remap is in effect.
  const mapRectToApplied = (r: Rect): Rect => {
    const iv = lastIntendedViewport
    const av = appliedViewport
    if (currentDrawFb !== null || !iv || !av || iv[2] === 0 || iv[3] === 0) return r
    if (iv[0] === av[0] && iv[1] === av[1] && iv[2] === av[2] && iv[3] === av[3]) return r
    const sx = av[2] / iv[2]
    const sy = av[3] / iv[3]
    const x0 = av[0] + (r[0] - iv[0]) * sx
    const y0 = av[1] + (r[1] - iv[1]) * sy
    const x1 = av[0] + (r[0] + r[2] - iv[0]) * sx
    const y1 = av[1] + (r[1] + r[3] - iv[1]) * sy
    const fx0 = Math.floor(x0)
    const fy0 = Math.floor(y0)
    return [fx0, fy0, Math.ceil(x1) - fx0, Math.ceil(y1) - fy0]
  }

  const reissueScissor = (): void => {
    if (!lastIntendedScissor) return
    const [x, y, w, h] = mapRectToApplied(lastIntendedScissor)
    receiver.scissor(x, y, w, h)
  }

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
    if ('__netgl_imagebitmap' in obj) {
      return obj.__netgl_imagebitmap as ImageBitmap
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

  // Screen clears under the 'depth-only' policy. Returns true if the call
  // was fully handled (dropped, or executed here) and must not run again.
  const filterScreenClear = (name: string, args: unknown[]): boolean => {
    if (name === 'clear') {
      const mask = (args[0] as number) & GL_DEPTH_BUFFER_BIT
      if (mask === 0) return true
      policy?.beforeDraw(true)
      clearConfined(() => receiver.clear(mask))
      return true
    }
    if (name === 'clearBufferfv' && args[0] === GL_DEPTH) {
      policy?.beforeDraw(true)
      clearConfined(() => receiver.clearBufferfv(GL_DEPTH, args[1] as number, args[2] as Float32List))
      return true
    }
    if (name === 'clearBufferfi' && args[0] === GL_DEPTH_STENCIL) {
      const depth = args[2] as number
      policy?.beforeDraw(true)
      clearConfined(() => receiver.clearBufferfv(GL_DEPTH, 0, [depth]))
      return true
    }
    // Colour / stencil clearBuffer* on the screen: dropped.
    if (name.startsWith('clearBuffer')) return true
    // Not a clear: a draw call, which the caller executes.
    return false
  }

  // Run a clear with the scissor confined to the applied viewport, unless
  // the sender already has its own (remapped) scissor in effect.
  const clearConfined = (doClear: () => void): void => {
    if (scissorTestEnabled || !appliedViewport) {
      doClear()
      return
    }
    const [x, y, w, h] = appliedViewport
    receiver.enable(GL_SCISSOR_TEST)
    receiver.scissor(x, y, w, h)
    doClear()
    receiver.disable(GL_SCISSOR_TEST)
    reissueScissor()
  }

  const replay = (call: NetGLCall): void => {
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
    // Note that we update `currentDrawFb` BEFORE applying the original
    // method below; the post-bind viewport re-issue at the bottom reads
    // the updated value.
    //
    // Identity comparison (`!==`) is correct here: the sender's recorder
    // and our replay agree on FBO identity through the netglID interning
    // — `bindFramebuffer(target, fbo)` ships the FBO as a __netgl_handle
    // ref, decodeArg resolves it back to the same WebGLFramebuffer
    // instance held in `idToHandle`. So the same FBO at two different
    // bind sites compares equal.
    let didBindTransition = false
    if (call.name === 'bindFramebuffer') {
      const target = decodedArgs[0] as number
      if (target === GL_FRAMEBUFFER || target === GL_DRAW_FRAMEBUFFER) {
        const newFb = decodedArgs[1] as object | null
        if (newFb !== currentDrawFb) didBindTransition = true
        currentDrawFb = newFb
      }
      if (decodedArgs[1] === null && config.screenFramebuffer) {
        decodedArgs = [target, config.screenFramebuffer()]
      }
    } else if (config.screenFramebuffer) {
      // BACK names the default framebuffer's colour buffer; on the host's
      // stand-in FBO that's attachment 0.
      if (call.name === 'drawBuffers') {
        decodedArgs = [(decodedArgs[0] as number[]).map((b) => (b === GL_BACK ? GL_COLOR_ATTACHMENT0 : b))]
      } else if (call.name === 'readBuffer' && decodedArgs[0] === GL_BACK) {
        decodedArgs = [GL_COLOR_ATTACHMENT0]
      }
    }

    // Door-fit viewport remap: when the sender targets the host canvas
    // (default FB) and the host has configured a remap, replace the
    // viewport call's args with the host-supplied rect. RT-targeted
    // viewports pass through unchanged. Either way, capture the sender's
    // INTENDED (pre-remap) viewport so we can re-apply it across bind
    // transitions.
    if (call.name === 'viewport') {
      const [x, y, w, h] = decodedArgs as [number, number, number, number]
      lastIntendedViewport = [x, y, w, h]
      if (currentDrawFb === null && config.remapScreenViewport) {
        const remapped = config.remapScreenViewport(x, y, w, h)
        if (remapped !== null) {
          decodedArgs = [remapped[0], remapped[1], remapped[2], remapped[3]]
        }
      }
      appliedViewport = decodedArgs as unknown as Rect
    } else if (call.name === 'scissor') {
      // Scissor boxes are in the same pixel space as the viewport, so a
      // screen scissor has to follow the viewport remap or it clips the
      // guest's draws to where they WOULD have landed on its own canvas.
      const r = decodedArgs as unknown as Rect
      lastIntendedScissor = [r[0], r[1], r[2], r[3]]
      decodedArgs = [...mapRectToApplied(lastIntendedScissor)]
    } else if ((call.name === 'enable' || call.name === 'disable') && decodedArgs[0] === GL_SCISSOR_TEST) {
      scissorTestEnabled = call.name === 'enable'
    }

    if (policy && policy.intercept(call.name, decodedArgs)) return

    if (DRAW_CALLS.has(call.name)) {
      const toScreen = currentDrawFb === null
      if (toScreen && depthOnlyClears && filterScreenClear(call.name, decodedArgs)) return
      policy?.beforeDraw(toScreen)
    }

    // Diagnostic: dump every viewport + scissor + scissor-enable call with
    // context so we can see if something downstream undoes the remap.
    if (
      config.__debugTraceViewport &&
      (call.name === 'viewport' || call.name === 'scissor' || call.name === 'enable' || call.name === 'disable')
    ) {
      if (call.name === 'enable' || call.name === 'disable') {
        const cap = decodedArgs[0] as number
        // GL_SCISSOR_TEST = 0xC11
        if (cap === 0xC11) {
          config.__debugTraceViewport(`${call.name}(SCISSOR_TEST) drawFb=${currentDrawFb ? 'RT' : 'null'}`)
        }
      } else {
        const [x, y, w, h] = decodedArgs as [number, number, number, number]
        config.__debugTraceViewport(`${call.name}(${x},${y},${w}x${h}) drawFb=${currentDrawFb ? 'RT' : 'null'}`)
      }
    }

    const method = (receiver as unknown as Record<string, (...a: unknown[]) => unknown>)[
      call.name
    ]
    if (typeof method !== 'function') {
      throw new Error(`NetGL replay: receiver has no method '${call.name}'`)
    }
    const result = method.apply(receiver, decodedArgs)

    // A remapped screen viewport moves the scissor mapping with it.
    if (call.name === 'viewport' && currentDrawFb === null && config.remapScreenViewport) {
      reissueScissor()
    }

    // After a bindFramebuffer transition, re-issue gl.viewport with the
    // appropriate rect for the new binding. See the comment on
    // `lastIntendedViewport` above for why this is needed.
    if (didBindTransition && lastIntendedViewport) {
      const [x, y, w, h] = lastIntendedViewport
      // Compute the rect once (the remap callback may have side effects /
      // be non-trivial work like projecting the door corners through the
      // host camera) so we don't call it twice for the same transition.
      const remapped = currentDrawFb === null && config.remapScreenViewport
        ? config.remapScreenViewport(x, y, w, h)
        : null
      const rx = remapped ? remapped[0] : x
      const ry = remapped ? remapped[1] : y
      const rw = remapped ? remapped[2] : w
      const rh = remapped ? remapped[3] : h
      receiver.viewport(rx, ry, rw, rh)
      appliedViewport = [rx, ry, rw, rh]
      reissueScissor()
      if (config.__debugTraceViewport) {
        config.__debugTraceViewport(
          `post-bind re-issue viewport(${rx},${ry},${rw}x${rh}) drawFb=${currentDrawFb ? 'RT' : 'null'}`
        )
      }
    }

    if (
      call.returnId !== undefined &&
      result != null &&
      typeof result === 'object'
    ) {
      idToHandle.set(call.returnId, result)
    }
  }

  return Object.assign(replay, {
    invalidate() {
      policy?.invalidate()
    }
  })
}
