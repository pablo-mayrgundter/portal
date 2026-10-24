// Wire 2 end to end: makeNetGLGuestContext and makeNetGLHostReceiver over an
// in-memory pair of "windows" (asynchronous, structured clone with
// transfer, as postMessage) and a real MessageChannel. Batches, the legacy
// wire, the port handshake and its origin pinning, ordering across the
// switch, transfer lists, and re-runs with batches.

import { describe, it, expect } from 'vitest'
import { makeNetGLGuestContext, type NetGLGuestContextConfig } from './guest-context'
import { makeNetGLHostReceiver, type NetGLHostReceiverConfig } from './host-receiver'
import { makeNetGLImmediateLink } from './immediate-link'
import type { NetGLTransport } from './renderer'

type Listener = (m: unknown) => void

/**
 * Two windows. Messages are delivered asynchronously, cloned with their
 * transfer list. `hold()` stops deliveries to the host until `release()`,
 * to put window messages "in flight" while the port overtakes them.
 */
const windowPair = (hostOutputOrigin: string | null = 'https://guest.example') => {
  const toHost = new Set<Listener>()
  const toGuest = new Set<Listener>()
  const on = (s: Set<Listener>) => (l: Listener) => {
    s.add(l)
    return () => {
      s.delete(l)
    }
  }
  let holding = false
  const heldForHost: unknown[] = []
  const stats = { toHost: 0, toGuest: 0 }
  const deliver = (s: Set<Listener>, m: unknown): void => {
    for (const l of [...s]) l(m)
  }
  const guest: NetGLTransport = {
    post(m, transfer) {
      stats.toHost += 1
      const c = structuredClone(m, { transfer: transfer ?? [] })
      setTimeout(() => {
        if (holding) heldForHost.push(c)
        else deliver(toHost, c)
      }, 0)
    },
    onMessage: on(toGuest)
  }
  const host = {
    outputOrigin: hostOutputOrigin ?? undefined,
    post(m: unknown, transfer?: Transferable[]) {
      stats.toGuest += 1
      const c = structuredClone(m, { transfer: transfer ?? [] })
      setTimeout(() => deliver(toGuest, c), 0)
    },
    onMessage: on(toHost)
  } as NetGLTransport
  return {
    guest,
    host,
    stats,
    hold: () => {
      holding = true
    },
    release: () => {
      holding = false
      for (const m of heldForHost.splice(0)) deliver(toHost, m)
    }
  }
}

const shadowProxy = (): WebGL2RenderingContext =>
  new Proxy({} as Record<string, unknown>, {
    get: (_t, p: string) => {
      if (p === 'getParameter') return () => 0
      if (p === 'getUniformLocation' || p.startsWith('create')) return () => ({})
      return () => undefined
    }
  }) as unknown as WebGL2RenderingContext
const fakeCanvas = (): HTMLCanvasElement => ({ getContext: () => shadowProxy() }) as unknown as HTMLCanvasElement

const mockHostGl = () => {
  const calls: Array<{ name: string; args: unknown[] }> = []
  const gl = new Proxy({}, {
    get: (_: unknown, name: string) => (...args: unknown[]) => {
      calls.push({ name, args })
      return name.startsWith('create') || name === 'getUniformLocation' ? { name } : undefined
    }
  }) as unknown as WebGL2RenderingContext
  return { gl, calls, names: () => calls.map((c) => c.name) }
}

const ANCHOR = { position: [0, 0, 0] as const, normal: [0, 0, 1] as const, up: [0, 1, 0] as const }
const settle = (ms = 30) => new Promise((r) => setTimeout(r, ms))

const setup = (opts: {
  guest?: Partial<NetGLGuestContextConfig>
  host?: Partial<NetGLHostReceiverConfig>
  outputOrigin?: string | null
} = {}) => {
  const pair = windowPair(opts.outputOrigin === undefined ? 'https://guest.example' : opts.outputOrigin)
  const host = mockHostGl()
  const receiver = makeNetGLHostReceiver({ gl: host.gl, transport: pair.host, ...opts.host })
  const guest = makeNetGLGuestContext({ canvas: fakeCanvas(), transport: pair.guest, checkpoints: false, ...opts.guest })
  return { pair, host, receiver, guest }
}

