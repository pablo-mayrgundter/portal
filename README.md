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

Still entirely same-origin / single-engine. Iframe, WebRTC, headless, and multi-engine hosting are all roadmap.

## Install and run

Requires Node 20+ and npm.

```bash
npm install
npm run dev      # vite dev server for the host-three app
npm test         # vitest run on the portal-core geometry
npm run check    # type-check all workspaces
npm run build    # type-check + production build of all workspaces
```

Controls in the demo:

- drag mouse to look
- WASD to move
- walk through the portal — you traverse to the other world

## Workspace layout

```txt
/apps
  /host-three             # demo host: two worlds + portal between them
/packages
  /portal-core            # pure-data geometry + types (no three.js dep)
  /portal-three           # three.js bindings: stencil mask, coupled camera,
                          # traversal helpers, scene-material stencil toggles
```

`portal-core` is engine-agnostic and tested with vitest. `portal-three` translates between three.js scenes/cameras and the core data types.

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

- **Halfspace test in the mask shader** (`portalStencilMaskFragmentShader` in `packages/portal-three/src/index.ts`): for each pixel, reconstruct the host-camera world-ray, intersect it with the portal plane, and write to the stencil buffer if the hit lands inside the door rectangle. The screen-space boundary of the portal is the door's projection on the plane, not the door mesh silhouette, so close-up oblique approaches don't leak source geometry around the door.
- **Stencil + direct render**: the destination scene is rendered directly to the canvas with `stencilFunc = Equal, ref = 1` on every material. No intermediate texture, so destination geometry gets the canvas's MSAA.
- **Oblique near-plane clip on the portal camera**: cuts off destination geometry that's geometrically in front of the destination portal (so what you see through the portal matches what you'd see if you stepped through).

`portal-core` exposes the underlying pure functions: `couplePoseAcrossPortal`, `intersectSegmentWithPlane`, `intersectSegmentWithDoor`, `obliqueClipPlaneForCamera`, `projectOntoPlaneRect`. `portal-three` is the thin three.js binding on top.

## Roadmap

### Done

1. **Same-origin cooperative portal**: render destination scene into source scene, screen-space-correct.
2. **Camera-coupled portal**: portal-camera mirrored across the portal pair so the through-portal view matches the post-traversal direct view.
3. **Traversable portal**: detect plane crossing within the door extent, mirror the host pose across the pair, swap which scene is "here".
4. **Halfspace stencil rendering**: per-pixel ray-vs-door test, stencil mask, direct destination render with oblique clip — replaces the earlier door-mesh-as-texture-quad approach.

### Next

5. **Iframe portal.** A remote world runs in an iframe and the host controls it via `postMessage`.

   ```ts
   type PortalMessage =
     | { type: 'portal:setCamera'; pose: Pose; projection?: Projection }
     | { type: 'portal:setTime'; time: number }
     | { type: 'portal:pointer'; event: PortalPointerEvent }
     | { type: 'portal:enter'; state: PortalState }
     | { type: 'portal:ready'; capabilities: PortalCapabilities }
   ```

6. **Headless / offscreen render endpoint.** Pull the rendering of the remote world out of the host process entirely. The host knows nothing about three.js or the remote engine — it only knows the portal protocol and consumes frames.

7. **WebRTC preview portal.** For genuinely independent endpoints (different origins, different engines): `canvas.captureStream()` over a peer connection, used as a `THREE.VideoTexture` on the portal. Camera/input over a data channel.

   This trades pixel-correctness for engine independence — the through-portal view is no longer screen-space-coupled to the host camera, and the bandwidth/latency story replaces the geometric coupling story.

8. **Multi-engine endpoints.** Cesium, Babylon, Unity WebGL, custom WebGPU. The first non-three engine forces the protocol to become real.

9. **Scene merging.** Past simple preview: shared physics or selection across worlds, recursive portals, depth/occlusion sharing where it's possible to share at all.

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
  mode: 'texture' | 'iframe' | 'webrtc' | 'interactive' | 'traversable'
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
  imageBitmapFrames?: boolean
  cameraControl?: boolean
  pointerEvents?: boolean
  traversal?: boolean
  depth?: boolean
  picking?: boolean
}

type PortalEndpoint = {
  getPose(): Pose
  setPose(pose: Pose): void
  setTime(t: number): void
  pick(x: number, y: number): Promise<unknown>
  enter?(state: PortalState): void
}
```

The `Portal*` shapes are protocol-level — the iframe and WebRTC milestones are where they get exercised.

## Design rules

1. Engines stay sovereign.
2. Scene graphs are private by default.
3. Pose, time, selection, and intent are public.
4. A portal is a coordinate transform plus a live view.
5. Traversal is state handoff, not necessarily a page reload.
6. AI agents should write adapters, not rewrite whole worlds.

## Candidate package layout

As the iframe / WebRTC / multi-engine demos land:

```txt
/apps
  /host-three             # current cooperative host
  /world-iframe           # iframe endpoint demo
  /world-webrtc           # captureStream/WebRTC endpoint
  /world-cesium           # Cesium globe endpoint
  /world-headless         # offscreen render endpoint

/packages
  /portal-core            # pure types + geometry (current)
  /portal-three           # three.js bindings (current)
  /portal-iframe          # postMessage transport
  /portal-webrtc          # WebRTC transport
  /portal-debug           # inspectors, pose gizmos, logs
```
