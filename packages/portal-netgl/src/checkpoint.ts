// State checkpoint: the framework-agnostic answer to "the host touched the
// shared GL context between my frames".
//
// Every GL framework caches GL state client-side (three's WebGLState,
// Cesium's Context._currentRenderState / _currentSp / texture-unit cache,
// Babylon's _currentProgram / depthCullingState, ...). They skip calls
// whose value matches the cache. When a guest's calls replay into a host
// context that the host's own renderer has mutated in between, those
// skipped calls leave the guest drawing with the host's program, VAO,
// blend state, texture bindings, and so on.
//
// The three.js guest worked around this with `renderer.resetState()` before
// every render. That's framework-specific and every framework spells it
// differently (or, like Cesium, not at all). The checkpoint inverts the
// problem: instead of making the guest forget its cache, make the host's
// context look exactly like the guest left it. The guest's shadow context
// has executed every call the guest ever made, so its current GL state IS
// the guest's intended state. At each frame boundary we emit a sequence of
// ordinary NetGLCalls (bindX / enable / blendFunc / pixelStorei / ...) that
// re-establish that state on the receiver. They replay through the normal
// replay path, so the host's viewport remap and screen policy see them like
// any other call.
//
// Two sources:
//   - Scalar state (caps, blend, depth, stencil, pixel-store, rects, ...)
//     is tracked by `ScalarStateTracker` from the same call stream, seeded
//     once from the shadow when the session starts. The old path, querying
//     the shadow with getParameter / isEnabled / getVertexAttrib at every
//     checkpoint, stays available (`captureCheckpoint` without a tracker):
//     each query is a synchronous round trip to the GPU process that waits
//     for the shadow's queued frame.
//   - Object bindings (program, VAO, buffers, textures per unit, samplers,
//     framebuffers) are tracked by `BindingTracker` as the recorder sees
//     the bind calls go by. Cheaper than ~130 getParameter calls per frame,
//     and it doesn't depend on the context returning its own wrapper
//     objects from getParameter (headless-gl, used by the tests, returns
//     raw GL names for most WebGL2 bindings).
//
// This is context virtualisation — the same trick browsers use to
// multiplex many WebGL contexts onto one driver context — done at the
// protocol layer so no framework needs a hook for it.
//
// Not captured (documented limits):
//   - Per-framebuffer state (drawBuffers / readBuffer) — it lives on the
//     FBO object, which the host can't touch unless it binds the guest's
//     FBOs (it doesn't).
//   - Per-VAO attribute state, EXCEPT the element-array binding of the
//     default VAO. Guests that draw with the default VAO (vao = null) and
//     rely on attribute pointers set in a previous frame will see the
//     host's pointers. Every framework we target uses VAOs in WebGL2.
//   - Indexed transform-feedback buffer bindings and active TF state.
//   - Query objects in flight.

import type { NetGLCall, NetGLEncodedValue } from './messages'

