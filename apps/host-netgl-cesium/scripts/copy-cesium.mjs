// Copy Cesium's prebuilt bundle + static assets into public/cesium/ so the
// guest page can load it with a plain <script> tag and Cesium can fetch its
// Workers / Assets / ThirdParty (wasm) at runtime from CESIUM_BASE_URL.
// Loading the prebuilt IIFE keeps Cesium out of vite's dependency graph —
// no bundler plugin needed.
//
// Idempotent; skips the copy when the installed version is already there.

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const appDir = dirname(dirname(fileURLToPath(import.meta.url)))
const cesiumPkg = require.resolve('cesium/package.json', { paths: [appDir] })
const { version } = JSON.parse(readFileSync(cesiumPkg, 'utf8'))
const src = join(dirname(cesiumPkg), 'Build', 'Cesium')
const dest = join(appDir, 'public', 'cesium')
const stamp = join(dest, '.version')

if (existsSync(stamp) && readFileSync(stamp, 'utf8') === version) {
  console.log(`cesium ${version} already in public/cesium/`)
  process.exit(0)
}

rmSync(dest, { recursive: true, force: true })
mkdirSync(dest, { recursive: true })
for (const entry of ['Cesium.js', 'Workers', 'Assets', 'ThirdParty', 'Widgets']) {
  cpSync(join(src, entry), join(dest, entry), { recursive: true })
}
writeFileSync(stamp, version)
console.log(`copied cesium ${version} → public/cesium/`)
