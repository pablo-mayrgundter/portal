// makeNetGLGuestContext: the ready handshake survives a host that isn't
// listening yet.

import { describe, it, expect, vi, afterEach } from 'vitest'
import { makeNetGLGuestContext } from './guest-context'
import type { NetGLTransport } from './renderer'

const makeTransport = (): { transport: NetGLTransport; posted: unknown[]; deliver: (msg: unknown) => void } => {
  const posted: unknown[] = []
  const listeners = new Set<(msg: unknown) => void>()
  return {
    posted,
    transport: {
      post: (msg) => { posted.push(msg) },
      onMessage(l) {
        listeners.add(l)
        return () => listeners.delete(l)
      }
    },
    deliver: (msg) => listeners.forEach((l) => l(msg))
  }
}

// Just enough of a canvas for the recorder: no checkpoints, so the shadow
// is never queried.
const fakeCanvas = { getContext: () => ({}) } as unknown as HTMLCanvasElement

describe('makeNetGLGuestContext announce()', () => {
  afterEach(() => vi.useRealTimers())

  it('re-announces until the host acks', () => {
    vi.useFakeTimers()
    const { transport, posted, deliver } = makeTransport()
    const guest = makeNetGLGuestContext({ canvas: fakeCanvas, transport, checkpoints: false })
    guest.announce({ position: [0, 0, 0], normal: [0, 0, -1], up: [0, 1, 0] })
    const readies = (): number => posted.filter((m) => (m as { type?: string }).type === 'netgl:ready').length
    expect(readies()).toBe(1)
    vi.advanceTimersByTime(1600)
    expect(readies()).toBe(4)
    deliver({ type: 'netgl:ready-ack' })
    vi.advanceTimersByTime(5000)
    expect(readies()).toBe(4)
  })
})
