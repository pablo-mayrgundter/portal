// Door mode: the Cesium globe seen through a rectangular portal standing in
// a three.js room — the same composition as the celestiary demo, but the
// compositing rules (stencil clip, no background clear) come from the
// replay's screen policy instead of the guest shim.

import * as THREE from 'three'
import { attachBasicFlyControls } from '@portal/portal-controls'
import {
  PORTAL_STENCIL_REF,
  makePortalPlane,
  makePortalStencilMask,
  portalScreenRect,
  type PixelRect
} from '@portal/portal-three'
import { makeHostShared } from './shared'

export const runDoorMode = (opts: {
  iframe: HTMLIFrameElement
  mount: HTMLElement
  onStatus: (text: string) => void
}): void => {
  let doorRect: PixelRect | null = null

  const shared = makeHostShared({
    ...opts,
    replay: () => ({
      // "Cover" fit: scale the guest's full-canvas viewport, preserving its
      // aspect, to the smallest rect containing the door. The stencil
      // crops the overflow.
      remapScreenViewport: (_x, _y, w, h) => {
        const r = doorRect
        if (!r) return null
        const guestAspect = w / h
        const coverW = guestAspect > r.w / r.h ? r.h * guestAspect : r.w
        const coverH = coverW / guestAspect
        return [
          Math.floor(r.x + (r.w - coverW) / 2),
          Math.floor(r.y + (r.h - coverH) / 2),
          Math.ceil(coverW),
          Math.ceil(coverH)
        ]
      },
      screen: { stencil: { ref: PORTAL_STENCIL_REF }, clear: 'depth-only' }
    })
  })
  const { renderer, receiver } = shared

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.02, 200)
  camera.position.set(0, 1.6, 5.5)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#101826')
  scene.add(new THREE.HemisphereLight(0xb9ccff, 0x223344, 1))
  const sun = new THREE.DirectionalLight(0xffffff, 0.65)
  sun.position.set(3, 6, 2)
  scene.add(sun)
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshStandardMaterial({ color: '#1b2a3f', roughness: 0.95, metalness: 0.03 })
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)
  const cubeGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9)
  const cubeMat = new THREE.MeshStandardMaterial({ color: '#5da9ff', roughness: 0.35 })
  for (let i = 0; i < 14; i += 1) {
    const c = new THREE.Mesh(cubeGeo, cubeMat)
    c.position.set(Math.sin(i * 0.5) * 4, 0.45, -3 - i * 0.65)
    scene.add(c)
  }

  const door = makePortalPlane(new THREE.Vector2(2.6, 3.2))
  door.position.set(0, 1.6, -3.5)
  scene.add(door)
  const stencilMask = makePortalStencilMask()
  const doorBackground = new THREE.Color('#000000')

  const controls = attachBasicFlyControls(camera, renderer.domElement)
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  const clock = new THREE.Clock()
  const frame = (): void => {
    controls.update(clock.getDelta())

    renderer.resetState()
    renderer.setRenderTarget(null)
    renderer.clear(true, true, true)
    renderer.render(scene, camera)

    if (receiver.ready) {
      stencilMask.update(door, camera, doorBackground)
      renderer.render(stencilMask.scene, stencilMask.camera)
      renderer.clearDepth()
      const { width, height } = shared.canvasSize()
      doorRect = portalScreenRect(door, camera, { width, height })
      if (doorRect) receiver.drain()
      renderer.resetState()
    }

    shared.tick(clock.elapsedTime)
    requestAnimationFrame(frame)
  }
  frame()
}
