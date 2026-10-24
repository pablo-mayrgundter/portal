// attachNetGLDeckLayer's control plane with an iframe-style guest:
// layer:invalidate (a fresh view on a still camera, one in flight),
// layer:hello / hello-ack, and anchors. No GL: the guest posts only
// control messages and frame-ends.

import { describe, it, expect } from 'vitest'
import { _GlobeViewport as GlobeViewport } from '@deck.gl/core'
import type { NetGLTransport } from '../renderer'
import { postLayerInvalidate, type NetGLLayerViewMessage } from '../layer-view'
import { attachNetGLDeckLayer, type DeckLike, type DeckViewportLike, type LumaDeviceLike } from './luma'

const W = 64
const H = 48

const mockDevice = (calls: string[] = []): LumaDeviceLike => {
  const gl = new Proxy({ drawingBufferWidth: W, drawingBufferHeight: H } as Record<string, unknown>, {
    get: (t, p: string) => (p in t ? t[p] : () => {
      calls.push(p)
    })
  }) as unknown as WebGL2RenderingContext
  return { gl, pushState() {}, popState() {} }
}

// A deck whose redraw runs onAfterRender synchronously, as deck's does.
const fakeDeck = (): DeckLike & { redraws: number } => {
  const viewport = new GlobeViewport({ width: W, height: H, longitude: 0, latitude: 0, zoom: 0 }) as unknown as DeckViewportLike
  const deck = {
    props: {} as { onAfterRender?: ((c: unknown) => void) | null },
    redraws: 0,
    setProps(p: { onAfterRender?: (c: unknown) => void }) {
      Object.assign(deck.props, p)
    },
    redraw() {
      deck.redraws += 1
      deck.props.onAfterRender?.({})
    },
    getViewports: () => [viewport]
  }
  return deck
}

const memoryPair = () => {
  const toHost = new Set<(m: unknown) => void>()
  const toGuest = new Set<(m: unknown) => void>()
  const on = (s: Set<(m: unknown) => void>) => (l: (m: unknown) => void) => {
    s.add(l)
    return () => {
      s.delete(l)
    }
  }
  const guest: NetGLTransport = { post: (m) => toHost.forEach((l) => l(structuredClone(m))), onMessage: on(toGuest) }
  const host: NetGLTransport = { post: (m) => toGuest.forEach((l) => l(structuredClone(m))), onMessage: on(toHost) }
  const received: Array<{ type?: string } & Record<string, unknown>> = []
  guest.onMessage((m) => received.push(m as { type?: string }))
  return { guest, host, received }
}

const settle = () => new Promise((r) => setTimeout(r, 40))
const views = (r: Array<{ type?: string }>) => r.filter((m) => m.type === 'layer:view') as unknown as NetGLLayerViewMessage[]

describe('attachNetGLDeckLayer — layer:invalidate', () => {
  it('re-sends the unchanged view with a new viewId, one in flight at a time', async () => {
    const deck = fakeDeck()
    const { guest, host, received } = memoryPair()
    const layer = attachNetGLDeckLayer(deck, { device: mockDevice(), transport: host, time: () => 0 })
    guest.post({ type: 'netgl:ready', anchor: { position: [0, 0, 0], normal: [0, 0, 1], up: [0, 1, 0] }, background: { r: 0, g: 0, b: 0 } })
    await settle()
    expect(views(received).map((v) => v.viewId)).toEqual([1])

    // The guest answers; the view is unchanged, so nothing more is sent.
    guest.post({ type: 'netgl:frame-end' })
    await settle()
    expect(views(received)).toHaveLength(1)

    // Its data changed: it invalidates, and gets the same view again.
    postLayerInvalidate(guest, 'dsn feed')
    await settle()
    const vs = views(received)
    expect(vs.map((v) => v.viewId)).toEqual([1, 2])
    expect(vs[1].view).toEqual(vs[0].view)

    // Invalidated again while view 2 is unanswered: nothing until it is.
    postLayerInvalidate(guest)
    await settle()
    expect(views(received)).toHaveLength(2)
    guest.post({ type: 'netgl:frame-end' })
    await settle()
    expect(views(received).map((v) => v.viewId)).toEqual([1, 2, 3])
    guest.post({ type: 'netgl:frame-end' })
    await settle()
    expect(views(received)).toHaveLength(3)
    expect(layer.stats.viewsSent).toBe(3)
    layer.detach()
  })
})

describe('attachNetGLDeckLayer — layer:hello', () => {
  it('acks each hello, surfaces the first, and takes it as readiness for views', async () => {
    const deck = fakeDeck()
    const { guest, host, received } = memoryPair()
    const hellos: unknown[] = []
    const layer = attachNetGLDeckLayer(deck, { device: mockDevice(), transport: host, time: () => 0, onHello: (h) => hellos.push(h) })
    const hello = { type: 'layer:hello', version: 1, kind: 'celestiary-orbits', capabilities: { anchors: true } }
    guest.post(hello)
    guest.post(hello) // repeated until acked
    await settle()
    expect(received.filter((m) => m.type === 'layer:hello-ack')).toEqual([
      { type: 'layer:hello-ack', accepted: true },
      { type: 'layer:hello-ack', accepted: true }
    ])
    expect(hellos).toEqual([hello])
    expect(layer.hello).toEqual(hello)
    expect(views(received)).toHaveLength(1) // no netgl:ready needed
    layer.detach()
  })

  it('sends the host\'s answer, refusals included', async () => {
    const { guest, host, received } = memoryPair()
    const layer = attachNetGLDeckLayer(fakeDeck(), {
      device: mockDevice(),
      transport: host,
      acceptHello: (h) => (h.version === 1 ? { accepted: true, kind: 'overlay' } : { accepted: false, reason: `version ${h.version}` })
    })
    guest.post({ type: 'layer:hello', version: 3 })
    await settle()
    expect(received.find((m) => m.type === 'layer:hello-ack')).toEqual({ type: 'layer:hello-ack', accepted: false, reason: 'version 3' })
    layer.detach()
  })
})