// GL enums, hardcoded so this module works against any context-shaped
// object (the shadow is a real context, but tests and workers vary).
const GL = {
  BLEND: 0x0BE2,
  CULL_FACE: 0x0B44,
  DEPTH_TEST: 0x0B71,
  DITHER: 0x0BD0,
  POLYGON_OFFSET_FILL: 0x8037,
  SAMPLE_ALPHA_TO_COVERAGE: 0x809E,
  SAMPLE_COVERAGE: 0x80A0,
  SCISSOR_TEST: 0x0C11,
  STENCIL_TEST: 0x0B90,
  RASTERIZER_DISCARD: 0x8C89,

  BLEND_COLOR: 0x8005,
  BLEND_EQUATION_RGB: 0x8009,
  BLEND_EQUATION_ALPHA: 0x883D,
  BLEND_SRC_RGB: 0x80C9,
  BLEND_DST_RGB: 0x80C8,
  BLEND_SRC_ALPHA: 0x80CB,
  BLEND_DST_ALPHA: 0x80CA,
  COLOR_CLEAR_VALUE: 0x0C22,
  DEPTH_CLEAR_VALUE: 0x0B73,
  STENCIL_CLEAR_VALUE: 0x0B91,
  COLOR_WRITEMASK: 0x0C23,
  CULL_FACE_MODE: 0x0B45,
  DEPTH_FUNC: 0x0B74,
  DEPTH_WRITEMASK: 0x0B72,
  DEPTH_RANGE: 0x0B70,
  FRONT_FACE: 0x0B46,
  LINE_WIDTH: 0x0B21,
  POLYGON_OFFSET_FACTOR: 0x8038,
  POLYGON_OFFSET_UNITS: 0x2A00,
  SAMPLE_COVERAGE_VALUE: 0x80AA,
  SAMPLE_COVERAGE_INVERT: 0x80AB,
  SCISSOR_BOX: 0x0C10,
  VIEWPORT: 0x0BA2,

  FRONT: 0x0404,
  BACK: 0x0405,
  STENCIL_FUNC: 0x0B92,
  STENCIL_REF: 0x0B97,
  STENCIL_VALUE_MASK: 0x0B93,
  STENCIL_BACK_FUNC: 0x8800,
  STENCIL_BACK_REF: 0x8CA3,
  STENCIL_BACK_VALUE_MASK: 0x8CA4,
  STENCIL_FAIL: 0x0B94,
  STENCIL_PASS_DEPTH_FAIL: 0x0B95,
  STENCIL_PASS_DEPTH_PASS: 0x0B96,
  STENCIL_BACK_FAIL: 0x8801,
  STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
  STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
  STENCIL_WRITEMASK: 0x0B98,
  STENCIL_BACK_WRITEMASK: 0x8CA5,

  GENERATE_MIPMAP_HINT: 0x8192,
  FRAGMENT_SHADER_DERIVATIVE_HINT: 0x8B8B,

  PACK_ALIGNMENT: 0x0D05,
  UNPACK_ALIGNMENT: 0x0CF5,
  UNPACK_FLIP_Y_WEBGL: 0x9240,
  UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
  UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,
  PACK_ROW_LENGTH: 0x0D02,
  PACK_SKIP_PIXELS: 0x0D04,
  PACK_SKIP_ROWS: 0x0D03,
  UNPACK_ROW_LENGTH: 0x0CF2,
  UNPACK_IMAGE_HEIGHT: 0x806E,
  UNPACK_SKIP_PIXELS: 0x0CF4,
  UNPACK_SKIP_ROWS: 0x0CF3,
  UNPACK_SKIP_IMAGES: 0x806D,

  READ_FRAMEBUFFER: 0x8CA8,
  DRAW_FRAMEBUFFER: 0x8CA9,
  RENDERBUFFER: 0x8D41,
  ARRAY_BUFFER: 0x8892,
  ELEMENT_ARRAY_BUFFER: 0x8893,
  COPY_READ_BUFFER: 0x8F36,
  COPY_WRITE_BUFFER: 0x8F37,
  PIXEL_PACK_BUFFER: 0x88EB,
  PIXEL_UNPACK_BUFFER: 0x88EC,
  UNIFORM_BUFFER: 0x8A11,
  TRANSFORM_FEEDBACK: 0x8E22,
  TRANSFORM_FEEDBACK_BUFFER: 0x8C8E,

  TEXTURE0: 0x84C0,
  TEXTURE_2D: 0x0DE1,
  TEXTURE_CUBE_MAP: 0x8513,
  TEXTURE_3D: 0x806F,
  TEXTURE_2D_ARRAY: 0x8C1A,

  CURRENT_VERTEX_ATTRIB: 0x8626,
  MAX_VERTEX_ATTRIBS: 0x8869
} as const

const CAPS = [
  GL.BLEND,
  GL.CULL_FACE,
  GL.DEPTH_TEST,
  GL.DITHER,
  GL.POLYGON_OFFSET_FILL,
  GL.SAMPLE_ALPHA_TO_COVERAGE,
  GL.SAMPLE_COVERAGE,
  GL.SCISSOR_TEST,
  GL.STENCIL_TEST,
  GL.RASTERIZER_DISCARD
]

const PIXEL_STORE = [
  GL.PACK_ALIGNMENT,
  GL.UNPACK_ALIGNMENT,
  GL.UNPACK_FLIP_Y_WEBGL,
  GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
  GL.UNPACK_COLORSPACE_CONVERSION_WEBGL,
  GL.PACK_ROW_LENGTH,
  GL.PACK_SKIP_PIXELS,
  GL.PACK_SKIP_ROWS,
  GL.UNPACK_ROW_LENGTH,
  GL.UNPACK_IMAGE_HEIGHT,
  GL.UNPACK_SKIP_PIXELS,
  GL.UNPACK_SKIP_ROWS,
  GL.UNPACK_SKIP_IMAGES
]

const GENERIC_BUFFERS = [
  GL.ARRAY_BUFFER,
  GL.COPY_READ_BUFFER,
  GL.COPY_WRITE_BUFFER,
  GL.PIXEL_PACK_BUFFER,
  GL.PIXEL_UNPACK_BUFFER,
  GL.TRANSFORM_FEEDBACK_BUFFER,
  // After the indexed UBO restores, which overwrite it.
  GL.UNIFORM_BUFFER
]

const TEXTURE_TARGETS = [GL.TEXTURE_2D, GL.TEXTURE_CUBE_MAP, GL.TEXTURE_3D, GL.TEXTURE_2D_ARRAY]

const GL_FRAMEBUFFER = 0x8D40
const GL_TEXTURE_UNIT_LIMIT = 256

type UniformBinding = { buffer: object | null; offset: number; size: number }

/**
 * Tracks every object binding the guest makes, from the calls the recorder
 * sees. Deletions unbind, matching GL semantics (deleting a bound object
 * reverts that binding to null in the current context).
 */
export type BindingTracker = {
  observe(name: string, args: readonly unknown[]): void
  /** Emit the calls restoring every tracked binding, in dependency order. */
  emit(out: (name: string, ...args: unknown[]) => void): void
}

