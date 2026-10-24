// luma.gl / deck.gl host adapter — "deck′" as the embedding side.
//
// A NetGL guest replays into deck.gl's own WebGL2 context, right after deck
// draws its layers (`onAfterRender`), so the guest's draws depth-test
// against deck's globe. Three things make that work:
//
// 1. State: restore, don't invalidate. luma.gl spies on the context's state
//    setters (WebGLStateTracker installs wrappers on the gl instance), and
//    the replay calls `gl[name](...)` on that same instance, so luma's cache
//    follows every guest call and never goes stale. But luma's pipelines
//    set only the parameters a layer names and assume the defaults for the
//    rest, so state the guest leaves behind leaks into deck's next frame (a
//    three.js guest enables CULL_FACE, and deck's land polygons, wound
//    either way, lose triangles). `device.pushState()` before the guest and
//    `device.popState()` after put back every tracked value the guest
//    changed: deck's next frame is bit-identical to one where the guest
//    never ran. This is the opposite of a three.js host, which invalidates
//    its cache (`renderer.resetState()`).
//
// 2. Frame: `onAfterRender` runs synchronously inside `deck.redraw()`, after
//    the layers have drawn to the default framebuffer, with deck's depth
//    still valid. deck renders on demand, so an asynchronous guest (an
//    iframe) has to ask for a redraw when its frame arrives. The adapter
//    asks for one in the next animation frame and drops it if deck drew in
//    the meantime (the controller moving the camera, or the host's own
//    `deck.redraw()` from a clock): that draw already drained the frame.
//    deck 9 has no public "needs redraw" flag (`layerManager` is
//    protected), so this is the adapter's own folding.
//
// 3. View: deck's GlobeViewport works in "common" units (a sphere of 256
//    for the Earth's radius). The adapter derives the ECEF → common map
//    numerically from `viewport.projectPosition` (not deck's internal
//    constants, which `_GlobeView` doesn't export and may change), folds it
//    into deck's view matrix in doubles, and splits off the uniform scale:
//    the guest gets a rigid view in ECEF metres and deck's projection with
//    the scale put back. Clip space is deck's, so depth agrees.
//
// Neither deck.gl nor luma.gl is imported: the adapter is typed
// structurally against the members it touches, like the Cesium shim.

import { makeNetGLHostReceiver, type NetGLHostReceiver } from '../host-receiver'
import { makeNetGLImmediateLink, type NetGLImmediateLink } from '../immediate-link'
import type { NetGLReadyMessage } from '../guest-context'
import {
  isNetGLLayerAnchorsMessage,
  isNetGLLayerHelloMessage,
  isNetGLLayerInvalidateMessage,
  mat4Multiply,
  mat4TransformVec4,
  sphereToEcef,
  type NetGLLayerAnchorsMessage,
  type NetGLLayerAnchorsSubscribeMessage,
  type NetGLLayerHelloAckMessage,
  type NetGLLayerHelloAnswer,
  type NetGLLayerHelloMessage,
  type NetGLLayerView,
  type NetGLLayerViewMessage,
  type NetGLMat4
} from '../layer-view'
import type { NetGLTransport } from '../renderer'
import type { NetGLReplayConfig } from '../replay'

/** The slice of a luma.gl `WebGLDevice` the adapter uses. */
export type LumaDeviceLike = {
  gl: WebGL2RenderingContext
  pushState(): void
  popState(): void
}

/** The slice of a deck.gl `Viewport` the adapter uses. */
export type DeckViewportLike = {
  id?: string
  x: number
  y: number
  width: number
  height: number
  viewMatrix: ArrayLike<number>
  projectionMatrix: ArrayLike<number>
  projectPosition(xyz: number[]): ArrayLike<number>
}

/** The slice of a deck.gl `Deck` the adapter uses. */
export type DeckLike = {
  // deck's own type is `(context: { device: Device; gl }) => void`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: { onAfterRender?: ((context: any) => void) | null }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setProps(props: { onAfterRender?: (context: any) => void }): void
  redraw(reason?: string): void
  getViewports(): DeckViewportLike[]
}

/**
 * Run `fn` between luma's `pushState()` and `popState()`: every GL
 * parameter luma tracks that `fn` changes is put back afterwards, even if
 * `fn` throws.
 */
