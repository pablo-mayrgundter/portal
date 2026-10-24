// The recorder ships exactly the bytes a call reads, and lists only its own
// copies for transfer: one test per call shape. No GL: the shadow is a
// stand-in that answers getParameter for the unpack state.

import { describe, it, expect } from 'vitest'
import { DEFAULT_UNPACK, makeNetGLRecorderSession, trimSource, unpackExtent } from './recorder'
import type { NetGLCall } from './messages'

const GL = {
  ARRAY_BUFFER: 0x8892,
  STATIC_DRAW: 0x88e4,
  TEXTURE_2D: 0x0de1,
  TEXTURE_3D: 0x806f,
  RGBA: 0x1908,
  RGB: 0x1907,
  RED: 0x1903,
  UNSIGNED_BYTE: 0x1401,
  FLOAT: 0x1406,
  UNPACK_ALIGNMENT: 0x0cf5,
  UNPACK_ROW_LENGTH: 0x0cf2,
  COMPRESSED: 0x83f1
}

const fakeShadow = (params: Record<number, number> = {}): WebGL2RenderingContext =>
  new Proxy({} as Record<string, unknown>, {
    get: (_t, p: string) => {
      if (p === 'getParameter') return (pname: number) => params[pname] ?? (pname === GL.UNPACK_ALIGNMENT ? 4 : 0)
      if (p === 'getUniformLocation' || p.startsWith('create')) return () => ({})
      return () => undefined
    }
  }) as unknown as WebGL2RenderingContext

type Posted = { call: NetGLCall; transfer?: ArrayBuffer[]; urgent?: boolean }

const record = (params?: Record<number, number>) => {
  const posted: Posted[] = []
  const session = makeNetGLRecorderSession(fakeShadow(params), (call, transfer, urgent) => posted.push({ call, transfer, urgent }), { scalarState: 'queried' })
  // A location the recorder has interned.
  const loc = (): WebGLUniformLocation => session.gl.getUniformLocation(null as unknown as WebGLProgram, 'u')!
  return { gl: session.gl, session, posted, loc, last: () => posted[posted.length - 1] }
}

type Encoded = { __netgl_typedarray: string; buffer: ArrayBuffer; offset: number; length: number }
const decode = (a: unknown): number[] => {
  const e = a as Encoded
  const Ctor = (globalThis as unknown as Record<string, new (b: ArrayBuffer, o: number, l: number) => ArrayLike<number>>)[e.__netgl_typedarray]
  return Array.from(new Ctor(e.buffer, e.offset, e.length))
}
const seq = (n: number, Ctor: new (n: number) => Float32Array | Uint8Array = Float32Array) => {
  const a = new Ctor(n)
  for (let i = 0; i < n; i += 1) a[i] = i
  return a
}