export const makeBindingTracker = (): BindingTracker => {
  let drawFb: object | null = null
  let readFb: object | null = null
  let renderbuffer: object | null = null
  let vao: object | null = null
  // ELEMENT_ARRAY_BUFFER is VAO state; only the default VAO's is shared
  // with the host (guest-created VAOs are the guest's alone).
  let defaultVaoElementBuffer: object | null = null
  let program: object | null = null
  let transformFeedback: object | null = null
  const buffers = new Map<number, object | null>()
  const uniformBindings = new Map<number, UniformBinding>()
  let activeUnit = 0
  // unit → (target → texture)
  const textures = new Map<number, Map<number, object | null>>()
  const samplers = new Map<number, object | null>()

  const unitTextures = (unit: number): Map<number, object | null> => {
    let m = textures.get(unit)
    if (!m) {
      m = new Map()
      textures.set(unit, m)
    }
    return m
  }

  const obj = (v: unknown): object | null => (v != null && typeof v === 'object' ? (v as object) : null)

  const forgetObject = (o: object): void => {
    if (drawFb === o) drawFb = null
    if (readFb === o) readFb = null
    if (renderbuffer === o) renderbuffer = null
    if (vao === o) vao = null
    if (defaultVaoElementBuffer === o) defaultVaoElementBuffer = null
    if (transformFeedback === o) transformFeedback = null
    // A deleted program stays current until replaced; leave `program`.
    for (const [k, v] of buffers) if (v === o) buffers.set(k, null)
    for (const [k, v] of uniformBindings) if (v.buffer === o) uniformBindings.set(k, { buffer: null, offset: 0, size: 0 })
    for (const m of textures.values()) for (const [k, v] of m) if (v === o) m.set(k, null)
    for (const [k, v] of samplers) if (v === o) samplers.set(k, null)
  }

  return {
    observe(name, a) {
      switch (name) {
        case 'bindFramebuffer': {
          const t = a[0] as number
          const fb = obj(a[1])
          if (t === GL_FRAMEBUFFER || t === GL.DRAW_FRAMEBUFFER) drawFb = fb
          if (t === GL_FRAMEBUFFER || t === GL.READ_FRAMEBUFFER) readFb = fb
          break
        }
        case 'bindRenderbuffer':
          renderbuffer = obj(a[1])
          break
        case 'bindVertexArray':
          vao = obj(a[0])
          break
        case 'bindBuffer': {
          const t = a[0] as number
          if (t === GL.ELEMENT_ARRAY_BUFFER) {
            if (vao === null) defaultVaoElementBuffer = obj(a[1])
          } else {
            buffers.set(t, obj(a[1]))
          }
          break
        }
        case 'bindBufferBase':
        case 'bindBufferRange': {
          const t = a[0] as number
          const buf = obj(a[2])
          buffers.set(t, buf)
          if (t === GL.UNIFORM_BUFFER) {
            uniformBindings.set(a[1] as number, {
              buffer: buf,
              offset: name === 'bindBufferRange' ? (a[3] as number) : 0,
              size: name === 'bindBufferRange' ? (a[4] as number) : 0
            })
          }
          break
        }
        case 'useProgram':
          program = obj(a[0])
          break
        case 'bindTransformFeedback':
          transformFeedback = obj(a[1])
          break
        case 'activeTexture': {
          const unit = (a[0] as number) - GL.TEXTURE0
          if (unit >= 0 && unit < GL_TEXTURE_UNIT_LIMIT) activeUnit = unit
          break
        }
        case 'bindTexture':
          unitTextures(activeUnit).set(a[0] as number, obj(a[1]))
          break
        case 'bindSampler':
          samplers.set(a[0] as number, obj(a[1]))
          break
        case 'deleteFramebuffer':
        case 'deleteRenderbuffer':
        case 'deleteVertexArray':
        case 'deleteBuffer':
        case 'deleteTexture':
        case 'deleteSampler':
        case 'deleteTransformFeedback': {
          const o = obj(a[0])
          if (o) forgetObject(o)
          break
        }
        default:
          break
      }
    },
    emit(out) {
      // Framebuffers first, so the replay's draw-FB tracking (and with it
      // the viewport / scissor remap) is right for the rect calls later.
      out('bindFramebuffer', GL.READ_FRAMEBUFFER, readFb)
      out('bindFramebuffer', GL.DRAW_FRAMEBUFFER, drawFb)
      out('bindRenderbuffer', GL.RENDERBUFFER, renderbuffer)
      // Default VAO's element buffer must be set while it is bound.
      out('bindVertexArray', null)
      out('bindBuffer', GL.ELEMENT_ARRAY_BUFFER, defaultVaoElementBuffer)
      out('bindVertexArray', vao)
      out('bindTransformFeedback', GL.TRANSFORM_FEEDBACK, transformFeedback)
      // Indexed UBO bindings overwrite the generic UNIFORM_BUFFER binding,
      // so generic bindings follow.
      for (const [index, b] of uniformBindings) {
        if (b.buffer && b.size > 0) out('bindBufferRange', GL.UNIFORM_BUFFER, index, b.buffer, b.offset, b.size)
        else out('bindBufferBase', GL.UNIFORM_BUFFER, index, b.buffer)
      }
      // Only targets the guest has bound: a framework can't hold a cached
      // assumption about a binding point it never used.
      for (const target of GENERIC_BUFFERS) {
        if (buffers.has(target)) out('bindBuffer', target, buffers.get(target) ?? null)
      }
      out('useProgram', program)
      const units = new Set<number>([...textures.keys(), ...samplers.keys()])
      for (const unit of units) {
        out('activeTexture', GL.TEXTURE0 + unit)
        for (const target of TEXTURE_TARGETS) out('bindTexture', target, textures.get(unit)?.get(target) ?? null)
        out('bindSampler', unit, samplers.get(unit) ?? null)
      }
      out('activeTexture', GL.TEXTURE0 + activeUnit)
    }
  }
}

