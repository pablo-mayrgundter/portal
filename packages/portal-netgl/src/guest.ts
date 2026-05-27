// External-app guest factory for NetGL.
//
// `makeNetGLPortalTarget` (in `target.ts`) is for the case where the embedded
// app is portal-aware: it accepts a scene + anchor and the factory drives
// rendering. `makeNetGLPortalGuest` is for the case where the embedded app
// owns its own renderer, scene graph, and animation loop — it just wants a
// `THREE.WebGLRenderer` whose GL calls cross to the host instead of painting
// a local canvas. Celestiary is the canonical example: 16k+ LoC of React +
// TrackballControls + atmosphere precompute + custom shaders that we don't
// want to touch.
//
// The factory:
//   1. Builds a `THREE.WebGLRenderer` using the caller's `WebGLRenderer`
//      constructor (so the renderer instance lives in the caller's three.js
//      version, not portal-netgl's — same-instance check for materials etc.).
//   2. Wires the renderer's GL context to a NetGL recorder Proxy that posts
//      each call onto a postMessage transport to `parent`.
//   3. Monkey-patches `renderer.render` to resetState + apply portal stencil
//      to scenes hitting the host canvas + toggle autoClear so RTs get fresh
//      contents without wiping the host's worldA. These are the adoption
//      findings documented in DESIGN.md.
//   4. Monkey-patches `renderer.setAnimationLoop` so a `netgl:frame-end`
//      marker is posted after each RAF callback, letting the host drain
//      the embedded frame as one atomic block.
//   5. Posts `netgl:ready { anchor, background }` once on construction.
//   6. (Optional) listens for `netgl:setPose` and forwards to the caller.
//
// Returns the renderer the caller should use INSTEAD of `new WebGLRenderer`.
// The caller's existing render loop runs unchanged.

import type * as THREE from 'three'
import type { NetGLCall, NetGLFrameEnd } from './messages'
import type { ColorRGB, Mat4, PortalAnchor, PortalPose, Viewport } from './portal-types'
import { makeNetGLRecorder } from './recorder'
import { applyPortalStencilTest } from './three-helpers'
import { windowTransport, type WindowTransport } from './window-transport'

/** Inbound message: host asks the guest to update its camera pose. */
export type NetGLSetPoseMessage = {
  type: 'netgl:setPose'
  pose: PortalPose
  projection: Mat4
  viewport: Viewport
  time: number
}

/** Outbound handshake: guest announces its anchor + background. */
type NetGLReadyMessage = {
  type: 'netgl:ready'
  anchor: PortalAnchor
  background: ColorRGB
}

/**
 * Caller's `THREE.WebGLRenderer` constructor. Typed loosely because we
 * deliberately don't bind to a specific three.js version — the caller's
 * three is what the constructed renderer will be a `WebGLRenderer` of, so
 * `instanceof` checks elsewhere in the caller's code see the right type.
 */
type WebGLRendererCtor = new (params: {
  canvas?: HTMLCanvasElement | OffscreenCanvas
  context?: WebGL2RenderingContext
  alpha?: boolean
  depth?: boolean
  stencil?: boolean
  antialias?: boolean
  preserveDrawingBuffer?: boolean
  premultipliedAlpha?: boolean
  powerPreference?: 'default' | 'high-performance' | 'low-power'
  failIfMajorPerformanceCaveat?: boolean
}) => THREE.WebGLRenderer

