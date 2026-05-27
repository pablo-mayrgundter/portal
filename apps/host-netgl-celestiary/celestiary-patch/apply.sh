#!/usr/bin/env bash
# Apply portal patches to the celestiary submodule, build it at the right base
# path, and copy the build output into this app's public/celestiary/ so vite
# can serve it as a static asset.
#
# Idempotent: re-running first resets the submodule to its tracked commit so a
# partially-applied state doesn't accumulate.

set -euo pipefail

PORTAL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
CELESTIARY="$PORTAL_ROOT/external/celestiary"
PATCH_DIR="$PORTAL_ROOT/apps/host-netgl-celestiary/celestiary-patch"
APP_PUBLIC="$PORTAL_ROOT/apps/host-netgl-celestiary/public"

if [ ! -d "$CELESTIARY/.git" ] && [ ! -f "$CELESTIARY/.git" ]; then
  echo "celestiary submodule missing — run: git submodule update --init"
  exit 1
fi

echo "==> Resetting celestiary submodule to clean tracked state"
git -C "$CELESTIARY" checkout -- .
git -C "$CELESTIARY" clean -fd

echo "==> Applying celestiary.patch"
git -C "$CELESTIARY" apply "$PATCH_DIR/celestiary.patch"

echo "==> Copying portal-shim.js into celestiary/public/"
cp "$PATCH_DIR/portal-shim.js" "$CELESTIARY/public/portal-shim.js"

if [ ! -d "$CELESTIARY/node_modules" ]; then
  echo "==> Installing celestiary deps (yarn)"
  (cd "$CELESTIARY" && yarn install)
fi

echo "==> Building celestiary with BASE_PATH=/celestiary/"
(cd "$CELESTIARY" && BASE_PATH=/celestiary/ yarn build)

echo "==> Copying celestiary/docs into apps/host-netgl-celestiary/public/celestiary/"
mkdir -p "$APP_PUBLIC/celestiary"
cp -a "$CELESTIARY/docs/." "$APP_PUBLIC/celestiary/"

echo "==> Done. npm run dev:netgl-celestiary"