export const withLumaState = <T>(device: LumaDeviceLike, fn: () => T): T => {
  device.pushState()
  try {
    return fn()
  } finally {
    device.popState()
  }
}

export type GlobeFrame = {
  /** ECEF metres → deck common units, column-major. */
  ecefToCommon: NetGLMat4
  /** Common units per metre. */
  unitsPerMetre: number
  /** The radius, in metres, of the sphere deck puts longitude and latitude on. */
  earthRadius: number
}

const frames = new WeakMap<object, GlobeFrame | null>()

/**
 * The linear map from ECEF metres to a globe viewport's common space,
 * measured with `projectPosition`. Returns null when the viewport's
 * projection isn't a linear map of ECEF (a Web Mercator map, an orbit view),
 * which no 4×4 view can express. Cached per viewport class.
 */
export const globeFrameOfViewport = (viewport: DeckViewportLike): GlobeFrame | null => {
  const key = Object.getPrototypeOf(viewport) as object
  if (frames.has(key)) return frames.get(key)!
  const frame = measureGlobeFrame(viewport)
  frames.set(key, frame)
  return frame
}

const measureGlobeFrame = (viewport: DeckViewportLike): GlobeFrame | null => {
  const p = (lng: number, lat: number, alt: number): number[] => Array.from(viewport.projectPosition([lng, lat, alt]))
  const len = (v: number[]): number => Math.hypot(v[0], v[1], v[2])
  const H = 1e6
  const x0 = p(0, 0, 0)
  const xh = p(0, 0, H)
  const k = (len(xh) - len(x0)) / H
  if (!(k > 0) || !Number.isFinite(k)) return null
  const R = len(x0) / k
  // Columns: where the ECEF axes land, per metre.
  const ex = x0.map((c) => c / R)
  const ey = p(90, 0, 0).map((c) => c / R)
  const ez = p(0, 90, 0).map((c) => c / R)
  const ecefToCommon: NetGLMat4 = [...ex, 0, ...ey, 0, ...ez, 0, 0, 0, 0, 1]
  // Check it's k times a proper rotation and that it predicts other points:
  // a projection that isn't linear in ECEF fails here.
  const dot = (a: number[], b: number[]): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  const tol = 1e-9 * k * k
  if (Math.abs(dot(ex, ey)) > tol || Math.abs(dot(ex, ez)) > tol || Math.abs(dot(ey, ez)) > tol) return null
  const cross = [ex[1] * ey[2] - ex[2] * ey[1], ex[2] * ey[0] - ex[0] * ey[2], ex[0] * ey[1] - ex[1] * ey[0]]
  if (dot(cross, ez) <= 0) return null
  for (const [lng, lat, alt] of [[37.5, -21.25, 4.2e5], [-151, 63, 3.6e7], [12, 0.5, -1e3]]) {
    const want = p(lng, lat, alt)
    const got = mat4TransformVec4(ecefToCommon, [...sphereToEcef(lng, lat, alt, R), 1])
    const err = Math.hypot(want[0] - got[0], want[1] - got[1], want[2] - got[2])
    if (err > 1e-9 * len(want)) return null
  }
  return { ecefToCommon, unitsPerMetre: k, earthRadius: R }
}

export type GlobeLayerViewOptions = {
  /** The frame's time, Unix ms UTC. */
  timeMs: number
  /** The drawing buffer's size in pixels (`gl.drawingBufferWidth/Height`). */
  drawingBufferWidth: number
  drawingBufferHeight: number
  /** Drawing-buffer pixels per CSS pixel. Default: drawing-buffer width ÷ `cssWidth`. */
  pixelRatio?: number
  /** The canvas's CSS width, for the default pixel ratio. Default: the viewport's right edge. */
  cssWidth?: number
}

/**
 * A deck.gl globe viewport as a `NetGLLayerView` in ECEF metres, or null if
 * the viewport isn't a globe (see `globeFrameOfViewport`). Doubles
 * throughout: V·M = s·[R|t] is split into the rigid view [R|t] and the
 * projection P·diag(s, s, s, 1).
 */
