# Portal

Live 3D portals between independent browser worlds.

This is a demo lab for browser-native **spatial portals**: live, traversable views into other 3D web apps, with camera, input, and eventually avatar/world-state handoff.

The later, more general protocol/project name may be **WorldLink**. For now this repo is the concrete demo: one portal pair, then many.

## Thesis

A spatial web should link worlds through portals, not force every world into one framework.

Modern 3D web apps often sit on incompatible render stacks:

- Three.js
- CesiumJS
- Babylon.js
- Unity WebGL
- custom WebGPU renderers
- neural / splat / streamed world renderers

Each framework provides power, but also creates an integration boundary. Portal explores a hypermedia alternative: keep engines sovereign, but make the seams explicit.

A portal is not just a flat HTML page texture on a cube. It is a **live 3D scene endpoint**:

```txt
remote world -> rendered surface -> portal material -> camera/input handoff -> optional traversal
```

## Status

Working in the cooperative-same-origin case:

- per-pixel halfspace portal rendering (the boundary on screen is the door's projection on the portal plane, not the door mesh silhouette)
- camera-coupled view through the portal that matches what the viewer would see if they crossed
- continuous traversal across the portal plane (no flicker, no double-rendering)
- stencil-mask + oblique near-plane clip so destination geometry past the portal renders directly to the canvas with native MSAA, source geometry in front of the portal occludes correctly, and source/destination compose without a texture intermediate
- two cooperating worlds (`world-a`, `world-b`) and a host that walks between them
- a `PortalEndpoint` abstraction with implementations across four transports: local three (`makeLocalEndpoint`), iframe (`makeIframeEndpoint`), Web Worker (`makeWorkerEndpoint`), and server-side node (`makeHeadlessEndpoint`). Wire shape is shared — the only thing that changes is the message channel.
- **recursive portals:** scenes can themselves contain portals, composited inline before the parent reads them. Demonstrated by a Droste cascade rendered server-side with N nested levels.
- **server-side rendering** (no browser): `portal-headless-three` runs jsdom + headless-gl + three on node. `apps/snapshot-proxy` exposes it over HTTP for social-preview / share-link image generation.

Both browser demos are same-origin. Iframe-portal traversal is in (host → iframe and iframe → host, with held-key handoff and a render-then-swap CSS handshake to kill flashes). Cross-origin iframes, WebRTC, multi-engine hosting are still roadmap.

## Design notes

A handful of lessons crystalized while iterating on the renderer; they shape the API choices below.

1. **Discrete-time band-aids cost more than the discontinuity they fix.** A next-frame prediction trick was added to mask the cross-frame parallax jump and ended up creating a worse oblique-clip wrong-side overshoot. Reverting was strictly better. At sub-frame scales, an integrated heuristic error can dwarf the original artifact.
2. **The boundary primitive is the door's projection on the plane, not the door mesh silhouette.** Mesh-as-portal looked right from far perpendicular but failed at close oblique. Per-pixel ray-vs-door is the right primitive across all camera regimes.
3. **Stencil + oblique clip are a combination, not alternatives.** Stencil bounds *which screen pixels* receive destination render (the door's halfspace projection); oblique clip bounds *which destination geometry* renders (only past the destination portal plane).
4. **Pure geometry belongs in `portal-core`.** The math is `Vec3`-on-`Vec3` and survives any rendering rewrite. The current refactor proves it: `portal-three` is a thin shim over the engine-agnostic core.
5. **Source scenes can stay vanilla, but only if the hidden contracts are bounded.** The host walks every destination material per-frame to toggle stencil settings, and swaps `scene.background = null` for the destination render. These work for plain three.js scenes but fail with custom shader materials and don't translate to remote endpoints. The local **endpoint adapter** (below) is where to bound them.

## Install and run

Requires Node 20+ and npm.

```bash
npm install
npm run dev          # alias for dev:three (the local-portal demo)
npm run dev:three    # vite dev server for the host-three app (two local worlds, traversable portal)
npm run dev:iframe   # vite dev server for the host-iframe-demo app (iframe-served portal)
npm run dev:worker   # vite dev server for the host-worker-demo app (Web Worker portal — no DOM)
npm run dev:proxy    # node HTTP server that renders portal scenes server-side and returns PNGs
npm test             # vitest run on the portal-core geometry + endpoint contracts
npm run check        # type-check all workspaces
npm run build        # type-check + production build of all workspaces
```

Controls in the demo:

- drag mouse to look
- WASD to move
- walk through the portal — you traverse to the other world

## Workspace layout

```txt
/apps
  /host-three             # demo host: two local worlds + traversable portal
  /host-iframe-demo       # demo host: source world + iframe-served portal
  /host-worker-demo       # demo host: source world + Web Worker portal (no DOM)
  /snapshot-proxy         # node HTTP service: server-side render to PNG
/packages
  /portal-core            # pure-data geometry + types + wire protocol (no three.js dep)
  /portal-three           # three.js bindings: stencil mask, coupled camera,
                          # local endpoint, link pipeline, traversal helpers
  /portal-iframe          # transport-agnostic render target + depth-aware compositor;
                          # window-transport adapter for the iframe case
  /portal-worker          # worker-transport adapter on top of portal-iframe;
                          # makeWorkerTarget (worker side) + makeWorkerEndpoint (host side)
  /portal-controls        # shared host fly-controls: keyboard WASD, drag-to-look,
                          # on-screen WASD pad for touch devices
```

`portal-core` is engine-agnostic and tested with vitest. `portal-three` translates between three.js scenes/cameras and the core data types. `portal-iframe` adds a postMessage transport so a portal's destination world can live in a separate iframe with its own engine context.

## How the rendering works

The frame loop, in pseudocode:

```ts
clear color, depth, stencil
render(here.scene, hostCamera)            // source scene to canvas
mask.update(here.portal, hostCamera, there.scene.background)
render(mask.scene, mask.camera)           // per-pixel halfspace test:
                                          //   discard outside door extent
                                          //   write stencil = 1
                                          //   fill destination bg color
                                          //   gl_FragDepth = portal-plane depth
                                          //   depth-tested against source
clearDepth                                // destination renders in fresh depth space
applyPortalStencilTest(there.scene)       // stencilFunc=Equal,ref=1 on materials
there.scene.background = null
render(there.scene, portalCamera)         // oblique near plane = portalA;
                                          //   only stenciled pixels receive
                                          //   destination geometry
clearPortalStencilTest(there.scene)
there.scene.background = restore
```

The key pieces:

- **Halfspace test in the mask shader** (`portalStencilMaskFragmentShader` in `packages/portal-three/src/index.ts`): for each pixel, reconstruct the host-camera world-ray, intersect it with the portal plane, and write to the stencil buffer if the hit lands inside the door rectangle.
- **Stencil + direct render**: the destination scene is rendered directly to the canvas with `stencilFunc = Equal, ref = 1` on every material. No intermediate texture, so destination geometry gets the canvas's MSAA.
- **Oblique near-plane clip on the portal camera**: cuts off destination geometry that's geometrically in front of the destination portal so what you see through the portal matches what you'd see if you stepped through.

`portal-core` exposes the underlying pure functions: `couplePoseAcrossPortal`, `intersectSegmentWithPlane`, `intersectSegmentWithDoor`, `obliqueClipPlaneForCamera`, `projectOntoPlaneRect`. `portal-three` is the thin three.js binding on top.

### The hidden contract today

Source scenes are plain `THREE.Scene` + optional `tick(t)`. The host gets away with this by *modifying scene materials per-frame* (stencil settings) and *swapping `scene.background` per-frame*. These couplings are invisible from the scene's perspective:

- Custom shader materials that don't expose `stencilWrite`/`stencilFunc` will silently break the portal mask.
- Anything that reads `scene.background` while the destination render is in flight will see `null`.

The next phase (below) bounds these contracts inside a **local endpoint adapter** so plain scenes stay plain and the contract is named.

## API direction: `PortalEndpoint` + `PortalLink`

The roadmap items below all converge on a single abstraction: a portal endpoint is *a thing the host can ask for a frame from a given pose*. Whether that thing is a local `THREE.Scene`, an iframe, a headless renderer, or a WebRTC peer is a transport detail.

```ts
type PortalEndpoint = {
  getAnchor(): PortalAnchor                         // the portal's pose in the endpoint's coords
  getBackground(): { r: number; g: number; b: number }
  renderInto(opts: {
    pose: PortalPose                                // mirrored host pose
    projection: Mat4                                // host's projection (so endpoint matches FOV/aspect)
    viewport: { width: number; height: number }
    target: { color: GPUTexture; depth?: GPUTexture }
  }): Promise<void> | void
  tick?(t: number): void
  enter?(state: PortalState): void                   // for traversal
}
```

`makeLocalEndpoint({ scene, anchor, background, tick })` wraps a local `THREE.Scene` and owns the per-frame stencil walk, `scene.background` null-swap, and oblique-clip on the portal camera. Plain scenes stay plain; the hidden contract is bounded to that one module.

`makeIframeEndpoint(...)` (browser, postMessage), `makeWorkerEndpoint(...)` (browser, Web Worker), `makeHeadlessEndpoint(...)` (server-side node, loopback), and a future `makeWebrtcEndpoint(...)` are sibling implementations of the same interface — they differ only in the underlying `PortalTransport`.

On top of that:

```ts
const link = makePortalLink({ a: endpointA, b: endpointB })

// each frame:
const result = link.frame({ renderer, hostCamera, dt })
// result: { teleported: boolean, here: 'a' | 'b' }
```

`PortalLink` owns the clear / source-render / mask / depth-clear / destination-render / traversal dance. Hosts that want their own render pipeline (XR, post-processing) can drop down to the endpoints directly.

## Roadmap

### Done

1. **Same-origin cooperative portal**: render destination scene into source scene, screen-space-correct.
2. **Camera-coupled portal**: portal-camera mirrored across the portal pair so the through-portal view matches the post-traversal direct view.
3. **Traversable portal**: detect plane crossing within the door extent, mirror the host pose across the pair, swap which scene is "here".
4. **Halfspace stencil rendering**: per-pixel ray-vs-door test, stencil mask, direct destination render with oblique clip — replaces the earlier door-mesh-as-texture-quad approach.
5. **`PortalEndpoint` + `PortalLink` abstraction.** Type lives in `portal-core`. `makeLocalEndpoint` lives in `portal-three` and bounds the hidden contracts. `makePortalLink` consumes two endpoints and exposes `frame(...)`. Host shrinks to: instantiate two endpoints, instantiate a link, call `link.frame(...)` each tick.
6. **Iframe portal (basic, one-way)** — see [`apps/host-iframe-demo/README.md`](./apps/host-iframe-demo/README.md) for the full data-flow walkthrough.

   Second implementation of `PortalEndpoint`. Each frame the host extrapolates its pose one frame ahead and posts the mirrored pose + its projection matrix; the iframe applies an oblique near-plane clip aligned with its destination anchor (so camera-side geometry is culled at the rasterizer, not just at the compositor), renders color + packed-RGBA NDC depth to an `OffscreenCanvas`, and posts both back as transferable `ImageBitmap`s. The host composites via a fullscreen quad with stencil test and a per-pixel depth-clip safety net. Same per-pixel correctness as the local case. Three subtleties documented in the demo's README: ImageBitmap-source textures require a manual `vUv.y` flip in the compositor (`UNPACK_FLIP_Y_WEBGL` is silently ignored by browsers); the iframe renders its scene *once* into a `WebGLRenderTarget` with a sampleable `DepthTexture` and derives both color and packed-depth bitmaps via fullscreen-quad blits (halves the per-frame scene work vs the naive two-pass approach); and pose prediction (default 1 frame) cancels iframe-roundtrip lag.

   What's deliberately not in the basic version: integration with the existing local-pair `PortalLink`, and origin-restricted `postMessage`.

7. **Iframe-portal traversal (forward + reverse).** Walking through the iframe portal hands the host's pose (and the keys it's currently holding) to the iframe via `portal:traverse`; the iframe sizes its renderer to a viewport carried in the message, renders one synchronous frame, posts `portal:traverse-ack`, and only then does the host commit the CSS swap that hides itself and shows the iframe — so the user never sees a dark flash or a stretched 1-pixel buffer. The reverse direction is symmetric: the iframe walks back through its own portal door, mirrors its pose into worldA coords, and the host re-activates as the source page. While the host is the "destination" service, it runs `makeIframeTarget` against its own scene so the iframe can ask for worldA frames through the portal-back. GL programs (scene + stencil mask + compositor) are pre-warmed at module load to keep the first traversal frame stutter-free.

8. **Web Worker endpoint (browser-side, no DOM).** Same `PortalEndpoint` contract, no DOM in the worker. `apps/host-worker-demo` runs the destination scene inside a Web Worker with an `OffscreenCanvas`; the host talks to it over `worker.postMessage` using the same `portal:ready` / `portal:setPose` / `portal:frame` wire protocol the iframe transport uses. Realised by extracting a `PortalTransport` abstraction in `portal-iframe` (`windowTransport` for the iframe case, `workerSelfTransport` / `workerHostTransport` for the worker case) so the render loop is shared verbatim — `portal-worker` is just the worker-transport wrapper. Pose permalinks (`?pose=…`, press `P` to copy) work in both demos so an iframe-vs-worker A/B at the same view is one paste away.

9. **Server-side rendering + recursive portals + snapshot proxy.** Three layered changes that together close out the "share a permalink, get a real PNG" story:

   - **Recursion.** `IframeTargetConfig.portals?: ChildPortal[]` lets every target host its own child portals. Per-frame: render scene → stencil-mask each child door → `clearDepth` → composite child via the same compositor the top-level host uses. Recursion stacks because each child is a target whose own `portals` is non-empty, and so on. v1 supports a single child per level; multi-child needs per-child stencil refs and is a follow-up.
   - **Loopback transport.** `createLoopbackPair()` in `portal-iframe` returns a `{ hostTransport, targetTransport }` pair that delivers messages synchronously across the same process. Because loopback `post()` invokes the peer's listener inline, the existing fire-and-forget `requestFrame` doubles as a synchronous request/response — no Promise plumbing needed for in-process recursion. This is what makes a chain of N targets composable in a single node process.
   - **Server-side renderer.** `portal-headless-three` is the node-side sibling of the iframe target: jsdom for `document` / `window` globals, `gl@9.0.0-rc.10` for a `WebGL2RenderingContext` with stencil + depth + `gl_FragDepth` support (verified by spike), three's `WebGLRenderer({context: glCtx})`, color/depth read out via `readRenderTargetPixels`, packed depth via the iframe target's depth-pack shader. The host-side compositor uses `THREE.DataTexture` (instead of `Texture` over `ImageBitmap`) with `SRGBColorSpace` tagging so three's shader rewrite preserves the linear-vs-sRGB chain across recursion levels.
   - **Droste cascade demo** (`packages/portal-headless-three/src/droste.test.ts`) builds an N-level cascade where each level renders a depth-coloured scene, asks the next level for a frame over loopback, and composites. With perfectly self-similar mirror geometry (cam pose preserved by the source/target normal-flip pairing), doors must shrink at each level (`0.7^depth`) or every level samples its own door region in the next level's frame and the recursion collapses to a uniform colour — fixing this gave the classic Droste nested rings. Tests through depth 5 (six visible levels).
   - **Snapshot proxy** (`apps/snapshot-proxy`, `npm run dev:proxy`) is the smallest possible HTTP wrapper: `GET /render?depth=N&pose=px,py,pz,fx,fy,fz&w=480&h=320` returns a PNG of the cascade at that pose. ~300 ms per request at depth 4, 800×600. Built so a downstream project (e.g. celestiary) can either host this proxy with its own scene module registered or import `portal-headless-three` directly into its server.

### Next

10. **WebRTC preview portal.** For genuinely independent endpoints (different origins, different engines, possibly different machines): the iframe protocol's `portal:frame` message becomes a video track. Trades a chunk of pixel-correctness for engine independence — bandwidth/latency story replaces the geometric coupling story, no per-pixel depth (so no host-side clip).

11. **Multi-engine endpoints.** Cesium, Babylon, Unity WebGL, custom WebGPU. The first non-three engine forces the protocol to become real.

12. **Scene merging.** Past simple preview: shared physics or selection across worlds, depth/occlusion sharing where it's possible to share at all, multi-child portal composites at one level (currently single-child).

## Open follow-ups

State for in-flight work and known gaps. We track these here rather than in issues so the next agent picking the project up has a single source of truth.

### Visual regression checks (need eyeballs)
- **Depth-pack precision drift** in `dev:iframe` after switching sceneRT to a depth-stencil packed format (`UnsignedInt248Type` + `DepthStencilFormat`). Mathematically the depth-pack shader still reads `.r` of the depth texture so the round-trip should be unchanged, but worth an A/B against pre-rename `main` at the same `?pose=` permalink. Look for new artifacts at door edges or in `?debug=depth` mode.
- **Droste cascade pixel correctness.** The test writes `/tmp/portal-droste-d{0..5}.png`. d=5 should show six visibly distinct nested rings (red → orange cube → green → blue → amber → magenta → teal). Quick eyeball whenever the headless renderer changes.

### Performance characterisation
- **Per-depth Droste render time.** How does cost scale with N? Linear by construction (each level is its own gl context + scene render), but constant-factor matters: `gl` context creation is ~50–150 ms, jsdom init is one-time, and there's a fixed pack/blit per level. Open question: is there a knee around N=4 or N=8 where per-context overhead dominates, and should we pool gl contexts in `snapshot-proxy` to amortise it?
- **Snapshot-proxy throughput.** Current implementation creates fresh contexts per request and tears them down after responding. Easy to drop to ~50 ms/req with a context pool but adds a class of state-leak bugs. Defer until we have a real workload that warrants it.

### Architecture gaps surfaced by the headless work
- **Multi-child portals per scene.** `IframeTargetConfig.portals?: ChildPortal[]` accepts an array but v1 only composites the first child (with a `console.warn` for the multi-child case). Two ways to lift: (a) per-child stencil refs that the caller coordinates with each child endpoint's `stencilRef`, OR (b) cache scene depth between children so each child's mask write can depth-test against source geometry. (a) is simpler API-wise; (b) is more correct. Pick when there's a use case.
- **Mixed-runtime composition.** A node-side host can't currently composite a browser-side child (or vice versa) because the wire shapes are typed differently (`PortalFrameMessage` uses `ImageBitmap`, `HeadlessFrameMessage` uses `Uint8Array`). For pure-node and pure-browser cascades it doesn't matter; for a future "browser host with server-rendered destination" setup we'd need a bridge that re-encodes Uint8Array → ImageBitmap on the receiver side.
- **`makeHeadlessEndpoint` doesn't run the bg-pixel depth-clip in the iframe compositor.** The headless compositor special-cases `depth01 >= 0.99` because the depth-pack→RGBA8→unpack round-trip loses precision at the top of the range. The browser-side `makeIframeEndpoint`'s shader doesn't have this guard. If we ever try to drive a browser host from a headless child, the browser's compositor would discard bg pixels — needs the same threshold lifted.

### Loose ends to wire
- **Snapshot-proxy scene registry.** Currently only the Droste cascade. Adding a second scene (the iframe demo's worldB swarm is the natural choice) would validate the registry pattern before celestiary brings its own scene module.
- **Permalink format consistency.** `encodeCameraPose` produces `px,py,pz,fx,fy,fz`. Apps with their own permalinks (celestiary's `#@lat,lng,alt;t=…`) will keep their own format; the portal-side helper is for portal demo / snapshot use. Document the boundary explicitly so it doesn't get conflated.
- **Cross-origin iframes.** The iframe transport hardcodes `'*'` for postMessage origin in dev. Production use needs origin-restricted posts on both sides — small change, but warrants its own pass.

## Core types

```ts
type Vec3 = [number, number, number]
type Quat = [number, number, number, number]

type Pose = {
  position: Vec3
  orientation: Quat
  scaleMetersPerUnit: number
}

type Portal = {
  id: string
  href: string
  sourceAnchor: Transform
  targetAnchor?: Transform
  mode: 'local' | 'iframe' | 'worker' | 'headless' | 'webrtc'
  intent?: 'view' | 'edit' | 'simulate' | 'inspect'
}

type PortalState = {
  pose: Pose
  time?: number
  selectedEntity?: string
  layers?: string[]
  query?: Record<string, string>
}

type PortalCapabilities = {
  renderStream?: boolean
  depthFrames?: boolean
  cameraControl?: boolean
  pointerEvents?: boolean
  traversal?: boolean
  picking?: boolean
}
```

`PortalEndpoint` (above) is the operational contract; `Portal*` types here are the protocol-level shapes the iframe / WebRTC milestones exercise.

## Design rules

1. Engines stay sovereign.
2. Scene graphs are private by default.
3. Pose, time, selection, and intent are public.
4. A portal is a coordinate transform plus a live view.
5. Traversal is state handoff, not necessarily a page reload.
6. The host owns the portal geometry. Endpoints are render-from-this-pose services.
7. AI agents should write adapters, not rewrite whole worlds.

## Candidate package layout

As the WebRTC / multi-engine demos land:

```txt
/apps
  /host-three             # local cooperative host (done)
  /host-iframe-demo       # iframe endpoint demo (done)
  /host-worker-demo       # Web Worker endpoint demo (done)
  /snapshot-proxy         # node HTTP server-side render service (done)
  /world-webrtc           # captureStream/WebRTC endpoint
  /world-cesium           # Cesium globe endpoint

/packages
  /portal-core            # pure types + geometry + permalinks (done)
  /portal-three           # three.js bindings; local endpoint + link (done)
  /portal-iframe          # transport-agnostic render target + compositor;
                          # window-transport adapter (done)
  /portal-worker          # worker-transport adapter (done)
  /portal-headless-three  # node-side renderer (jsdom + headless-gl) (done)
  /portal-webrtc          # WebRTC transport
  /portal-debug           # inspectors, pose gizmos, logs
```