/**
 * Build the calls that re-establish the guest's full restorable GL state on
 * a receiver: object bindings from `bindings`; scalar state from `state`
 * when given (no synchronous calls on the shadow), else queried from
 * `shadow` with getParameter / isEnabled / getVertexAttrib. `encode` maps a
 * shadow-side value (handle, primitive) to its wire form — the recorder's
 * own encoder, so handles resolve through the same netglID table as the
 * rest of the stream.
 *
 * Both paths emit the same calls in the same order.
 */
export const captureCheckpoint = (
  shadow: WebGL2RenderingContext,
  bindings: BindingTracker,
  encode: (value: unknown) => NetGLEncodedValue,
  state?: ScalarStateTracker
): NetGLCall[] => {
  const calls: NetGLCall[] = []
  const g = shadow
  const p = (pname: number): unknown => g.getParameter(pname)
  const emit = (name: string, ...args: unknown[]): void => {
    calls.push({ name, args: args.map(encode) })
  }
  const nums = (v: unknown): number[] => Array.from(v as ArrayLike<number>)
  const bools = (v: unknown): boolean[] => Array.from(v as ArrayLike<boolean>)

  bindings.emit(emit)

  if (state) {
    state.emit(emit)
    return calls
  }

  for (const cap of CAPS) emit(g.isEnabled(cap) ? 'enable' : 'disable', cap)

  emit('blendColor', ...nums(p(GL.BLEND_COLOR)))
  emit('blendEquationSeparate', p(GL.BLEND_EQUATION_RGB), p(GL.BLEND_EQUATION_ALPHA))
  emit(
    'blendFuncSeparate',
    p(GL.BLEND_SRC_RGB),
    p(GL.BLEND_DST_RGB),
    p(GL.BLEND_SRC_ALPHA),
    p(GL.BLEND_DST_ALPHA)
  )
  emit('colorMask', ...bools(p(GL.COLOR_WRITEMASK)))
  emit('clearColor', ...nums(p(GL.COLOR_CLEAR_VALUE)))
  emit('clearDepth', p(GL.DEPTH_CLEAR_VALUE))
  emit('clearStencil', p(GL.STENCIL_CLEAR_VALUE))
  emit('cullFace', p(GL.CULL_FACE_MODE))
  emit('frontFace', p(GL.FRONT_FACE))
  emit('depthFunc', p(GL.DEPTH_FUNC))
  emit('depthMask', p(GL.DEPTH_WRITEMASK))
  emit('depthRange', ...nums(p(GL.DEPTH_RANGE)))
  emit('lineWidth', p(GL.LINE_WIDTH))
  emit('polygonOffset', p(GL.POLYGON_OFFSET_FACTOR), p(GL.POLYGON_OFFSET_UNITS))
  emit('sampleCoverage', p(GL.SAMPLE_COVERAGE_VALUE), p(GL.SAMPLE_COVERAGE_INVERT))

  emit('stencilFuncSeparate', GL.FRONT, p(GL.STENCIL_FUNC), p(GL.STENCIL_REF), p(GL.STENCIL_VALUE_MASK))
  emit(
    'stencilFuncSeparate',
    GL.BACK,
    p(GL.STENCIL_BACK_FUNC),
    p(GL.STENCIL_BACK_REF),
    p(GL.STENCIL_BACK_VALUE_MASK)
  )
  emit(
    'stencilOpSeparate',
    GL.FRONT,
    p(GL.STENCIL_FAIL),
    p(GL.STENCIL_PASS_DEPTH_FAIL),
    p(GL.STENCIL_PASS_DEPTH_PASS)
  )
  emit(
    'stencilOpSeparate',
    GL.BACK,
    p(GL.STENCIL_BACK_FAIL),
    p(GL.STENCIL_BACK_PASS_DEPTH_FAIL),
    p(GL.STENCIL_BACK_PASS_DEPTH_PASS)
  )
  emit('stencilMaskSeparate', GL.FRONT, p(GL.STENCIL_WRITEMASK))
  emit('stencilMaskSeparate', GL.BACK, p(GL.STENCIL_BACK_WRITEMASK))

  emit('hint', GL.GENERATE_MIPMAP_HINT, p(GL.GENERATE_MIPMAP_HINT))
  emit('hint', GL.FRAGMENT_SHADER_DERIVATIVE_HINT, p(GL.FRAGMENT_SHADER_DERIVATIVE_HINT))

  for (const pname of PIXEL_STORE) {
    const v = p(pname)
    // FLIP_Y / PREMULTIPLY come back as booleans; pixelStorei wants ints.
    emit('pixelStorei', pname, typeof v === 'boolean' ? (v ? 1 : 0) : v)
  }

  // Generic vertex-attribute values (used for attributes whose array is
  // disabled). Global, not per-VAO, so the host's renderer can clobber them.
  const maxAttribs = p(GL.MAX_VERTEX_ATTRIBS) as number
  for (let i = 0; i < maxAttribs; i += 1) {
    const v = g.getVertexAttrib(i, GL.CURRENT_VERTEX_ATTRIB) as ArrayLike<number> | null
    if (!v) continue
    if (v instanceof Int32Array) emit('vertexAttribI4iv', i, Array.from(v))
    else if (v instanceof Uint32Array) emit('vertexAttribI4uiv', i, Array.from(v))
    else emit('vertexAttrib4fv', i, Array.from(v))
  }

  // Rects last: they depend on the draw-FB binding restored at the top.
  emit('scissor', ...nums(p(GL.SCISSOR_BOX)))
  emit('viewport', ...nums(p(GL.VIEWPORT)))

  return calls
}

