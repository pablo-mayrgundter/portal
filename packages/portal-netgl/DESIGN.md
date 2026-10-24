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
  three fails. Hosts import `@pablo-mayrgundter/portal-netgl/core`. The nonce and MessagePort of RFC
  §10.2, and `viewId` on `netgl:frame-end` (its open question 18), aren't
  built.
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
  view in flight) still holds, but the latency isn't measured on a real
  GPU yet.
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

The replay reverses the encoding and re-executes against the host's
context. The host owns when to drain: the sender emits a `NetGLFrameEnd`
marker after each frame; the host buffers calls between markers and drains
the latest batch in one atomic block right after its own stencil-mask
paint + clearDepth. This is the protocol that prevents host renders and
embedded renders from interleaving on the shared GL context.

## Adoption surfaces

Framework-agnostic building blocks (new, and what 1.0 shims build on):

- **`makeNetGLGuestContext({ canvas?, transport? })`** — shadow context,
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

- **No-draw shadow.** The shadow context executes every guest draw as
  well as the replay: 2× GPU for a globe. Cesium needs the shadow's
  pixels only for readback (picking, camera collision). A shadow mode
  that skips draws when no readback is pending would halve the cost,
  and it matters most for guests warming up unseen.

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

- **View-tagged frames.** `netgl:frame-end` should carry the view id the
  frame was drawn for, so an async host can compose it for that view and
  measure lag.

## Layout / where things live

- `packages/portal-netgl/src/recorder.ts` — sender-side recorder Proxy
  with encoder for handles, typed arrays, ArrayBuffers, image sources.
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
  core.
- `packages/portal-netgl/src/host-receiver.ts` — host frame buffering +
  drain.
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