export const globeLayerView = (viewport: DeckViewportLike, opts: GlobeLayerViewOptions): NetGLLayerView | null => {
  const frame = globeFrameOfViewport(viewport)
  if (!frame) return null
  const W = mat4Multiply(viewport.viewMatrix, frame.ecefToCommon)
  const s = Math.hypot(W[0], W[1], W[2])
  if (!(s > 0)) return null
  // Divide rows 0..2 by s (column-major: index i is row i % 4).
  const viewMatrix = W.map((v, i) => (i % 4 === 3 ? v : v / s))
  viewMatrix[15] = 1
  const projectionMatrix = mat4Multiply(viewport.projectionMatrix, [s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1])
  const cssWidth = opts.cssWidth ?? viewport.x + viewport.width
  const pr = opts.pixelRatio ?? opts.drawingBufferWidth / cssWidth
  const x = Math.round(viewport.x * pr)
  const w = Math.round(viewport.width * pr)
  const h = Math.round(viewport.height * pr)
  const y = Math.round(opts.drawingBufferHeight - (viewport.y + viewport.height) * pr)
  return {
    frame: 'ecef',
    viewMatrix,
    projectionMatrix,
    viewport: [x, y, w, h],
    pixelRatio: pr,
    timeMs: opts.timeMs,
    earth: { model: 'sphere', radius: frame.earthRadius }
  }
}

type DeckLayerBase = {
  /** deck's luma device, from `onDeviceInitialized` (or `deck.device`). */
  device: LumaDeviceLike
  /** Which of deck's views to follow, by id. Default: the first viewport. */
  viewId?: string
  /** The host's clock, Unix ms UTC. Default `Date.now`. */
  time?: () => number
  /**
   * Viewport → view. Default `globeLayerView`, which returns null (the
   * guest is skipped) for anything but a globe.
   */
  view?: (viewport: DeckViewportLike, opts: GlobeLayerViewOptions) => NetGLLayerView | null
  /**
   * Replay config. The screen policy defaults to `clear: 'none'`: the
   * guest draws into deck's finished frame and tests against its depth, so
   * none of its screen clears may run (pass `screen: { clear: 'pass' }` to
   * let them). Set `screenFramebuffer` when deck renders into your
   * framebuffer (`Deck._framebuffer`) rather than the canvas.
   */
  replay?: NetGLReplayConfig
  /**
   * `'luma-stack'` (default): bracket the guest with push/popState.
   * `'none'` lets the guest's state leak into deck's next frame; for tests.
   */
  restore?: 'luma-stack' | 'none'
  onReady?: (msg: NetGLReadyMessage) => void
  /**
   * Decide the answer to the guest's `layer:hello` (repeated until acked;
   * this is called for each). Default: `{ accepted: true }`, the RFC's
   * defaults. Views go to the guest once it has said `netgl:ready` or
   * `layer:hello`, accepted or not: refusing doesn't stop the layer.
   */
  acceptHello?: (hello: NetGLLayerHelloMessage) => NetGLLayerHelloAnswer
  /** The guest's first `layer:hello` (and a later one after a reload). */
  onHello?: (hello: NetGLLayerHelloMessage) => void
  /** Every `layer:anchors` the guest publishes (also `layer.onAnchors`). */
  onAnchors?: (msg: NetGLLayerAnchorsMessage) => void
  /** Any other message from the guest. */
  onControl?: (msg: unknown) => void
  onError?: (err: unknown) => void
}

/** Same page: the guest renders synchronously inside deck's frame. */
export type DeckImmediateLayerConfig = DeckLayerBase & {
  /**
   * Render one guest frame for `view`, ending with the guest's
   * `endFrame()`. Called inside `onAfterRender`; every GL call replays into
   * deck's context as it's made. Give the guest the layer's `transport`.
   */
  render: (view: NetGLLayerView) => void
}

/** Another window (an iframe, cross-origin or not): frames arrive by message. */
export type DeckReceiverLayerConfig = DeckLayerBase & {
  /** The transport to the guest (`iframeTransport(iframe, { origin })`). */
  transport: NetGLTransport
  /**
   * How long a `layer:view` may go unanswered before the next one is sent
   * anyway. Default 1000 ms.
   */
  viewTimeoutMs?: number
}

export type NetGLDeckLayerConfig = DeckImmediateLayerConfig | DeckReceiverLayerConfig

