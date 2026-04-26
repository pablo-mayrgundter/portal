# Spatial Portal

Live 3D portals between independent browser worlds.

This is a demo lab for browser-native **spatial portals**: live views into other 3D web apps, with camera, input, and eventually avatar/world-state handoff.

The later, more general protocol/project name may be **WorldLink**. For now this repo is the concrete demo: one spatial portal, then many.

## Thesis

A spatial web should link worlds through portals, not force every world into one framework.

Modern 3D web apps often sit on incompatible render stacks:

- Three.js
- CesiumJS
- Babylon.js
- Unity WebGL
- custom WebGPU renderers
- neural / splat / streamed world renderers

Each framework provides power, but also creates an integration boundary. Spatial Portal explores a hypermedia alternative: keep engines sovereign, but make the seams explicit.

A portal is not just a flat HTML page texture on a cube. It is a **live 3D scene endpoint**:

```txt
remote world -> rendered surface -> portal material -> camera/input handoff -> optional traversal
```

## Demo roadmap

### 0. Local baseline

A parent app hosts several simple worlds:

- `world-a`: a Three.js room / object field
- `world-b`: another Three.js scene with a different coordinate frame
- `world-c`: later, a Cesium / globe / tiled earth scene

Each world exposes a minimal portal API.

```ts
type Vec3 = [number, number, number]
type Quat = [number, number, number, number]

type Pose = {
  position: Vec3
  orientation: Quat
  scaleMetersPerUnit: number
}

type PortalEndpoint = {
  getPose(): Pose
  setPose(pose: Pose): void
  setTime(t: number): void
  pick(x: number, y: number): Promise<unknown>
  enter?(state: PortalState): void
}
```

### 1. Same-origin cooperative portal

The simplest case: parent and child worlds run in the same origin and cooperate.

Experiments:

- render one Three scene into a `WebGLRenderTarget`
- map that texture onto a portal plane in another scene
- sync the remote camera based on viewer position relative to the portal
- raycast through the portal and map pointer events into the remote scene

Target feel:

> A live window into another 3D space.

### 2. Iframe portal

A remote world runs in an iframe and communicates with the host using `postMessage`.

Experiments:

- iframe exposes a `PortalEndpoint` message protocol
- host sends camera pose, time, viewport size, and pointer events
- iframe returns rendered preview stream or frame snapshots
- host displays preview on portal geometry

Message sketch:

```ts
type PortalMessage =
  | { type: 'portal:setCamera'; pose: Pose; projection?: Projection }
  | { type: 'portal:setTime'; time: number }
  | { type: 'portal:pointer'; event: PortalPointerEvent }
  | { type: 'portal:enter'; state: PortalState }
  | { type: 'portal:ready'; capabilities: PortalCapabilities }
```

### 3. WebRTC preview portal

A child or remote page streams its canvas as video.

Experiments:

- `canvas.captureStream()` from remote world
- WebRTC peer connection between host and endpoint
- use incoming stream as `THREE.VideoTexture`
- map the video texture onto portal geometry
- send low-rate camera/input control over a data channel

Target feel:

> A live, engine-independent world preview.

### 4. Camera-coupled portal

Make the remote view respond to the local viewer position.

Core transform:

```txt
viewer pose in source world
  -> relative to source portal anchor
  -> transformed across portal pair
  -> camera pose in target world
```

This turns the portal from a screen into a window.

### 5. Traversable portal

Crossing the portal transfers control to the target world.

Experiments:

- detect camera/avatar crossing the portal plane
- serialize local state into `PortalState`
- target world receives pose/time/intent/entity context
- host transitions from preview mode to full target world control

### 6. Scene merging

Push beyond preview: let source and target scenes partially coexist.

Experiments:

- stencil-like portal masks
- recursive portals
- shared physics boundary
- shared object identity across worlds
- local proxy objects for remote entities
- remote scene depth / occlusion approximations
- WebGPU texture and depth sharing, where possible

## Core types

### SpatialPortal

```ts
type SpatialPortal = {
  id: string
  href: string
  sourceAnchor: Transform
  targetAnchor?: Transform
  mode: 'texture' | 'iframe' | 'webrtc' | 'interactive' | 'traversable'
  intent?: 'view' | 'edit' | 'simulate' | 'inspect'
}
```

### PortalState

```ts
type PortalState = {
  pose: Pose
  time?: number
  selectedEntity?: string
  layers?: string[]
  query?: Record<string, string>
}
```

### PortalCapabilities

```ts
type PortalCapabilities = {
  renderStream?: boolean
  imageBitmapFrames?: boolean
  cameraControl?: boolean
  pointerEvents?: boolean
  traversal?: boolean
  depth?: boolean
  picking?: boolean
}
```

## Design rules

1. Engines stay sovereign.
2. Scene graphs are private by default.
3. Pose, time, selection, and intent are public.
4. A portal is a coordinate transform plus a live view.
5. Traversal is state handoff, not necessarily a page reload.
6. AI agents should write adapters, not rewrite whole worlds.

## Candidate package layout

```txt
/apps
  /host-three             # main portal host
  /world-three-a          # simple cooperative world
  /world-three-b          # second world, different frame
  /world-iframe           # iframe endpoint demo
  /world-webrtc           # captureStream/WebRTC endpoint
  /world-cesium           # later Cesium globe endpoint

/packages
  /portal-core            # types, transforms, protocol
  /portal-three           # Three.js portal material/helpers
  /portal-iframe          # postMessage transport
  /portal-webrtc          # WebRTC transport
  /portal-debug           # inspectors, pose gizmos, logs
```

## First milestone

Build the smallest impressive demo:

```txt
host-three
  renders world-a
  contains a portal plane
  portal plane shows live world-b
  moving the camera near the plane changes world-b camera perspective
  clicking the portal sends a pointer ray into world-b
```

## Likely stack

- Vite
- TypeScript
- Three.js
- pnpm or npm workspaces
- WebRTC data channels for remote control
- `postMessage` for iframe control
- WebXR later
