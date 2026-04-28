import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Two HTML entries: the host (index.html) and the iframe target (target.html).
// In dev mode, vite serves both automatically. For build we declare them so
// rollup emits both bundles.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        target: resolve(__dirname, 'target.html')
      }
    }
  }
})
