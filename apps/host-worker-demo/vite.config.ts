import { defineConfig } from 'vite'

// Single HTML entry — the worker entrypoint is referenced via
// `new Worker(new URL('./src/worker.ts', import.meta.url), { type: 'module' })`
// in main.ts, so vite picks it up automatically and bundles a separate
// worker chunk. No multi-page rollup config needed.
export default defineConfig({})
