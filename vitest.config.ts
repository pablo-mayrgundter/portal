import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**', 'external/**'],
    // The first headless-gl context in a test file takes about 6 s on a
    // GitHub runner (under xvfb), over vitest's 5 s default: npm-publish's
    // Test step timed out on it (run 36633523396).
    testTimeout: 30_000
  }
})
