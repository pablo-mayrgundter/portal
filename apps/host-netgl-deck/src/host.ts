// deck.gl GlobeView host with a NetGL guest in a cross-origin iframe.
//
//   ?guest=<url>   the guest page. Default: guest.html on port 5191 of this
//                  host in dev (two Vite servers, two origins); in a build,
//                  ./guest.html in a sandboxed iframe (an opaque origin, so
//                  cross-origin even on one static host, e.g. GitHub Pages).
//   ?sandbox=1|0   force the sandboxed (opaque-origin) iframe on or off.
//   ?t=<ISO date>  pin the host clock (default: now, running).
//   #lon=&lat=&zoom=&pitch=&bearing=   the camera.

import { Deck, _GlobeView as GlobeView } from '@deck.gl/core'
import { GeoJsonLayer, ScatterplotLayer, SolidPolygonLayer } from '@deck.gl/layers'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import countries110 from 'world-atlas/countries-110m.json'
import { attachNavDrawer } from '@portal/portal-controls'
import {
  attachNetGLDeckLayer,
  iframeTransport,
  type LumaDeviceLike,
  type NetGLDeckLayer
} from '@pablo-mayrgundter/portal-netgl'
import { MARKERS } from './points'

attachNavDrawer('netgl-deck')

const params = new URLSearchParams(location.search)
const hash = new URLSearchParams(location.hash.slice(1))
const num = (k: string, d: number): number => Number(hash.get(k) ?? d)
const tPin = params.get('t') ? Date.parse(params.get('t')!) : null

const defaultGuest = (): string => {
  const url = new URL('guest.html', location.href)
  if (import.meta.env.DEV) url.port = '5191'
  return url.href
}
const guestUrl = new URL(params.get('guest') ?? defaultGuest(), location.href)
const sandboxed = params.has('sandbox') ? params.get('sandbox') === '1' : !import.meta.env.DEV && !params.has('guest')
// A sandboxed iframe without allow-same-origin has the opaque origin 'null'.
const guestOrigin = sandboxed ? 'null' : guestUrl.origin

const iframe = document.createElement('iframe')
iframe.id = 'guest'
iframe.title = 'NetGL overlay guest'
if (sandboxed) iframe.setAttribute('sandbox', 'allow-scripts')
iframe.src = guestUrl.href
document.body.append(iframe)

const topo = countries110 as unknown as Topology<{ countries: GeometryCollection }>
const land = feature(topo, topo.objects.countries)

const layers = [
  new SolidPolygonLayer({
    id: 'ocean',
    data: [{ polygon: [[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]] }],
    getPolygon: (d: { polygon: [number, number][] }) => d.polygon,
    getFillColor: [8, 16, 32, 255]
  }),
  new GeoJsonLayer({
    id: 'land',
    data: land,
    filled: true,
    stroked: true,
    getFillColor: [30, 40, 58, 255],
    getLineColor: [80, 96, 128, 255],
    lineWidthMinPixels: 0.5
  }),
  // Where deck puts each marker, drawn through the globe (no depth test).
  new ScatterplotLayer({
    id: 'rings',
    data: MARKERS,
    getPosition: (d: (typeof MARKERS)[number]) => [d.lng, d.lat, d.alt],
    getRadius: 9,
    radiusUnits: 'pixels',
    stroked: true,
    filled: false,
    getLineColor: [235, 240, 255, 230],
    lineWidthUnits: 'pixels',
    getLineWidth: 1.5,
    parameters: { depthCompare: 'always', depthWriteEnabled: false }
  })
]

const status = document.getElementById('status')!
const rejects: Array<{ origin: string; reason: string }> = []
let layer: NetGLDeckLayer | null = null

const deck = new Deck({
  parent: document.getElementById('globe') as HTMLDivElement,
  views: new GlobeView({ resolution: 5, farZMultiplier: 4 }),
  // GlobeViewport takes pitch and bearing; deck 9.4's GlobeViewState type doesn't list them.
  initialViewState: { longitude: num('lon', -40), latitude: num('lat', 22), zoom: num('zoom', 1), pitch: num('pitch', 0), bearing: num('bearing', 0) } as { longitude: number; latitude: number; zoom: number },
  controller: true,
  layers,
  onDeviceInitialized: (device) => {
    layer = attachNetGLDeckLayer(deck, {
      device: device as unknown as LumaDeviceLike,
      transport: iframeTransport(iframe, { origin: guestOrigin, onReject: (r) => rejects.push(r) }),
      time: () => tPin ?? Date.now(),
      onError: (err) => console.error('[netgl-deck] replay error', err)
    })
  }
})

const showStatus = (): void => {
  const s = layer?.stats
  status.textContent = [
    `host ${location.origin}`,
    `guest ${guestOrigin}${sandboxed ? ' (sandboxed iframe)' : ''}`,
    `guest ready: ${layer?.receiver?.ready ? 'yes' : 'no'}`,
    s ? `frames: deck ${s.hostFrames}, guest ${s.guestFrames}, views sent ${s.viewsSent}` : 'waiting for deck',
    rejects.length ? `rejected messages: ${rejects.length}` : ''
  ].filter(Boolean).join('\n')
}
setInterval(showStatus, 250)

Object.assign(window, { __demo: { deck, get layer() { return layer }, markers: MARKERS, guestOrigin, sandboxed, rejects } })