export type NetGLDeckLayerStats = {
  /** deck frames seen. */
  hostFrames: number
  /** Guest frames replayed (immediate: rendered; receiver: drained, re-runs included). */
  guestFrames: number
  /** `layer:view` messages posted (receiver only). */
  viewsSent: number
  /** ms spent in the last guest replay, push/pop included. */
  lastMs: number
  /** Redraws the adapter forced (`deck.redraw(reason)`). */
  redrawsForced: number
  /** Redraws the adapter wanted but dropped, deck having drawn already. */
  redrawsFolded: number
}

export type NetGLDeckLayer = {
  /** The guest's transport: hand it to the guest (immediate), or the one you passed. */
  readonly transport: NetGLTransport
  readonly link: NetGLImmediateLink | null
  readonly receiver: NetGLHostReceiver | null
  /** The view of the last deck frame the guest was drawn into. */
  readonly lastView: NetGLLayerView | null
  readonly stats: NetGLDeckLayerStats
  /** Skip the guest while false. Setting it asks deck for a redraw. */
  enabled: boolean
  /** The guest's `layer:hello`, once received. */
  readonly hello: NetGLLayerHelloMessage | null
  /** The last `layer:anchors` the guest published. */
  readonly anchors: NetGLLayerAnchorsMessage | null
  /**
   * Ask the guest to publish these anchors (`layer:anchors-subscribe`;
   * replaces the subscription). Held until the guest is live (see
   * `postToGuest`) and re-sent on each later `layer:hello`, so it can be
   * called before the guest has loaded.
   */
  subscribeAnchors(patterns: string[], opts?: Omit<NetGLLayerAnchorsSubscribeMessage, 'type' | 'patterns'>): void
  /** Call `listener` with each `layer:anchors`. Returns an unsubscribe. */
  onAnchors(listener: (msg: NetGLLayerAnchorsMessage) => void): () => void
  /**
   * Post any control message to the guest. For an iframe guest, messages
   * are queued until it is live (its first `layer:hello` or `netgl:ready`)
   * and then sent in order: before that the iframe may not have navigated
   * to the guest's origin yet, and a post with its origin as target would
   * be dropped (Chromium logs "target origin does not match").
   */
  postToGuest(msg: unknown): void
  /** Whether the guest has said `layer:hello` or `netgl:ready`. */
  readonly live: boolean
  /**
   * Receiver only: ask the guest for a frame of the last viewport at the
   * host's current time, without redrawing deck now; deck redraws once,
   * when the frame arrives. For a clock that moves only the guest's
   * content: calling `deck.redraw()` each tick instead draws deck twice
   * per tick (once with the old guest frame, once when the new one
   * lands). Nothing is sent while a view is in flight (the redraw its
   * frame brings sends the new time) or when the view hasn't changed.
   * Returns whether a view was sent.
   */
  requestGuestFrame(): boolean
  /** Restore deck's previous `onAfterRender` and stop listening. */
  detach(): void
}

const sameView = (a: NetGLLayerView, b: NetGLLayerView): boolean => {
  if (a.timeMs !== b.timeMs || a.pixelRatio !== b.pixelRatio) return false
  for (let i = 0; i < 4; i += 1) if (a.viewport[i] !== b.viewport[i]) return false
  for (let i = 0; i < 16; i += 1) {
    if (a.viewMatrix[i] !== b.viewMatrix[i] || a.projectionMatrix[i] !== b.projectionMatrix[i]) return false
  }
  return true
}

const nextFrame = (cb: () => void): void => {
  const raf = (globalThis as { requestAnimationFrame?: (cb: () => void) => number }).requestAnimationFrame
  if (raf) raf(cb)
  else setTimeout(cb, 16)
}

/**
 * Composite a NetGL guest into a deck.gl Deck, after deck's layers, in
 * deck's context, depth-tested against them.
 *
 * - With `render`, the guest is in this page: give it `layer.transport`,
 *   and it renders synchronously in each deck frame (zero lag). deck still
 *   renders on demand, so a live clock needs `_animate: true` or redraws.
 * - With `transport`, the guest is in another window: the adapter posts a
 *   `layer:view` after each deck frame that changed the view (at most one
 *   unanswered), and redraws deck when the guest's frame arrives. The guest
 *   is drawn one frame behind the host's camera while it moves.
 */