const GL_FRONT_AND_BACK = 0x0408
const GL_CONSTANT_COLOR = 0x8001
const GL_ONE_MINUS_CONSTANT_COLOR = 0x8002
const GL_CONSTANT_ALPHA = 0x8003
const GL_ONE_MINUS_CONSTANT_ALPHA = 0x8004
const GL_BROWSER_DEFAULT_WEBGL = 0x9244
const GL_PIXEL_STORE_BOOLEANS = new Set<number>([GL.UNPACK_FLIP_Y_WEBGL, GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL])
const GL_PIXEL_STORE_ALIGNMENTS = new Set<number>([GL.PACK_ALIGNMENT, GL.UNPACK_ALIGNMENT])

/**
 * Tracks the guest's scalar GL state (caps, blend, depth, stencil, colour
 * mask, clear values, hints, pixel-store, generic vertex attribs, viewport,
 * scissor) from the calls the recorder sees, as `BindingTracker` does for
 * object bindings. Seeded once from the shadow when it is made (and again
 * if the shadow's context is restored after a loss); after that the
 * checkpoint reads it instead of querying the shadow.
 *
 * Why: each `getParameter` / `isEnabled` / `getVertexAttrib` on the shadow
 * is a synchronous round trip to the browser's GPU process, and it waits
 * for the shadow's queued work — the guest's whole frame — first. The query
 * checkpoint makes 79 of them per guest frame (53 getParameter, 16
 * getVertexAttrib, 10 isEnabled, with 16 attribs). In celestiary those were
 * all of the Cesium shadow contexts' synchronous calls, 79 to 237 a frame,
 * and the bulk of the guest's replay time on an Apple M2
 * (celestiary/web#189, #194).
 *
 * Arguments are kept as the guest passed them, after the conversions WebIDL
 * applies before GL sees them (GLboolean → boolean, GLint → int32, GLuint
 * → uint32) and GL's float32 storage, so the emitted calls match the query
 * checkpoint's for in-range values. Values GL clamps (depthRange,
 * clearDepth, sampleCoverage, the stencil ref, viewport over
 * MAX_VIEWPORT_DIMS) are kept
 * unclamped: replaying them on the receiver clamps them as the shadow did,
 * so the state is the same though the args differ.
 *
 * Calls GL rejects without changing state are skipped where the rule is a
 * value check (negative rect sizes, depthRange near > far, lineWidth ≤ 0,
 * WebGL's constant-colour/constant-alpha blendFunc pairing, pixel-store
 * alignment, colourspace and negative counts, attrib index and array
 * length). An
 * invalid enum is not checked: it would be tracked though the shadow
 * ignored it. Frameworks don't issue those; a guest that might should use
 * the query checkpoint.
 *
 * Only calls made through the recorder are seen. A state call made on the
 * shadow directly, or through an extension object (which bypasses the
 * recorder, e.g. OES_draw_buffers_indexed's per-buffer blend), isn't.
 */
export type ScalarStateTracker = {
  observe(name: string, args: readonly unknown[]): void
  /** Emit the calls restoring the tracked state, in the checkpoint's order. */
  emit(out: (name: string, ...args: unknown[]) => void): void
  /**
   * Re-read the whole state from the shadow (the same queries the
   * checkpoint used to make each frame). Called on `webglcontextrestored`;
   * call it yourself after changing the shadow's state behind the recorder.
   */
  reseed(): void
}

