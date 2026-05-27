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

v0 goal is **GL coverage**: do celestiary's textures / custom shaders /
render-target post-processing all replay successfully against the host
context? The portal-door framing is not yet calibrated to celestiary's
astronomy-scale coordinates, so visuals will not be visually coherent —
you may see celestiary's content squashed into the door pixels, or
nothing if the camera ends up outside the visible scene. Console output
on either side surfaces encoder gaps (e.g., texture uploads from
`HTMLImageElement` will throw "NetGL recorder: cannot encode arg of type
HTMLImageElement" until that path is added to the encoder).
