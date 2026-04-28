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
- a `PortalEndpoint` abstraction with two implementations: a local-three endpoint and an iframe endpoint that runs the destination world in a separate frame and ships color + packed-RGBA depth back over `postMessage`

Both demos are same-origin. Cross-origin iframes, traversal across iframe portals, headless / WebRTC / multi-engine hosting are all still roadmap.

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
/packages
  /portal-core            # pure-data geometry + types + wire protocol (no three.js dep)
  /portal-three           # three.js bindings: stencil mask, coupled camera,
                          # local endpoint, link pipeline, traversal helpers
  /portal-iframe          # iframe transport: depth-pack target + depth-aware compositor
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

`makeIframeEndpoint(...)`, `makeHeadlessEndpoint(...)`, `makeWebrtcEndpoint(...)` are sibling implementations of the same interface.

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

   What's deliberately not in the basic version: traversal across the iframe portal, integration with the existing local-pair `PortalLink`, and origin-restricted `postMessage`.

### Next

7. **Headless / offscreen render endpoint.** Same `PortalEndpoint` contract but the implementation is a renderer with no window — `OffscreenCanvas` in a worker, or even a node-side renderer feeding frames over a websocket. Useful for compute-heavy worlds (splats, baked light) and for testing the protocol without a DOM.

8. **WebRTC preview portal.** For genuinely independent endpoints (different origins, different engines, possibly different machines): the iframe protocol's `portal:frame` message becomes a video track. Trades a chunk of pixel-correctness for engine independence — bandwidth/latency story replaces the geometric coupling story, no per-pixel depth (so no host-side clip).

9. **Iframe-portal traversal.** Walking through an iframe portal hands state to the iframe via `endpoint.enter(state)`; the iframe takes over as the new "here." Symmetric reverse-handoff for walking back.

10. **Multi-engine endpoints.** Cesium, Babylon, Unity WebGL, custom WebGPU. The first non-three engine forces the protocol to become real.

11. **Scene merging.** Past simple preview: shared physics or selection across worlds, recursive portals, depth/occlusion sharing where it's possible to share at all.

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
  mode: 'local' | 'iframe' | 'headless' | 'webrtc'
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

As the iframe / headless / WebRTC / multi-engine demos land:

```txt
/apps
  /host-three             # current cooperative host
  /world-iframe           # iframe endpoint demo
  /world-headless         # offscreen render endpoint
  /world-webrtc           # captureStream/WebRTC endpoint
  /world-cesium           # Cesium globe endpoint

/packages
  /portal-core            # pure types + geometry (current)
  /portal-three           # three.js bindings (current); local endpoint + link
  /portal-iframe          # postMessage transport, depth-aware compositor
  /portal-webrtc          # WebRTC transport
  /portal-debug           # inspectors, pose gizmos, logs
```