type Face = 'front' | 'back'
type AttribCall = 'vertexAttrib4fv' | 'vertexAttribI4iv' | 'vertexAttribI4uiv'

export const makeScalarStateTracker = (shadow: WebGL2RenderingContext): ScalarStateTracker => {
  const g = shadow
  const p = (pname: number): unknown => g.getParameter(pname)
  const nums = (v: unknown): number[] => Array.from(v as ArrayLike<number>)
  const bools = (v: unknown): boolean[] => Array.from(v as ArrayLike<boolean>)
  // WebIDL's conversions, as the shadow applied them before GL saw the value.
  const int32 = (v: unknown): number => Number(v) | 0
  const uint32 = (v: unknown): number => Number(v) >>> 0
  // GL keeps float state as float32; the queries answer float32 values.
  const f32 = (v: unknown): number => Math.fround(Number(v))

  let caps = new Map<number, boolean>()
  let blendColor: unknown[] = []
  let blendEquation: unknown[] = []
  let blendFunc: unknown[] = []
  let colorMask: boolean[] = []
  let clearColor: unknown[] = []
  let clearDepth: unknown
  let clearStencil: unknown
  let cullFace: unknown
  let frontFace: unknown
  let depthFunc: unknown
  let depthMask: boolean
  let depthRange: unknown[] = []
  let lineWidth: unknown
  let polygonOffset: unknown[] = []
  let sampleCoverage: unknown[] = []
  let stencilFunc: Record<Face, unknown[]> = { front: [], back: [] }
  let stencilOp: Record<Face, unknown[]> = { front: [], back: [] }
  let stencilMask: Record<Face, unknown> = { front: 0, back: 0 }
  let hints = new Map<number, unknown>()
  let pixelStore = new Map<number, number>()
  // Generic vertex-attribute values, per index: the call that restores it
  // and its four components. Every index below MAX_VERTEX_ATTRIBS is seeded,
  // so `attribs.has(i)` is the index's validity check.
  let attribs = new Map<number, [AttribCall, number[]]>()
  let scissor: unknown[] = []
  let viewport: unknown[] = []

  const pixelValue = (pname: number, v: unknown): number =>
    GL_PIXEL_STORE_BOOLEANS.has(pname) ? (typeof v === 'boolean' ? (v ? 1 : 0) : int32(v) !== 0 ? 1 : 0) : int32(v)

  // The query checkpoint's reads, in its order.
  const seed = (): void => {
    caps = new Map(CAPS.map((cap) => [cap, g.isEnabled(cap)]))
    blendColor = nums(p(GL.BLEND_COLOR))
    blendEquation = [p(GL.BLEND_EQUATION_RGB), p(GL.BLEND_EQUATION_ALPHA)]
    blendFunc = [p(GL.BLEND_SRC_RGB), p(GL.BLEND_DST_RGB), p(GL.BLEND_SRC_ALPHA), p(GL.BLEND_DST_ALPHA)]
    colorMask = bools(p(GL.COLOR_WRITEMASK))
    clearColor = nums(p(GL.COLOR_CLEAR_VALUE))
    clearDepth = p(GL.DEPTH_CLEAR_VALUE)
    clearStencil = p(GL.STENCIL_CLEAR_VALUE)
    cullFace = p(GL.CULL_FACE_MODE)
    frontFace = p(GL.FRONT_FACE)
    depthFunc = p(GL.DEPTH_FUNC)
    depthMask = Boolean(p(GL.DEPTH_WRITEMASK))
    depthRange = nums(p(GL.DEPTH_RANGE))
    lineWidth = p(GL.LINE_WIDTH)
    polygonOffset = [p(GL.POLYGON_OFFSET_FACTOR), p(GL.POLYGON_OFFSET_UNITS)]
    sampleCoverage = [p(GL.SAMPLE_COVERAGE_VALUE), p(GL.SAMPLE_COVERAGE_INVERT)]
    stencilFunc = {
      front: [p(GL.STENCIL_FUNC), p(GL.STENCIL_REF), p(GL.STENCIL_VALUE_MASK)],
      back: [p(GL.STENCIL_BACK_FUNC), p(GL.STENCIL_BACK_REF), p(GL.STENCIL_BACK_VALUE_MASK)]
    }
    stencilOp = {
      front: [p(GL.STENCIL_FAIL), p(GL.STENCIL_PASS_DEPTH_FAIL), p(GL.STENCIL_PASS_DEPTH_PASS)],
      back: [p(GL.STENCIL_BACK_FAIL), p(GL.STENCIL_BACK_PASS_DEPTH_FAIL), p(GL.STENCIL_BACK_PASS_DEPTH_PASS)]
    }
    stencilMask = { front: p(GL.STENCIL_WRITEMASK), back: p(GL.STENCIL_BACK_WRITEMASK) }
    hints = new Map([
      [GL.GENERATE_MIPMAP_HINT, p(GL.GENERATE_MIPMAP_HINT)],
      [GL.FRAGMENT_SHADER_DERIVATIVE_HINT, p(GL.FRAGMENT_SHADER_DERIVATIVE_HINT)]
    ])
    pixelStore = new Map(PIXEL_STORE.map((pname) => [pname, pixelValue(pname, p(pname))]))
    attribs = new Map()
    const maxAttribs = p(GL.MAX_VERTEX_ATTRIBS) as number
    for (let i = 0; i < maxAttribs; i += 1) {
      const v = g.getVertexAttrib(i, GL.CURRENT_VERTEX_ATTRIB) as ArrayLike<number> | null
      if (!v) continue
      if (v instanceof Int32Array) attribs.set(i, ['vertexAttribI4iv', Array.from(v)])
      else if (v instanceof Uint32Array) attribs.set(i, ['vertexAttribI4uiv', Array.from(v)])
      else attribs.set(i, ['vertexAttrib4fv', Array.from(v)])
    }
    scissor = nums(p(GL.SCISSOR_BOX))
    viewport = nums(p(GL.VIEWPORT))
  }
  seed()

  // While the context is lost every call is a no-op on the shadow; once it
  // is restored its state is GL's defaults again.
  let lost = false
  const canvas = (g as { canvas?: unknown }).canvas as
    | { addEventListener?: (type: string, listener: () => void) => void }
    | undefined
  if (canvas && typeof canvas.addEventListener === 'function') {
    canvas.addEventListener('webglcontextlost', () => {
      lost = true
    })
    canvas.addEventListener('webglcontextrestored', () => {
      lost = false
      seed()
    })
  }

  const faces = (face: unknown): Face[] =>
    face === GL.FRONT ? ['front'] : face === GL.BACK ? ['back'] : face === GL_FRONT_AND_BACK ? ['front', 'back'] : []
  const isConstantColor = (f: unknown): boolean => f === GL_CONSTANT_COLOR || f === GL_ONE_MINUS_CONSTANT_COLOR
  const isConstantAlpha = (f: unknown): boolean => f === GL_CONSTANT_ALPHA || f === GL_ONE_MINUS_CONSTANT_ALPHA
  // WebGL: a constant colour factor and a constant alpha factor can't be
  // paired as src and dst (INVALID_OPERATION, nothing changes).
  const blendPairOk = (src: unknown, dst: unknown): boolean =>
    !((isConstantColor(src) && isConstantAlpha(dst)) || (isConstantAlpha(src) && isConstantColor(dst)))
  const rectOk = (a: readonly unknown[]): boolean => int32(a[2]) >= 0 && int32(a[3]) >= 0
  // vertexAttrib{1,2,3}f: the missing components are (0, 0, 1).
  const components = (n: number, a: readonly unknown[]): number[] => {
    const v = [0, 0, 0, 1]
    for (let k = 0; k < n; k += 1) v[k] = Number(a[1 + k])
    return v
  }
  const vector = (n: number, src: unknown): number[] | null => {
    const s = src as ArrayLike<number> | null
    if (!s || typeof s.length !== 'number' || s.length < n) return null
    const v = [0, 0, 0, 1]
    for (let k = 0; k < n; k += 1) v[k] = Number(s[k])
    return v
  }
  const setAttrib = (index: unknown, call: AttribCall, v: number[] | null, convert?: (x: number) => number): void => {
    const i = Number(index) >>> 0
    if (!v || !attribs.has(i)) return
    attribs.set(i, [call, convert ? v.map(convert) : v])
  }

  return {
    observe(name, a) {
      if (lost) return
      switch (name) {
        case 'enable':
        case 'disable':
          if (caps.has(a[0] as number)) caps.set(a[0] as number, name === 'enable')
          break
        case 'blendColor': blendColor = a.slice(0, 4).map(f32); break
        case 'blendEquation': blendEquation = [a[0], a[0]]; break
        case 'blendEquationSeparate': blendEquation = [a[0], a[1]]; break
        case 'blendFunc':
          if (blendPairOk(a[0], a[1])) blendFunc = [a[0], a[1], a[0], a[1]]
          break
        case 'blendFuncSeparate':
          if (blendPairOk(a[0], a[1])) blendFunc = [a[0], a[1], a[2], a[3]]
          break
        case 'colorMask': colorMask = a.slice(0, 4).map(Boolean); break
        case 'clearColor': clearColor = a.slice(0, 4).map(f32); break
        case 'clearDepth': clearDepth = f32(a[0]); break
        case 'clearStencil': clearStencil = int32(a[0]); break
        case 'cullFace': cullFace = a[0]; break
        case 'frontFace': frontFace = a[0]; break
        case 'depthFunc': depthFunc = a[0]; break
        case 'depthMask': depthMask = Boolean(a[0]); break
        case 'depthRange':
          if (!(Number(a[0]) > Number(a[1]))) depthRange = [f32(a[0]), f32(a[1])]
          break
        case 'lineWidth':
          if (Number(a[0]) > 0) lineWidth = f32(a[0])
          break
        case 'polygonOffset': polygonOffset = [f32(a[0]), f32(a[1])]; break
        case 'sampleCoverage': sampleCoverage = [f32(a[0]), Boolean(a[1])]; break
        case 'stencilFunc': {
          const v = [a[0], int32(a[1]), uint32(a[2])]
          stencilFunc = { front: v, back: [...v] }
          break
        }
        case 'stencilFuncSeparate': for (const f of faces(a[0])) stencilFunc[f] = [a[1], int32(a[2]), uint32(a[3])]; break
        case 'stencilOp': stencilOp = { front: [a[0], a[1], a[2]], back: [a[0], a[1], a[2]] }; break
        case 'stencilOpSeparate': for (const f of faces(a[0])) stencilOp[f] = [a[1], a[2], a[3]]; break
        case 'stencilMask': stencilMask = { front: uint32(a[0]), back: uint32(a[0]) }; break
        case 'stencilMaskSeparate': for (const f of faces(a[0])) stencilMask[f] = uint32(a[1]); break
        case 'hint': if (hints.has(a[0] as number)) hints.set(a[0] as number, a[1]); break
        case 'pixelStorei': {
          const pname = a[0] as number
          if (!pixelStore.has(pname)) break
          const v = pixelValue(pname, a[1])
          if (GL_PIXEL_STORE_ALIGNMENTS.has(pname) ? ![1, 2, 4, 8].includes(v) : v < 0) break
          if (pname === GL.UNPACK_COLORSPACE_CONVERSION_WEBGL && v !== 0 && v !== GL_BROWSER_DEFAULT_WEBGL) break
          pixelStore.set(pname, v)
          break
        }
        case 'vertexAttrib1f': setAttrib(a[0], 'vertexAttrib4fv', components(1, a), f32); break
        case 'vertexAttrib2f': setAttrib(a[0], 'vertexAttrib4fv', components(2, a), f32); break
        case 'vertexAttrib3f': setAttrib(a[0], 'vertexAttrib4fv', components(3, a), f32); break
        case 'vertexAttrib4f': setAttrib(a[0], 'vertexAttrib4fv', components(4, a), f32); break
        case 'vertexAttrib1fv': setAttrib(a[0], 'vertexAttrib4fv', vector(1, a[1]), f32); break
        case 'vertexAttrib2fv': setAttrib(a[0], 'vertexAttrib4fv', vector(2, a[1]), f32); break
        case 'vertexAttrib3fv': setAttrib(a[0], 'vertexAttrib4fv', vector(3, a[1]), f32); break
        case 'vertexAttrib4fv': setAttrib(a[0], 'vertexAttrib4fv', vector(4, a[1]), f32); break
        case 'vertexAttribI4i': setAttrib(a[0], 'vertexAttribI4iv', components(4, a), int32); break
        case 'vertexAttribI4iv': setAttrib(a[0], 'vertexAttribI4iv', vector(4, a[1]), int32); break
        case 'vertexAttribI4ui': setAttrib(a[0], 'vertexAttribI4uiv', components(4, a), uint32); break
        case 'vertexAttribI4uiv': setAttrib(a[0], 'vertexAttribI4uiv', vector(4, a[1]), uint32); break
        case 'scissor': if (rectOk(a)) scissor = a.slice(0, 4).map(int32); break
        case 'viewport': if (rectOk(a)) viewport = a.slice(0, 4).map(int32); break
        default: break
      }
    },
    emit(out) {
      for (const [cap, on] of caps) out(on ? 'enable' : 'disable', cap)
      out('blendColor', ...blendColor)
      out('blendEquationSeparate', ...blendEquation)
      out('blendFuncSeparate', ...blendFunc)
      out('colorMask', ...colorMask)
      out('clearColor', ...clearColor)
      out('clearDepth', clearDepth)
      out('clearStencil', clearStencil)
      out('cullFace', cullFace)
      out('frontFace', frontFace)
      out('depthFunc', depthFunc)
      out('depthMask', depthMask)
      out('depthRange', ...depthRange)
      out('lineWidth', lineWidth)
      out('polygonOffset', ...polygonOffset)
      out('sampleCoverage', ...sampleCoverage)
      out('stencilFuncSeparate', GL.FRONT, ...stencilFunc.front)
      out('stencilFuncSeparate', GL.BACK, ...stencilFunc.back)
      out('stencilOpSeparate', GL.FRONT, ...stencilOp.front)
      out('stencilOpSeparate', GL.BACK, ...stencilOp.back)
      out('stencilMaskSeparate', GL.FRONT, stencilMask.front)
      out('stencilMaskSeparate', GL.BACK, stencilMask.back)
      for (const [target, mode] of hints) out('hint', target, mode)
      for (const [pname, v] of pixelStore) out('pixelStorei', pname, v)
      // Fresh arrays: the encoder doesn't copy plain arrays, and a caller
      // may hold the calls past the next observe.
      for (const [i, [call, v]] of attribs) out(call, i, [...v])
      // Rects last: they depend on the draw-FB binding restored at the top.
      out('scissor', ...scissor)
      out('viewport', ...viewport)
    },
    reseed: seed
  }
}
