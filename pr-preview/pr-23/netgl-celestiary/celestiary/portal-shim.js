// Celestiary-side shim for running inside a NetGL portal iframe.
//
// When loaded as an ES module before celestiary's main bundle, this:
//   1. Sets `window.__portalCreateRenderer(container, bgColor, {WebGLRenderer})`
//      so celestiary's ThreeUI.js hook constructs a NetGL-recording renderer
//      instead of a plain WebGLRenderer. The hook uses celestiary's OWN
//      WebGLRenderer constructor (passed through `opts`) so the renderer
//      instance is built with the same three.js version celestiary bundled —
//      no two-three.js version mismatch.
//   2. Installs a postMessage transport to `parent` for shipping recorded GL
//      calls back to the host as `NetGLCall` / `NetGLFrameEnd` messages.
//   3. Listens for `netgl:setPose` and writes the pose into celestiary's
//      camera (via `window.camera`, set by ThreeUI.js:74).
//   4. Wraps `renderer.setAnimationLoop` so a `netgl:frame-end` marker is
//      posted after each RAF callback completes (so the host can replay an
//      entire celestiary frame as one atomic batch).
//   5. Disables celestiary's TrackballControls so host-driven setPose doesn't
//      fight user input on the iframe side.
//
// Activation: only runs when the page is in an iframe (parent !== self) and
// the URL has `?portal=1`. Standalone celestiary visits are unaffected.
//
// Self-contained. No imports, no portal-netgl dep. The NetGL recorder/encoder
// logic is inlined below — kept in sync with packages/portal-netgl/src/recorder.ts
// manually. TODO: publish portal-netgl to npm + replace this with an npm dep.

const inIframe = (() => {
  try {
    return parent !== self
  } catch {
    return true
  }
})()
const portalParams = new URL(location.href).searchParams
const portalRequested = portalParams.get('portal') === '1'
// `?portal=1&nostencil=1` — skip applying the portal stencil test to scenes
// being rendered to the host canvas. Useful for isolating "is the atm quad
// drawing at all" from "is the stencil masking it off". When set, the
// celestiary content fullscreens over the host worldA (no door clipping).
const noStencil = portalParams.get('nostencil') === '1'

// Diagnostic relay: posts `[shim] <msg>` to the parent so the host's console
// (which the user is looking at) shows both sides of the wire. The iframe's
// own console still logs the same line locally. Cleared once the recorder is
// proven to be running.
function diag(msg, extra) {
  const line = `[celestiary shim] ${msg}`
  if (extra !== undefined) console.log(line, extra)
  else console.log(line)
  try {
    parent.postMessage({type: 'netgl:debug', from: 'shim', msg, extra}, '*')
  } catch {}
}

// Surface any unhandled exception in the iframe to the host console too —
// iframe errors are easy to miss otherwise.
window.addEventListener('error', (ev) => {
  diag(`uncaught error: ${ev.message}`, {filename: ev.filename, lineno: ev.lineno, colno: ev.colno})
})
window.addEventListener('unhandledrejection', (ev) => {
  diag(`unhandled rejection: ${ev.reason?.message ?? String(ev.reason)}`)
})

diag(`shim loaded. inIframe=${inIframe} portalRequested=${portalRequested}`)
if (inIframe && portalRequested) {
  installPortalShim()
} else {
  diag('shim NOT activating (need inIframe + ?portal=1)')
}