describe('recorder: slices', () => {
  it('bufferSubData(target, dst, src, srcOffset, length) ships the range', () => {
    const r = record()
    const src = seq(100_000)
    r.gl.bufferSubData(GL.ARRAY_BUFFER, 4000, src, 1000, 3)
    const { call, transfer } = r.last()
    expect(call.args.length).toBe(3)
    expect(call.args.slice(0, 2)).toEqual([GL.ARRAY_BUFFER, 4000])
    expect(decode(call.args[2])).toEqual([1000, 1001, 1002])
    expect((call.args[2] as Encoded).buffer.byteLength).toBe(12)
    // The copy is the recorder's; the app's array is untouched and not listed.
    expect(transfer).toEqual([(call.args[2] as Encoded).buffer])
    expect(transfer).not.toContain(src.buffer)
  })

  it('bufferSubData with srcOffset only ships to the end', () => {
    const r = record()
    r.gl.bufferSubData(GL.ARRAY_BUFFER, 0, seq(10), 7)
    expect(decode(r.last().call.args[2])).toEqual([7, 8, 9])
  })

  it('bufferData(target, src, usage, srcOffset, length) ships the range', () => {
    const r = record()
    r.gl.bufferData(GL.ARRAY_BUFFER, seq(50), GL.STATIC_DRAW, 10, 2)
    const { call } = r.last()
    expect(call.args.length).toBe(3)
    expect(decode(call.args[1])).toEqual([10, 11])
    expect(call.args[2]).toBe(GL.STATIC_DRAW)
  })

  it('a whole array posted at once is not copied, and not listed for transfer', () => {
    const r = record()
    const src = seq(8)
    r.gl.bufferData(GL.ARRAY_BUFFER, src, GL.STATIC_DRAW)
    const { call, transfer } = r.last()
    expect((call.args[1] as Encoded).buffer).toBe(src.buffer)
    expect(transfer).toBeUndefined()
  })

  it('an out-of-range offset or length is left for the receiver to reject', () => {
    const r = record()
    r.gl.bufferSubData(GL.ARRAY_BUFFER, 0, seq(4), 2, 9)
    expect(r.last().call.args.length).toBe(5)
    r.gl.bufferSubData(GL.ARRAY_BUFFER, 0, seq(4), 6)
    expect(r.last().call.args.length).toBe(4)
  })

  it('texSubImage2D with srcOffset ships the rows it reads', () => {
    const r = record()
    // 2×3 RGBA bytes = 24 bytes, from offset 100 of a 1,000-byte array.
    r.gl.texSubImage2D(GL.TEXTURE_2D, 0, 0, 0, 2, 3, GL.RGBA, GL.UNSIGNED_BYTE, seq(1000, Uint8Array), 100)
    const { call } = r.last()
    expect(call.args.length).toBe(9)
    expect(decode(call.args[8])).toEqual(Array.from({ length: 24 }, (_, i) => 100 + i))
  })

  it('texImage2D without an offset is cut after the last byte read, by the unpack state', () => {
    const r = record()
    // RGB bytes, 3 wide: rows of 9 bytes padded to 12 (alignment 4); 2 rows = 12 + 9.
    r.gl.texImage2D(GL.TEXTURE_2D, 0, GL.RGB, 3, 2, 0, GL.RGB, GL.UNSIGNED_BYTE, seq(500, Uint8Array))
    expect(decode(r.last().call.args[8]).length).toBe(21)
    // Alignment 1 and a row length of 5 pixels: 15 + 9.
    r.gl.pixelStorei(GL.UNPACK_ALIGNMENT, 1)
    r.gl.pixelStorei(GL.UNPACK_ROW_LENGTH, 5)
    r.gl.texImage2D(GL.TEXTURE_2D, 0, GL.RGB, 3, 2, 0, GL.RGB, GL.UNSIGNED_BYTE, seq(500, Uint8Array))
    expect(decode(r.last().call.args[8]).length).toBe(24)
  })

  it('reads the unpack state the shadow already has', () => {
    const r = record({ [GL.UNPACK_ALIGNMENT]: 8 })
    // A 1-pixel-wide RED float texture, 3 rows: rows of 4 bytes padded to 8.
    r.gl.texImage2D(GL.TEXTURE_2D, 0, GL.RED, 1, 3, 0, GL.RED, GL.FLOAT, seq(64))
    expect(decode(r.last().call.args[8]).length).toBe(5) // 2·8 + 4 bytes = 20 bytes = 5 floats
  })

  it('texImage3D / texSubImage3D with srcOffset ship the images they read', () => {
    const r = record()
    r.gl.texImage3D(GL.TEXTURE_3D, 0, GL.RGBA, 1, 1, 2, 0, GL.RGBA, GL.UNSIGNED_BYTE, seq(100, Uint8Array), 10)
    let { call } = r.last()
    expect(call.args.length).toBe(10)
    expect(decode(call.args[9])).toEqual([10, 11, 12, 13, 14, 15, 16, 17])
    r.gl.texSubImage3D(GL.TEXTURE_3D, 0, 0, 0, 0, 1, 1, 1, GL.RGBA, GL.UNSIGNED_BYTE, seq(100, Uint8Array), 50)
    ;({ call } = r.last())
    expect(call.args.length).toBe(11)
    expect(decode(call.args[10])).toEqual([50, 51, 52, 53])
  })

  it('compressedTexSubImage2D(…, src, srcOffset, srcLengthOverride) ships the range', () => {
    const r = record()
    r.gl.compressedTexSubImage2D(GL.TEXTURE_2D, 0, 0, 0, 4, 4, GL.COMPRESSED, seq(64, Uint8Array), 16, 8)
    const { call } = r.last()
    expect(call.args.length).toBe(8)
    expect(decode(call.args[7])).toEqual([16, 17, 18, 19, 20, 21, 22, 23])
  })

  it('compressedTexImage2D(…, src, srcOffset) ships to the end', () => {
    const r = record()
    r.gl.compressedTexImage2D(GL.TEXTURE_2D, 0, GL.COMPRESSED, 4, 4, 0, seq(20, Uint8Array), 12)
    const { call } = r.last()
    expect(call.args.length).toBe(7)
    expect(decode(call.args[6])).toEqual([12, 13, 14, 15, 16, 17, 18, 19])
  })

  it('uniform4fv(location, data, srcOffset, srcLength) ships the elements', () => {
    const r = record()
    r.gl.uniform4fv(r.loc(), seq(64), 8, 4)
    const { call } = r.last()
    expect(call.args.length).toBe(2)
    expect(decode(call.args[1])).toEqual([8, 9, 10, 11])
  })

  it('uniformMatrix4fv(location, transpose, data, srcOffset, srcLength) ships the matrix', () => {
    const r = record()
    r.gl.uniformMatrix4fv(r.loc(), false, seq(64), 16, 16)
    const { call } = r.last()
    expect(call.args.length).toBe(3)
    expect(call.args[1]).toBe(false)
    expect(decode(call.args[2])).toEqual(Array.from({ length: 16 }, (_, i) => 16 + i))
  })

  it('vertexAttrib4fv ships the four elements it reads', () => {
    const r = record()
    r.gl.vertexAttrib4fv(2, seq(1000))
    const { call } = r.last()
    expect(decode(call.args[1])).toEqual([0, 1, 2, 3])
    r.gl.vertexAttrib2fv(2, seq(9))
    expect(decode(r.last().call.args[1])).toEqual([0, 1])
  })

  it('a partial view of a larger buffer ships its own bytes', () => {
    const r = record()
    const heap = new ArrayBuffer(1 << 20)
    const view = new Float32Array(heap, 64, 4)
    r.gl.uniform4fv(r.loc(), view)
    const { call, transfer } = r.last()
    expect((call.args[1] as Encoded).buffer.byteLength).toBe(16)
    expect(transfer).toHaveLength(1)
    expect(transfer![0]).not.toBe(heap)
  })
})

