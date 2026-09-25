// makeNetGLHostReceiver: frame buffering + drain semantics, against a mock
// GL context and an in-memory transport.

import { describe, it, expect } from 'vitest'
import { makeNetGLHostReceiver } from './host-receiver'
import type { NetGLTransport } from './renderer'

const makeTransport = (): { transport: NetGLTransport; deliver: (msg: unknown) => void } => {
  const listeners = new Set<(msg: unknown) => void>()
  return {
    transport: {
      post() {},
      onMessage(l) {
        listeners.add(l)
        return () => listeners.delete(l)
      }
    },
    deliver: (msg) => listeners.forEach((l) => l(msg))
  }
}

const makeMockGl = (): { gl: WebGL2RenderingContext; calls: string[] } => {
  const calls: string[] = []
  const gl = new Proxy({}, {
    get(_: unknown, prop: string) {
      return () => {
        calls.push(prop)
        if (prop === 'bogus') throw new Error('boom')
        if (prop.startsWith('create')) return { __mock: prop }
        return undefined
      }
    }
  }) as unknown as WebGL2RenderingContext
  return { gl, calls }
}

const END = { type: 'netgl:frame-end' }

describe('makeNetGLHostReceiver', () => {
  it('replays nothing until a frame completes', () => {
    const { gl, calls } = makeMockGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'drawArrays', args: [4, 0, 3] })
    expect(host.drain()).toBe(false)
    expect(calls).toEqual([])
  })

  it('concatenates frames that complete between drains', () => {
    const { gl, calls } = makeMockGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'createTexture', args: [], returnId: 1 })
    deliver(END)
    deliver({ name: 'bindTexture', args: [0x0DE1, { __netgl_handle: 1 }] })
    deliver(END)
    expect(host.drain()).toBe(true)
    expect(calls).toEqual(['createTexture', 'bindTexture'])
  })

  it('re-runs the last frame without re-minting handles or re-uploading', () => {
    const { gl, calls } = makeMockGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'createBuffer', args: [], returnId: 1 })
    deliver({ name: 'bindBuffer', args: [0x8892, { __netgl_handle: 1 }] })
    deliver({ name: 'bufferData', args: [0x8892, 16, 0x88E4] })
    deliver(END)
    host.drain()
    calls.length = 0
    expect(host.drain()).toBe(true)
    expect(calls).toEqual(['bindBuffer'])
  })

  it('reports a replay error once and keeps draining', () => {
    const { gl, calls } = makeMockGl()
    const { transport, deliver } = makeTransport()
    const errors: unknown[] = []
    const host = makeNetGLHostReceiver({ gl, transport, onError: (e) => errors.push(e) })
    deliver({ name: 'bogus', args: [] })
    deliver({ name: 'drawArrays', args: [4, 0, 3] })
    deliver(END)
    host.drain()
    host.drain()
    expect(calls.filter((c) => c === 'drawArrays')).toHaveLength(2)
    expect(errors).toHaveLength(1)
  })

  it('surfaces the ready handshake and other control messages', () => {
    const { gl } = makeMockGl()
    const { transport, deliver } = makeTransport()
    const control: unknown[] = []
    const host = makeNetGLHostReceiver({ gl, transport, onControl: (m) => control.push(m) })
    const ready = { type: 'netgl:ready', anchor: { position: [0, 0, 0] }, background: { r: 0, g: 0, b: 0 } }
    deliver(ready)
    deliver({ type: 'app:hello' })
    expect(host.ready).toEqual(ready)
    expect(control).toEqual([{ type: 'app:hello' }])
  })
})