/** Top-level activation: install the renderer hook + setPose listener. */
function installPortalShim() {
  const transport = makeTransport(parent)

  // Shadow canvas: a detached HTMLCanvasElement (NOT an OffscreenCanvas).
  // Celestiary's ThreeUI.onResize calls renderer.setSize(w, h) with the
  // 2-arg form, which defaults updateStyle=true. Three then does
  // canvas.style.width = ... — OffscreenCanvas has no .style and that
  // throws "Cannot set properties of undefined". A detached HTMLCanvasElement
  // has a real .style and is just as invisible (we never appendChild it).
  // Note: portal-netgl's makeNetGLPortalTarget uses OffscreenCanvas because
  // IT controls every setSize call (always passes updateStyle=false). Here
  // we're embedding into someone else's renderer code, so we play safe.
  const shadowCanvas = document.createElement('canvas')
  shadowCanvas.width = 1
  shadowCanvas.height = 1
  const shadowOpts = {
    antialias: true,
    stencil: true,
    depth: true,
    preserveDrawingBuffer: false,
  }
  const shadow = shadowCanvas.getContext('webgl2', shadowOpts)
  if (!shadow) {
    diag('failed to create WebGL2 shadow context')
    return
  }
  diag('shadow webgl2 context created')

  let callCount = 0
  const seenRenderErrors = new Set()
  const recorder = makeRecorder(shadow, (call) => {
    if (callCount === 0) diag(`first GL call recorded: ${call.name}`)
    callCount++
    transport.post(call)
  })

  let cachedRenderer = null

  window.__portalCreateRenderer = (container, backgroundColor, opts) => {
    diag('__portalCreateRenderer hook called by ThreeUI')
    const {WebGLRenderer} = opts
    // Build a WebGLRenderer with the recorder as its GL context and the shadow
    // OffscreenCanvas as its canvas. Pin both explicitly so three's setSize
    // doesn't fall back to creating its own canvas and resizing only that.
    let renderer
    try {
      renderer = new WebGLRenderer({
        canvas: shadowCanvas,
        context: recorder,
        antialias: shadowOpts.antialias,
        stencil: shadowOpts.stencil,
        depth: shadowOpts.depth,
        preserveDrawingBuffer: shadowOpts.preserveDrawingBuffer,
      })
      diag('WebGLRenderer constructed with recorder context')
    } catch (err) {
      diag(`WebGLRenderer construction threw: ${err?.message ?? err}`)
      throw err
    }
    // Strings work because three accepts 'srgb' / NoToneMapping (=0) directly.
    renderer.outputColorSpace = 'srgb'
    renderer.toneMapping = 0 // NoToneMapping
    // Don't clear the host canvas — host already drew its own scene + stencil
    // mask in the portal door region. Clearing here would wipe it.
    renderer.autoClear = false
    renderer.setClearColor(backgroundColor, 0)

    // Monkey-patch setAnimationLoop so we can post netgl:frame-end after each
    // RAF callback. This lets the host batch all of one frame's GL calls and
    // drain them atomically at a fixed point in its own render loop.
    // Monkey-patch renderer.render to do three things every call:
    //   1. resetState() — three's WebGLState cache thinks GL state matches
    //      what it last set, but the host's own renderer mutates the shared
    //      GL context between iframe frames. Without this, three skips
    //      redundant useProgram, then uniforms target a program that's no
    //      longer bound on the host's side → INVALID_OPERATION.
    //      host-netgl-demo's target factory does the same.
    //   2. apply portal-stencil test (when rendering to the host canvas, i.e.
    //      render target == null) — celestiary's atmosphere pass is a
    //      fullscreen quad with no stencil constraints, which would otherwise
    //      paint over the whole host canvas, hiding worldA. Configure all
    //      materials in the scene to stencilFunc=EQUAL,ref=1 so they only
    //      paint inside the door region the host already stencil-masked.
    //   3. null out scene.background when painting to host canvas — same
    //      reason; otherwise three issues a clear-color blat over everything.
    const origRender = renderer.render.bind(renderer)
    let renderCount = 0
    renderer.render = function (scene, camera) {
      renderer.resetState()
      const toScreen = renderer.getRenderTarget() === null
      if (toScreen) {
        if (!noStencil) {
          const touched = applyStencilTest(scene)
          if (renderCount < 4) diag(`render→screen ${scene?.type ?? scene?.constructor?.name}: stencil applied to ${touched} materials`)
        } else {
          if (renderCount < 4) diag(`render→screen ${scene?.type ?? scene?.constructor?.name}: stencil SKIPPED (?nostencil=1)`)
        }
        if (scene && 'background' in scene) scene.background = null
      } else if (renderCount < 4) {
        diag(`render→RT ${scene?.type ?? scene?.constructor?.name}`)
      }
      renderCount++
      return origRender(scene, camera)
    }

    const origSAL = renderer.setAnimationLoop.bind(renderer)
    let frameCount = 0
    renderer.setAnimationLoop = (cb) => {
      if (cb === null) {
        diag('setAnimationLoop(null) — celestiary stopped its RAF')
        return origSAL(null)
      }
      diag('setAnimationLoop installed — RAF starting')
      origSAL((time, frame) => {
        // Wrap in try/finally so an encoder gap or other exception inside
        // celestiary's renderLoop doesn't prevent us from posting frame-end.
        // Without this, the host accumulates calls forever without draining
        // (no frame-end → no swap to pendingFrame), and keeps re-asking for
        // a render, which keeps re-throwing. Always end the frame.
        let threw = null
        try {
          cb(time, frame)
        } catch (err) {
          // Log first failure of each shape once; the throw-per-frame loop
          // would otherwise spam the console.
          const key = err?.message ?? String(err)
          if (!seenRenderErrors.has(key)) {
            seenRenderErrors.add(key)
            diag(`render callback threw: ${key}`)
          }
        } finally {
          transport.post({type: 'netgl:frame-end'})
        }
        if (frameCount === 0) diag('first RAF callback completed')
        frameCount++
      })
    }

    cachedRenderer = renderer
    return renderer
  }

  // Listen for host-driven setPose. Writes celestiary's camera + (optionally)
  // disables controls so the host owns viewpoint. Celestiary's camera is the
  // global `window.camera`, set by ThreeUI.js when the constructor runs.
  transport.onMessage((msg) => {
    if (!msg || typeof msg !== 'object') return
    if (msg.type === 'netgl:setPose') {
      applyPose(msg, cachedRenderer)
    }
  })

  // Announce ready immediately. Anchor + background are fixed for celestiary;
  // we use a meter-scale door positioned at celestiary's startup-camera
  // distance (~SUN_RADIUS_METER * 1e3 ≈ 7e11 m), so a 1e11 m door fills the
  // visible field. Host can override via repositioning if needed.
  const anchor = {
    position: [0, 0, 0],
    normal: [0, 0, -1],
    up: [0, 1, 0],
    halfWidth: 5e10,
    halfHeight: 5e10,
  }
  transport.post({
    type: 'netgl:ready',
    anchor,
    background: {r: 0, g: 0, b: 0},
  })
}