export const attachNetGLDeckLayer = (deck: DeckLike, config: NetGLDeckLayerConfig): NetGLDeckLayer => {
  const { device } = config
  const gl = device.gl
  const time = config.time ?? Date.now
  const toView = config.view ?? globeLayerView
  const restore = config.restore ?? 'luma-stack'
  const stats: NetGLDeckLayerStats = { hostFrames: 0, guestFrames: 0, viewsSent: 0, lastMs: 0, redrawsForced: 0, redrawsFolded: 0 }
  const isImmediate = 'render' in config
  let enabled = true
  let lastView: NetGLLayerView | null = null
  let redrawQueued = false
  let detached = false

  // A redraw in the next animation frame, unless deck draws before then
  // (deck's animation-loop callback runs ahead of ours in that frame, and
  // a host's forced redraw may come sooner): that draw ran onAfterRender,
  // which drained whatever this redraw was for.
  let drewSinceRequest = false
  const requestRedraw = (reason: string): void => {
    if (redrawQueued || detached) return
    redrawQueued = true
    drewSinceRequest = false
    nextFrame(() => {
      redrawQueued = false
      if (detached) return
      if (drewSinceRequest) {
        stats.redrawsFolded += 1
        return
      }
      stats.redrawsForced += 1
      deck.redraw(reason)
    })
  }

  // The layer control plane: hello / hello-ack, invalidate, anchors.
  let hello: NetGLLayerHelloMessage | null = null
  let anchors: NetGLLayerAnchorsMessage | null = null
  let subscription: NetGLLayerAnchorsSubscribeMessage | null = null
  const anchorListeners = new Set<(msg: NetGLLayerAnchorsMessage) => void>()
  if (config.onAnchors) anchorListeners.add(config.onAnchors)
  // Set by `layer:invalidate`: send the next view even if it's unchanged.
  let forceView = false
  const send = (msg: unknown): void => {
    if (link) link.postToGuest(msg)
    else receiver?.post(msg)
  }
  // An iframe guest is live once it has said hello or ready: until then
  // its window may still be on about:blank (or mid-navigation), and posts
  // targeted at its origin are dropped. A same-page guest is always live.
  let live = isImmediate
  const queued: unknown[] = []
  const postToGuest = (msg: unknown): void => {
    if (live) send(msg)
    else queued.push(msg)
  }
  const goLive = (): void => {
    if (live) return
    live = true
    for (const msg of queued.splice(0)) send(msg)
    if (subscription) send(subscription)
  }
  const onControl = (msg: unknown): void => {
    if (isNetGLLayerInvalidateMessage(msg)) {
      forceView = true
      requestRedraw('netgl guest invalidated')
      return
    }
    if (isNetGLLayerHelloMessage(msg)) {
      const answer: NetGLLayerHelloAnswer = config.acceptHello ? config.acceptHello(msg) : { accepted: true }
      const ack: NetGLLayerHelloAckMessage = { ...answer, type: 'layer:hello-ack' }
      send(ack) // answers a message from the guest, so it's live
      // The guest repeats hello until acked; a hello after that is a reload.
      const first = hello === null
      hello = msg
      const wasLive = live
      goLive()
      if (first) {
        config.onHello?.(msg)
        requestRedraw('netgl guest hello')
      }
      if (wasLive && subscription) send(subscription)
      return
    }
    if (isNetGLLayerAnchorsMessage(msg)) {
      anchors = msg
      for (const l of anchorListeners) l(msg)
      return
    }
    config.onControl?.(msg)
  }

  const common = {
    gl,
    replay: { ...config.replay, screen: { clear: 'none' as const, ...config.replay?.screen } },
    onReady: (msg: NetGLReadyMessage) => {
      goLive()
      config.onReady?.(msg)
      requestRedraw('netgl guest ready')
    },
    onControl,
    onError: config.onError
  }
  const link = isImmediate ? makeNetGLImmediateLink(common) : null
  const receiver = isImmediate ? null : makeNetGLHostReceiver({ ...common, transport: (config as DeckReceiverLayerConfig).transport })
  const transport = link ? link.transport : (config as DeckReceiverLayerConfig).transport

  // Receiver: one `layer:view` in flight at a time.
  const viewTimeoutMs = isImmediate ? 0 : (config as DeckReceiverLayerConfig).viewTimeoutMs ?? 1000
  let lastSent: NetGLLayerView | null = null
  let inFlight = false
  let viewId = 0
  let timeout: ReturnType<typeof setTimeout> | null = null
  const unsubscribeFrames = receiver?.onFrame(() => {
    inFlight = false
    if (timeout) clearTimeout(timeout)
    timeout = null
    requestRedraw('netgl guest frame')
  })
  const sendView = (view: NetGLLayerView): void => {
    if (!receiver || !(receiver.ready || hello) || inFlight) return
    // An unchanged view needs no new frame, unless the guest invalidated
    // its last one, or that one can't be re-run (it deleted objects, as a
    // three.js guest's first frame does): then the guest draws it again,
    // so it stays on screen.
    if (!forceView && lastSent && sameView(lastSent, view) && receiver.canRerun) return
    forceView = false
    const msg: NetGLLayerViewMessage = { type: 'layer:view', viewId: ++viewId, view }
    receiver.post(msg)
    stats.viewsSent += 1
    lastSent = view
    inFlight = true
    timeout = setTimeout(() => {
      timeout = null
      if (!inFlight) return
      inFlight = false
      lastSent = null
      requestRedraw('netgl view timed out')
    }, viewTimeoutMs)
  }

  // The last viewport the guest was drawn for, and the view options of
  // that frame, for `requestGuestFrame`.
  let lastViewport: DeckViewportLike | null = null
  let lastCssWidth: number | undefined

  const previous = deck.props.onAfterRender ?? null
  const onAfterRender = (context: unknown): void => {
    previous?.(context)
    stats.hostFrames += 1
    drewSinceRequest = true
    if (!enabled || detached) return
    const viewports = deck.getViewports()
    const viewport = config.viewId ? viewports.find((v) => v.id === config.viewId) : viewports[0]
    if (!viewport) return
    const canvas = gl.canvas as HTMLCanvasElement | OffscreenCanvas | undefined
    const cssWidth = canvas && 'clientWidth' in canvas && canvas.clientWidth > 0 ? canvas.clientWidth : undefined
    const view = toView(viewport, {
      timeMs: time(),
      drawingBufferWidth: gl.drawingBufferWidth,
      drawingBufferHeight: gl.drawingBufferHeight,
      cssWidth
    })
    if (!view) return
    // Same page: the guest renders every deck frame, so an invalidate only
    // needed the redraw.
    if (link) forceView = false
    const t0 = performance.now()
    const run = (): void => {
      if (link) {
        const render = (config as DeckImmediateLayerConfig).render
        link.frame(() => render(view))
        stats.guestFrames += 1
      } else if (receiver!.drain()) {
        stats.guestFrames += 1
      }
    }
    if (restore === 'luma-stack') withLumaState(device, run)
    else run()
    stats.lastMs = performance.now() - t0
    lastView = view
    lastViewport = viewport
    lastCssWidth = cssWidth
    sendView(view)
  }
  deck.setProps({ onAfterRender })
  requestRedraw('netgl layer attached')

  return {
    transport,
    link,
    receiver,
    stats,
    get lastView() {
      return lastView
    },
    get enabled() {
      return enabled
    },
    set enabled(v: boolean) {
      enabled = v
      requestRedraw('netgl layer toggled')
    },
    get hello() {
      return hello
    },
    get anchors() {
      return anchors
    },
    subscribeAnchors(patterns, opts = {}) {
      subscription = { ...opts, type: 'layer:anchors-subscribe', patterns: [...patterns] }
      // Not live yet: goLive sends the latest subscription, not each one.
      if (live) send(subscription)
    },
    onAnchors(listener) {
      anchorListeners.add(listener)
      return () => {
        anchorListeners.delete(listener)
      }
    },
    postToGuest,
    get live() {
      return live
    },
    requestGuestFrame() {
      if (!receiver || detached || !enabled || !lastViewport || inFlight) return false
      const view = toView(lastViewport, {
        timeMs: time(),
        drawingBufferWidth: gl.drawingBufferWidth,
        drawingBufferHeight: gl.drawingBufferHeight,
        cssWidth: lastCssWidth
      })
      if (!view) return false
      const before = stats.viewsSent
      sendView(view)
      return stats.viewsSent > before
    },
    detach() {
      if (detached) return
      detached = true
      unsubscribeFrames?.()
      receiver?.stop()
      if (timeout) clearTimeout(timeout)
      deck.setProps({ onAfterRender: previous ?? (() => {}) })
    }
  }
}
