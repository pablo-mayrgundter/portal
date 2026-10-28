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

// A mock that records each call's decoded args, hands out a distinct
// object from each create*, and notes what's deleted.
type ArgsCall = { name: string; args: unknown[] }
const makeArgsGl = (): {
  gl: WebGL2RenderingContext & { handles: object[]; deleted: Set<unknown> }
  calls: ArgsCall[]
} => {
  const calls: ArgsCall[] = []
  const handles: object[] = []
  const deleted = new Set<unknown>()
  const gl = new Proxy({ handles, deleted } as Record<string, unknown>, {
    get(target, prop: string) {
      if (prop in target) return target[prop]
      return (...args: unknown[]) => {
        calls.push({ name: prop, args })
        if (prop.startsWith('delete')) deleted.add(args[0])
        if (prop.startsWith('create') || prop === 'fenceSync') {
          const h = { __mock: prop, n: handles.length }
          handles.push(h)
          return h
        }
        return undefined
      }
    }
  }) as unknown as WebGL2RenderingContext & { handles: object[]; deleted: Set<unknown> }
  return { gl, calls }
}
const names = (calls: ArgsCall[]): string[] => calls.map((c) => c.name)
const H = (id: number) => ({ __netgl_handle: id })
const FB = 0x8D40
const DRAW_FB = 0x8CA9
const RB = 0x8D41
const COLOR0 = 0x8CE0
const DEPTH = 0x8D00
const TEX_2D = 0x0DE1
const TEXTURE0 = 0x84C0
const ARRAY = 0x8892
const ELEMENT = 0x8893
const UBO = 0x8A11

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

  it('calls beforeFrame before each frame, a re-run too, with its frame-end', () => {
    // A guest that draws twice for one view (Cesium's day frame, then its
    // night lights) tags the second; the host routes each to its target.
    const { gl, calls } = makeMockGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({
      gl,
      transport,
      beforeFrame: (end) => calls.push(`frame:${end.viewId}:${end.part ?? 'main'}`)
    })
    deliver({ name: 'clear', args: [0x4000] })
    deliver({ type: 'netgl:frame-end', viewId: 3 })
    deliver({ name: 'drawArrays', args: [4, 0, 3] })
    deliver({ type: 'netgl:frame-end', viewId: 3, part: 'lights' })
    // A frame with no calls still gets its call.
    deliver({ type: 'netgl:frame-end', viewId: 3, part: 'empty' })
    host.drain()
    expect(calls).toEqual(['frame:3:main', 'clear', 'frame:3:lights', 'drawArrays', 'frame:3:empty'])
    calls.length = 0
    host.drain()
    expect(calls).toEqual(['frame:3:main', 'clear', 'frame:3:lights', 'drawArrays', 'frame:3:empty'])
    expect(host.drainedViews).toEqual([3, 3, 3])
  })

  it('re-runs a frame that deleted an object: the delete waits for the next new frame (the black door)', () => {
    // The Cesium black-door bug: frame 1 creates, uses and deletes a
    // scratch framebuffer. Run at once, the delete left a re-run binding
    // the deleted FBO (which fails) and attaching textures to whatever FBO
    // was still bound. Held back, the FBO exists for the re-run.
    const { gl, calls } = makeArgsGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'createTexture', args: [], returnId: 1 })
    deliver({ name: 'createFramebuffer', args: [], returnId: 2 })
    deliver({ name: 'bindFramebuffer', args: [FB, H(2)] })
    deliver({ name: 'framebufferTexture2D', args: [FB, COLOR0, TEX_2D, H(1), 0] })
    deliver({ name: 'drawArrays', args: [4, 0, 3] })
    deliver({ name: 'deleteFramebuffer', args: [H(2)] })
    deliver(END)
    expect(host.drain()).toBe(true)
    // The bound FBO's delete reverts the binding to the screen, there.
    expect(names(calls)).toEqual(['createTexture', 'createFramebuffer', 'bindFramebuffer', 'framebufferTexture2D', 'drawArrays', 'bindFramebuffer'])
    expect(calls[5].args).toEqual([FB, null])
    expect(host.pendingDeletes).toBe(1)

    calls.length = 0
    expect(host.canRerun).toBe(true)
    expect(host.drain()).toBe(true)
    expect(names(calls)).toEqual(['bindFramebuffer', 'framebufferTexture2D', 'drawArrays', 'bindFramebuffer'])
    // The FBO the re-run binds is frame 1's own, alive.
    expect(calls[0].args).toEqual([FB, gl.handles[1]])
    expect(gl.deleted.size).toBe(0)

    // The next new frame runs the held delete before its own calls.
    deliver({ name: 'createFramebuffer', args: [], returnId: 3 })
    deliver(END)
    calls.length = 0
    expect(host.drain()).toBe(true)
    expect(names(calls)).toEqual(['deleteFramebuffer', 'createFramebuffer'])
    expect(host.pendingDeletes).toBe(0)
  })

  it('sends a draw after deleting the bound framebuffer to the screen, on a re-run too', () => {
    const { gl, calls } = makeArgsGl()
    const { transport, deliver } = makeTransport()
    const screen = { __screen: true }
    const host = makeNetGLHostReceiver({
      gl,
      transport,
      replay: { screenFramebuffer: () => screen as unknown as WebGLFramebuffer }
    })
    deliver({ name: 'createFramebuffer', args: [], returnId: 1 })
    deliver({ name: 'bindFramebuffer', args: [DRAW_FB, H(1)] })
    deliver({ name: 'deleteFramebuffer', args: [H(1)] })
    deliver({ name: 'drawArrays', args: [4, 0, 3] })
    deliver(END)
    for (const _ of [0, 1]) {
      calls.length = 0
      expect(host.drain()).toBe(true)
      const at = names(calls).indexOf('drawArrays')
      expect(calls[at - 1]).toEqual({ name: 'bindFramebuffer', args: [DRAW_FB, screen] })
    }
  })

  it('detaches a deleted texture or renderbuffer from the bound framebuffer, per attachment point', () => {
    const { gl, calls } = makeArgsGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'createFramebuffer', args: [], returnId: 1 })
    deliver({ name: 'createTexture', args: [], returnId: 2 })
    deliver({ name: 'createRenderbuffer', args: [], returnId: 3 })
    deliver({ name: 'createTexture', args: [], returnId: 4 })
    deliver({ name: 'bindFramebuffer', args: [FB, H(1)] })
    deliver({ name: 'framebufferTexture2D', args: [FB, COLOR0, TEX_2D, H(2), 0] })
    deliver({ name: 'framebufferTexture2D', args: [FB, COLOR0 + 1, TEX_2D, H(2), 0] })
    deliver({ name: 'framebufferRenderbuffer', args: [FB, DEPTH, RB, H(3)] })
    // Bound on unit 3 as well, while unit 0 is active.
    deliver({ name: 'activeTexture', args: [TEXTURE0 + 3] })
    deliver({ name: 'bindTexture', args: [TEX_2D, H(2)] })
    deliver({ name: 'activeTexture', args: [TEXTURE0] })
    deliver({ name: 'bindTexture', args: [TEX_2D, H(4)] })
    deliver({ name: 'bindRenderbuffer', args: [RB, H(3)] })
    deliver(END)
    host.drain()
    deliver({ name: 'bindFramebuffer', args: [FB, H(1)] })
    deliver({ name: 'activeTexture', args: [TEXTURE0 + 3] })
    deliver({ name: 'bindTexture', args: [TEX_2D, H(2)] })
    deliver({ name: 'activeTexture', args: [TEXTURE0] })
    deliver({ name: 'bindRenderbuffer', args: [RB, H(3)] })
    deliver({ name: 'deleteTexture', args: [H(2)] })
    deliver({ name: 'deleteRenderbuffer', args: [H(3)] })
    deliver({ name: 'drawArrays', args: [4, 0, 3] })
    deliver(END)
    calls.length = 0
    host.drain()
    expect(calls.slice(5, -1)).toEqual([
      { name: 'framebufferTexture2D', args: [FB, COLOR0, TEX_2D, null, 0] },
      { name: 'framebufferTexture2D', args: [FB, COLOR0 + 1, TEX_2D, null, 0] },
      { name: 'activeTexture', args: [TEXTURE0 + 3] },
      { name: 'bindTexture', args: [TEX_2D, null] },
      { name: 'activeTexture', args: [TEXTURE0] },
      { name: 'framebufferRenderbuffer', args: [FB, DEPTH, RB, null] },
      { name: 'bindRenderbuffer', args: [RB, null] }
    ])
    expect(host.pendingDeletes).toBe(2)
  })

  it('unbinds a deleted buffer from its generic, indexed and element bindings', () => {
    const { gl, calls } = makeArgsGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'createBuffer', args: [], returnId: 1 })
    deliver({ name: 'createBuffer', args: [], returnId: 2 })
    deliver(END)
    host.drain()
    deliver({ name: 'bindBuffer', args: [ARRAY, H(1)] })
    deliver({ name: 'bindBuffer', args: [ELEMENT, H(1)] })
    deliver({ name: 'bindBufferBase', args: [UBO, 2, H(1)] })
    // The generic UNIFORM_BUFFER binding moves on to buffer 2.
    deliver({ name: 'bindBuffer', args: [UBO, H(2)] })
    deliver({ name: 'deleteBuffer', args: [H(1)] })
    deliver(END)
    calls.length = 0
    host.drain()
    expect(calls.slice(4)).toEqual([
      { name: 'bindBufferBase', args: [UBO, 2, null] },
      { name: 'bindBuffer', args: [UBO, gl.handles[1]] },
      { name: 'bindBuffer', args: [ARRAY, null] },
      { name: 'bindBuffer', args: [ELEMENT, null] }
    ])
  })

  it('emits no unbind for a binding made in an earlier drain (the host has used the context since)', () => {
    const { gl, calls } = makeArgsGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'createFramebuffer', args: [], returnId: 1 })
    deliver({ name: 'createTexture', args: [], returnId: 2 })
    deliver({ name: 'bindFramebuffer', args: [FB, H(1)] })
    deliver({ name: 'framebufferTexture2D', args: [FB, COLOR0, TEX_2D, H(2), 0] })
    deliver({ name: 'bindTexture', args: [TEX_2D, H(2)] })
    deliver(END)
    host.drain()
    deliver({ name: 'deleteTexture', args: [H(2)] })
    deliver({ name: 'deleteFramebuffer', args: [H(1)] })
    deliver(END)
    calls.length = 0
    host.drain()
    expect(calls).toEqual([])
    expect(host.pendingDeletes).toBe(2)
  })

  it('holds a batch\'s deletes past all its frames, so the whole batch re-runs', () => {
    const { gl, calls } = makeArgsGl()
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl, transport })
    deliver({ name: 'createBuffer', args: [], returnId: 1 })
    deliver({ name: 'bindBuffer', args: [ARRAY, H(1)] })
    deliver({ name: 'deleteBuffer', args: [H(1)] })
    deliver(END)
    deliver({ name: 'createBuffer', args: [], returnId: 2 })
    deliver({ name: 'bindBuffer', args: [ARRAY, H(2)] })
    deliver(END)
    host.drain()
    calls.length = 0
    host.drain()
    expect(calls).toEqual([
      { name: 'bindBuffer', args: [ARRAY, gl.handles[0]] },
      { name: 'bindBuffer', args: [ARRAY, null] },
      { name: 'bindBuffer', args: [ARRAY, gl.handles[1]] }
    ])
    expect(gl.deleted.size).toBe(0)
  })

  it('never re-runs a frame that reads back or uses a sync object', () => {
    for (const call of [
      { name: 'readPixels', args: [0, 0, 1, 1, 0x1908, 0x1401, 0] },
      { name: 'fenceSync', args: [0x9117, 0], returnId: 9 }
    ]) {
      const { gl, calls } = makeArgsGl()
      const { transport, deliver } = makeTransport()
      const host = makeNetGLHostReceiver({ gl, transport })
      deliver({ name: 'drawArrays', args: [4, 0, 3] })
      deliver(call)
      deliver(END)
      expect(host.drain()).toBe(true)
      calls.length = 0
      expect(host.canRerun).toBe(false)
      expect(host.drain()).toBe(false)
      expect(calls).toEqual([])

      // The next frame without one is re-runnable again.
      deliver({ name: 'drawArrays', args: [4, 0, 3] })
      deliver(END)
      host.drain()
      calls.length = 0
      expect(host.drain()).toBe(true)
      expect(names(calls)).toEqual(['drawArrays'])
    }
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

  it('acks every ready announcement but surfaces only the first', () => {
    const { gl } = makeMockGl()
    const { transport, deliver } = makeTransport()
    const posted: unknown[] = []
    transport.post = (msg) => { posted.push(msg) }
    let readies = 0
    makeNetGLHostReceiver({ gl, transport, onReady: () => { readies += 1 } })
    const ready = { type: 'netgl:ready', anchor: { position: [0, 0, 0] }, background: { r: 0, g: 0, b: 0 } }
    deliver(ready)
    deliver(ready)
    expect(readies).toBe(1)
    expect(posted).toEqual([{ type: 'netgl:ready-ack' }, { type: 'netgl:ready-ack' }])
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
