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
a way to make its own framework's GL-state cache right afterwards. That is
one of two opposite things, depending on how the framework caches:

- **Invalidate** (three: `renderer.resetState()`): the cache was bypassed
  by the replay, so it's stale; drop it and re-query or re-set everything.
- **Restore** (luma.gl: `device.pushState()` before, `device.popState()`
  after): luma spies on the context's setters, so its cache followed every
  replayed call and is correct, but its pipelines assume the state they
  don't name is still at its default. The guest's leftovers must be put
  back, not forgotten. See the deck.gl findings.

| Framework | Context injection | Frame boundary | Status |
|---|---|---|---|
| three.js | `new WebGLRenderer({ context })` | wrap `setAnimationLoop` / `render` | guest + host, shipped |
| Cesium | `contextOptions.getWebGLStub(canvas, attrs)` | `scene.postRender` | guest, shipped (`frameworks/cesium.ts`) |
| Babylon.js | `new Engine(gl, …)` accepts a context | `scene.onAfterRenderObservable` | untried |
| luma.gl / deck.gl | host: replays into `device.gl`; guest: `WebGLDevice.attach(gl)` | `onAfterRender` | host, shipped (`frameworks/luma.ts`); guest untried |
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
one GPU. The guest's shadow context runs on it too, and by default
executes every call, draws included: 2× GPU work for the guest's scene.
The shadow does need the draws when the framework reads pixels back
(Cesium picking and `pickPosition`-based camera collision). A guest that
never reads back (an overlay) can pass `shadowDraws: false` (0.6.2): see
"No-draw shadow" under the guest's layers below.

## State checkpoint

`checkpoint.ts`. Every framework caches GL state client-side and skips
calls whose value matches the cache. When a guest's calls replay into a
context the host's renderer mutated in between, the skipped calls leave
the guest drawing with the host's program, VAO, textures, blend state.

The shadow context has executed every guest call, so its state IS the
guest's intended state. At each frame boundary (after `netgl:frame-end`,
and once at startup) the recorder emits ordinary NetGLCalls that
re-establish it on the receiver: object bindings (framebuffers, VAO,
program, generic + indexed buffers, textures and samplers per unit) and
scalar state (caps, blend, depth, stencil, colour mask, clear values,
hints, pixel-store, generic vertex attribs, viewport, scissor). Every
replayed batch starts from the guest's own state. It is context
virtualisation — what browsers do to multiplex many WebGL contexts onto
one driver context — at the protocol layer.

**Both kinds are tracked from the call stream, not queried.**
`BindingTracker` follows the bind and delete calls; `ScalarStateTracker`
(`makeScalarStateTracker`) follows the state setters, after one seed from
the shadow when the recorder session is made (and again on
`webglcontextrestored`). So the checkpoint makes no synchronous calls on
the shadow.

Why: until 0.3.0 the scalar half was read back with `getParameter` /
`isEnabled` / `getVertexAttrib` at every frame end, 79 calls per guest
frame (53 + 10 + 16, with 16 attribs). Each is a round trip to the GPU
process that waits for the shadow's queued commands, the guest's whole
frame, first. In celestiary's Cesium layers (celestiary/web#189, #194)
they were all of the shadow contexts' synchronous calls, 79 to 237 a
frame (Cesium makes none in a settled frame): on SwiftShader ~40 of a
Cesium frame's ~45 ms, and on an Apple M2 (ANGLE Metal) a large share of
`cesium.replay`'s 7–20 ms CPU.

What the tracker relies on:

- **Every state change goes through the recorder.** A setter called on
  the shadow directly, or through an extension object (which bypasses the
  recorder, e.g. `OES_draw_buffers_indexed`'s per-buffer blend), isn't
  seen. Such a guest passes `scalarState: 'queried'`
  (`makeNetGLGuestContext`, `makeNetGLCesiumGuest`,
  `makeNetGLRecorderSession`), which keeps the query path, or calls
  `reseed()`.
- **Values are stored as the queries answer them**: WebIDL's conversions
  (GLboolean → boolean, GLint / GLuint → int32 / uint32) and GL's float32
  storage are applied on observe, so the tracked checkpoint emits the
  query checkpoint's calls and args for in-range values. Values GL clamps
  (depthRange, clearDepth, sampleCoverage, the stencil ref, viewport over
  `MAX_VIEWPORT_DIMS`) are kept as passed: the receiver clamps them as the
  shadow did.
- **Rejected calls change nothing.** The tracker skips the ones whose rule
  is a value check (negative rect sizes, depthRange near > far, lineWidth
  ≤ 0, WebGL's constant-colour / constant-alpha pairing, pixel-store
  values, attrib index and array length). It doesn't validate enums: an
  invalid one would be tracked though the shadow ignored it. Frameworks
  don't issue them.

`checkpoint.test.ts` pins the contract: a three.js guest that does NOT
reset its state cache renders byte-equal to a pristine control after the
host renders its own textured scene and scribbles over the shared
context, with tracked and with queried scalar state; the same sequence
without the checkpoint does not. `checkpoint-state.test.ts` drives state
calls through the recorder and checks the tracked checkpoint against the
query checkpoint call for call, with zero queries on the shadow.
headless-gl can't check two things against the query path, so they're
checked against the expected calls: integer vertex attribs (its
`getVertexAttrib` answers floats) and MIN / MAX blend equations with the
derivative hint (its WebGL2 keeps WebGL1's validation).

Not captured: per-FBO state (drawBuffers / readBuffer), per-VAO attribute
state beyond the default VAO's element binding, indexed transform-
feedback bindings, queries in flight. On a context restore the bindings
are stale (the scalar state is reseeded); no framework we target recovers
from a lost context anyway.

## Sub-frames

A host can draw one guest several times in one of its frames, with its own
draws in between. Cesium calls an external renderer once for each depth
frustum the renderer's bounds overlap (2–3 with log depth off), after
that frustum's opaque pass, and calls `Context.resetState()` after each
call. Each draw is a sub-frame of the guest: `link.frame(() => {
render(); guestCtx.subFrame() })` in each call.

**What's required.** The guest's GL state must be right at the start of
each sub-frame, and the host has changed it. For Cesium that's nearly all
of it: `resetState()` resets every binding the checkpoint restores except
the textures on each unit and the indexed uniform-buffer bindings, and the
caps outside `RenderState`, all of pixel store and the clear values; then
it applies its full `RenderState`, which is every other piece of scalar
state but the two hints and the generic vertex attributes. Cesium's next
draws bind textures, and set generic vertex attributes for constant
attributes. So the restore can't be trimmed to what the host changed:

- The replay can't see what the host did without querying the host's
  context, the synchronous round trips 0.3.0 removed from the shadow.
- A host that tracked its own calls (a Proxy over its context marking
  state dirty) could say. For Cesium it would name everything but the
  hints, the uniform-buffer bindings and the generic attributes of
  indices with no constant attribute drawn since: a handful of calls of
  80.
- Nor can it be trimmed to what the guest sets before using it. A
  framework skips what its cache says is set, so a sub-frame's first call
  can be a draw that depends on all of it. Restoring lazily, item by item
  before the first call that reads each, would need a dependency map of
  every call to the state it reads, for a saving that the first draw
  mostly cancels.

**What it costs.** With tracked scalar state (0.3.0, the default) the
checkpoint makes no queries; it is ordinary state calls.
`subframe.test.ts` measures it: a three.js guest that never resets its
cache draws three sub-frames per host frame (a textured cube each, one
texture unit), the host rendering into its own target and scrambling
state in between. Per sub-frame, steady state:

| Boundary | NetGL calls replayed | Of them cloned into the queue | GL calls on the host | Queries on the shadow | Pixels |
|---|---|---|---|---|---|
| `endFrame()`, `scalarState: 'queried'` | 84–86 | 80 | 84–86 | 79 | right |
| `endFrame()` (tracked) | 84–86 | 80 | 84–86 | 0 | right |
| `subFrame()` | 84–86 | 0 | 84–86 | 0 | right |
| `endFrame({ checkpoint: false })` | 4–6 | 0 | 4–6 | 0 | wrong |

The checkpoint is the 80: 64 scalar calls, and 16 for bindings with one
texture unit (each further unit adds 6, each uniform-buffer index 1). The
guest's own calls are only 4–6 because three skips everything its cache
holds; a real scene's draws outnumber the checkpoint (New York draws
hundreds of meshes in a frame).

So the per-sub-frame checkpoint is the price of correctness, and with
tracked state it is cheap: about 80 state calls and no round trips.
`subFrame()` replays the same calls as `endFrame()`. What it saves is the
copy. `endFrame()` posts the checkpoint after the frame-end, when the
immediate link is closed, so the link `structuredClone`s each call into
its queue to flush at the next `frame()`. `subFrame()` defers it to the
guest's next call, inside the next `frame()`, where it replays directly
(`NetGLRecorderSession.deferCheckpoint`). The deferred checkpoint is
captured when it is posted, before that call reaches the shadow or the
trackers. That state is the same as at the boundary: nothing ran on the
guest in between, or whatever did went through the recorder first and
triggered the post.

`endFrame({ checkpoint: false })` is for when no restore is needed: a host
that doesn't touch the context between the guest's frames, or a guest
that resets its own state cache.

Not done: `makeNetGLCesiumGuest` ends each Cesium frame with `endFrame()`,
so celestiary's Cesium layers still clone one checkpoint a frame (80-odd
calls, more with Cesium's texture units). Offering the deferral there is a
small option on the shim.

### Parts: several draws for one view

Sub-frames are draws inside one host frame that land on the same target.
Some guests draw more than once for one view with different settings, and
the host needs each in a target of its own. Celestiary's Cesium layer
draws Earth's night lights as a second render, with only the night
imagery, unlit, on black. On the same page the host renders that between
decoding the day frame and its own lights pass.

From a guest page both renders arrive as frames of one view, and
`drain()` replays them together (0.6.8). The guest tags the second
frame-end (`part: 'lights'`), and the receiver calls `beforeFrame(end)`
before each frame's calls. The host's `screenFramebuffer` callback then
returns the current part's target. The replay already asks it at each
bind of the screen, so nothing in the replay changed. A re-run calls it
too, from the frame-ends it kept, so a stale frame's parts land where a
fresh one's would. `drain()` stays atomic: the host's own work between
the parts (the decode of the day frame) comes after, reading each part's
target.

## Screen policy

`screen-policy.ts`, via `makeNetGLReplay(gl, { screen })`. Overrides
applied host-side to guest draws that target the default framebuffer:

- `stencil: { ref }` — every screen draw tests stencil EQUAL `ref` and
  writes no stencil. Render-target passes keep the guest's own stencil.
- `clear: 'depth-only'` — screen colour and stencil clears are dropped
  (the host painted the door background and owns the mask); depth clears
  are confined to the guest's remapped viewport.
- `clear: 'none'` — every screen clear is dropped: `clear` whatever its
  mask, and every `clearBuffer*`. For a guest drawn into a frame the host
  is still rendering, testing against the host's depth (a city inside
  Cesium's frame, [nested guests](#nested-guests-cesium-drawing-new-york)).
  `'depth-only'` would wipe that depth with the guest's first clear.
- `blend: 'premultiplied-over'` — screen draws blend `ONE,
  ONE_MINUS_SRC_ALPHA`, for guests whose final pass writes over a
  transparent background (Cesium's atmosphere glow over the host's
  stars).

"Screen" is decided as for the viewport remap: the guest's own draw
framebuffer binding is null (its default framebuffer), whether or not
`screenFramebuffer` stands in for it on the host. Clears of the guest's
own framebuffers always run as sent, under every `clear` mode.

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
  rectangular stencil mask in the host scene, and the guest rendering the
  host camera carried through the door (`couplePoseAcrossPortal`, with
  `scale` when the two worlds differ in scale) at the host's field of
  view, full screen. The door is then a window: walk to its left and look
  back, and the guest's scene slides out past the door's left edge.
  An earlier version cover-fit a guest flying its own camera into the
  door's screen rect instead — a picture in a frame, whose content slid
  the wrong way as you walked past. Cover-fit (below) is only right for a
  guest that can't take a camera.
- **In place** (host-netgl-cesium `?mode=earth`): the guest renders the
  same view as the host, camera-coupled, and a shape stencil marks where
  its pixels belong. For a Cesium Earth: the host draws its scene without
  the Earth, then an invisible WGS84 ellipsoid (2.5% oversize for the
  atmosphere shell, double-sided so it still covers the screen from
  inside the shell) writes stencil where it passes the depth test — so
  host geometry in front of the Earth keeps its pixels and geometry
  behind it doesn't. Depth composition works both ways without the two
  sides sharing a depth convention.

- **Overlay** (host-netgl-deck): no stencil and no shape. The guest
  renders the host's exact view, in the host's clip space (the host's own
  projection matrix), right after the host's scene, and depth-tests
  against the host's depth buffer without clearing it or writing to it.
  Occlusion by the host is free; the guest occludes nothing of the host's.
  This needs the guest's camera to be the host's to the last bit
  (`globeLayerView` composes it in doubles), a host far plane that
  contains the guest (deck: `farZMultiplier`), and none of the guest's
  screen clears: `attachNetGLDeckLayer` defaults its screen policy to
  `clear: 'none'`.

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
- **The ready handshake is re-sent until acked.** A guest iframe's script
  can run before the host page attaches its message listener. A single
  `netgl:ready` then goes nowhere, and the host never draws the door
  while guest frames stream in unused — which is why the celestiary demo
  sometimes showed nothing at all. `announce()` now repeats every 500 ms
  until the host receiver answers `netgl:ready-ack`.
- **A frame that deletes an object is never re-run.** Cesium's first
  frame creates, uses and deletes a scratch framebuffer. Re-running that
  frame bound the deleted FBO (which fails), so the textures meant for it
  were attached to Cesium's still-bound scene framebuffer instead, which
  stayed incomplete for the rest of the session: a black door, depending
  on whether the host happened to draw before the guest's second frame.
  Transient objects make a frame unrepeatable; the host now skips the
  re-run and shows no guest content for that one host frame.

## Findings from deck.gl / luma.gl integration

From the netmap spike (deck.gl 9.4 `_GlobeView` hosting celestiary's
satellites) and `frameworks/luma.ts` (`attachNetGLDeckLayer`).

- **Restore luma's state; don't invalidate it.** luma's
  `WebGLStateTracker` replaces the context's state setters with spies on
  the gl instance, and the replay calls `gl[name](...)` on that same
  instance, so luma's cache follows every guest call and never goes
  stale. Its pipelines, though, set only the parameters a layer names and
  assume GL defaults for the rest. A three.js guest leaves CULL_FACE on,
  and deck's land polygons (wound either way) lost triangles in the next
  frame. `device.pushState()` before the guest and `popState()` after put
  back every tracked value the guest changed: deck's next frame was then
  bit-identical to one where the guest never ran (in the spike, in
  `luma.test.ts` on headless-gl, and in the demo in Chromium). luma's
  `useProgram` cache sits outside that stack, but it's kept correct by the
  same spy, and luma binds per draw anyway.
- **The frame is `onAfterRender`.** It runs synchronously inside
  `deck.redraw()`, after the layers drew to the default framebuffer, with
  deck's depth still valid. Chain the app's own `onAfterRender` rather than
  replacing it. When deck renders into `Deck._framebuffer` (interleaved
  with a base map), point the replay's `screenFramebuffer` at it.
- **deck renders on demand.** An iframe guest's frame arrives between deck
  frames, so the adapter asks for a redraw (at most one per animation
  frame) when it does. A view is posted only when it changed (camera,
  viewport or time), at most one unanswered, so a still camera with a
  pinned clock settles to no frames at all, and a running clock animates
  at the slower of the two. A same-page guest has no such loop: a live
  clock needs deck's `_animate` or periodic redraws.
- **A first frame can't be re-run, and a still view asks for none.** A
  three.js guest's first frame deletes its shaders after linking, so the
  receiver won't re-run it (see the Cesium findings); with the camera
  still, no new view went out, and the guest vanished after one frame.
  `receiver.canRerun` now tells the adapter to ask again for the same view.
- **A still view can still need a frame.** Sending views only when they
  change left guest-side changes unseen while the camera and clock were
  still (celestiary's DSN feed arriving, a new anchor subscription). The
  guest now posts `layer:invalidate`, and the host re-sends the current
  view with a new `viewId`, still one in flight.
- **The control plane beside NetGL.** celestiary's layer mode (celestiary/
  web#296) handshakes with `layer:hello` and publishes `layer:anchors`; the
  adapter acks the hello (`acceptHello`, default `{accepted: true}`), takes
  it as readiness, and gives anchors an API (`subscribeAnchors`,
  `onAnchors`), in RFC 0001's shapes. Control posts to an iframe guest wait
  until it has said hello or ready: netmap's first subscription went out
  while the iframe was still on `about:blank`, and Chromium dropped it
  ("target origin does not match").
- **three is optional.** A deck host needs no three.js, but the main entry
  imports it at runtime (the three renderer helpers), so a bundle without
  three fails. Hosts import `@pablo-mayrgundter/portal-netgl/core`. The nonce of RFC
  §10.2 isn't built; `viewId` on `netgl:frame-end` (its open question 18)
  is, as an optional field (see "Host reprojection").
- **The camera contract.** deck's globe "common" space is a sphere of 256
  units for 6,370,972 m, with common = k·(e_y, −e_x, e_z). The adapter
  doesn't use those constants (`_GlobeView` is experimental and doesn't
  export them): it measures ECEF → common from `viewport.projectPosition`
  (unit axes, and an altitude step for k), checks that the map is k times
  a proper rotation and that it predicts other points, and returns null
  for any viewport where it doesn't. Then W = V·M = s·[R|t] in doubles; the
  guest gets [R|t] (ECEF metres → eye metres) and P·diag(s, s, s, 1).
  `luma.test.ts` checks the guest's projection against `viewport.project`
  to 1e-6 px and deck's NDC depth to 1e-9.
- **GlobeView becomes Web Mercator above zoom 12.** `getViewportType`
  switches to a `WebMercatorViewport`, which isn't a linear map of ECEF, so
  `globeLayerView` returns null and the guest is skipped. A guest that must
  stay visible up close needs a non-affine view (see open problems).
- **Depth resolution is kilometres.** deck's depth buffer spans the whole
  globe view; at zoom 0.3 a step is ~5 km (z²/near·2⁻²⁴). A guest dot at
  2 km altitude over Brazil tied with deck's land polygons and lost; the
  demo lifts ground markers 20 km. Ground-clamped guest geometry needs a
  depth bias, or a stencil instead of depth.
- **deck's horizon is not depth.** deck hides its own geometry beyond the
  globe's horizon in the shader, so a host ring for a point 2,000 km up,
  past the limb, was clipped while the guest's dot, depth-tested, was
  correctly visible. Host and guest occlusion agree on the globe's disc,
  not above the limb.
- **The Earth model is deck's sphere.** deck places longitude, latitude
  and altitude on a sphere of 6,370,972 m, not WGS84. ECEF positions (an
  orbit, a satellite) align exactly; geographic ones must be converted on
  that sphere (the view carries `earth: { model: 'sphere', radius }`) or
  they land up to ~21 km off.
- **The context.** deck 9.4's is `stencil: false`, `antialias: true`,
  `preserveDrawingBuffer: true`. A stencil-clipped guest would need
  `deviceProps.webgl.stencil: true` (untested).
- **Testing luma on headless-gl.** `webgl2Adapter.attach(gl)` works if the
  context gets a `canvas` (a jsdom canvas will do), and headless-gl's
  WebGL2 answers null for `ACTIVE_UNIFORM_BLOCKS`, which luma's shader
  reflection reads; `luma.test.ts` shims it to 0.

## Host reprojection

netmap's orbits (celestiary's satellites in a cross-origin iframe over
deck's globe) lagged the globe on every pan and zoom. The `?orbits_perf=1`
captures showed why: per composite `lagDraws` was 1 and `lagMs` 100 to
150 ms. When the camera moves, deck draws its globe at the new view at
once, while the guest's frame is still the one rendered for the previous
view; on an M2 the page ran at 9 to 12 fps while zooming, so one frame of
lag was plain to see. Waiting for the guest (lockstep) would cost frame
rate, so the host corrects the guest's frame instead (`reproject: true` on
`attachNetGLDeckLayer`; `reproject` on the receiver and the replay
underneath).

