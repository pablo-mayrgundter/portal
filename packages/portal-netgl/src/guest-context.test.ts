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

describe('makeNetGLGuestContext frame-ends', () => {
  it('carry the screen targets by recorder id, and the view and projection together', () => {
    const { transport, posted } = makeTransport()
    const canvas = { getContext: () => ({ createFramebuffer: () => ({}) }) } as unknown as HTMLCanvasElement
    const guest = makeNetGLGuestContext({ canvas, transport, checkpoints: false })
    const a = guest.gl.createFramebuffer()!
    const b = guest.gl.createFramebuffer()!
    expect([guest.idOf(a), guest.idOf(b), guest.idOf({})]).toEqual([1, 2, null])
    const V = Array.from({ length: 16 }, (_, i) => i)
    const P = Array.from({ length: 16 }, (_, i) => 16 - i)
    // Unknown and missing targets are left out, duplicates once.
    guest.endFrame({ viewId: 2, screenTargets: [b, {}, undefined, a, b], viewMatrix: Float64Array.from(V), projectionMatrix: P })
    // One matrix without the other, or a malformed one: neither.
    guest.endFrame({ viewMatrix: V })
    guest.subFrame({ screenTargets: [], viewMatrix: V, projectionMatrix: [1, 2, 3] })
    const ends = posted.filter((m) => (m as { type?: string }).type === 'netgl:frame-end')
    expect(ends).toEqual([
      { type: 'netgl:frame-end', viewId: 2, screenTargets: [2, 1], viewMatrix: V, projectionMatrix: P },
      { type: 'netgl:frame-end' },
      { type: 'netgl:frame-end', screenTargets: [] }
    ])
  })

  it('carry the view and the part they were drawn for', () => {
    const { transport, posted } = makeTransport()
    const guest = makeNetGLGuestContext({ canvas: fakeCanvas, transport, checkpoints: false })
    guest.endFrame({ viewId: 5 })
    guest.endFrame({ viewId: 5, part: 'lights' })
    guest.subFrame({ part: 'lights' })
    guest.endFrame()
    const ends = posted.filter((m) => (m as { type?: string }).type === 'netgl:frame-end')
    expect(ends).toEqual([
      { type: 'netgl:frame-end', viewId: 5 },
      { type: 'netgl:frame-end', viewId: 5, part: 'lights' },
      { type: 'netgl:frame-end', part: 'lights' },
      { type: 'netgl:frame-end' }
    ])
  })
})
