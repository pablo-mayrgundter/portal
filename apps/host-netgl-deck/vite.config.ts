import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// Two HTML entries: the deck.gl host (index.html) and the three.js overlay
// guest (guest.html) that the host iframes from another origin.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        guest: resolve(__dirname, 'guest.html')
      }
    }
  }
})