**The correction.** An overlay guest draws in the host's clip space:
clip_f = P_f · V_f · p for p in the view's frame (ECEF metres). The host
sent that view, so it knows VP_f, and it knows its current VP_now. Then
C = VP_now · VP_f⁻¹ gives C · clip_f = VP_now · p exactly, for every p: a
perspective view-projection is an invertible homogeneous 4×4, and C is
linear in clip coordinates, so applied to `gl_Position` before the divide
it gets x, y, depth and clipping all right (clip z is linear in the clip
coordinates too, so the guest still depth-tests correctly against deck's
globe at the new view). Both VPs come from the same encoding
(`globeLayerView`: ECEF metres, rigid V, deck's projection with the scale
put back), so any origin or scale the host folds in cancels. In doubles,
C = P_now · (V_now · V_f⁻¹) · P_f⁻¹, the rigid part inverted as rigid;
the GPU applies it in float32, which `reproject.test.ts` puts well under
a hundredth of a pixel for a pan and zoom.

**Applying it generically.** The replay rewrites each vertex shader as
its `shaderSource` replays (the type comes from the `createShader` it
tracked): the guest's `main` (definition and any prototype) is renamed
`netgl_main`, and appended after everything else, so `#version`,
`#extension`, `precision` and preprocessor branches stay put:

    uniform highp mat4 netgl_reproject;
    void main() { netgl_main(); gl_Position = netgl_reproject * gl_Position; }

(highp explicitly: a shader with `precision mediump float` would otherwise
get C at half precision on a phone.) Fragment shaders are untouched. After
compiling a rewritten shader the replay checks its compile status once and,
if the rewrite broke it, compiles the guest's own source instead. The
uniform's location is looked up at the program's first draw after each
link (a link resets uniforms) and the matrix is set, before a draw, only
when the program doesn't hold the one that draw needs: C for draws to the
screen, the identity for the guest's own framebuffers. The guest's
introspection runs on its shadow context against its own shader, and an
extra uniform moves no attribute or uniform of its own.

**Which view a frame was for.** `netgl:frame-end` now carries an optional
`viewId` (`endFrame({ viewId })`; the three.js overlay guest sends it), the
open problem "view-tagged frames". Without it the adapter takes the view
in flight when the frame-end arrived: it never has more than one out, and
celestiary's guest draws exactly one frame per view. The receiver notes the
view on each frame-end, keeps where each frame starts in a concatenated
batch, and asks for the frame's correction before its first call, so two
frames drained at once each get their own, and a re-run of the last frame
is corrected for the view of the deck frame it's re-run in. That re-run is
the case that matters most: while the camera moves and the guest is slower
than deck, every deck frame re-runs the last guest frame, and now each one
lands at deck's view.

**Checked in a browser.** `apps/host-netgl-deck` (`?reproject=0` turns it
off) in headless Chromium on SwiftShader, 800×500, its three.js guest in a
cross-site iframe, the clock pinned: after a settled frame at one view, the
camera moved 4° and 2° and 0.3 zoom and deck drew once, re-running the
guest's old frame. Corrected, that composite was pixel-identical to the
guest's own frame for the new view once it landed (0 pixels differed); with
the correction forced off, 2,837 pixels differed and the guest's pixels
overlapped the truth's not at all (several dots hid behind the globe's
depth at their old positions).

