# Phase 2 — upstream portal mode into celestiary/web

Once `@pablo-mayrgundter/portal-netgl` is published on npm (it is, as of
v0.1.0), celestiary itself can depend on the library and activate portal
mode entirely from its own source. The vendored shim + script-tag patch
in `apps/host-netgl-celestiary/celestiary-patch/` (managed by
`apply.sh`) becomes unnecessary — celestiary just imports
`makeNetGLPortalGuest` and uses it in `ThreeUI.initRenderer`.

After this lands in `celestiary/web` and is deployed to
`celestiary.github.io`, Phase 3 swaps our demo's iframe src from the
local submodule build to `https://celestiary.github.io/?portal=1` and
deletes the submodule + `celestiary-patch/` entirely.

## What the upstream PR does

Three small changes in celestiary/web:

1. **`package.json`** — add `@pablo-mayrgundter/portal-netgl` to
   `dependencies`.
2. **`js/ThreeUI.js`** — import `makeNetGLPortalGuest`, add a
   `PORTAL_ANCHOR` const, split `initRenderer` into a local-renderer
   helper and a portal-mode helper, route through the portal helper
   when `parent !== self && ?portal=1`.

`yarn build` works unchanged — esbuild bundles the library into
`docs/`, no separate script tag, no public/ asset.

## How to apply

```sh
git clone https://github.com/celestiary/web
cd web
git checkout -b portal-netgl-upstream
git apply path/to/phase2.patch
yarn install
yarn build           # smoke-test the bundle includes the library
```

`phase2.patch` lives next to this README. Verify the diff before
applying:

```sh
git apply --check apps/host-netgl-celestiary/celestiary-upstream/phase2.patch
git apply         apps/host-netgl-celestiary/celestiary-upstream/phase2.patch
```

## Verify locally before opening the PR

After `yarn build`, point a portal host at the resulting `docs/`:

```sh
# In the portal repo:
cd packages/portal-netgl
npm run build       # ensure dist/ is fresh
cd ../../apps/host-netgl-celestiary
rm -rf public/celestiary
mkdir -p public/celestiary
cp -a /path/to/celestiary/web/docs/. public/celestiary/
npm run dev         # http://localhost:5173 — should show celestiary in the door
```

If the door shows celestiary correctly without our shim file, the
upstream patch is ready.

## Verifying the bundle contains the library

```sh
grep -l "makeNetGLPortalGuest" docs/*.js
# expect: a chunk file (esbuild splits, name varies)
ls docs/portal-shim.js 2>/dev/null
# expect: not found (no separate shim script)
```

## After it lands

1. Celestiary's normal release flow deploys to `celestiary.github.io`.
2. In this repo, Phase 3 lands:
   - `apps/host-netgl-celestiary/index.html`: iframe src →
     `https://celestiary.github.io/?portal=1`
   - Delete `external/celestiary/` submodule
   - Delete `apps/host-netgl-celestiary/celestiary-patch/`
   - Delete `apps/host-netgl-celestiary/celestiary-upstream/` (this dir)
   - Strip `setup:celestiary` from CI's build action
   - Strip `submodules: recursive` from pages.yml + pr-preview.yml

## The diff at a glance

- `package.json` — 1 line added (the dep).
- `js/ThreeUI.js` — ~50 lines: top-of-file import, the `PORTAL_ANCHOR`
  const, new `_initLocalRenderer` (lifts the local-canvas + new
  WebGLRenderer construction out of `initRenderer`), new
  `_maybeNetGLPortalRenderer` (returns null when not in portal mode),
  `initRenderer` becomes a 1-line dispatcher. All celestiary-specific
  renderer config (toneMapping, exposure, colorSpace, setSize,
  setClearColor) runs after the dispatch, so portal-mode visuals stay
  consistent with the standalone view.
