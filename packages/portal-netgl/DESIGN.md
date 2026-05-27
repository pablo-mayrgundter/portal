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

Three shapes, from most-integrated to least:

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
  shim inlines a copy of the recorder's encoder + handle table because
  it has to bundle into celestiary's three.js version. Publishing
  `@portal/portal-netgl` to npm with a bundler-agnostic build collapses
  this to a single import.

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
