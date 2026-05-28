// Tests for makeNetGLPortalGuest's handshake + setPose pass-through.
// Mock the transport so we observe posted messages + inject inbound
// ones; gate WebGL2-dependent assertions on env capability.

import { describe, expect, it, vi } from 'vitest'
import type { PortalAnchor } from './portal-types'
import {
  makeNetGLPortalGuest,
  type NetGLSetPoseMessage
} from './guest'
import type { WindowTransport } from './window-transport'

const ANCHOR: PortalAnchor = {
  position: [0, 0, 0],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: 1,
  halfHeight: 1
}

const makeMockTransport = (): {
  transport: WindowTransport
  posted: unknown[]
  inject: (msg: unknown) => void
} => {
  const posted: unknown[] = []
  let listener: ((msg: unknown) => void) | null = null
  return {
    posted,
    transport: {
      post: (msg) => posted.push(msg),
      onMessage: (l) => {
        listener = l
        return () => {
          if (listener === l) listener = null
        }
      }
    },
    inject: (msg) => listener?.(msg)
  }
}

// Minimal fake WebGLRenderer constructor for tests that don't need a real
// renderer. Just records the construction args and provides the methods
// the factory monkey-patches. None of the test assertions need three's
// actual rendering.
const makeFakeWebGLRenderer = () => {
  const calls: { method: string; args: unknown[] }[] = []
  let target: unknown = null
  let raf: ((time: number, frame?: unknown) => void) | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Ctor = function (this: any, params: any) {
    this._params = params
    this.autoClear = true
    this.getRenderTarget = () => target
    this.setRenderTarget = (t: unknown) => {
      target = t
      calls.push({ method: 'setRenderTarget', args: [t] })
    }
    this.resetState = () => calls.push({ method: 'resetState', args: [] })
    this.render = (scene: unknown, camera: unknown) => {
      calls.push({ method: 'render', args: [scene, camera] })
    }
    this.setAnimationLoop = (cb: typeof raf) => {
      raf = cb
      calls.push({ method: 'setAnimationLoop', args: [cb] })
    }
    this.setSize = () => {}
  }
  return {
    Ctor: Ctor as unknown as new (params: unknown) => unknown,
    calls,
    triggerRaf: (t: number) => raf?.(t)
  }
}

// Skip WebGL2-dependent tests when the env can't make a context (this
// repo's jsdom-based vitest setup). Those exercise the real renderer
// construction path; the rest exercise the message + lifecycle plumbing.
const HAS_WEBGL2 = (() => {
  try {
    return (
      typeof document !== 'undefined' &&
      typeof HTMLCanvasElement !== 'undefined' &&
      !!document.createElement('canvas').getContext('webgl2')
    )
  } catch {
    return false
  }
})()
const itGL = HAS_WEBGL2 ? it : it.skip