**Screen-space shaders opt in.** Wrapping corrects the shader's final
`gl_Position`, so a vertex the shader moved by a pixel offset in the old
clip space (a wide line's quad, a clip-space sprite) has the offset
transformed too: under a zoom the line gets wider during the lag, and its
quad isn't quite where the line is (the user saw it on the M2: the
satellites co-moved with the globe and the DSN's line glyphs lagged
slightly). Only the shader knows which of its clip positions are the
view's and which are offsets, so the fix is a convention, not a smarter
rewrite: a vertex shader that declares `uniform mat4 netgl_reproject;`
isn't wrapped, the replay looks the uniform up and sets it before draws as
for a wrapped one, and the shader multiplies each clip position it derives
from the view by it before extruding. The guest gives the uniform the
identity itself (three's `Matrix4()`), so the shader is unchanged standalone
and on hosts that don't reproject; a reprojecting host records the guest's
own lookups of the name (`getUniformLocation`) and drops its sets of it, so
three's one upload of the identity can't overwrite C. `luma.test.ts` draws a
6 px wide line for one view, composes it at another (a pan and a zoom in)
and compares it with the guest's own frame for that view: opted in, 0 of
202 pixels differ; wrapped, 25 do and the line is a pixel wider.

**A resize or a pixel-ratio change** (0.6.5). C is clip space; the
pixels a frame lands on are its `gl.viewport`, which the guest set from
the view it drew for (`view.viewport`, in the host's drawing-buffer pixels
at send time). netmap's `?movedpr=1` drops deck to `useDevicePixels: 1`
while the camera moves (the M2's ratio is 2) and back 180 ms after it
stops, so the drawing buffer halves during a move; the guest's frames for
the old, bigger view (and the re-runs of the last one) replayed their
2W×2H viewport into the W×H buffer, drawn twice the size from the
bottom-left corner: the satellites "jumped far off the globe during the
move, then landed back". A window resize with the layer on did the same
for a frame or two. Now, when the view a frame was drawn for (by `viewId`,
as for C) has another viewport than deck's now, the adapter tells the
replay (`setViewportRemap({ from, to })`, through the receiver's
`reproject.viewport`) and each of the frame's screen viewport and scissor
rects is mapped by the scale (to.w/from.w, to.h/from.h) and offset that
take `from` onto `to`, edges rounded, before any door-fit remap sees it.
That is the same seam as door-fit and goes through the same rules: rects
for the guest's own framebuffers pass through (as C is the identity
there), and a bind back to the screen re-issues the viewport mapped. When
the mapping changes between two frames of a batch, the replay issues the
screen viewport and scissor again before the next frame's first call, so a
frame whose state cache sends no viewport is mapped too. With the same
viewport nothing is mapped and the calls are exactly 0.6.4's. It needs the
frame-to-view mapping, so only with `reproject`. On headless-gl
(`luma.test.ts`) a quad drawn for a 2× view and composed into a 1× buffer
is pixel-identical to the guest's own 1× frame (0 of 1,385 pixels differ;
unmapped, 1,215 differ and its box runs off the top-right), with a pan as
well (0 of 1,362), and a 1× frame into a 2× buffer (0 of 5,720); rasterising
the same clip coordinates in the same viewport gives the same pixels.
`stats.remappedFrames` counts them and `lastReprojection.viewport` names
the two rects.

**Pixel sizes after a pixel-ratio change** (0.6.7). The remap places a
lagging frame right, but a point's `gl_PointSize` is in framebuffer
pixels: on the M2 under `?movedpr=1` the satellites doubled in size for
the frames before the guest's own landed. The scale a pixel size needs is
the change of pixel ratio, s = to.pixelRatio / from.pixelRatio (the views
carry it), not the viewport's: on a plain resize the ratio is unchanged
and a point's pixels are already right, so s is 1 there. The adapter
gives the receiver s per frame, by `viewId` as for C (`reproject.pixelScale`
→ `replay.setPixelScale`); it is 1 with no frame view and for draws into
the guest's own framebuffers. A wrapped shader that writes `gl_PointSize`
(an assignment outside comments) also declares `uniform highp float
netgl_pixelScale` and does `gl_PointSize *= netgl_pixelScale` after
`netgl_main()`; one that doesn't is wrapped byte for byte as in 0.6.5, so
an unwritten `gl_PointSize` is never read. The uniform is looked up only
for programs whose shader has it and set lazily as C is, so same-size
frames make 0.6.5's calls, plus one `uniform1f(…, 1)` per point program
after each link (a link resets uniforms to 0, which would hide the
points). On headless-gl (`luma.test.ts`) three 6 px points drawn for a 2×
view and composed into a 1× buffer are pixel-identical to the guest's own
1× frame (108 pixels, 0 differ); unscaled (0.6.5) they cover 432 and 324
differ. 1× into 2× with a pan: 432 and 432. A resize at ratio 1: s is
null and 0 differ.

**What a wide line needs.** A screen-space line (celestiary's
`wideLines.js`, opted in) computes its offset in clip space from its own
resolution uniform (the viewport, in device pixels) and a width in CSS
pixels times its pixel ratio: offset_ndc = w_css · pr_f / (½ W_f), with
W_f = S_f · pr_f for a canvas S_f CSS pixels wide. The remap draws NDC into
the composed viewport W_t = S_t · pr_t, so the line comes out
w_css · pr_f · W_t / W_f = w_css · pr_t · S_t / S_f device pixels wide,
against the wanted w_css · pr_t:
- a pixel-ratio change (S_t = S_f): the offset is the same fraction of
  the viewport at either ratio, and the composed width is exactly
  w_css · pr_t. Right already, with no scale.
