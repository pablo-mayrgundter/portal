# syntax=docker/dockerfile:1.6
#
# Snapshot-proxy image. Build context is the monorepo root so the Dockerfile
# can pull in workspace packages (`@portal/portal-core` etc.) that the proxy
# depends on. Build with:
#
#   docker build -f apps/snapshot-proxy/Dockerfile -t portal-snapshot-proxy .
#
# `fly deploy` from the repo root, with fly.toml's `[build] dockerfile`
# pointing here, supplies the same context automatically.
#
# Headless-gl (`gl@9.x`) is a node-gyp native module — needs Mesa + X11 dev
# libs at install time to build, and the runtime versions to load. Bundling
# both in a single layer keeps the build simple at the cost of ~600 MB image
# size. Multi-stage works in principle but native .node files plus runtime
# libs in two stages is fiddly enough that the size win isn't worth it for
# this deploy cadence.

FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    pkg-config \
    python3 \
    libxi6 libxi-dev \
    libglu1-mesa libglu1-mesa-dev \
    libglew2.2 libglew-dev \
    libgl1 libgl1-mesa-dri \
    libxext6 \
    # ANGLE (the GLES backend headless-gl bundles for Linux) dlopens these
    # at runtime — Wayland client + X11 protocol bindings. Missing any of
    # them shows up as a segfault on first gl context creation, not at
    # install time, so they're easy to forget. Bookworm package names.
    libwayland-client0 libwayland-egl1 \
    libxcb1 libxcb-glx0 libxcb-shm0 \
    libxcb-dri2-0 libxcb-dri3-0 libxcb-present0 \
    libxfixes3 libxshmfence1 \
    # ANGLE on Linux opens an X display by default and segfaults
    # ("Could not open the default X display") in containers without one.
    # xvfb gives it a virtual framebuffer; the entrypoint script below
    # backgrounds Xvfb and exports DISPLAY before exec'ing the proxy.
    xvfb \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy manifests first so dep-install layer caches independently of source.
# `npm ci` reads root + every workspace's package.json so they all need to be
# present, even ones the proxy doesn't transitively depend on.
COPY package.json package-lock.json ./
COPY apps/snapshot-proxy/package.json apps/snapshot-proxy/
COPY apps/host-three/package.json apps/host-three/
COPY apps/host-iframe-demo/package.json apps/host-iframe-demo/
COPY apps/host-worker-demo/package.json apps/host-worker-demo/
COPY packages/portal-core/package.json packages/portal-core/
COPY packages/portal-three/package.json packages/portal-three/
COPY packages/portal-iframe/package.json packages/portal-iframe/
COPY packages/portal-headless-three/package.json packages/portal-headless-three/
COPY packages/portal-controls/package.json packages/portal-controls/
COPY packages/portal-worker/package.json packages/portal-worker/

# `npm ci` installs all workspaces. Costs a bit of unnecessary install time
# for the host-* apps' deps, but keeps the lockfile honest. Production
# environment skips devDependencies; tsx is in dependencies so the runtime
# `start` script keeps working.
ENV NODE_ENV=production
RUN npm ci

# Source. Workspaces resolve via local file paths so this single copy is
# enough — no further installs required.
COPY tsconfig.base.json ./
COPY packages ./packages
COPY apps/snapshot-proxy ./apps/snapshot-proxy

RUN chmod +x /app/apps/snapshot-proxy/docker-entrypoint.sh

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["/app/apps/snapshot-proxy/docker-entrypoint.sh"]
CMD ["npm", "run", "start", "-w", "@portal/snapshot-proxy"]
