# NetGL + celestiary demo

Iframe celestiary into a portal door and have its GL calls cross the wire
(NetGL command stream) and execute in the host canvas's WebGL2 context —
the same composition path as `host-netgl-demo`, but driving a real
GL-heavy app instead of a bundled toy scene.

## How it's wired

Celestiary is checked in as a submodule at `external/celestiary` (upstream:
[celestiary/web](https://github.com/celestiary/web)). The portal-side
changes celestiary needs are tracked in this app's `celestiary-patch/`
directory — they're applied on top of the submodule at setup time and
**not committed back into the submodule**. The submodule pointer in this
repo stays at upstream celestiary's HEAD.

`celestiary-patch/` contains:

- `celestiary.patch` — 15-line diff against celestiary's `js/ThreeUI.js`
  (renderer hook) + `public/index.html` (load the shim).
- `portal-shim.js` — copied into celestiary's `public/` before the build.
  Self-contained ES module (no imports); sets
  `window.__portalCreateRenderer` so celestiary's `ThreeUI` constructs a
  NetGL-recording renderer instead of a plain `WebGLRenderer`. Includes
  an inlined NetGL recorder Proxy. Kept in sync with
  `packages/portal-netgl/src/recorder.ts` manually.
- `apply.sh` — resets the submodule, applies the patch, drops the shim
  in, runs `yarn build` with `BASE_PATH=/celestiary/`, copies the output
  into `public/celestiary/`.

## Setup (after `git submodule update --init`)

```sh
npm install                          # installs workspace deps incl. this app
npm run setup:celestiary             # applies the patch + builds celestiary
npm run dev:netgl-celestiary         # vite at http://localhost:5173
```

`public/celestiary/` is gitignored; regenerate it with `setup:celestiary`
after pulling or after editing files in `celestiary-patch/`.

## What "working" means here

End-to-end GL-coverage milestone is cleared: celestiary's render path
(textures via `HTMLImageElement` → `texImage2D`, `WebGLRenderTarget` +
custom-shader atmosphere post-process, full state-cache reset between
frames) all crosses the wire and composes through the door's stencil
mask, with the host's worldA preserved everywhere outside.

## Adoption findings (general for NetGL embedding)

These came out of bringing celestiary up and are likely true for any
real GL app you want to portal:

1. **The iframe needs a real viewport.** The 1×1-offscreen pattern that
   works for the synthetic `host-netgl-demo` scene doesn't work for an
   app whose components measure `container.offsetWidth/offsetHeight` to
   lay out (React, etc.) — they end up at zero, `setSize(0, 0)`, no
   draws. Use full-viewport + `opacity: 0` + `pointer-events: none` +
   `z-index: -1` instead (see `index.html`).
2. **Use a detached `HTMLCanvasElement` as the shadow, not
   `OffscreenCanvas`.** Three's `setSize(w, h)` defaults
   `updateStyle=true` and writes `canvas.style.width` —
   `OffscreenCanvas` has no `.style`. portal-netgl's own
   `makeNetGLPortalTarget` factory escapes this because it always
   passes `updateStyle=false`; an embedded app like celestiary doesn't.
3. **Three's `resetState()` also nulls `_currentRenderTarget`.** If you
   monkey-patch `renderer.render` to reset cached GL state (you must,
   to clear the host's intervening renderer's state), save +
   restore the current render target around the reset — otherwise the
   app's `setRenderTarget(rt)` → `render()` becomes "render to host
   canvas," and you'll see the wrong scene composed through the door.
4. **autoClear toggling per render.** `autoClear = false` is necessary
   so the embedded app's render doesn't wipe the host canvas. But the
   same flag prevents the app's offscreen RTs from being cleared too,
   leaving them full of garbage that downstream compositing passes
   blit as solid colors. Toggle: false when rendering to screen, true
   when rendering to an RT.
5. **Frame-end concatenation, not overwrite.** The host's frame-batching
   buffer needs to *append* across multiple frame-ends, not overwrite
   the previous batch. If the host RAF stalls briefly (page load,
   layout), iframe frame-ends pile up; dropping batches strands the
   handle creations (`createTexture`, `createProgram`,
   `getUniformLocation`) inside them, and the next frame that
   references those handles throws "unknown handle id N" on replay.

## Out of scope / follow-ups

The v0 GL-coverage milestone landed in this PR. The visuals are
recognisably celestiary's universe through the door, but several
portal-architecture pieces are deliberately not solved here:

- **Door-framed compositing.** Currently the door region shows whatever
  pixels the embedded app rendered at the *same screen position* — so
  if the door is off-centre, the door shows an off-centre crop of the
  app's full-viewport render rather than the app's view fitted to the
  door rect. Proper fix: intercept the replayed `gl.viewport` calls on
  the host (when the bound framebuffer is the screen) and remap them
  to the door rectangle. Wants its own PR.
- **Coordinate-scale coupling.** `couplePoseAcrossPortal` assumes both
  sides of the door use comparable scales. Host scenes here are
  meter-scale (~5 m room); celestiary is astronomy-scale (sun radius
  ~7×10⁸ m). The unscaled coupled pose teleports celestiary's camera
  into the sun and gives a uniform-coloured frame. The shim defaults
  to *not* applying the host's pose for that reason (use
  `?pose=on` to opt in for debugging). Real fix: a per-target scaling
  layer in the coupling math.
- **Encoder coverage beyond `HTMLImageElement`.** `HTMLCanvasElement`,
  `HTMLVideoElement`, `ImageBitmap` all go through the same ImageData
  path and are theoretically handled, but only `HTMLImageElement` has
  been seen on the wire. Float16/BigInt typed-array support, transform
  feedback bindings, and similar long-tail types are open.
- **Resource lifecycle.** `handleToId` (recorder) and `idToHandle`
  (replay) never shrink. `delete*` GL calls aren't currently mapped to
  map cleanup. Long-running portals will leak.
- **Extract the shim's inlined recorder.** Currently kept in sync with
  `packages/portal-netgl/src/recorder.ts` by hand. Publishing
  portal-netgl to npm + depending on it from celestiary's build would
  collapse to a single source of truth.
