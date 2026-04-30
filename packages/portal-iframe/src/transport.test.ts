import { describe, expect, it, vi } from 'vitest'
import { createLoopbackPair } from './index'
import type { PortalMessage, PortalReadyMessage } from '@portal/portal-core'

const readyMsg: PortalReadyMessage = {
  type: 'portal:ready',
  anchor: { position: [0, 0, 0], normal: [0, 0, 1], up: [0, 1, 0] },
  background: { r: 1, g: 0, b: 0 },
  viewport: { width: 4, height: 4 }
}

describe('createLoopbackPair', () => {
  it('delivers host->target post synchronously to target listener', () => {
    const { hostTransport, targetTransport } = createLoopbackPair()
    const onTarget = vi.fn<(msg: PortalMessage) => void>()
    targetTransport.onMessage(onTarget)
    hostTransport.post(readyMsg)
    expect(onTarget).toHaveBeenCalledTimes(1)
    expect(onTarget).toHaveBeenCalledWith(readyMsg)
  })

  it('delivers target->host post synchronously to host listener', () => {
    const { hostTransport, targetTransport } = createLoopbackPair()
    const onHost = vi.fn<(msg: PortalMessage) => void>()
    hostTransport.onMessage(onHost)
    targetTransport.post(readyMsg)
    expect(onHost).toHaveBeenCalledWith(readyMsg)
  })

  it('drops messages until a listener is registered', () => {
    const { hostTransport } = createLoopbackPair()
    // No target listener registered yet — post is a no-op (won't throw).
    expect(() => hostTransport.post(readyMsg)).not.toThrow()
  })

  it('unsubscribe stops further deliveries', () => {
    const { hostTransport, targetTransport } = createLoopbackPair()
    const onTarget = vi.fn()
    const off = targetTransport.onMessage(onTarget)
    hostTransport.post(readyMsg)
    off()
    hostTransport.post(readyMsg)
    expect(onTarget).toHaveBeenCalledTimes(1)
  })

  it('replaces a previous listener when onMessage is called again', () => {
    const { hostTransport, targetTransport } = createLoopbackPair()
    const first = vi.fn()
    const second = vi.fn()
    targetTransport.onMessage(first)
    targetTransport.onMessage(second)
    hostTransport.post(readyMsg)
    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('the two sides are independent (host listener is not affected by another host post)', () => {
    const { hostTransport } = createLoopbackPair()
    const onHost = vi.fn()
    hostTransport.onMessage(onHost)
    // Posting on host shouldn't deliver back to host (only to target).
    hostTransport.post(readyMsg)
    expect(onHost).not.toHaveBeenCalled()
  })

  it('synchronous round-trip: post elicits an immediate post back via the target listener', () => {
    // Models the hot path: host requests a frame, target renders inline and
    // posts the frame back BEFORE the host's post() returns. This is the
    // property that lets the existing fire-and-forget requestFrame act as
    // sync request/response over loopback.
    const { hostTransport, targetTransport } = createLoopbackPair()
    const replies: PortalMessage[] = []
    hostTransport.onMessage((m) => replies.push(m))
    targetTransport.onMessage((_m) => {
      targetTransport.post(readyMsg)
    })
    expect(replies).toHaveLength(0)
    hostTransport.post(readyMsg)
    // By the time host.post returns, target has already posted back.
    expect(replies).toHaveLength(1)
    expect(replies[0]).toEqual(readyMsg)
  })
})
