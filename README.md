# Spatial Portal

Live 3D portals between independent browser worlds.

## Milestone 1 (implemented)

A minimal monorepo demo with:

- **Vite + TypeScript + Three.js** app (`apps/host-three`)
- a host scene (**world-a**) rendered normally
- a portal plane in world-a
- a second scene (**world-b**) rendered into a `WebGLRenderTarget`
- that render target texture mapped onto the portal plane
- camera coupling of world-b based on the viewer pose relative to the portal anchor

This keeps the code modular and ready for future iframe/WebRTC transport layers.

## Workspace layout

```txt
/apps
  /host-three
/packages
  /portal-core
  /portal-three
```

## Run

```bash
npm install
npm run dev
```

Then open the Vite URL and use:

- drag mouse to look
- WASD to move

As you move around the portal plane, the world-b perspective updates like a window into the other world.