/** Apply a netgl:setPose to celestiary's camera + suppress TrackballControls. */
function applyPose(msg, renderer) {
  const camera = window.camera
  if (!camera) return
  const ui = window.c?.ui
  // Disable controls + animation drift so host owns viewpoint.
  if (ui?.controls) ui.controls.enabled = false
  camera.position.set(msg.pose.position[0], msg.pose.position[1], msg.pose.position[2])
  if (msg.pose.forward) {
    const t = new (camera.position.constructor)(
      msg.pose.position[0] + msg.pose.forward[0],
      msg.pose.position[1] + msg.pose.forward[1],
      msg.pose.position[2] + msg.pose.forward[2]
    )
    camera.lookAt(t)
  }
  if (msg.pose.up) camera.up.set(msg.pose.up[0], msg.pose.up[1], msg.pose.up[2])
  camera.updateMatrixWorld(true)
  camera.matrixWorldInverse.copy(camera.matrixWorld).invert()
  // Use the host's projection verbatim so FOV / near / far match host framing.
  camera.projectionMatrix.fromArray(msg.projection)
  camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()
  if (renderer && msg.viewport) {
    renderer.setSize(msg.viewport.width, msg.viewport.height, false)
  }
}

/** postMessage transport to a target window. Matches NetGLTransport shape. */
function makeTransport(targetWindow) {
  const listeners = new Set()
  window.addEventListener('message', (ev) => {
    if (ev.source !== targetWindow) return
    for (const l of listeners) {
      try {
        l(ev.data)
      } catch (err) {
        console.error('[celestiary portal-shim] listener threw', err)
      }
    }
  })
  return {
    post(msg) {
      targetWindow.postMessage(msg, '*')
    },
    onMessage(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

// ---------------------------------------------------------------------------
// NetGL recorder. Ported from packages/portal-netgl/src/recorder.ts — keep in
// sync. Two changes from the source: plain JS (no types) and the SHADOW_ONLY +
// HANDLE_RETURNING sets are inlined verbatim.
// ---------------------------------------------------------------------------

const SHADOW_ONLY = new Set([
  'getParameter', 'getError', 'getContextAttributes', 'isContextLost',
  'getSupportedExtensions', 'getExtension', 'getShaderParameter',
  'getProgramParameter', 'getActiveUniform', 'getActiveAttrib',
  'getActiveUniforms', 'getActiveUniformBlockParameter',
  'getActiveUniformBlockName', 'getShaderInfoLog', 'getProgramInfoLog',
  'getAttribLocation', 'getUniformBlockIndex', 'getFragDataLocation',
  'getUniformIndices', 'getUniform', 'isProgram', 'isShader', 'isBuffer',
  'isTexture', 'isFramebuffer', 'isRenderbuffer', 'isVertexArray',
  'isSampler', 'isSync', 'isQuery', 'isTransformFeedback',
  'getBufferParameter', 'getFramebufferAttachmentParameter',
  'getRenderbufferParameter', 'getSamplerParameter', 'getTexParameter',
  'getVertexAttrib', 'getVertexAttribOffset', 'getQueryParameter', 'getQuery',
  'getSyncParameter', 'getInternalformatParameter', 'getIndexedParameter',
  'getTransformFeedbackVarying', 'checkFramebufferStatus',
])

const HANDLE_RETURNING = new Set([
  'createBuffer', 'createTexture', 'createProgram', 'createShader',
  'createFramebuffer', 'createRenderbuffer', 'createVertexArray',
  'createSampler', 'createTransformFeedback', 'createQuery',
  'getUniformLocation', 'fenceSync',
])

/** Build a Proxy<WebGL2RenderingContext> that records every call. */
function makeRecorder(shadow, post) {
  const handleToId = new Map()
  let nextId = 1

  // Scratch 2D canvas reused across encodes — creating a fresh one per
  // texImage2D is fine but reusing avoids GC churn for streaming textures.
  let scratch2d = null
  const getScratch2d = () => {
    if (!scratch2d) {
      const c = document.createElement('canvas')
      scratch2d = c.getContext('2d', {willReadFrequently: true})
    }
    return scratch2d
  }

  /**
   * Convert an image-source DOM object (Image / Canvas / Video / ImageBitmap)
   * to an `{__netgl_imagedata, width, height, buffer}` envelope. The
   * receiver reconstructs an `ImageData` and passes it to `texImage2D` /
   * `texSubImage2D` — both accept ImageData as an alternative to the original
   * source object. Synchronous via 2D canvas; works for any source that's
   * already loaded (drawImage rejects naked unloaded Image elements).
   */
  const encodeImageSource = (src) => {
    const w = src.naturalWidth ?? src.videoWidth ?? src.width
    const h = src.naturalHeight ?? src.videoHeight ?? src.height
    if (!w || !h) {
      throw new Error(`NetGL recorder: image source has zero dims (${src.constructor.name})`)
    }
    const ctx = getScratch2d()
    ctx.canvas.width = w
    ctx.canvas.height = h
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(src, 0, 0)
    const data = ctx.getImageData(0, 0, w, h)
    return {
      __netgl_imagedata: true,
      width: w,
      height: h,
      buffer: data.data.buffer,
    }
  }

  const encodeArg = (arg) => {
    if (arg == null) return null
    const t = typeof arg
    if (t === 'number' || t === 'string' || t === 'boolean') return arg
    if (t !== 'object') return null
    const handleId = handleToId.get(arg)
    if (handleId !== undefined) return {__netgl_handle: handleId}
    if (ArrayBuffer.isView(arg)) {
      return {
        __netgl_typedarray: arg.constructor.name,
        buffer: arg.buffer,
        offset: arg.byteOffset,
        length: arg.length,
      }
    }
    if (arg instanceof ArrayBuffer) return {__netgl_arraybuffer: arg}
    // DOM image sources for gl.texImage2D / gl.texSubImage2D. Convert to
    // ImageData via a 2D canvas (synchronous) and ship the raw pixels.
    if (
      (typeof HTMLImageElement !== 'undefined' && arg instanceof HTMLImageElement) ||
      (typeof HTMLCanvasElement !== 'undefined' && arg instanceof HTMLCanvasElement) ||
      (typeof HTMLVideoElement !== 'undefined' && arg instanceof HTMLVideoElement) ||
      (typeof ImageBitmap !== 'undefined' && arg instanceof ImageBitmap)
    ) {
      return encodeImageSource(arg)
    }
    // ImageData itself flows through unchanged (well — re-enveloped so the
    // receiver knows to call new ImageData).
    if (typeof ImageData !== 'undefined' && arg instanceof ImageData) {
      return {
        __netgl_imagedata: true,
        width: arg.width,
        height: arg.height,
        buffer: arg.data.buffer,
      }
    }
    if (Array.isArray(arg)) return arg.map(encodeArg)
    const name = arg.constructor?.name ?? typeof arg
    diag(`encoder gap: cannot encode arg of type ${name}`)
    throw new Error(`NetGL recorder: cannot encode arg of type ${name}`)
  }

  return new Proxy(shadow, {
    get(target, prop) {
      const value = Reflect.get(target, prop)
      if (typeof value !== 'function') return value
      const methodName = typeof prop === 'string' ? prop : String(prop)
      return function recorded(...args) {
        const result = value.apply(target, args)
        if (SHADOW_ONLY.has(methodName)) return result
        let returnId
        if (HANDLE_RETURNING.has(methodName) && result != null && typeof result === 'object') {
          returnId = nextId++
          handleToId.set(result, returnId)
        }
        const encodedArgs = args.map(encodeArg)
        post({name: methodName, args: encodedArgs, returnId})
        return result
      }
    },
    set(target, prop, value) {
      // Native WebGL2 setters brand-check `this` at the C++ level; default
      // Proxy set passes the proxy as receiver, which fails with Illegal
      // invocation. Route to the shadow directly.
      return Reflect.set(target, prop, value, target)
    },
  })
}

// three constants — inlined since we don't import three. EqualStencilFunc=514,
// KeepStencilOp=7680 are the GLenum values three uses as its enum members.
const EQUAL_STENCIL_FUNC = 514
const KEEP_STENCIL_OP = 7680
const PORTAL_STENCIL_REF = 1

/**
 * Apply portal stencil test to every material in the scene graph: stencilFunc
 * EQUAL to ref=1 (the value the host's stencil-mask painted inside the door
 * region), no stencil writes, no op changes on fail/zfail/zpass. Mirrors
 * `applyPortalStencilTest` in `packages/portal-three/src/index.ts` — kept in
 * sync manually. Without this celestiary's atmosphere fullscreen quad has no
 * stencil constraints and paints over the entire host canvas every frame.
 */
function applyStencilTest(scene) {
  if (!scene || !scene.traverse) return 0
  let count = 0
  scene.traverse((obj) => {
    const mat = obj.material
    if (!mat) return
    const apply = (m) => {
      m.stencilWrite = true
      m.stencilFunc = EQUAL_STENCIL_FUNC
      m.stencilRef = PORTAL_STENCIL_REF
      m.stencilFail = KEEP_STENCIL_OP
      m.stencilZFail = KEEP_STENCIL_OP
      m.stencilZPass = KEEP_STENCIL_OP
      m.stencilWriteMask = 0
      m.needsUpdate = true
      count++
    }
    if (Array.isArray(mat)) mat.forEach(apply)
    else apply(mat)
  })
  return count
}