export type NetGLPortalGuestConfig = {
  /**
   * The caller's `THREE.WebGLRenderer` constructor. Passed through to avoid
   * a two-three.js version mismatch — the renderer instance gets built with
   * the caller's three.js classes, so the embedded app's existing code
   * (which holds e.g. `THREE.Mesh` instances) sees a compatible renderer.
   */
  WebGLRenderer: WebGLRendererCtor

  /**
   * Where the portal door sits in the embedded app's coordinate space.
   * Shipped to the host on `netgl:ready`. The host uses this in its
   * `couplePoseAcrossPortal` math.
   */
  anchor: PortalAnchor

  /**
   * Background color the host paints inside the door region before the
   * first frame arrives (so the door isn't flashing host-worldA for the
   * first ~16 ms). Defaults to `{ r: 0, g: 0, b: 0 }`.
   */
  background?: ColorRGB

  /**
   * Where to post NetGL messages. Defaults to `parent` (the iframe-in-host
   * case). Set explicitly when hosted in a worker or a different window
   * topology. In a top-level window `parent === self`, so the default
   * sends to the same window — fine for local protocol round-trip tests
   * but obviously not what production wants.
   */
  outputTarget?: Window

  /**
   * Filter inbound messages to those whose `event.source` matches this.
   * Defaults to `parent`. Set to `null` to accept any source (dev only).
   */
  inputFilter?: MessageEventSource | null

  /**
   * Forwarded to `getContext('webgl2', ...)` and to the renderer
   * constructor. Defaults to `{ antialias: true, stencil: true, depth: true,
   * preserveDrawingBuffer: false }`.
   */
  rendererParams?: WebGLContextAttributes

  /**
   * Called once per inbound `netgl:setPose` message. The factory does NOT
   * write to the embedded app's camera by default — the embedded app may
   * have its own coordinate scale (celestiary's astronomy-scale; a CAD
   * tool's mm-scale; etc.) that the host's meter-scale coupled pose
   * isn't meaningful for. If the embedded app wants to follow the host
   * pose, this hook is where to translate + apply.
   */
  onSetPose?: (msg: NetGLSetPoseMessage) => void

  /**
   * Override the transport entirely. When supplied, replaces the default
   * `windowTransport` built from `outputTarget` / `inputFilter`. Useful for
   * worker-hosted guests, in-process testing, or anything else where
   * postMessage isn't the right boundary.
   */
  transport?: WindowTransport
}

export type NetGLPortalGuestHandle = {
  /**
   * The renderer the caller should use instead of constructing one. Has
   * monkey-patched `render()` + `setAnimationLoop()`; otherwise behaves
   * like a normal `THREE.WebGLRenderer`.
   */
  renderer: THREE.WebGLRenderer
  /** Stop listening to setPose / unwire transport. Idempotent. */
  stop(): void
}

const DEFAULT_RENDERER_PARAMS: WebGLContextAttributes = {
  antialias: true,
  stencil: true,
  depth: true,
  preserveDrawingBuffer: false
}

const DEFAULT_BACKGROUND: ColorRGB = { r: 0, g: 0, b: 0 }

