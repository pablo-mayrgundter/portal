# portal-netgl — design notes

NetGL is a transport for portals where the embedded scene's **GL command
stream** crosses the wire (postMessage, worker, WebRTC) and executes against
the host's WebGL2 context. There is no bitmap round-trip, no encoded depth
buffer, no compositor shader: the host's canvas IS where the embedded scene
renders, with the host's stencil mask + viewport remap deciding which pixels
the embedded draws can touch.

This doc captures the architecture, what's settled, and what's open.

## Why command-stream vs. bitmap

The repo has two production-shape iframe transports already:

- **portal-iframe**: ships color + packed-RGBA depth bitmaps per frame; host
  composites via a fullscreen-quad shader that does stencil + per-pixel
  depth-clip.
- **portal-worker**: same shape, but the embedded scene runs in a Web Worker
  via OffscreenCanvas.

Both encode depth through 8-bit channels, which is the precision-limited
step — far-plane geometry banding, depth-clip discontinuities. Recovering
linear depth is a couple of MAD instructions in the shader; recovering
correct *visibility* through a stencil window is where the bitmap-blit model
gets thin.

NetGL skips bitmap encoding entirely. The embedded scene's GL calls (its
`useProgram`, `bindBuffer`, `uniformMatrix4fv`, `drawArrays`, ...) ship over
the wire and execute against the host's GL context. The host's stencil
buffer constrains where those draws land; the host's depth buffer is what
the embedded scene's geometry depth-tests against. Composition is native
GL state: stencil + depth in one context, no bitmap round-trip, no depth
precision loss.

The bet is: **GL-call volume is the right granularity for portal
composition**. A frame of three.js draw calls is ~100-500 calls;
postMessage's structured-clone throughput handles that easily.

## Toward 1.0: NetGL as a shim protocol (f → f′)

The direction: NetGL 1.0 is a small WebGL2-level protocol plus a thin
**shim per framework** that lets any two WebGL frameworks composite scenes
into one GL context on one GPU. Scene A lives in framework f1, scene B in
f2; f1′ and f2′ are the shimmed versions that can portal between them.

What makes that tractable is that the wire is WebGL2 itself, not any
framework's scene graph. The recorder, the replay, and the handle
interning know nothing about three.js — `three-spike.test.ts` and the
Cesium demo run through identical code. What IS framework-specific is
small, and the goal of the 1.0 work is to push everything else out of the
shim and into the protocol.

**A guest shim (f′ as the embedded side) needs exactly two hooks:**

1. **Context injection** — get the framework to render with the recorder
   Proxy instead of a context it creates itself.
2. **Frame boundaries** — call `endFrame()` after each frame the framework
   renders.

Optionally, app-level camera coupling (the framework's camera API is
where a host pose gets applied), which lives in the app, not the shim.

**A host (f′ as the embedding side) needs:** a point in its frame to paint
a stencil mask and drain the guest's frame (`makeNetGLHostReceiver`), and
a way to reset its own framework's GL-state cache afterwards (three:
`renderer.resetState()`).

| Framework | Context injection | Frame boundary | Status |
|---|---|---|---|
| three.js | `new WebGLRenderer({ context })` | wrap `setAnimationLoop` / `render` | guest + host, shipped |
| Cesium | `contextOptions.getWebGLStub(canvas, attrs)` | `scene.postRender` | guest, shipped (`frameworks/cesium.ts`) |
| Babylon.js | `new Engine(gl, …)` accepts a context | `scene.onAfterRenderObservable` | untried |
| luma.gl / deck.gl | `WebGLDevice.attach(gl)` | `onAfterRender` | untried |
| regl | `createREGL({ gl })` | after `regl.frame` callback | untried |
| MapLibre GL | none public — override `canvas.getContext` on the instance before construction | `map.on('render')` | untried |

The per-instance `canvas.getContext` override is the universal fallback
for frameworks with no injection point.

**What moved out of the shim into the protocol.** The three.js guest
(`makeNetGLPortalGuest`) carries four framework-specific workarounds.
Two of them are now protocol features any guest gets for free:

- `renderer.resetState()` before every render → **state checkpoint**
  (below): the guest emits its own GL state at each frame boundary, so
  the framework's state cache stays valid whatever the host did in
  between.
