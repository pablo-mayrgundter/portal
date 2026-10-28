// Deferred deletes (RFC 0003 §3): what lets the receiver re-run any frame.
//
// A re-run of the last frame skips the calls that mint handles and upload
// data, so it relies on every object the frame uses still existing. A frame
// that deleted an object broke that (Cesium creates, uses and deletes
// scratch framebuffers, and while tiles load it deletes buffers and
// textures every frame), so until 0.6.9 such a frame was never re-run, and
// a host waiting on a late guest drew nothing for it. Now the receiver
// holds every delete back until it drains a new frame, and the last frame's
// objects all exist when it re-runs. Recorder ids are never reused, so a
// held object can't be confused with a later one.
//
// A delete does more than free the object: in the current context it
// reverts the bindings that name it, and those take effect at the delete's
// position (a draw after deleting the bound framebuffer goes to the
// screen). `observe` emits them there as ordinary calls, in place of the
// delete:
//   - a bound framebuffer, renderbuffer, VAO or transform feedback goes
//     back to null;
//   - a buffer leaves every generic and indexed binding point, and the
//     current VAO's element binding;
//   - a texture or sampler leaves every unit;
//   - a texture or renderbuffer attached to the bound draw or read
//     framebuffer is detached from each attachment point it fills
//     (ES 3.0 §4.4.2.4).
// Not emulated: a buffer the current VAO's attribute pointers name (GL
// keeps those references until the VAO is redefined), queries.
//
// The bindings are tracked from the calls the receiver replays, as the
// recorder's BindingTracker tracks the shadow's. `reset()` forgets them
// at the start of each drain: the host has used the context since, so a
// guest binding from an earlier drain may no longer be in place, and an
// unbind emitted for it could land on the host's own objects. A guest that
// sends checkpoints rebinds its state at the head of each frame, where
// the tracker sees it again.

import type { NetGLCall, NetGLEncodedValue } from './messages'

const GL_FRAMEBUFFER = 0x8D40
const GL_READ_FRAMEBUFFER = 0x8CA8
const GL_DRAW_FRAMEBUFFER = 0x8CA9
const GL_RENDERBUFFER = 0x8D41
const GL_ELEMENT_ARRAY_BUFFER = 0x8893
const GL_TRANSFORM_FEEDBACK = 0x8E22
const GL_TEXTURE0 = 0x84C0

/** The delete calls the receiver holds back. */
export const NETGL_DELETES = new Set<string>([
  'deleteBuffer',
  'deleteFramebuffer',
  'deleteProgram',
  'deleteQuery',
  'deleteRenderbuffer',
  'deleteSampler',
  'deleteShader',
  'deleteSync',
  'deleteTexture',
  'deleteTransformFeedback',
  'deleteVertexArray'
])

type Attachment =
  | { kind: 'texture2D'; id: number; textarget: number }
  | { kind: 'layer'; id: number }
  | { kind: 'renderbuffer'; id: number }

export type NetGLDeleteDeferral = {
  /**
   * Follow the bindings `call` makes. For a delete, returns the calls that
   * stand in for it at its position (its implicit unbinds, possibly none);
   * for any other call, null.
   */
  observe(call: NetGLCall): NetGLCall[] | null
  /** Forget every tracked binding (the start of a drain). */
  reset(): void
}

const handle = (id: number): NetGLEncodedValue => ({ __netgl_handle: id })

const idOf = (v: NetGLEncodedValue | undefined): number | null =>
  v != null && typeof v === 'object' && !Array.isArray(v) && '__netgl_handle' in v
    ? (v as { __netgl_handle: number }).__netgl_handle
    : null

