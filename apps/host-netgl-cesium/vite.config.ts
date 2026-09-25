import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Two HTML entries: the three.js host (index.html) and the Cesium guest
// (cesium.html) that the host iframes.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cesium: resolve(__dirname, 'cesium.html')
      }
    }
  }
})