describe('makeNetGLPortalGuest', () => {
  it('export shape is stable', () => {
    expect(typeof makeNetGLPortalGuest).toBe('function')
  })

  itGL('posts netgl:ready with anchor + background on construction', () => {
    const { transport, posted } = makeMockTransport()
    const { Ctor } = makeFakeWebGLRenderer()
    makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      background: { r: 0.2, g: 0.4, b: 0.6 },
      transport
    })
    const ready = posted.find(
      (m): m is { type: 'netgl:ready'; anchor: PortalAnchor; background: { r: number; g: number; b: number } } =>
        typeof m === 'object' && m !== null && (m as { type?: unknown }).type === 'netgl:ready'
    )
    expect(ready).toBeDefined()
    expect(ready!.anchor).toEqual(ANCHOR)
    expect(ready!.background).toEqual({ r: 0.2, g: 0.4, b: 0.6 })
  })

  itGL('defaults background to opaque black when not provided', () => {
    const { transport, posted } = makeMockTransport()
    const { Ctor } = makeFakeWebGLRenderer()
    makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      transport
    })
    const ready = posted.find(
      (m): m is { background: { r: number; g: number; b: number } } =>
        typeof m === 'object' && m !== null && (m as { type?: unknown }).type === 'netgl:ready'
    )!
    expect(ready.background).toEqual({ r: 0, g: 0, b: 0 })
  })

  itGL('returns a renderer the caller can use', () => {
    const { transport } = makeMockTransport()
    const { Ctor } = makeFakeWebGLRenderer()
    const handle = makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      transport
    })
    expect(handle.renderer).toBeDefined()
    expect(typeof handle.stop).toBe('function')
  })

  itGL('forwards setPose to onSetPose hook when registered', () => {
    const { transport, inject } = makeMockTransport()
    const { Ctor } = makeFakeWebGLRenderer()
    const onSetPose = vi.fn()
    makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      transport,
      onSetPose
    })
    const msg: NetGLSetPoseMessage = {
      type: 'netgl:setPose',
      pose: { position: [1, 2, 3], forward: [0, 0, -1], up: [0, 1, 0] },
      projection: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      viewport: { width: 800, height: 600 },
      time: 1.5
    }
    inject(msg)
    expect(onSetPose).toHaveBeenCalledTimes(1)
    expect(onSetPose).toHaveBeenCalledWith(msg)
  })

  itGL('does NOT forward setPose when no hook is registered (no crash)', () => {
    const { transport, inject } = makeMockTransport()
    const { Ctor } = makeFakeWebGLRenderer()
    makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      transport
    })
    expect(() => {
      inject({
        type: 'netgl:setPose',
        pose: { position: [0, 0, 0] },
        projection: new Array(16).fill(0),
        viewport: { width: 1, height: 1 },
        time: 0
      })
    }).not.toThrow()
  })

  itGL('stop() is idempotent and unsubscribes setPose listener', () => {
    const { transport, inject } = makeMockTransport()
    const { Ctor } = makeFakeWebGLRenderer()
    const onSetPose = vi.fn()
    const handle = makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      transport,
      onSetPose
    })
    handle.stop()
    handle.stop() // idempotent
    inject({
      type: 'netgl:setPose',
      pose: { position: [0, 0, 0] },
      projection: new Array(16).fill(0),
      viewport: { width: 1, height: 1 },
      time: 0
    })
    expect(onSetPose).not.toHaveBeenCalled()
  })

  itGL('passes the caller WebGLRenderer ctor through (proves no two-three.js coupling)', () => {
    // Construct two different "WebGLRenderer" ctors, give one to the
    // factory, observe the factory used THAT one (the renderer is an
    // instance of the passed ctor, not some other version).
    const { transport } = makeMockTransport()
    const A = makeFakeWebGLRenderer()
    const B = makeFakeWebGLRenderer()
    const handleA = makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: A.Ctor as any,
      anchor: ANCHOR,
      transport: transport
    })
    expect(handleA.renderer).toBeInstanceOf(A.Ctor)
    expect(handleA.renderer).not.toBeInstanceOf(B.Ctor)
  })

  itGL('posts netgl:frame-end after each setAnimationLoop callback completes', () => {
    const { transport, posted } = makeMockTransport()
    const { Ctor, triggerRaf } = makeFakeWebGLRenderer()
    const handle = makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      transport
    })
    const userCb = vi.fn()
    handle.renderer.setAnimationLoop(userCb)
    posted.length = 0 // clear pre-RAF messages (just netgl:ready)
    triggerRaf(0)
    triggerRaf(16)
    expect(userCb).toHaveBeenCalledTimes(2)
    const frameEnds = posted.filter(
      (m) => typeof m === 'object' && m !== null && (m as { type?: unknown }).type === 'netgl:frame-end'
    )
    expect(frameEnds).toHaveLength(2)
  })

  itGL('still posts frame-end when the user callback throws (drain resilience)', () => {
    const { transport, posted } = makeMockTransport()
    const { Ctor, triggerRaf } = makeFakeWebGLRenderer()
    const handle = makeNetGLPortalGuest({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      WebGLRenderer: Ctor as any,
      anchor: ANCHOR,
      transport
    })
    handle.renderer.setAnimationLoop(() => {
      throw new Error('intentional')
    })
    posted.length = 0
    // Suppress the expected console.error so test output stays clean.
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    triggerRaf(0)
    errSpy.mockRestore()
    const frameEnds = posted.filter(
      (m) => typeof m === 'object' && m !== null && (m as { type?: unknown }).type === 'netgl:frame-end'
    )
    expect(frameEnds).toHaveLength(1)
  })
})
