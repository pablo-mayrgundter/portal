// Host page for the NetGL + Cesium demo. Picks a mode from ?mode=, points
// the hidden guest iframe at cesium.html with the same mode, and hands off.

import { attachNavDrawer } from '@portal/portal-controls'
import { runDoorMode } from './door'
import { runEarthMode } from './earth'
import { readMode } from './protocol'

attachNavDrawer('netgl-cesium')

const mode = readMode(location.search)
const params = new URLSearchParams(location.search)

const mount = document.querySelector<HTMLDivElement>('#app')!
const iframe = document.querySelector<HTMLIFrameElement>('#guest')!
const status = document.querySelector<HTMLDivElement>('#status')!
const lagEl = document.querySelector<HTMLSpanElement>('#lag')!

const guestParams = new URLSearchParams({ mode })
const imagery = params.get('imagery')
if (imagery) guestParams.set('imagery', imagery)
iframe.src = `cesium.html?${guestParams}`

document.querySelectorAll<HTMLAnchorElement>('a[data-mode]').forEach((a) => {
  const p = new URLSearchParams(location.search)
  p.set('mode', a.dataset.mode!)
  a.href = `?${p}`
  if (a.dataset.mode === mode) a.classList.add('current')
})
document.querySelector<HTMLElement>(`[data-help="${mode}"]`)!.hidden = false

const onStatus = (text: string): void => {
  status.textContent = text
  status.hidden = false
}

// The iframe's window exists immediately (about:blank → cesium.html keeps
// the same WindowProxy), so the transport can be wired before it loads.
if (mode === 'earth') {
  runEarthMode({
    iframe,
    mount,
    onStatus,
    startTime: Number(params.get('time') ?? 0),
    paused: params.has('pause'),
    onLag: (frames) => {
      lagEl.textContent = String(Math.max(0, frames))
    }
  })
} else {
  runDoorMode({ iframe, mount, onStatus })
}