describe('wire 2: batches', () => {
  it('negotiates wire 2 and sends one message per frame', async () => {
    const { pair, host, receiver, guest } = setup({ guest: { messageChannel: false } })
    guest.announce(ANCHOR)
    await settle()
    expect(guest.wire.version).toBe(2)
    expect(receiver.wire.version).toBe(2)
    expect(guest.wire.port).toBe(false)
    const before = pair.stats.toHost
    const buf = guest.gl.createBuffer()
    guest.gl.bindBuffer(0x8892, buf)
    guest.gl.bufferData(0x8892, new Float32Array([1, 2, 3]), 0x88e4)
    guest.gl.drawArrays(4, 0, 3)
    guest.endFrame()
    await settle()
    expect(pair.stats.toHost - before).toBe(1)
    expect(receiver.wire.batches).toBe(1)
    expect(receiver.drain()).toBe(true)
    expect(host.names()).toEqual(['createBuffer', 'bindBuffer', 'bufferData', 'drawArrays'])
    expect(Array.from(host.calls[2].args[1] as Float32Array)).toEqual([1, 2, 3])
  })

  it('calls between frames ride the next batch', async () => {
    const { pair, host, receiver, guest } = setup({ guest: { messageChannel: false } })
    guest.announce(ANCHOR)
    await settle()
    guest.gl.drawArrays(4, 0, 1)
    guest.endFrame()
    guest.gl.clearColor(0, 0, 0, 0) // between frames: an async load, say
    await settle()
    const before = pair.stats.toHost
    guest.gl.drawArrays(4, 0, 2)
    guest.endFrame()
    await settle()
    expect(pair.stats.toHost - before).toBe(1)
    receiver.drain()
    expect(host.names()).toEqual(['drawArrays', 'clearColor', 'drawArrays'])
  })

  it('a reused scratch array keeps each call’s values in a batch', async () => {
    const { host, receiver, guest } = setup({ guest: { messageChannel: false } })
    guest.announce(ANCHOR)
    await settle()
    const loc = guest.gl.getUniformLocation(null as unknown as WebGLProgram, 'u')
    const scratch = new Float32Array(4)
    for (const v of [1, 2, 3]) {
      scratch.fill(v)
      guest.gl.uniform4fv(loc, scratch)
    }
    guest.endFrame()
    await settle()
    receiver.drain()
    const sent = host.calls.filter((c) => c.name === 'uniform4fv').map((c) => Array.from(c.args[1] as Float32Array)[0])
    expect(sent).toEqual([1, 2, 3])
    // The copies were transferred; the app's array is intact.
    expect(scratch.byteLength).toBe(16)
  })

  it('keeps the re-run rules: a stale frame skips uploads, a frame that deleted is never re-run', async () => {
    const { host, receiver, guest } = setup({ guest: { messageChannel: false } })
    guest.announce(ANCHOR)
    await settle()
    const b = guest.gl.createBuffer()
    guest.gl.bindBuffer(0x8892, b)
    guest.gl.bufferData(0x8892, new Float32Array(3), 0x88e4)
    guest.gl.drawArrays(4, 0, 3)
    guest.endFrame()
    await settle()
    expect(receiver.drain()).toBe(true)
    host.calls.length = 0
    expect(receiver.canRerun).toBe(true)
    expect(receiver.drain()).toBe(true)
    expect(host.names()).toEqual(['bindBuffer', 'drawArrays'])

    guest.gl.deleteBuffer(b)
    guest.endFrame()
    await settle()
    expect(receiver.drain()).toBe(true)
    expect(receiver.canRerun).toBe(false)
    expect(receiver.drain()).toBe(false)
  })

  it('fires onFrame per frame-end in a batch (sub-frames)', async () => {
    const { receiver, guest } = setup({ guest: { messageChannel: false } })
    let frames = 0
    receiver.onFrame(() => {
      frames += 1
    })
    guest.announce(ANCHOR)
    await settle()
    guest.gl.drawArrays(4, 0, 1)
    guest.subFrame()
    guest.gl.drawArrays(4, 0, 2)
    guest.endFrame()
    await settle()
    expect(frames).toBe(2)
  })
})

