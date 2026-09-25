// Pieces both host modes share: the host renderer, the iframe transport,
// the NetGL receiver, and tick / rendered bookkeeping.

import * as THREE from 'three'
import {
  makeNetGLHostReceiver,
  windowTransport,
  type NetGLHostReceiver,
  type NetGLReplayConfig
} from '@pablo-mayrgundter/portal-netgl'
import type { CesiumError, CesiumRendered, CesiumTick } from './protocol'

const TICK_RESEND_MS = 1000

export type HostShared = {
  renderer: THREE.WebGLRenderer
  receiver: NetGLHostReceiver
  /** Guest drawing-buffer size from the latest `cesium:rendered`. */
  guestSize: { width: number; height: number } | null
  /** Host canvas size in device pixels. */
  canvasSize(): { width: number; height: number }
  /**
   * Post a tick, unless the previous one is still being rendered. Returns
   * the seq sent, or null if skipped.
   *
   * Flow control matters: the guest renders one Cesium frame per tick it
   * receives, and a same-origin iframe shares the host's main thread. If
   * ticks outpace the guest they queue without bound and the whole page
   * stalls. So at most one tick is in flight; a tick that hasn't been
   * answered within TICK_RESEND_MS (e.g. sent before the guest page
   * loaded) is superseded by the next one.
   */
  tick(time: number, view?: CesiumTick['view']): number | null
  /** Ticks sent but not yet rendered (0 or 1 under flow control). */
  lag(): number
}

export const makeHostShared = (opts: {
  iframe: HTMLIFrameElement
  mount: HTMLElement
  replay: (shared: () => HostShared) => NetGLReplayConfig
  onStatus: (text: string) => void
}): HostShared => {
  const renderer = new THREE.WebGLRenderer({ antialias: false, stencil: true, depth: true })
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.autoClear = false
  opts.mount.appendChild(renderer.domElement)

  const transport = windowTransport({
    output: opts.iframe.contentWindow!,
    inputFilter: opts.iframe.contentWindow
  })

  let seq = 0
  let renderedSeq = 0
  let sentAt = 0
  const errors = new Set<string>()

  // Late-bound so the replay config's closures can read `shared`.
  let shared: HostShared | null = null
  const getShared = (): HostShared => shared!

  const receiver = makeNetGLHostReceiver({
    gl: renderer.getContext() as WebGL2RenderingContext,
    transport,
    replay: opts.replay(getShared),
    onControl: (msg) => {
      const m = msg as { type?: string }
      if (m.type === 'cesium:rendered') {
        const r = msg as CesiumRendered
        renderedSeq = r.seq
        shared!.guestSize = { width: r.width, height: r.height }
      } else if (m.type === 'cesium:error') {
        const e = (msg as CesiumError).message
        if (!errors.has(e)) {
          errors.add(e)
          console.error('[cesium guest]', e)
          opts.onStatus(`Cesium error: ${e.split('\n')[0]}`)
        }
      }
    },
    onError: (err) => {
      console.error('[netgl host] replay error:', err)
      opts.onStatus(`Replay error: ${err instanceof Error ? err.message : String(err)}`)
    }
  })

  shared = {
    renderer,
    receiver,
    guestSize: null,
    canvasSize: () => {
      const v = renderer.getDrawingBufferSize(new THREE.Vector2())
      return { width: v.x, height: v.y }
    },
    tick(time, view) {
      const now = performance.now()
      if (renderedSeq < seq && now - sentAt < TICK_RESEND_MS) return null
      seq += 1
      sentAt = now
      const msg: CesiumTick = { type: 'cesium:tick', seq, time, view }
      transport.post(msg)
      return seq
    },
    lag: () => seq - renderedSeq
  }
  return shared
}
