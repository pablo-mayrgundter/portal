# syntax=docker/dockerfile:1.6
#
# Share-proxy image. Pure Node + Express + cheerio — no native modules, so
# this image is dramatically lighter than the snapshot-proxy (~150 MB vs
# ~600 MB) and starts in under a second.
#
# Build context is the monorepo root so workspace package.json files can
# be copied for an `npm ci` that resolves the local @portal/* deps. Build
# from the repo root with:
#
#   docker build -f apps/share-proxy/Dockerfile -t portal-share .
#
# `fly deploy --config fly.portal-share.toml` from the repo root supplies
# the same context automatically.

FROM node:20-bookworm-slim

WORKDIR /app

# Manifests first for layer caching. `npm ci` reads root + every workspace
# package.json so all of them must be present on disk, even ones the share
# proxy doesn't depend on.
COPY package.json package-lock.json ./
COPY apps/share-proxy/package.json apps/share-proxy/
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

ENV NODE_ENV=production
# --ignore-scripts skips postinstall hooks for the entire workspace tree.
# Crucially, this skips the headless-gl native build (snapshot-proxy's dep)
# which would otherwise need apt-installed Mesa/X11 dev libs and pull this
# image up to ~600 MB. Share-proxy itself has no native deps, so nothing it
# needs gets skipped.
RUN npm ci --ignore-scripts

# Source — only this app's needed at runtime; tsx resolves @portal/* via
# workspace symlinks but we only invoke share-proxy's main.
COPY tsconfig.base.json ./
COPY apps/share-proxy ./apps/share-proxy

ENV PORT=8080
EXPOSE 8080

CMD ["npm", "run", "start", "-w", "@portal/share-proxy"]