describe('recorder: snapshots', () => {
  it('copies every array when on, so a held call keeps its values, and lists only copies', () => {
    const r = record()
    r.session.snapshot = true
    const loc = r.loc()
    r.posted.length = 0
    const scratch = new Float32Array([1, 2, 3, 4])
    r.gl.uniform4fv(loc, scratch)
    scratch.set([5, 6, 7, 8])
    r.gl.uniform4fv(loc, scratch)
    expect(decode(r.posted[0].call.args[1])).toEqual([1, 2, 3, 4])
    expect(decode(r.posted[1].call.args[1])).toEqual([5, 6, 7, 8])
    for (const p of r.posted) {
      expect(p.transfer).toHaveLength(1)
      expect(p.transfer![0]).not.toBe(scratch.buffer)
    }
    // Transferring the copies leaves the app's array alone.
    structuredClone(r.posted.map((p) => p.call), { transfer: r.posted.flatMap((p) => p.transfer!) })
    expect(scratch.byteLength).toBe(16)
  })

  it('copies a bare ArrayBuffer argument when on', () => {
    const r = record()
    r.session.snapshot = true
    const ab = new Uint8Array([9, 8, 7]).buffer
    r.gl.bufferData(GL.ARRAY_BUFFER, ab, GL.STATIC_DRAW)
    const enc = r.last().call.args[1] as { __netgl_arraybuffer: ArrayBuffer }
    expect(enc.__netgl_arraybuffer).not.toBe(ab)
    expect(Array.from(new Uint8Array(enc.__netgl_arraybuffer))).toEqual([9, 8, 7])
    expect(r.last().transfer).toEqual([enc.__netgl_arraybuffer])
  })

  it('marks a call holding an ImageBitmap urgent and never lists the bitmap', () => {
    const g = globalThis as { ImageBitmap?: unknown }
    const had = 'ImageBitmap' in g
    const saved = g.ImageBitmap
    class FakeBitmap {}
    g.ImageBitmap = FakeBitmap
    try {
      const r = record()
      r.gl.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, new FakeBitmap() as unknown as ImageBitmap)
      expect(r.last().urgent).toBe(true)
      expect(r.last().transfer).toBeUndefined()
    } finally {
      if (had) g.ImageBitmap = saved
      else delete g.ImageBitmap
    }
  })
})

describe('trimSource / unpackExtent', () => {
  it('leaves calls without an offset form alone', () => {
    const args = [GL.ARRAY_BUFFER, seq(4), GL.STATIC_DRAW]
    expect(trimSource('bufferData', args)).toBe(args)
    expect(trimSource('drawArrays', [4, 0, 3])).toEqual([4, 0, 3])
  })

  it('trims a texture at the front only without the unpack state', () => {
    const out = trimSource('texSubImage2D', [GL.TEXTURE_2D, 0, 0, 0, 1, 1, GL.RGBA, GL.UNSIGNED_BYTE, seq(40, Uint8Array), 8])
    expect((out[8] as Uint8Array).length).toBe(32)
  })

  it('computes the unpack extent with skips', () => {
    expect(unpackExtent(2, 2, 1, 4, DEFAULT_UNPACK)).toBe(16)
    expect(unpackExtent(2, 2, 1, 4, { ...DEFAULT_UNPACK, skipRows: 1, skipPixels: 1 })).toBe(2 * 8 + 3 * 4)
    expect(unpackExtent(1, 1, 2, 4, { ...DEFAULT_UNPACK, imageHeight: 3 })).toBe(3 * 4 + 4)
    expect(unpackExtent(0, 4, 1, 4, DEFAULT_UNPACK)).toBe(0)
  })
})