- per-material stencil props, `scene.background = null`, `autoClear`
  toggling → **screen policy** (below): the host overrides stencil,
  blending, and clears for guest draws that target its canvas.

The Cesium shim is ~40 lines because of this: context injection via
`getWebGLStub`, `endFrame()` on `postRender`, done.

**"Same GPU."** The composite happens in the host's context, so it is
one GPU. The guest's shadow context runs on it too, and currently
executes every call, draws included: 2× GPU work for the guest's scene.
The shadow does need the draws when the framework reads pixels back
(Cesium picking and `pickPosition`-based camera collision); a
`shadowDraws: false` mode for guests that never read back is an easy
perf win.

## State checkpoint

`checkpoint.ts`. Every framework caches GL state client-side and skips
calls whose value matches the cache. When a guest's calls replay into a
context the host's renderer mutated in between, the skipped calls leave
the guest drawing with the host's program, VAO, textures, blend state.

The shadow context has executed every guest call, so its state IS the
guest's intended state. At each frame boundary (after `netgl:frame-end`,
and once at startup) the recorder emits ordinary NetGLCalls that
re-establish it on the receiver: object bindings (framebuffers, VAO,
program, generic + indexed buffers, textures and samplers per unit),
tracked from the call stream; scalar state (caps, blend, depth, stencil,
colour mask, pixel-store, generic vertex attribs, viewport, scissor),
queried from the shadow. Every replayed batch starts from the guest's
own state. It is context virtualisation — what browsers do to multiplex
many WebGL contexts onto one driver context — at the protocol layer.

`checkpoint.test.ts` pins the contract: a three.js guest that does NOT
reset its state cache renders byte-equal to a pristine control after the
host renders its own textured scene and scribbles over the shared
context; the same sequence without the checkpoint does not.

Not captured: per-FBO state (drawBuffers / readBuffer), per-VAO attribute
state beyond the default VAO's element binding, indexed transform-
feedback bindings, queries in flight.

## Screen policy

`screen-policy.ts`, via `makeNetGLReplay(gl, { screen })`. Overrides
applied host-side to guest draws that target the default framebuffer:

- `stencil: { ref }` — every screen draw tests stencil EQUAL `ref` and
  writes no stencil. Render-target passes keep the guest's own stencil.
- `clear: 'depth-only'` — screen colour and stencil clears are dropped
  (the host painted the door background and owns the mask); depth clears
  are confined to the guest's remapped viewport.
- `blend: 'premultiplied-over'` — screen draws blend `ONE,
  ONE_MINUS_SRC_ALPHA`, for guests whose final pass writes over a
  transparent background (Cesium's atmosphere glow over the host's
  stars).

Mechanics: while a policy is active, the guest's setters for the
overridden state are tracked but not executed; right before each draw or
clear, GL is reconciled to what that draw needs — the override for
screen draws, the guest's intended state for RT draws.
`replay.invalidate()` (called by the host receiver before each drain)
drops the replay's belief about what's applied, since the host touched
the context.

