import {
  makeIframeEndpoint,
  makeIframeTarget,
  workerHostTransport,
  workerSelfTransport,
  type CompositorDebugMode,
  type IframePortalEndpoint,
  type IframeTarget,
  type IframeTargetConfig
} from '@portal/portal-iframe'

// ---------------------------------------------------------------------------
// Web Worker portal endpoint (browser-side, no-DOM).
//
// Same wire protocol and same render loop as the iframe transport — the only
// thing that changes is the message channel. The worker has no DOM at all,
// no parent Window, and no postMessage origin negotiation; it just owns an
// OffscreenCanvas + a WebGLRenderer and processes setPose messages from the
// main thread.
//
// Useful for compute-heavy worlds (gaussian splats, baked light, large
// streamed scenes) that benefit from not contending with the host's main
// thread for rasterization. The pure-node sibling — for server-side
// rendering with no browser at all — lives in `portal-headless-three`.
// ---------------------------------------------------------------------------

export type WorkerEndpointConfig = {
  /** The Worker handle whose `self` runs `makeWorkerTarget`. */
  worker: Worker
  stencilRef?: number
  debugMode?: CompositorDebugMode
  composeRaw?: boolean
}

/**
 * Host-side endpoint that talks to a Web Worker rendering its own destination
 * scene. Returns the same `IframePortalEndpoint` shape as the iframe transport
 * — the host loop drives both interchangeably.
 */
export const makeWorkerEndpoint = (config: WorkerEndpointConfig): IframePortalEndpoint =>
  makeIframeEndpoint({
    transport: workerHostTransport(config.worker),
    stencilRef: config.stencilRef,
    debugMode: config.debugMode,
    composeRaw: config.composeRaw
  })

export type WorkerTargetConfig = Omit<
  IframeTargetConfig,
  'hostOrigin' | 'outputTarget' | 'inputFilter' | 'transport'
>

/**
 * Worker-side render target. Call this inside a Worker module — it wires up
 * the worker's `self` as the message channel and otherwise reuses the iframe
 * target's render loop verbatim (oblique-clip, single-pass color+depth blit,
 * sync render in the message handler, optional FXAA).
 */
export const makeWorkerTarget = (config: WorkerTargetConfig): IframeTarget =>
  makeIframeTarget({
    ...config,
    transport: workerSelfTransport()
  })
