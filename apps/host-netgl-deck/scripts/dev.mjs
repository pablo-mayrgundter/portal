// Two Vite dev servers on two ports, so the host (5190) and the guest
// (5191) are different origins, as netmap and celestiary are in production.
// Open http://localhost:5190/. For a cross-site guest (a separate process
// in Chromium, as celestiary.org inside github.io is), open
// http://localhost:5190/?guest=http://127.0.0.1:5191/guest.html
import { createServer } from 'vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
for (const port of [5190, 5191]) {
  const server = await createServer({ root, configFile: resolve(root, 'vite.config.ts'), server: { port, strictPort: true } })
  await server.listen()
  server.printUrls()
}