Related replay options: screen **scissor** boxes now follow the viewport
remap (they're in the same pixel space); `screenFramebuffer` redirects
the guest's default framebuffer to a host FBO, for hosts that render
into an offscreen target and composite later (celestiary does).

## Composition modes

- **Door** (host-netgl-demo, -celestiary, -cesium `?mode=door`): a
  rectangular stencil mask in the host scene, the guest's full-canvas
  viewport cover-fit to the door's pixel rect, the guest flying its own
  camera (or a coupled one, scale permitting).
- **In place** (host-netgl-cesium `?mode=earth`): the guest renders the
  same view as the host, camera-coupled, and a shape stencil marks where
  its pixels belong. For a Cesium Earth: the host draws its scene without
  the Earth, then an invisible WGS84 ellipsoid (2.5% oversize for the
  atmosphere shell, double-sided so it still covers the screen from
  inside the shell) writes stencil where it passes the depth test — so
  host geometry in front of the Earth keeps its pixels and geometry
  behind it doesn't. Depth composition works both ways without the two
  sides sharing a depth convention.

## Findings from Cesium integration

- **`getWebGLStub` is the injection point.** It's in Cesium's public
  `ContextOptions` typedef ("A function to create a WebGL stub for
  testing") and is called instead of `canvas.getContext`. Create the
  shadow on the canvas Cesium passes in: Cesium reads
  `gl.drawingBufferWidth` and `gl.canvas` for sizing.
- **The canvas needs CSS size.** Cesium's `widgets.css` normally
  supplies `canvas { width: 100%; height: 100% }`; without it the canvas
  stays 300×150 and the host upscales a blurry, stretched globe.
- **Extensions must be enabled on the receiver.** `getExtension` used to
  be shadow-only; a three.js host happened to enable the extensions a
  three.js guest needed. It now ships.
- **Readback stays on the shadow.** Client-memory `readPixels` /
  `getBufferSubData` / `clientWaitSync` are answered by the shadow (which
  has the guest's pixels) and not shipped — shipping stalled the host
  GPU for results nobody read.
- **ImageBitmap crosses by structured clone.** Cesium uploads imagery as
  ImageBitmaps. WebGL ignores `UNPACK_FLIP_Y` / premultiply for bitmaps
  but honours them for ImageData, so the old bitmap → ImageData
  conversion would have changed upload semantics.
- **Render on demand, with flow control.** Cesium's own loop is off; the
  guest renders one frame per host tick. A same-origin iframe shares the
  host's main thread, so unanswered ticks must not queue: at most one is
  in flight. With "pose-ahead" (the tick for frame N+1 sent at the end of
  frame N) the guest's frame normally matches the pose the host draws
  with — 0 frames of lag at 60 fps, which matters for in-place
  composition, where a lagging globe visibly slides against its stencil.
- **Stale re-runs skip uploads.** When no new guest frame arrived, the
  host re-runs the last one; it now skips creations and uploads, or a
  slow guest streaming tiles re-uploads every tile every host frame.
- **A frame that deletes an object is never re-run.** Cesium's first
  frame creates, uses and deletes a scratch framebuffer. Re-running that
  frame bound the deleted FBO (which fails), so the textures meant for it
  were attached to Cesium's still-bound scene framebuffer instead, which
  stayed incomplete for the rest of the session: a black door, depending
  on whether the host happened to draw before the guest's second frame.
  Transient objects make a frame unrepeatable; the host now skips the
  re-run and shows no guest content for that one host frame.

## Celestiary × Cesium: the plan

Celestiary as the host (f1′ = three.js host), Cesium as the guest
(f2′ = the Cesium shim), Earth composited in place:

1. **Guest.** Unchanged from `apps/host-netgl-cesium/src/cesium-guest.ts`:
   a CesiumWidget with `makeNetGLCesiumGuest`, transparent background,
   sun/moon/skybox off, inputs off, rendering on `cesium:tick`.
2. **Host hook in celestiary's `ThreeUI` render.** Celestiary renders its
   scene into `_sceneRT`, then composites an atmosphere pass to the
   canvas. The Cesium drain belongs between the two, inside `_sceneRT`,
   where celestiary's depth is: after `render(scene)`, render the Earth's
   stencil shell into `_sceneRT` (the RT needs a stencil attachment),
   clear depth, drain with `screenFramebuffer` returning `_sceneRT`'s
   framebuffer, `resetState()`, then the atmosphere pass. Hide
   celestiary's Earth surface mesh (and its own atmosphere shell, or
   Cesium's) once Cesium frames flow.
3. **Camera coupling.** Celestiary is already in metres, so scale is 1;
   the body frame is the Earth planet group (axial tilt + spin). Map
   body frame → ECEF exactly as `earth.ts`'s `cesiumView` does, and send
   Cesium's clock the simulation time so its lighting matches
   celestiary's sun.
4. **Same page, not an iframe.** Cesium has no reason to be in an iframe
   here. An in-process transport (post = synchronous replay into
   celestiary's context, no structured clone) plus a synchronous render
   call gives zero lag and no message overhead. Needs: an in-process
   transport that clones typed arrays at record time (frameworks reuse
   scratch buffers; postMessage's clone was doing this implicitly).

## Layers

```
  ┌──────────────────────────────┐  ┌──────────────────────────────┐
  │     sender (iframe)          │  │      host (parent)           │
  │                              │  │                              │
  │   THREE.WebGLRenderer        │  │   THREE.WebGLRenderer        │
  │            │                 │  │            │                 │
  │   Proxy<WebGL2RenderingCtx>  │  │            │                 │
  │   makeNetGLRecorder()        │  │            │                 │
  │   ──┬──────────────────────  │  │            │                 │
  │     │ NetGLCall{name,args}  ─┼──┼─►  makeNetGLReplay()         │
  │     │ + NetGLFrameEnd       ─┼──┼─►   │                       │
  │     │                        │  │     ▼                       │
  │     │  shadow GL ctx         │  │   host's WebGL2 context     │
  │     │  (sync return values   │  │   (the canvas the user      │
  │     │   + handle minting)    │  │    sees)                    │
  └──────────────────────────────┘  └──────────────────────────────┘
```

The recorder is a `Proxy<WebGL2RenderingContext>` that, for each intercepted
call:

1. Forwards the call to a **shadow** GL context (a 1×1 detached HTMLCanvas's
   gl) — three.js needs synchronous return values for `getParameter`,
   `getError`, `createBuffer`, `getUniformLocation`, etc. The shadow answers
   those locally so three never has to wait on the wire.
2. Encodes the args structurally — handles get interned into integer IDs
   shared with the replay; typed arrays + ArrayBuffers ride structured
   clone; DOM image sources (`HTMLImageElement`, `HTMLCanvasElement`,
   `HTMLVideoElement`, `ImageBitmap`) go through a 2D-canvas → `ImageData`
   round-trip on the sender so the receiver can re-issue `texImage2D` with
   the same call shape.
3. Posts a `NetGLCall { name, args, returnId? }` onto a transport.

The replay reverses the encoding and re-executes against the host's
context. The host owns when to drain: the sender emits a `NetGLFrameEnd`
marker after each frame; the host buffers calls between markers and drains
the latest batch in one atomic block right after its own stencil-mask
paint + clearDepth. This is the protocol that prevents host renders and
embedded renders from interleaving on the shared GL context.

## Adoption surfaces

Framework-agnostic building blocks (new, and what 1.0 shims build on):

- **`makeNetGLGuestContext({ canvas?, transport? })`** — shadow context,
  recorder, `endFrame()` (frame-end + checkpoint), `announce()`.
- **`makeNetGLCesiumGuest()`** — the Cesium shim: `contextOptions` to pass
  to the Viewer / CesiumWidget, `attach(scene)`.
- **`makeNetGLHostReceiver({ gl, transport, replay })`** — host-side frame
  buffering + `drain()`, with the replay's viewport remap and screen
  policy.

The three.js-specific shapes, from most-integrated to least:

1. **`makeNetGLPortalTarget({ scene, anchor, ... })`** (in
   `packages/portal-netgl/src/target.ts`). The host-netgl-demo pattern. The
   caller hands a scene + door anchor; the factory owns shadow GL,
   transport, recorder, NetGLRenderer construction, stencil-test
   application, ready handshake, setPose handler, oblique near-plane clip,
   frame-end emission. Shape matches `makeIframeTarget` in
   `@portal/portal-iframe`, so swapping transports is a one-line call-site
   change. This is the easy case: the embedded app is portal-aware.

2. **`createNetGLRenderer({ shadow, transport, ...threeOpts })`** (in
   `packages/portal-netgl/src/renderer.ts`). One layer down. Returns a
   `THREE.WebGLRenderer` whose context is the recorder; everything else is
   the caller's responsibility. Use this when you want NetGL but not the
   stencil + handshake conventions the factory bundles in.

3. **External-app embedding via window hook** (the celestiary case). The
   embedded app is *not* portal-aware; it constructs its own renderer and
   drives its own RAF. Adoption requires a small patch to the embedded
   app: replace `new THREE.WebGLRenderer({...})` with a call to a global
   hook (`window.__portalCreateRenderer`), and load a shim before the main
   bundle that installs the hook. The shim builds a recorder-backed
   `WebGLRenderer` (using the embedded app's `WebGLRenderer` constructor,
   passed through the hook, so there's no two-three.js version
   mismatch), monkey-patches `renderer.render` for state-cache reset +
   stencil application + autoClear toggling, and wraps `setAnimationLoop`
   for frame-end emission. See `apps/host-netgl-celestiary/` for a
   complete worked example against a real GL-heavy app.

## Findings from celestiary integration

Each of these is a real adoption gotcha for shape 3 (and would have been a
silent footgun if not surfaced):

- **The iframe needs a real viewport.** The 1×1-offscreen pattern that
  works for synthetic demo scenes (no React, no async asset loading)
  silently throttles or kills a real app's render loop. Components that
  measure `container.offsetWidth/offsetHeight` to lay out (React,
  flexbox) end up at zero, the app's renderer.setSize is `(W, 0)`, and
  nothing draws. Solution: full-viewport `opacity: 0` iframe behind the
  host canvas with `pointer-events: none`.

- **Use a detached `HTMLCanvasElement` for the shadow, not
  `OffscreenCanvas`.** Three's `setSize(w, h)` defaults `updateStyle=true`
  and writes `canvas.style.width`. `OffscreenCanvas` has no `.style`,
  three throws "Cannot set properties of undefined". The factory escapes
  this because it controls every setSize call and passes
  `updateStyle=false`; an embedded app's own renderer code doesn't.

- **`renderer.resetState()` nulls `_currentRenderTarget`.** Three needs
  resetState before each render so the WebGLState cache doesn't skip
  redundant useProgram (the host's own renderer mutated the shared GL
  context between embedded frames). But three's resetState also clears
  `_currentRenderTarget = null` — the embedded app's
  `setRenderTarget(rt)` + `render()` becomes "render to host canvas".
  Capture + restore the target around the reset.

- **autoClear toggling per render.** `autoClear = false` is necessary so
  the embedded app's render doesn't wipe the host canvas. But the same
  flag prevents the app's offscreen RTs from being cleared too — RTs
  carry garbage from prior memory, downstream compositing blits it as
  solid colour. Toggle: false when rendering to screen, true when
  rendering to an RT.

- **Frame-end concatenation, not overwrite.** The host's frame-batch
  buffer needs to *append* across multiple frame-ends, not overwrite
  the previous batch. If the host RAF stalls briefly (page load, layout),
  iframe frame-ends pile up. Dropping batches strands the handle
  creations (`createTexture`, `createProgram`, `getUniformLocation`)
  inside them. The next frame to reference those handles throws "unknown
  handle id N" on replay.

- **Three caches viewport and skips redundant calls.** Once the host
  remaps the sender's screen-target viewport to the door rect, the
  sender's three has a state-cache entry saying "viewport is already
  (0,0,W,H)". The sender's next `setRenderTarget(rt)` wants viewport =
  (0,0,W,H), three's cache says "same as before" and skips the GL call.
  Sender's actual GL state and host's actual GL state are now de-synced:
  the RT render runs at the host's door-rect viewport, populating only a
  tiny region of the RT. **Fix**: replay tracks the sender's intended
  viewport (pre-remap) and re-issues `gl.viewport` after every
  `bindFramebuffer` transition with the appropriate rect for the new
  binding.

## Door-fit viewport remap

The `remapScreenViewport(x, y, w, h)` callback on
`makeNetGLReplay`'s config is the seam for door-fit compositing. The
callback receives the sender's intended viewport args (pre-remap) and
returns the rect to actually apply on the host. The replay engine handles:

- Pass-through for RT-targeted viewport calls (current draw FB != null).
- Tracking the sender's intended viewport across calls.
- Re-issuing viewport on every `bindFramebuffer` transition (see above).

Hosts compute their door rect with `portalScreenRect(anchor, camera,
viewport)` from `@portal/portal-three` (projects the anchor mesh's corners,
returns the bounding pixel rect clamped to viewport). They typically apply
**cover semantics** — scale the sender's viewport preserving aspect to the
smallest rect that contains the door — so the embedded scene's projection
is undistorted and the door is a clipping mask, not an aspect-ratio
source. CSS `object-fit: cover` is the right mental model.

This works for any rectangular door. Future non-rectangular doors only
need to swap their stencil-mask shader; the viewport-remap layer stays
unchanged.

## Open problems (the next PR)

- **three.js guest onto the generic core.** `makeNetGLPortalGuest` and
  the celestiary shim still do their own `resetState` / stencil /
  autoClear handling. Porting them onto `makeNetGLGuestContext` + a host
  screen policy would delete most of `guest.ts` and make the celestiary
  shim a few lines.

- **Guest lag.** Pose-ahead + one-tick-in-flight gives 0 frames at full
  speed, but a guest slower than the host drops to "latest frame" and
  in-place composition slides. Sync options: the same-origin synchronous
  path (above), or tagging frames with their pose and having the host
  draw its stencil shell for the guest's pose rather than its own.

- **Extension-object methods.** Calls on objects returned by
  `getExtension` (`WEBGL_multi_draw`, `OVR_multiview2`, ...) bypass the
  recorder. Wrap extension objects in their own Proxy when a guest needs
  one.

- **Coordinate-scale coupling.** `couplePoseAcrossPortal` assumes both
  sides use comparable scales. Embedding celestiary (sun radius ~7×10⁸ m)
  in a meter-scale host puts the embedded camera inside the sun on the
  default coupling. Real fix: per-target affine scaling at the coupling
  layer.

- **Encoder coverage long-tail.** `HTMLImageElement` /
  `HTMLCanvasElement` / `HTMLVideoElement` / `ImageBitmap` all flow
  through `ImageData`. Open: transform-feedback buffer bindings, MSAA
  multisample renderbuffer storage, sync object timeouts (waitSync /
  clientWaitSync return value semantics are observable), occlusion query
  results.

- **Resource lifecycle.** `handleToId` (recorder) and `idToHandle`
  (replay) only grow. `gl.delete*` calls go over the wire but the maps
  aren't trimmed. Long-running sessions leak.

- **Multiple-targets-one-host.** Today the host has one replay engine
  bound to one transport. Two iframes through one host canvas needs the
  replay to namespace its idToHandle per-source — not hard, just not done.

- **State drift detection.** When the recorder + replay disagree about
  state (e.g., the sender renamed a uniform in shader-recompile but the
  receiver's handle map still has the old location), the replay throws
  on resolve. A "checkpoint" packet (sender ships current binding state
  + active program every N frames so the replay can validate and
  resync) would catch this earlier.

- **Single source of truth for the embedded recorder.** The celestiary
  shim inlines a copy of the recorder's encoder + handle table. The
  package is on npm now (`@pablo-mayrgundter/portal-netgl`); the phase-2
  upstream patch in `apps/host-netgl-celestiary/celestiary-upstream/`
  replaces the copy with an import.

- **Permission model.** Anything coming over the NetGL wire is executed
  against the host's GL context. A malicious sender can hose the host
  (resource exhaustion, infinite-loop shaders). For trusted same-origin
  iframes today; broader use needs a sandboxing layer (e.g., proxy that
  validates calls match a known schema).

## Layout / where things live

- `packages/portal-netgl/src/recorder.ts` — sender-side recorder Proxy
  with encoder for handles, typed arrays, ArrayBuffers, image sources.
- `packages/portal-netgl/src/replay.ts` — receiver-side replay engine,
  draw-FB tracking, viewport remap + post-bind re-issue.
- `packages/portal-netgl/src/renderer.ts` — `createNetGLRenderer`:
  three-WebGLRenderer wrapping a recorder.
- `packages/portal-netgl/src/target.ts` — `makeNetGLPortalTarget`:
  full-cake adoption factory (scene + anchor → live portal target).
- `packages/portal-netgl/src/checkpoint.ts` — state checkpoint +
  binding tracker.
- `packages/portal-netgl/src/screen-policy.ts` — host-side stencil /
  blend / clear overrides for screen draws.
- `packages/portal-netgl/src/guest-context.ts` — framework-agnostic guest
  core.
- `packages/portal-netgl/src/host-receiver.ts` — host frame buffering +
  drain.
- `packages/portal-netgl/src/frameworks/cesium.ts` — Cesium shim.
- `packages/portal-netgl/src/messages.ts` — wire types
  (`NetGLCall`, `NetGLFrameEnd`, `NetGLWireMessage`).
- `packages/portal-netgl/src/proxy.ts` — original in-process proxy
  spike (kept for the regression tests it covers).
- `packages/portal-three/src/index.ts` — `portalScreenRect` helper,
  stencil-test helpers, anchor projection.
- `apps/host-netgl-demo/` — synthetic scene example (portal-aware target
  using `makeNetGLPortalTarget`).
- `apps/host-netgl-celestiary/` — external-app embedding example with
  shim + celestiary submodule patches.
- `apps/host-netgl-cesium/` — Cesium guest in a three.js host: door mode
  and Earth-in-place mode.