describe('wire: mixed versions', () => {
  it('a wire-1 guest (0.5) is read as before', async () => {
    const { pair, host, receiver, guest } = setup({ guest: { wire: 1 } })
    guest.announce(ANCHOR)
    await settle()
    expect(guest.wire.version).toBe(1)
    const before = pair.stats.toHost
    guest.gl.drawArrays(4, 0, 1)
    guest.gl.drawArrays(4, 0, 2)
    guest.endFrame()
    await settle()
    expect(pair.stats.toHost - before).toBe(3)
    expect(receiver.wire.port).toBe('none')
    receiver.drain()
    expect(host.names()).toEqual(['drawArrays', 'drawArrays'])
  })

  it('a wire-2 guest talks wire 1 to a host that acks without `wire` (0.5)', async () => {
    const { pair, host, receiver, guest } = setup({ host: { wire: 1 } })
    guest.announce(ANCHOR)
    await settle()
    expect(receiver.wire.version).toBe(1)
    expect(guest.wire.version).toBe(1)
    const before = pair.stats.toHost
    guest.gl.drawArrays(4, 0, 1)
    guest.endFrame()
    await settle()
    expect(pair.stats.toHost - before).toBe(2)
    receiver.drain()
    expect(host.names()).toEqual(['drawArrays'])
  })

  it('a guest that never announces stays on wire 1', async () => {
    const { pair, receiver, guest } = setup()
    guest.gl.drawArrays(4, 0, 1)
    guest.endFrame()
    await settle()
    expect(pair.stats.toHost).toBe(2)
    expect(receiver.drain()).toBe(true)
  })

  it('the immediate link stays wire 1 and replays each call as it is made', () => {
    const host = mockHostGl()
    const link = makeNetGLImmediateLink({ gl: host.gl })
    const guest = makeNetGLGuestContext({ canvas: fakeCanvas(), transport: link.transport, checkpoints: false })
    guest.announce(ANCHOR)
    expect(link.ready).not.toBeNull()
    expect(guest.wire.version).toBe(1)
    link.frame(() => {
      guest.gl.drawArrays(4, 0, 1)
      // Zero lag: replayed before the guest's next call.
      expect(host.names()).toEqual(['drawArrays'])
      guest.endFrame()
    })
  })
})

