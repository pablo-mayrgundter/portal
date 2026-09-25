# NetGL + Cesium demo

A Cesium globe composited into a three.js host, over NetGL. Cesium runs
unmodified in a hidden iframe (`cesium.html`); the only portal-specific
code on its side is the shim:

```js
const guest = makeNetGLCesiumGuest({ onMessage })
const widget = new Cesium.CesiumWidget(el, { contextOptions: guest.contextOptions, ... })
guest.attach(widget.scene)
```

Its WebGL calls cross over `postMessage` and replay into the host page's
own GL context, where depth and stencil composition is native.

## Modes

- **`?mode=door`** (default) — the globe through a portal door in the
  three.js room, like the celestiary demo. The door is a window: your
  camera is carried through it onto a window in space above the Americas,
  scaled 4,000 km per metre, so walking past the door gives real parallax.
- **`?mode=earth`** — the globe composited *in place* of an Earth in a
  three.js space scene with stars, sun, and a moon. The moon occludes the
  Earth when in front and is hidden by it when behind; Cesium's
  atmosphere glow blends over the host's stars. Drag to orbit, scroll to
  zoom to the surface. This is the shape of the celestiary integration
  (see `packages/portal-netgl/DESIGN.md`, "Celestiary × Cesium").

Other query params:

- `imagery=osm` — OpenStreetMap tiles instead of the bundled (offline,
  low-res) Natural Earth II imagery.
- `time=<seconds>` and `pause` — start the earth-mode scene at a given
  time, optionally frozen. Handy for stills: `?mode=earth&time=12.5&pause`
  puts the moon in front of the Earth, `time=32.5` behind its limb.

## Run

```sh
npm install
npm run dev:netgl-cesium        # copies Cesium's static build into public/cesium/, starts vite
```

`public/cesium/` is generated (gitignored) by `scripts/copy-cesium.mjs`
from `node_modules/cesium/Build/Cesium`, and loaded as a global via a
plain `<script>` — no bundler plugin for Cesium.

## How it's put together

- `src/cesium-guest.ts` — the Cesium app. Its own render loop is off; it
  renders one frame per `cesium:tick` from the host and, in earth mode,
  takes the host's camera (already converted to ECEF metres).
- `src/door.ts` / `src/earth.ts` — the two hosts. Both use
  `makeNetGLHostReceiver` with a replay screen policy (stencil clip,
  depth-only clears; earth mode adds premultiplied-over blending).
- `src/shared.ts` — renderer, transport, receiver, and tick flow control:
  at most one tick in flight, because the iframe shares the host's main
  thread and queued ticks would stall the page.
