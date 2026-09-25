// The Cesium guest ("Cesium′"). An ordinary Cesium app — CesiumWidget,
// imagery layer, camera — plus the two-line NetGL shim:
//
//   const guest = makeNetGLCesiumGuest()
//   new Cesium.CesiumWidget(el, { contextOptions: guest.contextOptions, ... })
//   guest.attach(widget.scene)
//
// Everything else here is app behaviour for the demo: render one frame
// per host tick, and in earth mode take the host's camera.
//
// Cesium is loaded as the prebuilt global from public/cesium/Cesium.js
// (see scripts/copy-cesium.mjs); only its types are imported.

import type * as CesiumNS from 'cesium'
import { makeNetGLCesiumGuest } from '@pablo-mayrgundter/portal-netgl'
import { readMode, type CesiumError, type CesiumRendered, type CesiumTick } from './protocol'

declare const Cesium: typeof CesiumNS

const mode = readMode(location.search)
const params = new URLSearchParams(location.search)

const reportError = (err: unknown): void => {
  const message = err instanceof Error ? `${err.message}\n${err.stack ?? ''}` : String(err)
  const msg: CesiumError = { type: 'cesium:error', message }
  parent.postMessage(msg, '*')
}

let widget: CesiumNS.CesiumWidget | null = null

const onTick = (tick: CesiumTick): void => {
  const w = widget
  if (!w) return
  const camera = w.scene.camera
  if (tick.view) {
    const v = tick.view
    camera.setView({
      destination: new Cesium.Cartesian3(...v.position),
      orientation: {
        direction: new Cesium.Cartesian3(...v.direction),
        up: new Cesium.Cartesian3(...v.up)
      }
    })
    // Cesium's `fov` is the angle across the LARGER canvas dimension.
    const frustum = camera.frustum as CesiumNS.PerspectiveFrustum
    const aspect = w.canvas.clientWidth / Math.max(1, w.canvas.clientHeight)
    frustum.fov = aspect > 1 ? 2 * Math.atan(Math.tan(v.fovy / 2) * aspect) : v.fovy
  } else {
    // Door mode: slow orbit above 20°N.
    const lon = -60 + tick.time * 6
    camera.setView({ destination: Cesium.Cartesian3.fromDegrees(lon, 20, 1.6e7) })
  }
  try {
    w.resize()
    w.render() // → scene.postRender → guest.endFrame()
  } catch (err) {
    reportError(err)
  }
  const rendered: CesiumRendered = {
    type: 'cesium:rendered',
    seq: tick.seq,
    width: w.canvas.width,
    height: w.canvas.height
  }
  parent.postMessage(rendered, '*')
}

const guest = makeNetGLCesiumGuest({
  // Earth mode composites with premultiplied blending over a transparent
  // background, so Cesium's context needs an alpha channel.
  webgl: { alpha: mode === 'earth' },
  onMessage: (msg) => {
    if ((msg as { type?: unknown }).type === 'cesium:tick') onTick(msg as CesiumTick)
  }
})

const imagery = (): Promise<CesiumNS.ImageryProvider> =>
  params.get('imagery') === 'osm'
    ? Promise.resolve(new Cesium.OpenStreetMapImageryProvider({ url: 'https://tile.openstreetmap.org/' }))
    : // Bundled with Cesium — works offline, no Ion token.
      Cesium.TileMapServiceImageryProvider.fromUrl(Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII'))

try {
  widget = new Cesium.CesiumWidget(document.getElementById('cesium')!, {
    contextOptions: guest.contextOptions as unknown as CesiumNS.ContextOptions,
    baseLayer: Cesium.ImageryLayer.fromProviderAsync(imagery(), {}),
    creditContainer: document.getElementById('credits')!,
    useDefaultRenderLoop: false,
    showRenderLoopErrors: false,
    skyBox: mode === 'earth' ? false : undefined,
    msaaSamples: 1
  })
  const scene = widget.scene
  if (mode === 'earth') {
    // Everything except the globe and its atmosphere is the host's job.
    scene.backgroundColor = new Cesium.Color(0, 0, 0, 0)
    if (scene.sun) scene.sun.show = false
    if (scene.moon) scene.moon.show = false
    scene.screenSpaceCameraController.enableInputs = false
  }
  scene.renderError.addEventListener((_scene: unknown, err: unknown) => reportError(err))
  guest.attach(scene)
} catch (err) {
  reportError(err)
}