describe('wire 2: the MessageChannel', () => {
  it('moves the stream to the port; control stays on the window for a `stream` guest', async () => {
    const { pair, host, receiver, guest } = setup()
    guest.announce(ANCHOR)
    await settle()
    expect(guest.wire.port).toBe(true)
    expect(receiver.wire.port).toBe('open')
    expect(receiver.wire.controlOnPort).toBe(false)
    const before = pair.stats.toHost
    guest.gl.drawArrays(4, 0, 1)
    guest.endFrame()
    await settle()
    expect(pair.stats.toHost).toBe(before) // nothing on the window
    expect(receiver.drain()).toBe(true)
    expect(host.names()).toEqual(['drawArrays'])
    // The app's own messages through guest.transport take the port too.
    const control: unknown[] = []
    const r2 = makeNetGLHostReceiver({ gl: host.gl, transport: { post() {}, onMessage: () => () => {} }, onControl: (m) => control.push(m) })
    expect(r2.wire.port).toBe('none')
    const seen: unknown[] = []
    const off = guest.transport.onMessage((m) => seen.push(m))
    receiver.post({ type: 'layer:view', viewId: 1 })
    await settle()
    expect(pair.stats.toGuest).toBeGreaterThan(1)
    expect(seen).toContainEqual({ type: 'layer:view', viewId: 1 })
    off()
  })

  it('carries control both ways for an `all` guest, holding posts until the port opens', async () => {
    const control: unknown[] = []
    const { pair, receiver, guest } = setup({ guest: { messageChannel: 'all' }, host: { onControl: (m) => control.push(m) } })
    const seen: unknown[] = []
    guest.transport.onMessage((m) => seen.push(m))
    guest.announce(ANCHOR)
    await settle()
    expect(receiver.wire.controlOnPort).toBe(true)
    const toGuest = pair.stats.toGuest
    receiver.post({ type: 'layer:view', viewId: 7 })
    guest.transport.post({ type: 'layer:invalidate', reason: 'x' })
    await settle()
    expect(pair.stats.toGuest).toBe(toGuest)
    expect(seen).toContainEqual({ type: 'layer:view', viewId: 7 })
    expect(control).toContainEqual({ type: 'layer:invalidate', reason: 'x' })
  })

  it('holds port messages until the window items sent before the switch arrive', async () => {
    const { pair, host, receiver, guest } = setup()
    guest.announce(ANCHOR)
    // A legacy frame, still in flight on the window when the port opens.
    await new Promise((r) => setTimeout(r, 0))
    pair.hold()
    guest.gl.clearColor(1, 0, 0, 1)
    guest.gl.drawArrays(4, 0, 1)
    guest.endFrame()
    await settle()
    expect(guest.wire.port).toBe(true)
    guest.gl.drawArrays(4, 0, 2)
    guest.endFrame()
    await settle()
    // The port's frame arrived first, and waits.
    expect(receiver.hasFrame).toBe(false)
    pair.release()
    await settle()
    receiver.drain()
    expect(host.calls.map((c) => `${c.name}${c.name === 'drawArrays' ? c.args[2] : ''}`)).toEqual(['clearColor', 'drawArrays1', 'drawArrays2'])
  })

  it('offers no port without an exact origin, or when turned off', async () => {
    for (const outputOrigin of ['*', null]) {
      const { receiver, guest } = setup({ outputOrigin })
      guest.announce(ANCHOR)
      await settle()
      expect(receiver.wire.port).toBe('none')
      expect(guest.wire.version).toBe(2)
      expect(guest.wire.port).toBe(false)
    }
    const { receiver, guest } = setup({ host: { messageChannel: false } })
    guest.announce(ANCHOR)
    await settle()
    expect(receiver.wire.port).toBe('none')
    expect(guest.wire.version).toBe(2)
  })

  it('hands one port per guest page load, and a new one on a reload', async () => {
    const pair = windowPair()
    const host = mockHostGl()
    const receiver = makeNetGLHostReceiver({ gl: host.gl, transport: pair.host })
    const g1 = makeNetGLGuestContext({ canvas: fakeCanvas(), transport: pair.guest, checkpoints: false })
    g1.announce(ANCHOR)
    // A repeat of the same page's announcement: acked, no second port.
    pair.guest.post({ type: 'netgl:ready', anchor: ANCHOR, background: { r: 0, g: 0, b: 0 }, wire: 2, port: 'stream', seq: 0, session: 'other' })
    await settle()
    expect(receiver.wire.port).toBe('offered') // the second session's port, not yet opened
    const g2 = makeNetGLGuestContext({ canvas: fakeCanvas(), transport: pair.guest, checkpoints: false })
    g2.announce(ANCHOR)
    await settle()
    expect(g2.wire.port).toBe(true)
    expect(receiver.wire.port).toBe('open')
    g2.gl.drawArrays(4, 0, 9)
    g2.endFrame()
    await settle()
    receiver.drain()
    expect(host.calls.slice(-1)[0]?.args[2]).toBe(9)
    receiver.stop()
  })

  it('transfers buffers the recorder copied, never the app’s', async () => {
    const { host, receiver, guest } = setup()
    guest.announce(ANCHOR)
    await settle()
    const app = new Float32Array(1000)
    app[500] = 42
    guest.gl.bufferSubData(0x8892, 0, app, 500, 2)
    guest.gl.bufferData(0x8892, app, 0x88e4)
    guest.endFrame()
    await settle()
    expect(app.byteLength).toBe(4000)
    receiver.drain()
    const [sub, whole] = host.calls.map((c) => c.args[c.name === 'bufferSubData' ? 2 : 1] as Float32Array)
    expect(Array.from(sub)).toEqual([42, 0])
    expect(whole.length).toBe(1000)
  })
})