export const makeNetGLPortalGuest = (
  config: NetGLPortalGuestConfig
): NetGLPortalGuestHandle => {
  const {
    WebGLRenderer,
    anchor,
    background = DEFAULT_BACKGROUND,
    outputTarget = parent,
    inputFilter = parent as unknown as MessageEventSource | null,
    rendererParams = DEFAULT_RENDERER_PARAMS,
    onSetPose,
    transport: transportOverride
  } = config

  // Shadow canvas: a DETACHED HTMLCanvasElement (not OffscreenCanvas). Three's
  // `setSize(w, h)` defaults `updateStyle=true` and writes
  // `canvas.style.width` — OffscreenCanvas has no `.style` and that throws.
  // We never appendChild, so the canvas is invisible regardless.
  const shadowCanvas = document.createElement('canvas')
  shadowCanvas.width = 1
  shadowCanvas.height = 1
  const shadow = shadowCanvas.getContext('webgl2', rendererParams) as WebGL2RenderingContext | null
  if (!shadow) {
    throw new Error('makeNetGLPortalGuest: failed to create WebGL2 shadow context')
  }

  const transport: WindowTransport = transportOverride
    ?? windowTransport({ output: outputTarget, inputFilter })

  const recorder = makeNetGLRecorder(shadow, (call: NetGLCall) => transport.post(call))

  // Build the renderer with the recorder as its GL context. ALL three.js
  // calls — including construction-phase setup like default-texture creation
  // and capability queries — flow through the recorder and over the wire.
  // The shadow canvas is also passed explicitly so three's setSize resizes
  // it (otherwise three falls back to creating its own canvas, and
  // `gl.canvas` read through the proxy still points at the shadow's
  // OffscreenCanvas at its initial 1×1 — state.reset reads
  // gl.canvas.width and ships gl.viewport(0,0,1,1) for every frame,
  // clipping all draws to a single corner pixel).
  const renderer = new WebGLRenderer({
    canvas: shadowCanvas,
    context: recorder,
    alpha: rendererParams.alpha,
    depth: rendererParams.depth,
    stencil: rendererParams.stencil,
    antialias: rendererParams.antialias,
    preserveDrawingBuffer: rendererParams.preserveDrawingBuffer,
    premultipliedAlpha: rendererParams.premultipliedAlpha,
    powerPreference: rendererParams.powerPreference,
    failIfMajorPerformanceCaveat: rendererParams.failIfMajorPerformanceCaveat
  })

  // String values work because three accepts 'srgb' / 0 directly (the
  // public setters do the lookup). Using these instead of importing
  // `THREE.SRGBColorSpace` / `THREE.NoToneMapping` keeps us from binding
  // to a specific three.js version at the value level.
  ;(renderer as unknown as { outputColorSpace: string }).outputColorSpace = 'srgb'
  ;(renderer as unknown as { toneMapping: number }).toneMapping = 0
  renderer.autoClear = false

  // Monkey-patch render(): resetState (with target preservation), stencil
  // application on screen-target renders, scene background suppression,
  // autoClear toggle.
  const origRender = renderer.render.bind(renderer)
  renderer.render = function netglPatchedRender(scene: THREE.Object3D, camera: THREE.Camera) {
    const savedTarget = renderer.getRenderTarget()
    renderer.resetState()
    if (savedTarget !== null) renderer.setRenderTarget(savedTarget)
    const toScreen = savedTarget === null

    const savedAutoClear = renderer.autoClear
    renderer.autoClear = !toScreen

    if (toScreen) {
      applyPortalStencilTest(scene)
      const sceneAsAny = scene as unknown as { background?: unknown }
      if ('background' in sceneAsAny) sceneAsAny.background = null
    }
    try {
      return origRender(scene as unknown as THREE.Scene, camera as THREE.Camera)
    } finally {
      renderer.autoClear = savedAutoClear
    }
  } as typeof renderer.render

  // Monkey-patch setAnimationLoop(): post netgl:frame-end after every RAF
  // callback completes. Wrap the callback in try/finally so an encoder
  // gap (or anything else thrown inside the caller's render) doesn't
  // strand the host without a frame-end and dead-lock its draining loop.
  const origSAL = renderer.setAnimationLoop.bind(renderer)
  const seenRenderErrors = new Set<string>()
  renderer.setAnimationLoop = ((cb: ((time: number, frame?: XRFrame) => void) | null) => {
    if (cb === null) return origSAL(null)
    return origSAL((time: number, frame?: XRFrame) => {
      try {
        cb(time, frame)
      } catch (err) {
        const key = err instanceof Error ? err.message : String(err)
        if (!seenRenderErrors.has(key)) {
          seenRenderErrors.add(key)
          console.error('[netgl-guest] render callback threw:', err)
        }
      } finally {
        const frameEnd: NetGLFrameEnd = { type: 'netgl:frame-end' }
        transport.post(frameEnd)
      }
    })
  }) as typeof renderer.setAnimationLoop

  // Forward setPose to the caller if they registered a hook.
  let unsubscribe: (() => void) | null = null
  if (onSetPose) {
    unsubscribe = transport.onMessage((msg) => {
      if (msg && typeof msg === 'object' && (msg as { type?: unknown }).type === 'netgl:setPose') {
        onSetPose(msg as NetGLSetPoseMessage)
      }
    })
  }

  // Announce ready. The host's compositor stencil-paints the door with
  // `background`, then waits for the first frame-end before draining.
  const ready: NetGLReadyMessage = { type: 'netgl:ready', anchor, background }
  transport.post(ready)

  let stopped = false
  return {
    renderer,
    stop() {
      if (stopped) return
      stopped = true
      unsubscribe?.()
      unsubscribe = null
    }
  }
}