export const makeDeleteDeferral = (): NetGLDeleteDeferral => {
  let drawFb: number | null = null
  let readFb: number | null = null
  let renderbuffer: number | null = null
  let vao: number | null = null
  let transformFeedback: number | null = null
  let activeTexture = GL_TEXTURE0
  // Generic buffer bindings by target; ELEMENT_ARRAY_BUFFER by VAO (0 for
  // the default one); indexed ones by "target:index".
  const buffers = new Map<number, number>()
  const elementBuffers = new Map<number, number>()
  const indexed = new Map<string, { target: number; index: number; id: number }>()
  // unit (GL_TEXTUREi) → target → texture; unit index → sampler.
  const textures = new Map<number, Map<number, number>>()
  const samplers = new Map<number, number>()
  // framebuffer → attachment point → what fills it. Kept across resets:
  // attachments are the framebuffer object's state, not the context's.
  const attachments = new Map<number, Map<number, Attachment>>()

  const boundFor = (target: number): number | null =>
    target === GL_READ_FRAMEBUFFER ? readFb : drawFb

  const attach = (target: number, point: number, a: Attachment | null): void => {
    const fb = boundFor(target)
    if (fb === null) return
    let m = attachments.get(fb)
    if (!m) {
      m = new Map()
      attachments.set(fb, m)
    }
    if (a) m.set(point, a)
    else m.delete(point)
  }

  const set = <K>(m: Map<K, number>, k: K, id: number | null): void => {
    if (id === null) m.delete(k)
    else m.set(k, id)
  }

  // Detach `id` (a texture or renderbuffer) from the bound framebuffers.
  const detach = (id: number, out: NetGLCall[]): void => {
    const bound: Array<[number, number | null]> =
      drawFb === readFb ? [[GL_FRAMEBUFFER, drawFb]] : [[GL_DRAW_FRAMEBUFFER, drawFb], [GL_READ_FRAMEBUFFER, readFb]]
    for (const [target, fb] of bound) {
      const m = fb === null ? undefined : attachments.get(fb)
      if (!m) continue
      for (const [point, a] of m) {
        if (a.id !== id) continue
        if (a.kind === 'texture2D') out.push({ name: 'framebufferTexture2D', args: [target, point, a.textarget, null, 0] })
        else if (a.kind === 'layer') out.push({ name: 'framebufferTextureLayer', args: [target, point, null, 0, 0] })
        else out.push({ name: 'framebufferRenderbuffer', args: [target, point, GL_RENDERBUFFER, null] })
        m.delete(point)
      }
    }
  }

  const unbinds = (name: string, id: number): NetGLCall[] => {
    const out: NetGLCall[] = []
    switch (name) {
      case 'deleteFramebuffer':
        if (drawFb === id && readFb === id) out.push({ name: 'bindFramebuffer', args: [GL_FRAMEBUFFER, null] })
        else if (drawFb === id) out.push({ name: 'bindFramebuffer', args: [GL_DRAW_FRAMEBUFFER, null] })
        else if (readFb === id) out.push({ name: 'bindFramebuffer', args: [GL_READ_FRAMEBUFFER, null] })
        if (drawFb === id) drawFb = null
        if (readFb === id) readFb = null
        attachments.delete(id)
        break
      case 'deleteRenderbuffer':
        detach(id, out)
        if (renderbuffer === id) {
          out.push({ name: 'bindRenderbuffer', args: [GL_RENDERBUFFER, null] })
          renderbuffer = null
        }
        break
      case 'deleteTexture': {
        detach(id, out)
        let unitNow = activeTexture
        for (const [unit, m] of textures) {
          for (const [target, t] of m) {
            if (t !== id) continue
            if (unit !== unitNow) {
              out.push({ name: 'activeTexture', args: [unit] })
              unitNow = unit
            }
            out.push({ name: 'bindTexture', args: [target, null] })
            m.delete(target)
          }
        }
        if (unitNow !== activeTexture) out.push({ name: 'activeTexture', args: [activeTexture] })
        break
      }
      case 'deleteSampler':
        for (const [unit, s] of samplers) {
          if (s !== id) continue
          out.push({ name: 'bindSampler', args: [unit, null] })
          samplers.delete(unit)
        }
        break
      case 'deleteBuffer': {
        // Indexed first: bindBufferBase also sets the generic binding,
        // which then follows (and is restored if it named another buffer).
        const touched = new Set<number>()
        for (const [key, b] of indexed) {
          if (b.id !== id) continue
          out.push({ name: 'bindBufferBase', args: [b.target, b.index, null] })
          touched.add(b.target)
          indexed.delete(key)
        }
        for (const target of touched) {
          const generic = buffers.get(target)
          if (generic !== undefined && generic !== id) out.push({ name: 'bindBuffer', args: [target, handle(generic)] })
          else buffers.delete(target)
        }
        for (const [target, b] of buffers) {
          if (b !== id) continue
          out.push({ name: 'bindBuffer', args: [target, null] })
          buffers.delete(target)
        }
        if (elementBuffers.get(vao ?? 0) === id) {
          out.push({ name: 'bindBuffer', args: [GL_ELEMENT_ARRAY_BUFFER, null] })
          elementBuffers.delete(vao ?? 0)
        }
        break
      }
      case 'deleteVertexArray':
        if (vao === id) {
          out.push({ name: 'bindVertexArray', args: [null] })
          vao = null
        }
        elementBuffers.delete(id)
        break
      case 'deleteTransformFeedback':
        if (transformFeedback === id) {
          out.push({ name: 'bindTransformFeedback', args: [GL_TRANSFORM_FEEDBACK, null] })
          transformFeedback = null
        }
        break
      default:
        // Programs and shaders: GL already defers their deletion while in
        // use. Queries and syncs: no binding to revert.
        break
    }
    return out
  }

  return {
    observe(call) {
      const a = call.args
      switch (call.name) {
        case 'bindFramebuffer': {
          const t = a[0] as number
          const fb = idOf(a[1])
          if (t === GL_FRAMEBUFFER || t === GL_DRAW_FRAMEBUFFER) drawFb = fb
          if (t === GL_FRAMEBUFFER || t === GL_READ_FRAMEBUFFER) readFb = fb
          return null
        }
        case 'bindRenderbuffer':
          renderbuffer = idOf(a[1])
          return null
        case 'bindVertexArray':
          vao = idOf(a[0])
          return null
        case 'bindTransformFeedback':
          transformFeedback = idOf(a[1])
          return null
        case 'bindBuffer': {
          const t = a[0] as number
          if (t === GL_ELEMENT_ARRAY_BUFFER) set(elementBuffers, vao ?? 0, idOf(a[1]))
          else set(buffers, t, idOf(a[1]))
          return null
        }
        case 'bindBufferBase':
        case 'bindBufferRange': {
          const target = a[0] as number
          const index = a[1] as number
          const id = idOf(a[2])
          set(buffers, target, id)
          if (id === null) indexed.delete(`${target}:${index}`)
          else indexed.set(`${target}:${index}`, { target, index, id })
          return null
        }
        case 'activeTexture':
          activeTexture = a[0] as number
          return null
        case 'bindTexture': {
          let m = textures.get(activeTexture)
          if (!m) {
            m = new Map()
            textures.set(activeTexture, m)
          }
          set(m, a[0] as number, idOf(a[1]))
          return null
        }
        case 'bindSampler':
          set(samplers, a[0] as number, idOf(a[1]))
          return null
        case 'framebufferTexture2D': {
          const id = idOf(a[3])
          attach(a[0] as number, a[1] as number, id === null ? null : { kind: 'texture2D', id, textarget: a[2] as number })
          return null
        }
        case 'framebufferTextureLayer': {
          const id = idOf(a[2])
          attach(a[0] as number, a[1] as number, id === null ? null : { kind: 'layer', id })
          return null
        }
        case 'framebufferRenderbuffer': {
          const id = idOf(a[3])
          attach(a[0] as number, a[1] as number, id === null ? null : { kind: 'renderbuffer', id })
          return null
        }
        default:
          if (!NETGL_DELETES.has(call.name)) return null
          {
            const id = idOf(a[0])
            return id === null ? [] : unbinds(call.name, id)
          }
      }
    },
    reset() {
      drawFb = null
      readFb = null
      renderbuffer = null
      vao = null
      transformFeedback = null
      activeTexture = GL_TEXTURE0
      buffers.clear()
      elementBuffers.clear()
      indexed.clear()
      textures.clear()
      samplers.clear()
    }
  }
}