describe('attachNetGLDeckLayer — anchors', () => {
  it('subscribes (again on hello), and delivers layer:anchors', async () => {
    const { guest, host, received } = memoryPair()
    const layer = attachNetGLDeckLayer(fakeDeck(), { device: mockDevice(), transport: host, time: () => 0 })
    layer.subscribeAnchors(['norad:*'])
    layer.subscribeAnchors(['norad:25544', 'dsn:*'])
    // Nothing goes out before the guest is live.
    expect(received.filter((m) => m.type === 'layer:anchors-subscribe')).toEqual([])
    // On its hello it gets the latest subscription, once, after the ack.
    guest.post({ type: 'layer:hello', version: 1 })
    await settle()
    const control = received.filter((m) => m.type !== 'layer:view')
    expect(control.map((m) => m.type)).toEqual(['layer:hello-ack', 'layer:anchors-subscribe'])
    expect(control[1]).toEqual({ type: 'layer:anchors-subscribe', patterns: ['norad:25544', 'dsn:*'] })
    // Live: sent at once, and again on a later hello.
    layer.subscribeAnchors(['dsn:*'])
    expect(received.filter((m) => m.type === 'layer:anchors-subscribe')).toHaveLength(2)
    guest.post({ type: 'layer:hello', version: 1 })
    await settle()
    expect(received.filter((m) => m.type === 'layer:anchors-subscribe')).toHaveLength(3)

    const got: unknown[] = []
    const off = layer.onAnchors((m) => got.push(m))
    const msg = { type: 'layer:anchors', viewId: 1, timeMs: 0, anchors: [{ id: 'dsn:DSS-43', kind: 'dsn-dish', ecef: [1, 2, 3] }] }
    guest.post(msg)
    await settle()
    expect(got).toEqual([msg])
    expect(layer.anchors).toEqual(msg)
    off()
    guest.post({ ...msg, viewId: 2 })
    await settle()
    expect(got).toHaveLength(1)
    expect(layer.anchors?.viewId).toBe(2)
    layer.detach()
  })

  it('passes other messages to onControl', async () => {
    const { guest, host } = memoryPair()
    const other: unknown[] = []
    const layer = attachNetGLDeckLayer(fakeDeck(), { device: mockDevice(), transport: host, onControl: (m) => other.push(m) })
    guest.post({ type: 'layer:status', status: 'ready' })
    await settle()
    expect(other).toEqual([{ type: 'layer:status', status: 'ready' }])
    layer.detach()
  })
})

describe('attachNetGLDeckLayer — the guest never clears deck\'s frame', () => {
  it("drops the guest's screen clears by default (clear: 'none'), and passes them when asked", async () => {
    for (const clear of [undefined, 'pass'] as const) {
      const calls: string[] = []
      const deck = fakeDeck()
      const { guest, host } = memoryPair()
      const layer = attachNetGLDeckLayer(deck, {
        device: mockDevice(calls),
        transport: host,
        time: () => 0,
        ...(clear ? { replay: { screen: { clear } } } : {})
      })
      guest.post({ name: 'clearColor', args: [0, 0, 0, 0] })
      guest.post({ name: 'clear', args: [0x4100] }) // COLOR | DEPTH
      guest.post({ name: 'drawArrays', args: [0, 0, 1] })
      guest.post({ type: 'netgl:frame-end' })
      deck.redraw()
      expect(calls).toContain('drawArrays')
      if (clear === 'pass') expect(calls).toContain('clear')
      else expect(calls).not.toContain('clear')
      layer.detach()
    }
  })
})

describe('attachNetGLDeckLayer — control posts wait for a live guest', () => {
  it('queues postToGuest until netgl:ready, then flushes in order', async () => {
    const { guest, host, received } = memoryPair()
    const layer = attachNetGLDeckLayer(fakeDeck(), { device: mockDevice(), transport: host, time: () => 0 })
    layer.postToGuest({ type: 'layer:visibility', state: 'shown' })
    layer.subscribeAnchors(['dsn:*'])
    layer.postToGuest({ type: 'layer:time', timeMs: 0 })
    expect(layer.live).toBe(false)
    expect(received).toEqual([])
    guest.post({ type: 'netgl:ready', anchor: { position: [0, 0, 0], normal: [0, 0, 1], up: [0, 1, 0] }, background: { r: 0, g: 0, b: 0 } })
    await settle()
    expect(layer.live).toBe(true)
    expect(received.filter((m) => m.type !== 'layer:view' && m.type !== 'netgl:ready-ack')).toEqual([
      { type: 'layer:visibility', state: 'shown' },
      { type: 'layer:time', timeMs: 0 },
      { type: 'layer:anchors-subscribe', patterns: ['dsn:*'] }
    ])
    layer.postToGuest({ type: 'layer:visibility', state: 'hidden' })
    expect(received[received.length - 1]).toEqual({ type: 'layer:visibility', state: 'hidden' })
    layer.detach()
  })
})
