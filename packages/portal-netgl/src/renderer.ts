// Façade API that turns the low-level recorder + replay into something
// callers can drop in for a `THREE.WebGLRenderer`. The shape:
//
//   sender                                    receiver
//   ┌───────────────────────────────┐         ┌──────────────────────────┐
//   │ createNetGLRenderer({          │         │ attachNetGLReceiver({    │
//   │   shadow: WebGL2RenderingCtx,  │ ─NetGL─▶│   context: ctx,          │
//   │   transport: PortalTransport,  │  calls  │   transport: t,          │
//   │   ...threeOpts                 │         │ })                       │
//   │ }) -> THREE.WebGLRenderer      │         └──────────────────────────┘
//   └───────────────────────────────┘
//
// On the sender, the returned object IS a `THREE.WebGLRenderer` — three's
// internals can do everything they normally do (setSize, autoClear, etc.).
// The only difference: the `context` it owns is a recorder Proxy, so every
// GL call ships over the transport.
//
// On the receiver, `attachNetGLReceiver` is a one-line wiring: subscribe to
// the transport, replay each arriving NetGLCall against the supplied
// context. The context is whatever the caller has — a `<canvas>` GL ctx
// for compositing, a server-side `gl@9` context for headless, an
// `OffscreenCanvas` for an offscreen render target.
//
// Both sides treat the `PortalTransport`'s message type as `unknown`
// (the runtime check in createLoopbackPair / windowTransport only asserts
// object-ness). The NetGLCall structure is structured-clone-safe, so the
// same wiring works across postMessage as well.

import * as THREE from 'three'
import type { NetGLCall } from './messages'
import { makeNetGLRecorder } from './recorder'
import { makeNetGLReplay } from './replay'

// Minimal transport shape we need. Matches the portal-iframe PortalTransport
// surface without depending on it (so portal-netgl stays standalone).
export type NetGLTransport = {
  post(msg: unknown, transfer?: Transferable[]): void
  onMessage(listener: (msg: unknown) => void): () => void
}

export type NetGLRendererConfig = Omit<THREE.WebGLRendererParameters, 'context'> & {
  /**
   * GL context the caller owns. The recorder forwards every call to it for
   * synchronous return values and handle minting; the calls also go to the
   * receiver over the transport. It's never displayed; an off-DOM
   * OffscreenCanvas's context is the typical choice.
   */
  shadow: WebGL2RenderingContext
  /** Transport the recorder posts NetGLCalls onto. */
  transport: NetGLTransport
}

/**
 * Construct a `THREE.WebGLRenderer` whose underlying GL context is a NetGL
 * recorder. Every method call three issues is mirrored to the shadow
 * context (for return values) and posted as a NetGLCall onto the
 * transport. Callers use the returned renderer exactly as they would a
 * regular `THREE.WebGLRenderer` — `setSize`, `render`, `autoClear`, etc.
 */
export const createNetGLRenderer = (config: NetGLRendererConfig): THREE.WebGLRenderer => {
  const { shadow, transport, ...threeOpts } = config
  const recorder = makeNetGLRecorder(shadow, (call: NetGLCall) => transport.post(call))
  return new THREE.WebGLRenderer({
    ...threeOpts,
    context: recorder
  })
}

export type NetGLReceiverConfig = {
  /** Real GL context the replayed calls execute against. */
  context: WebGL2RenderingContext
  /** Transport NetGLCalls arrive on. */
  transport: NetGLTransport
}

export type NetGLReceiverHandle = {
  /** Stop processing transport messages. Idempotent. */
  detach(): void
}

/**
 * Wire a NetGL replay engine to a transport: every message arriving on the
 * transport is decoded as a NetGLCall and executed against the supplied
 * GL context. Returns a handle whose `detach()` unsubscribes — useful for
 * teardown in tests or when a portal endpoint disconnects.
 *
 * The receiver's GL context survives `detach()` — nothing about replaying
 * mutates the context's lifecycle, just its state.
 */
export const attachNetGLReceiver = (config: NetGLReceiverConfig): NetGLReceiverHandle => {
  const replay = makeNetGLReplay(config.context)
  const unsubscribe = config.transport.onMessage((msg) => replay(msg as NetGLCall))
  return {
    detach() {
      unsubscribe()
    }
  }
}