- a resize (pr_t = pr_f): the width is scaled by S_t / S_f, per axis
  (an aspect change also skews its direction, computed in the old
  viewport's pixels).

So a line needs the viewport's change as well as the ratio's: an opted-in
shader may declare `uniform vec2 netgl_viewportScale` (to.w / from.w,
to.h / from.h, the remap's scale; (1, 1) without one) beside
`uniform float netgl_pixelScale`, and uses both, its resolution times the
first and its pixel sizes times the second; it then computes exactly what
it would for the composed view, direction and antialiasing edge included.
The replay looks up only what the shader declares, sets each lazily (1 and
(1, 1) into the guest's own framebuffers) and drops the guest's own sets of
both, as for `netgl_reproject`. On headless-gl a 4 px opted-in line, 2× into
1×: 164 pixels and 0 differ, with the scales or without (as derived);
after a 64×48 → 96×72 resize, with them 0 differ, without them 237 pixels
against 164 and 7 px across against 5. `reprojectStats.scaledDraws` counts
the screen draws made with a scale other than 1, and
`lastReprojection.pixelScale` names s.

**Limits.**
- Only the position is corrected, unless the shader opts in (above).
  Screen-space extrusion done in a wrapped vertex shader against the old
  view (wide lines, clip-space sprites, labels) is scaled slightly by C
  during the lag; point sizes are pixels and are unaffected by C
  (celestiary's satellites are points). Choices the
  guest made from the old eye stay (celestiary culls far-side dishes by
  the old view), and objects moving in time aren't moved: C is the
  camera's change only.
- Depth written in the fragment shader (`gl_FragDepth`, logarithmic depth)
  isn't corrected. celestiary's layer page uses three's default depth.
- After a resize or a pixel-ratio change, a pixel size computed other than
  by `gl_PointSize` in a wrapped shader, or by an opted-in shader through
  `netgl_pixelScale` and `netgl_viewportScale`, stays the frame's (`gl.lineWidth`,
  a wrapped shader's own clip-space extrusion). `gl.blitFramebuffer` and
  `readPixels` rects aren't mapped either.
- A guest that composites a full-screen pass to the screen would have its
  quad moved and its offscreen image left as it was: leave `reproject` off.
- The "hide this vertex" idiom (`gl_Position = vec4(2.0, 2.0, 2.0, 1.0)`)
  is a homogeneous point too, and a large C could bring it on screen, so
  the wrapper leaves alone a vertex in front of the camera (w > 0) and
  outside the old clip volume on all three axes. A real vertex there is
  clipped in the old frame anyway; one of a line or triangle crossing in
  from that corner keeps its old position.
- A compile check per rewritten vertex shader is one synchronous query at
  set-up, not per frame.

## Cross-origin iframes

The deck demo runs its guest on another origin three ways: two ports
(cross-origin, same site), `localhost` vs `127.0.0.1` (cross-site, which
Chromium puts in another process, as celestiary.org inside github.io
would be), and a sandboxed iframe without `allow-same-origin` (an opaque
origin, `'null'`, which is how the GitHub Pages preview shows it). The
NetGL stream itself crossed unchanged: calls, typed arrays and the ready
handshake are all structured-clonable, and the guest renders on the
host's `layer:view` messages with no requestAnimationFrame of its own,
which Chromium may throttle in a cross-origin frame it considers hidden.

**What was unsafe, and is fixed:**

- **`targetOrigin: '*'`.** Every guest and host posted with `'*'`. A host
  whose iframe navigated to another origin would keep sending it views;
  a guest whose parent navigated would keep streaming its GL calls (with
  any data in them) to the new page. `iframeTransport(iframe, { origin })`
  and `parentTransport({ hostOrigins })` post with the peer's exact
  origin, so the browser drops the message instead.
- **No `event.origin` check.** The only inbound check was `event.source`.
  That isn't enough: an iframe's `contentWindow`, and a guest's `parent`,
  is the same WindowProxy after the frame navigates, so a hostile page
  loaded into it passes. Both transports now check `event.origin` against
  an allow-list as well. The allow-list must be the app's own constant,
  never read from the guest's URL (any page could frame it with
  `?host=itself`). `windowTransport` refuses `'*'` in it, malformed
  origins, and `'null'` without a source filter (every sandboxed frame is
  `'null'`).
- **Whole buffers on the wire.** A typed-array argument shipped its whole
  underlying `ArrayBuffer`, so a uniform upload from a view into a WASM
  heap or a framework's scratch pool cloned all of it to the host: wasted
  copying, and the guest's memory handed to another origin. The recorder
  now ships only a partial view's own bytes.
- **Dispatch by any name.** The replay calls `receiver[call.name]`, and
  `Object.prototype`'s methods (`constructor`, `__defineGetter__`, ...)
  were reachable that way. They're refused now; so is a typed-array name
  that isn't own data on the constructor table.

In the browser (`apps/host-netgl-deck`): a host origin not on the guest's
list gets nothing (the guest refuses to start); a second frame, of another
origin, posting NetGL into an allowed host is dropped by the source check.

**What remains unsafe** (for the NetGL RFC):

- **Guest GL runs in the host's context, unsandboxed.** A cross-origin
  guest is still fully trusted with the host's GPU:
  - resource exhaustion (allocations, huge textures) and shaders that
    never finish, which lose the host's context (deck doesn't recover
    from that);
  - drawing anywhere on the host's canvas: without a screen policy the
    guest can cover or clear the host's pixels;
  - reading the host's framebuffer on the GPU (`copyTexImage2D`,
    `blitFramebuffer` from the default framebuffer, or sampling it after a
    copy) into its own textures. Nothing flows back over the wire, but
    the guest sees when the host's next view arrives, so a shader whose
    cost depends on host pixels is a timing side channel out of the host's
    page (e.g. map tiles the host drew, or anything else on its canvas).
  The cheap checks `docs/portal-layers.md` proposes (an entry-point
  allow-list, no host-framebuffer reads, per-frame budgets, shader length
  limits) are not built.
- **Opaque-origin guests need `'*'` outbound.** A sandboxed guest can't be
  targeted by origin, so host → guest messages go with `'*'` and inbound
  ones are accepted from that frame's window only. If the sandboxed frame
  navigates itself, the next views go to the new page. Views carry only
  camera, viewport and time, but nothing private should ride them.
- **No handshake beyond origin.** There's no nonce or capability: any
  page on an allowed origin can drive the guest, and any page on the
  guest's origin loaded into that frame can feed the host GL. Origin is
  the whole trust boundary.
- **Process and thread.** A cross-site guest runs in another renderer
  process in Chromium (site isolation), not on the host's main thread as
  the Cesium findings assume. Messages cross processes, so each guest
  frame costs serialisation on both sides plus IPC; the flow control (one
  view in flight) still holds. Per message, that cost was the whole
  story under wire 1 (see "Wire protocol" below); it isn't measured on a
  real GPU yet.
- **Frames aren't tagged with their view.** `netgl:frame-end` carries no
  view id, so the host can't tell which view a frame was drawn for, and
  can't compose it pose-tagged (docs/portal-layers.md). While the camera
  moves, an iframe guest lags the host by about a frame.
- **Embedding policy is the guest's deploy.** The guest's origin must
  allow being framed by the host (CSP `frame-ancestors`, no
  `X-Frame-Options: DENY`). A host with COEP `require-corp` needs the
  guest to send CORP / COEP headers. A sandboxed guest's module scripts
  load in CORS mode, so its host must send `Access-Control-Allow-Origin`
  (GitHub Pages does). The guest's storage is partitioned under the
  host's site, so its caches (IndexedDB, Cache API) start cold in each
  embedding host.
- **Tainted images can't cross.** An `ImageBitmap` that isn't
  origin-clean (from a cross-origin image fetched without CORS) can't be
  serialised (`DataCloneError` from `postMessage`), and an image element
  goes through a 2D canvas whose `getImageData` throws when tainted. Not a
  hole: a guest that uploads such images fails embedded even where WebGL
  would have refused them anyway. Its images must be CORS-enabled.

## Wire protocol

### Versions

- **Wire 1** (0.5.0 and before): one `postMessage` per GL call and per
  `netgl:frame-end`, everything structured-cloned.
- **Wire 2** (0.6.0): a frame's stream items in one `netgl:batch`, over a
  `MessageChannel` port where the host can hand one out, with only the
  bytes each call reads, and the recorder's copies transferred.

Negotiation rides the existing ready handshake, so mixed versions
negotiate down and nothing new is needed to start:

| guest → host | host → guest |
|---|---|
| `netgl:ready {anchor, background, wire: 2, port: 'stream' \| 'all', seq, session}` | `netgl:ready-ack {wire: min(2, guest's), seq, port?}` (the port transferred) |
| first port message: `netgl:port {seq, after}` | |

- A guest batches only after an ack that says `wire: 2`. A 0.5 host acks
  without it, so a 0.6 guest talks wire 1 there. A 0.6 host reads a 0.5
  guest's per-call messages as before. The same-page link
  (`makeNetGLImmediateLink`) acks without a version, so its calls still
  replay the moment they're recorded: zero lag, no copies.
- `seq` is how many stream items the guest had posted on the window when
  it sent that ready; `session` is random per page load, so a repeated
  announcement (sent before the ack landed) gets an ack without a second
  port, and a reload gets a new one.

### Batches

`{ type: 'netgl:batch', batch: [items...] }`, where an item is a
`NetGLCall` or a `netgl:frame-end`. The guest context queues every item
once wire 2 is agreed and posts the queue at each `endFrame()` /
`subFrame()`, so a batch is: the checkpoint the last frame-end queued,
any calls made between frames (async uploads), the frame's calls, its
frame-end. The receiver hands each item to the same code a lone message
went to, so every buffering rule above holds unchanged: frames concatenate
between drains, a stale frame re-runs without uploads or handle-minting
calls, a frame that deleted anything is never re-run, `onFrame` fires per
frame-end (a batch with several sub-frames fires several times).

What changes for the guest is lifetime: a queued call outlives the GL call
that made it, and frameworks reuse scratch typed arrays (three.js's
uniform uploads), so a held reference would ship the last values written.
In wire 2 the recorder therefore copies every typed-array and ArrayBuffer
argument when the call is recorded (`session.snapshot`), as the immediate
link's closed path clones. The one argument it can't copy is an app's
`ImageBitmap`, which the app may `close()` right after the upload: that
call is posted at once, in a batch of its own (the recorder flags it
`urgent`).

### The port

Each window message costs its receiver a fixed price whatever its size
(below), and window messages to another process are routed through the
browser; a `MessageChannel` is a direct pipe between the two renderers.
On a wire-2 `netgl:ready` that asks for a port, the host creates a channel
and transfers `port2` in the ack, posted with the guest's exact origin
(`iframeTransport`'s `outputOrigin`). It never offers one with `'*'` (a
sandboxed, opaque-origin guest, or a plain `windowTransport`): the port
would go to whatever document is in the frame. Messages on the port need
no origin check; only the verified origin ever held it.

Ordering across the switch. Window messages and port messages are two
queues, and nothing orders one against the other: calls the guest posted
on the window just before it switched can arrive after its first batch on
the port. The guest's first port message, `netgl:port {seq, after}`, says
how many window items precede the switch; the host counts items it has
read on the window since the ready numbered `seq`, and holds port messages
until it has them all. Host to guest needs no count: a guest that asked
for `'all'` gets the host's control over the port, and the host holds its
own posts between offering the port and seeing it open (1 s, then the
window), so none overtakes another.

`'stream'` (the default) is for guests whose app listens on its own
transport, as celestiary's layer page does: their stream and whatever
they post through `guest.transport` go over the port, and the host keeps
posting its views on the window. `'all'` is for guests that listen
through `guest.transport` (the three.js overlay guest).

### Slices and transfer

The recorder ships only what a call reads (`trimSource`):

- WebGL2's source-offset overloads become their plain form over the
  referenced elements: `bufferData` / `bufferSubData` with `srcOffset` and
  `length`, the `compressedTex*` uploads with `srcOffset` and
  `srcLengthOverride`, `uniform*v` / `uniformMatrix*fv` with `srcOffset`
  and `srcLength`, `tex(Sub)Image2D/3D` with `srcOffset`.
- Uncompressed texture uploads from a typed array are cut after the last
  byte they read, from the dimensions, format, type and the unpack state
  (`UNPACK_ALIGNMENT`, `ROW_LENGTH`, `IMAGE_HEIGHT`, the skips), which the
  recorder reads once from the shadow and then follows through
  `pixelStorei`.
- `vertexAttrib*v` keeps the 1 to 4 elements it reads.
- An offset or length out of range is left as it was, so the receiver
  rejects the same call the shadow did.

Every buffer the recorder makes for a call (a slice, a snapshot copy, the
pixels read from a DOM image) is listed with it, and the guest transfers
it rather than cloning it. The app's own buffers are never transferred
(they would be detached under the app); in wire 1 a whole-array argument
is still cloned at post time, as before.

### Findings (celestiary's orbits in a deck.gl globe, portal #39 Q29)

Measured with the light deck.gl host of the orbits perf harness:
celestiary's layer page (satellites, Starlink, Iridium, DSN) as a
cross-site iframe, an 800×500 viewport, a 4 Hz clock, 15 s at rest and 15
s of mouse drag, headless Chromium on SwiftShader, on a shared 4-core
machine (load ~10, so absolute times are inflated; compare within a row).
"Before" is portal-netgl 0.5.0 on the host with the guest on 0.3.0 (wire
1); "after" is 0.6.0 on both.

Two runs of each; ranges are the two medians.

| | before | after, clock calls `deck.redraw()` | after, clock calls `requestGuestFrame()` |
|---|---|---|---|
| messages per guest frame | 187–188 | 1 | 1 |
| KB per guest frame | 494 | 51 | 51 |
| host deserialisation, ms per frame | 210–237 | 0.2 | 0.2 |
| host main thread, ms/s at rest | 820–868 | 36–54 | 57–67 |
| host main thread, ms/s dragging | 716–911 | 55–72 | 66–115 |
| view → shown, ms at rest | 257–312 | 124–214 | 21–23 |
| input → shown, ms dragging | 445–906 | 419–474 | 241–262 |
| deck draws per guest frame, at rest | 1.9–2.0 | 2.0–2.2 | 1.0 |
| deck draws per guest frame, dragging | 2.7–2.9 | 1.9 | 0.8–1.0 |

(The host main thread at rest is a little higher with `requestGuestFrame`
because the guest delivers more frames per second in the same window.)

- **The per-message cost was the whole problem.** A wire-1 frame was ~187
  messages (one per call, plus ~80 for the checkpoint), each about a
  millisecond to deserialise on the host's main thread whatever its size:
  ~240 ms of deserialisation per guest frame, the host main thread busy
  80–99% of the time. One message per frame takes that to under half a
  millisecond.
- **Slices.** three.js asks for ranged uploads (`updateRanges` →
  `bufferSubData(target, dst, src, srcOffset, count)`), but the recorder
  shipped `src` whole. Trimming took a frame from ~494 KB to ~51 KB with
  no change in the guest.
- **Draws per guest frame.** With the host's clock calling `deck.redraw()`
  each tick, deck draws twice per guest frame at rest: once for the tick
  (the guest's last frame re-run) and once when the new frame lands.
  Folding the adapter's redraw into one already done doesn't change that
  at rest; `requestGuestFrame()` does, by not drawing for the tick at all.
- **Still open:** the guest's own frame cost (its render, and the shadow
  context drawing everything a second time) is now most of input →
  shown on SwiftShader; the shadow's part is the next bullet.
- **The shadow's share, measured (0.6.2).** celestiary's orbits guest
  (satellites, Starlink, Iridium, the DSN: 117 calls, ~12 KB a frame) in
  celestiary's two-origin check host, on SwiftShader, where a frame's wall
  clock to a 1-pixel `readPixels` stands in for GPU time, each context
  timed with the other idle: the shadow's draws took 10.2 ms at 1280×720
  and 11 ms at 2560×1440 (0.8 ms with them skipped), the host's replay of
  the same draws 11 ms and 19 ms (0.9–1.1 ms with its draws skipped). So
  the shadow was a third to a half of the overlay's GPU work, and
  `shadowDraws: false` takes it out. On a real GPU it's unproven: an
  Apple M2 A/B on netmap gave inconsistent medians run to run.

**On a real GPU (Apple M2, ANGLE Metal, Chrome 151, DPR 1.8; netmap's
`?orbits_perf=1` on netmap#8, 0.6.0 on the host, production celestiary on
wire 1, ~505 KB and 187 messages a frame).** The guest answered a view in
15.5 ms (median), yet a camera move took ~166 ms to show it, and the guest
content drawn while moving was one deck draw, ~152 ms, behind. It looked
like the adapter folding away the redraw a new frame needs (only 38 of
600 draws were the adapter's), but the capture says otherwise:

- **The browser gave no animation frame for ~150 ms after a composite.**
  Each draw was followed by a long animation frame of 140–170 ms with no
  script over 5 ms and ~2 ms of rendering; the wheel events, which
  Chromium aligns to frames, came exactly 150.0 or 166.7 ms apart (9 or
  10 vsyncs); and of the adapter's own redraws for a frame that landed
  within 25 ms of a draw, with no input pending, 6 of 8 ran 95–170 ms
  later when that draw had replayed a new guest frame, and 5 of 8 ran 2–6
  ms later when it had only re-run one (no uploads). The redraw was
  queued and ran at the next animation
  frame; the next one came late, and deck's input draw took it first
  (so the adapter's was folded, correctly). That is back-pressure from
  the GPU process, not the host's main thread (16.6% busy, deck's draw
  1 ms of CPU). The suspect is the 32 `bufferSubData` calls a frame
  (~500 KB, the old guest's unsliced uploads) into buffers the GPU may
  still be reading; wire 2's slices take a frame to ~51 KB, so the next
  capture should be against a guest on 0.6.x.
- **A real fold bug, found on the way (0.6.1).** A request made while
  one was already queued didn't restart the fold window: if deck drew in
  between (a host's `deck.redraw()` from a timer, a draw outside the
  animation frame), a guest frame landing after that draw was folded into
  it and waited for the next draw of any kind. Now each request restarts
  the window, and only a draw after the latest request folds it; still one
  queued redraw, at most one draw a frame (`luma-control.test.ts`, "a
  frame that lands after a draw ...").

## Celestiary × Cesium: the plan

*Shipped.* Celestiary's Earth, Moon and Mars layers (celestiary/web
#77–#85; its `CESIUM.md` is the app-side record) follow this plan, and
the lessons are in the next section.

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
   here. `makeNetGLImmediateLink` (0.2.0) is that in-process transport:
   `link.frame(() => widget.render())` replays each call into the host
   context as it is recorded — no clone, no latency — and clones + queues
   whatever the guest records between frames (its checkpoint, async
   uploads), flushing it at the start of the next frame. Built for
   celestiary's Cesium Earth layer (celestiary/web CESIUM.md).

## Lessons from celestiary's Cesium layers

These are from the first production host. Celestiary's Cesium layers
(celestiary/web #77–#85) put Cesium's Earth, Moon and Mars in place of
celestiary's own bodies, on the same page, with `makeNetGLImmediateLink`.
Most of the work was not the transport. It was agreeing, between two
renderers that each think they own the frame, on depth, alpha, colour,
camera and time. The lessons generalise to any in-place guest.
[`docs/portal-layers.md`](../../docs/portal-layers.md) designs a shim
library around them.

### What held up

- **Same page beats an iframe for in-place composition.**
  `link.frame(() => widget.render())` renders the guest synchronously,
  inside the host's frame, from the host's camera. There's zero lag, so
  the guest never slides against its stencil. The iframe path's
  pose-ahead flow control is only needed across a thread boundary.
- **The stencil decides visibility; depth doesn't have to agree.**
  Cesium uses log depth over several frusta, and celestiary uses one
  24-bit frustum spanning a galaxy. The host draws a body-shaped shell
  into stencil, depth-tested against its own scene, and the guest's
  screen draws are clipped to it. Occlusion works both ways (Phobos in
  front of Mars, the Moon behind the Earth) with no shared depth
  convention.
- **`screenFramebuffer` into the host's offscreen target.** Celestiary
  renders into `_sceneRT` and composites a post-pass (atmosphere) from
  it. The guest's default framebuffer maps onto that target, which
  needs a depth-*stencil* attachment. Compositing straight to the screen
  would have skipped the host's post-processing.
- **One widget, one link per body, drawn far to near.** Several guests
  (the Earth and the Moon on screen together) each get their own shadow
  context and link. The host clears stencil between them and draws them
  far to near, because a guest's own pixels carry no depth the next one
  can test against.

### What the host had to add around the guest's frame

- **The guest clears the host's depth.** Cesium's frame clears the whole
  depth buffer. That's legal under the `depth-only` clear policy, which
  confines clears to the remapped viewport, and in place the viewport is
  the whole screen. Celestiary saves its depth before the guest frames
  (a depth blit to a twin depth-stencil target) and restores it after
  each one.
- **The guest leaves no usable depth for later passes.** Post-passes that
  read depth need it: the atmosphere's ray end and ground-vs-sky test,
  and labels depth-tested over the haze. So after the guest frames the
  host writes a proxy: each body's sphere, depth-only and depth-tested.
  A proxy exactly at the surface then ties with anything placed on it.
  Body labels had to sit at 1.1 radii toward the eye, not 1, or they
  z-fought the sphere.
- **`renderer.resetState()` after the guest unbinds the host's target.**
  Rebind `_sceneRT` before drawing anything else into it (as in the
  three.js-guest finding above, from the host's side).
- **Alpha must be coverage.** A `premultiplied-over` screen policy is
  only right if the guest's final alpha means coverage. Cesium's OIT
  composite sets alpha to 1 on every non-background pixel. The faint
  upper sky (alpha ≈ 0.01) then went opaque and blacked out the host's
  stars. The fix is guest-side: `orderIndependentTranslucency: false`.
  Audit a guest's post-process passes for this before trusting its
  alpha.

### Coupling two renderers

- **Set the guest's camera directly.** Cesium's `camera.setView`
  round-trips direction and up through heading, pitch and roll. Near
  pitch −90° (looking at a body's centre) that turned the camera ~5°,
  and the guest's Moon sat 65 px off the stencil. Setting position,
  direction, up and right directly put both centres on the same pixel.
  Do the frame conversion in JS doubles, and check handedness with a
  known point.
- **Sphere vs ellipsoid.** The host's bodies are spheres and the guest's
  are ellipsoids. Keep the camera on the same ray from the body's centre,
  at the same height over each shape. Matching latitude, longitude and
  altitude instead was ~16 km off on the Earth and Mars.
- **Guest defaults assume the guest owns the scene.**
  - Cesium's far plane (5e8 m) clipped the Earth beyond ~80 radii.
  - Its tile optimisations (`foveatedScreenSpaceError`,
    `cullRequestsWhileMoving`) wait for a still camera. The host's
    bodies turn under its camera, so that never came.
  - `Ellipsoid.default` is a library global, so it's set per body
    before each render.
  - The sun, moon, skybox and inputs are off: everything but the body
    is the host's job.
- **Light and colour must match, or the seam shows.** Cesium's light
  follows the host's Sun direction, so the terminators agree. That
  wasn't enough. Cesium decodes imagery to linear, lights it and
  sRGB-encodes the result, while celestiary lights the stored sRGB
  values and tone-maps them straight to screen. The guest's night side
  and terminator came out lifted and its day side dimmed.
  - Found only by comparing both renders of the same view at quarter
    phase. Mars had been compared near full, where the two pipelines
    nearly agree.
  - Fixed with a guest shader that lights in the host's space and
    pre-compensates Cesium's encode. Mars then matched to 0.99×.
  - Separately, ion's copy of the Moon mosaic is stored at 0.82× the
    brightness of NASA Trek's; measure it rather than assume.
- **Same source data on both sides.** A swap between the host's and the
  guest's rendering of a body only goes unnoticed if both draw the same
  imagery. Celestiary's Mars and Moon textures were rebuilt from the
  mosaics Cesium serves (Viking MDIM2.1, LRO WAC), then gain-matched.

### Loading and handover

- **Guests load data from their render loop.** Cesium requests tiles
  for the view it renders, so there's nothing to prefetch. The layer
  loads when a body is targeted, not when it comes into range. In range,
  it first renders *unseen* (no stencil, so nothing reaches the screen)
  until its tiles report loaded. That costs the shadow draw plus the
  replay per frame.
- **Crossfade, don't pop.** The host redraws its own surface over the
  guest's frame for a second, fading out, and fades its atmosphere pass
  against the guest's sky. A hard swap was visible even with matched
  textures.

### Testing

- Headless Chromium on SwiftShader reproduced every compositing bug
  above.
  - An ion token restricted by Referer works from Playwright if ion
    requests are fetched from Node (`route.fetch` with the Referer
    header) and fulfilled with CORS headers.
  - SwiftShader flips `gl_PointCoord` in point shaders that `discard` or
    sample a depth texture. Use depth state instead.
- Pixel statistics caught what eyeballing didn't: the median ratio of
  host and guest renders over the lit disc, and brightness profiles
  across the terminator.

## Nested guests: Cesium drawing New York

A guest drawn by a guest. The chain in progress:

- **celestiary**, the three.js host;
- **Cesium**, a NetGL guest of celestiary on the same page
  (`makeNetGLImmediateLink`, as in the lessons above);
- **New York**, slop-newyork's three.js city, a NetGL guest that Cesium
  draws into its own frame, standing on its terrain.

Cesium draws it through `scene.externalRenderers`, a hook added in the
celestiary fork of Cesium (celestiary/cesium, branch
`celestiary/external-render-pass`). The scene calls each renderer once per
depth frustum its bounds overlap, after the frustum's opaque geometry and
before its translucent geometry. Cesium's pass framebuffer is bound, and
its depth holds the globe. In the callback, New York's link replays into
Cesium's own context: `makeNetGLImmediateLink({ gl: scene.context._gl,
replay: { screenFramebuffer: () => currentFb, screen: { clear: 'none' } }
})`. So far this has run two levels deep, Cesium on its own page drawing
New York (a scratch demo, depth-composited with the terrain and with
Cesium boxes in front of and behind the city). The three-level chain
hasn't run end to end.

What it took, or will:

- **In place inside the host's frame means no clears.** Cesium's
  contract for an external renderer is to draw into the bound
  framebuffer, test and write depth, and not clear. It should also leave
  stencil alone, because Cesium keeps classification bits there.
  - `'depth-only'` drops the colour clear but keeps the depth clear,
    which wipes the globe the city must test against. Hence
    `clear: 'none'`.
  - three's `autoClear = false` does the same for one framework's main
    pass; the policy does it for any guest.
  - Clears of the guest's own render targets still run, as under every
    mode.
- **The screen is the host's pass target.** The callback is given the
  framebuffer of the pass (Cesium's scene FBO, or null for the canvas).
  `screenFramebuffer` resolves on every bind, so `() => currentFb`, set
  from the callback's `framebuffer`, follows it if a pass changes it.
- **One draw per frustum: sub-frames.** With log depth off, a frame can
  have 2–3 frustums, each with its own projection, and Cesium clears
  depth between them. Each callback is one sub-frame (see
  [Sub-frames](#sub-frames)). Cesium changes nearly all state between
  them, so each needs the full checkpoint. Per-frame work (animation,
  the sun) runs once per Cesium frame; the demo keys it on the
  callback's `frameNumber`.
- **Depth must agree here, unlike in celestiary's layers.** There the
  stencil decides visibility and the two depth conventions never meet.
  Inside Cesium's frame the city tests against the globe's depth, so it
  must write depth Cesium's way.
  - With log depth on, Cesium writes `gl_FragDepth = log2(w − near + 1) /
    log2(far − near + 1)`. The demo sets that as every material's depth
    node, from the `near` and `oneOverLog2FarDepthFromNearPlusOne` the
    callback passes.
  - With log depth off, the frustum's projection gives standard depth.
- **The guest's output pass must not leave the bound framebuffer.**
  three's WebGPURenderer (on its WebGL backend) renders into an internal
  target whenever it tone-maps or converts colour space at output, then
  copies the result over the whole screen with no depth. The city
  outputs linear with no tone mapping instead, and each material encodes
  sRGB itself.
- **Handles compose.** In the full chain, `scene.context._gl` is Cesium's
  recorder, not a raw context.
  - New York's replay creates its objects through that recorder, which
    interns them as it does Cesium's own.
  - Cesium's trackers see New York's state calls, and Cesium's
    `resetState()` after each callback goes through the same recorder.
    Cesium's checkpoint therefore stays right without knowing a guest
    ran.
- **Each level multiplies the cost of a call.** A New York call runs on
  New York's shadow, is replayed into Cesium's recorder, runs on
  Cesium's shadow, and is replayed into celestiary's context. That's
  three GL executions, two encode-decode passes, and two trackers' worth
  of observing, for every draw and every checkpoint call. Two open
  problems below gain weight: the no-draw shadow, and keeping
  checkpoints to sub-frames that need them.
- **Open: a stencil policy that only forbids writes.** The `stencil`
  option tests EQUAL `ref` for a portal mask. Inside Cesium's frame there
  is no mask, but the guest must not write stencil. three doesn't unless
  a material asks, so nothing enforces it yet.

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

**No-draw shadow (`shadowDraws: false`, 0.6.2).** Step 1 can skip the
calls that only write pixels: `drawArrays`, `drawElements`, their
instanced and range forms, `clear`, `clearBuffer*` and `blitFramebuffer`.
They are still encoded and posted, so the stream is the same call for
call; everything else (state, uploads, `copyTexImage2D`, which defines a
texture level, handle minting, queries) still runs on the shadow, so the
framework's synchronous answers don't change and the checkpoint is built
as before. The cost is the shadow's pixels: they are no longer the
guest's frame, so client-memory readback (`readPixels`, picking,
`getBufferSubData` after transform feedback, occlusion query results)
answers nothing meaningful, and draw-time GL errors (an incomplete
framebuffer at a draw) aren't raised on the shadow. Default true; Cesium
guests keep it, since they pick. `shadow-draws.test.ts` checks the host's
pixels are byte-equal either way and the shadow stays undrawn.

The replay reverses the encoding and re-executes against the host's
context. The host owns when to drain: the sender emits a `NetGLFrameEnd`
marker after each frame; the host buffers calls between markers and drains
the latest batch in one atomic block right after its own stencil-mask
paint + clearDepth. This is the protocol that prevents host renders and
embedded renders from interleaving on the shared GL context.

## Adoption surfaces

Framework-agnostic building blocks (new, and what 1.0 shims build on):

- **`makeNetGLGuestContext({ canvas?, transport?, shadowDraws? })`** — shadow context,
  recorder, `endFrame()` (frame-end + checkpoint), `subFrame()` (frame-end,
  checkpoint deferred to the next call), `announce()`.
- **`makeNetGLCesiumGuest()`** — the Cesium shim: `contextOptions` to pass
  to the Viewer / CesiumWidget, `attach(scene)`.
- **`makeNetGLHostReceiver({ gl, transport, replay })`** — host-side frame
  buffering + `drain()`, with the replay's viewport remap and screen
  policy; `onFrame()` and `canRerun` for hosts that render on demand.
- **`attachNetGLDeckLayer(deck, { device, render | transport })`** — the
  deck.gl host adapter (`frameworks/luma.ts`).
- **`makeNetGLThreeOverlayGuest({ WebGLRenderer, scene, camera,
  transport })`** — a three.js guest drawn from the host's `layer:view`.
- **`iframeTransport(iframe, { origin })` / `parentTransport({ hostOrigins
  })`** — origin-pinned postMessage for cross-origin peers.

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

A reprojecting host also sets a per-frame remap (`setViewportRemap({ from,
to })`, 0.6.5: a frame drawn at another viewport than the host's now, see
"Host reprojection"); it applies first, and the callback gets the mapped
rect.

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
  in-place composition slides. For overlays in the host's clip space
  (deck's globe) host reprojection now corrects it (above). Door portals
  still lag: options are the same-origin synchronous path (above), or
  having the host draw its stencil shell for the guest's pose rather than
  its own.

- **Extension-object methods.** Calls on objects returned by
  `getExtension` (`WEBGL_multi_draw`, `OVR_multiview2`, ...) bypass the
  recorder. Wrap extension objects in their own Proxy when a guest needs
  one. Those that set state (`OES_draw_buffers_indexed`) would also need
  the scalar-state tracker to follow them.

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

- **Guest depth vs host depth (in place).** A full-screen guest's depth
  clear wipes the host's depth, and its draws leave none the host can
  use. Celestiary saves and restores depth around each guest frame and
  writes proxy spheres (above). A screen policy that gives guest screen
  draws their own depth attachment would make that a library feature.
  (A guest that shares the host's depth convention, as New York does
  inside Cesium's frame, can instead keep it: `clear: 'none'`.)

- **No-draw shadow, for guests that read back.** `shadowDraws: false`
  (0.6.2) skips the shadow's draws for a guest that never reads its
  pixels. Cesium does read them (picking, camera collision), so it still
  draws everything twice: 2× GPU for a globe. A mode that executes draws
  only when a readback is pending (or replays the last frame onto the
  shadow before one) would halve that, and it matters most for guests
  warming up unseen.

- **Colour contract.** Host and guest must agree on colour space and
  tone mapping, and today each guest shader has to be taught the host's.
  A declared contract, applied by the screen policy, would put it in
  one place: linear or display-referred, tone-mapped or not, and the
  exposure.

- **Permission model.** Anything coming over the NetGL wire is executed
  against the host's GL context. A malicious sender can hose the host
  (resource exhaustion, infinite-loop shaders). Cross-origin guests are
  pinned by origin now, but must still be trusted; see "Cross-origin
  iframes" for what remains. Broader use needs a sandboxing layer (e.g., a
  proxy that validates calls against a known schema).

- **Non-affine host views.** A guest gets a 4×4 view, so a host whose
  projection isn't linear in the guest's frame (deck's Web Mercator map,
  including GlobeView above zoom 12) can't host it. Options: the guest
  projects in a shader the host supplies, or the host sends a local
  tangent-plane frame per tile.

- **View-tagged frames in celestiary.** `netgl:frame-end` can carry the
  view id now (`endFrame({ viewId })`), but celestiary's layer page doesn't
  pass it yet; the deck adapter infers it from the view in flight, which is
  wrong only for a frame that arrives after its view timed out.

## Layout / where things live

- `packages/portal-netgl/src/recorder.ts` — sender-side recorder Proxy
  with encoder for handles, typed arrays, ArrayBuffers, image sources;
  `trimSource` (only the bytes a call reads), snapshots and transfer
  lists.
- `packages/portal-netgl/src/messages.ts` — the wire's shapes: calls,
  frame-ends, wire-2 batches and the port opener.
- `packages/portal-netgl/src/replay.ts` — receiver-side replay engine,
  draw-FB tracking, viewport remap + post-bind re-issue.
- `packages/portal-netgl/src/renderer.ts` — `createNetGLRenderer`:
  three-WebGLRenderer wrapping a recorder.
- `packages/portal-netgl/src/target.ts` — `makeNetGLPortalTarget`:
  full-cake adoption factory (scene + anchor → live portal target).
- `packages/portal-netgl/src/checkpoint.ts` — state checkpoint, binding
  tracker, scalar-state tracker.
- `packages/portal-netgl/src/screen-policy.ts` — host-side stencil /
  blend / clear overrides for screen draws.
- `packages/portal-netgl/src/guest-context.ts` — framework-agnostic guest
  core; the guest's side of wire 2 (queue, batches, the port).
- `packages/portal-netgl/src/host-receiver.ts` — host frame buffering +
  drain; the host's side of wire 2 (the port offer, ordering across the
  switch).
- `packages/portal-netgl/src/frameworks/cesium.ts` — Cesium shim.
- `packages/portal-netgl/src/frameworks/luma.ts` — deck.gl / luma.gl host
  adapter: `attachNetGLDeckLayer`, `globeLayerView`, `withLumaState`.
- `packages/portal-netgl/src/frameworks/three-overlay.ts` — three.js
  overlay guest driven by `layer:view`.
- `packages/portal-netgl/src/core.ts` — the three-free entry
  (`@pablo-mayrgundter/portal-netgl/core`); `index.ts` adds the helpers
  that import three.
- `packages/portal-netgl/src/layer-view.ts` — the `layer:view` message and
  its matrix helpers.
- `packages/portal-netgl/src/window-transport.ts` — postMessage transport,
  with `iframeTransport` / `parentTransport` for cross-origin peers.
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
- `apps/host-netgl-deck/` — deck.gl GlobeView host with a cross-origin
  three.js overlay guest.
