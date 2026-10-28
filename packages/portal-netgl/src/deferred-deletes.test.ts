// Deferred deletes on a real GL (headless-gl): a frame that renders into a
// scratch framebuffer, copies it to the screen and deletes the scratch
// draws the same pixels when the receiver re-runs it; before 0.6.9 the
// re-run was refused and the host drew nothing for that frame.

import { describe, it, expect } from 'vitest'
import gl from 'gl'
import { makeNetGLHostReceiver } from './host-receiver'
import type { NetGLTransport } from './renderer'

const W = 4
const H = 4
const RGBA8 = 0x8058
const COLOR0 = 0x8CE0
const FB = 0x8D40
const READ_FB = 0x8CA8
const DRAW_FB = 0x8CA9
const RB = 0x8D41
const COLOR_BIT = 0x4000
const NEAREST = 0x2600
const h = (id: number) => ({ __netgl_handle: id })

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

const pixel = (ctx: WebGL2RenderingContext): number[] => {
  ctx.bindFramebuffer(FB, null)
  const out = new Uint8Array(4)
  ctx.readPixels(1, 1, 1, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, out)
  return [...out]
}

describe('deferred deletes (headless-gl)', () => {
  it('re-runs a frame that deleted its scratch framebuffer, drawing the same pixels', () => {
    const ctx = gl(W, H, { createWebGL2Context: true } as unknown as WebGLContextAttributes) as unknown as WebGL2RenderingContext
    if (!ctx) throw new Error('headless-gl: could not create WebGL2 context')
    const { transport, deliver } = makeTransport()
    const host = makeNetGLHostReceiver({ gl: ctx, transport })
    // The guest's frame: a scratch target cleared to red, blitted to the
    // screen, then deleted (with its renderbuffer).
    const frame = [
      { name: 'createRenderbuffer', args: [], returnId: 1 },
      { name: 'bindRenderbuffer', args: [RB, h(1)] },
      { name: 'renderbufferStorage', args: [RB, RGBA8, W, H] },
      { name: 'createFramebuffer', args: [], returnId: 2 },
      { name: 'bindFramebuffer', args: [FB, h(2)] },
      { name: 'framebufferRenderbuffer', args: [FB, COLOR0, RB, h(1)] },
      { name: 'clearColor', args: [1, 0, 0, 1] },
      { name: 'clear', args: [COLOR_BIT] },
      { name: 'bindFramebuffer', args: [DRAW_FB, null] },
      { name: 'blitFramebuffer', args: [0, 0, W, H, 0, 0, W, H, COLOR_BIT, NEAREST] },
      { name: 'bindFramebuffer', args: [READ_FB, null] },
      { name: 'deleteFramebuffer', args: [h(2)] },
      { name: 'deleteRenderbuffer', args: [h(1)] }
    ]
    for (const c of frame) deliver(c)
    deliver({ type: 'netgl:frame-end' })

    // The host's own frame: black, then the guest's.
    const hostFrame = (): number[] => {
      ctx.bindFramebuffer(FB, null)
      ctx.clearColor(0, 0, 0, 1)
      ctx.clear(COLOR_BIT)
      expect(host.drain()).toBe(true)
      return pixel(ctx)
    }
    expect(hostFrame()).toEqual([255, 0, 0, 255])
    expect(host.pendingDeletes).toBe(2)
    // No new frame: the re-run draws it again.
    expect(hostFrame()).toEqual([255, 0, 0, 255])
    expect(ctx.getError()).toBe(0)

    // A new frame frees them first.
    deliver({ name: 'clearColor', args: [0, 0, 1, 1] })
    deliver({ name: 'clear', args: [COLOR_BIT] })
    deliver({ type: 'netgl:frame-end' })
    expect(hostFrame()).toEqual([0, 0, 255, 255])
    expect(host.pendingDeletes).toBe(0)
    expect(ctx.getError()).toBe(0)
  })
})
