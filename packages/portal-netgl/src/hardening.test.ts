// Wire hardening for guests from another origin: what the replay refuses to
// execute, and what the recorder refuses to ship.

import { describe, it, expect } from 'vitest'
import type { NetGLCall } from './messages'
import { makeNetGLRecorder } from './recorder'
import { makeNetGLReplay } from './replay'

const makeMockGl = (): { gl: WebGL2RenderingContext; calls: string[] } => {
  const calls: string[] = []
  const target: Record<string, unknown> = {}
  const gl = new Proxy(target, {
    get(_, prop: string) {
      // Object.prototype members resolve as on any object.
      if (prop in Object.prototype) return (Object.prototype as Record<string, unknown>)[prop]
      return (...args: unknown[]) => {
        calls.push(prop)
        void args
        return prop.startsWith('create') ? {} : undefined
      }
    }
  }) as unknown as WebGL2RenderingContext
  return { gl, calls }
}

describe('replay: only GL entry points', () => {
  it('refuses Object.prototype methods by name', () => {
    const { gl } = makeMockGl()
    const replay = makeNetGLReplay(gl)
    for (const name of ['constructor', '__defineGetter__', 'hasOwnProperty', 'toString', '__proto__']) {
      expect(() => replay({ name, args: ['drawArrays', 1] })).toThrow(/refusing|no method/)
    }
  })

  it('refuses typed-array names that are not typed arrays', () => {
    const { gl } = makeMockGl()
    const replay = makeNetGLReplay(gl)
    const call: NetGLCall = {
      name: 'bufferData',
      args: [0x8892, { __netgl_typedarray: 'toString', buffer: new ArrayBuffer(4), offset: 0, length: 1 }, 0x88e4]
    }
    expect(() => replay(call)).toThrow(/unknown typed-array/)
  })
})

describe('recorder: a partial view ships only its own bytes', () => {
  it('slices a subarray out of a large buffer', () => {
    const { gl: shadow } = makeMockGl()
    const posted: NetGLCall[] = []
    const rec = makeNetGLRecorder(shadow, (c) => posted.push(c))
    const heap = new Float32Array(1 << 16) // e.g. a WASM heap or a scratch pool
    heap.set([1, 2, 3, 4], 100)
    rec.bufferSubData(0x8892, 0, heap.subarray(100, 104))
    const arg = posted[posted.length - 1].args[2] as { buffer: ArrayBuffer; offset: number; length: number }
    expect(arg.buffer.byteLength).toBe(16)
    expect(arg.offset).toBe(0)
    expect(Array.from(new Float32Array(arg.buffer, arg.offset, arg.length))).toEqual([1, 2, 3, 4])
  })

  it('ships a whole-buffer view as is', () => {
    const { gl: shadow } = makeMockGl()
    const posted: NetGLCall[] = []
    const rec = makeNetGLRecorder(shadow, (c) => posted.push(c))
    const data = new Float32Array([1, 2, 3])
    rec.bufferData(0x8892, data, 0x88e4)
    const arg = posted[posted.length - 1].args[1] as { buffer: ArrayBuffer }
    expect(arg.buffer).toBe(data.buffer)
  })
})
