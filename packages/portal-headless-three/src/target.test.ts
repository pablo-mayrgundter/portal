import { describe, expect, it } from 'vitest'
import { writeFileSync } from 'node:fs'
import * as THREE from 'three'
import { createLoopbackPair } from '@portal/portal-iframe'
import { makePortalPlane } from '@portal/portal-three'
import type { PortalAnchor, PortalMessage } from '@portal/portal-core'
import {
  makeHeadlessEndpoint,
  makeHeadlessTarget,
  colorBufferToPNG,
  type HeadlessFrameMessage
} from './index'

const buildSimpleScene = (): { scene: THREE.Scene; anchor: PortalAnchor } => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#220d17')
  scene.add(new THREE.AmbientLight(0xffffff, 0.5))
  const dir = new THREE.DirectionalLight(0xffffff, 1.2)
  dir.position.set(2, 3, 2)
  scene.add(dir)
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: '#ff89ad', roughness: 0.4 })
  )
  cube.position.set(0, 0, -2)
  scene.add(cube)
  // Anchor placed between camera (z=3) and the cube (z=-2). Oblique clip
  // moves the near plane to the anchor; geometry past the anchor (further
  // from camera) is kept, geometry between camera and anchor is culled.
  // The cube at z=-2 is past z=0 → kept.
  const anchor: PortalAnchor = {
    position: [0, 0, 0],
    normal: [0, 0, -1],
    up: [0, 1, 0],
    halfWidth: 1,
    halfHeight: 1
  }
  return { scene, anchor }
}

describe('makeHeadlessTarget', () => {
  it('renders a frame in response to portal:setPose and posts color+depth buffers back', () => {
    const W = 64
    const H = 48
    const { scene, anchor } = buildSimpleScene()
    const { hostTransport, targetTransport } = createLoopbackPair()

    let readyMsg: PortalMessage | null = null
    let frameMsg: HeadlessFrameMessage | null = null
    hostTransport.onMessage((msg) => {
      if (msg.type === 'portal:ready') readyMsg = msg
      else if (msg.type === 'portal:frame') {
        frameMsg = msg as unknown as HeadlessFrameMessage
      }
    })

    const target = makeHeadlessTarget({
      scene,
      anchor,
      width: W,
      height: H,
      transport: targetTransport
    })
    target.start()

    expect(readyMsg).not.toBeNull()
    expect(frameMsg).toBeNull()

    // Identity projection won't render anything sensible — use a real
    // perspective matrix so the cube is in view.
    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    cam.updateProjectionMatrix()
    hostTransport.post({
      type: 'portal:setPose',
      pose: { position: [0, 0, 3], forward: [0, 0, -1], up: [0, 1, 0] },
      projection: Array.from(cam.projectionMatrix.elements),
      viewport: { width: W, height: H },
      time: 0
    })

    // Loopback delivers synchronously — by the time the post returns, the
    // target has rendered and the frame is back in our handler.
    expect(frameMsg).not.toBeNull()
    const fm = frameMsg as unknown as HeadlessFrameMessage
    expect(fm.width).toBe(W)
    expect(fm.height).toBe(H)
    expect(fm.color).toBeInstanceOf(Uint8Array)
    expect(fm.color.length).toBe(W * H * 4)
    expect(fm.depth).toBeInstanceOf(Uint8Array)
    expect(fm.depth.length).toBe(W * H * 4)

    // Background is #220d17 ≈ rgb(34, 13, 23). Pick a corner pixel that
    // shouldn't have anything in front of it (top-left when oriented
    // top-down; in OpenGL bottom-left raw, so origin (0,0) is bottom-left
    // and that's a corner well outside any geometry).
    // Cube sits at z=-2 with size 1, camera at z=3 — corner of the
    // viewport is well outside the cube's silhouette.
    const r = fm.color[0]
    const g = fm.color[1]
    const b = fm.color[2]
    // sRGB-encoded background. Allow loose tolerance — exact values depend
    // on linear→sRGB encoding inside the renderer, ANGLE's rounding, etc.
    expect(r).toBeGreaterThan(20)
    expect(r).toBeLessThan(80)
    expect(b).toBeGreaterThan(20)
    expect(b).toBeLessThan(80)

    target.stop()
  })

  it('recursion: outer target composites an inner target through a child portal', () => {
    // Two headless targets connected via loopback. Outer scene is a red room
    // with a portal-plane mesh; inner scene is a blue room with a green
    // cube. Driver asks outer for a frame at a pose that looks through the
    // outer's child portal — the rendered PNG should show outer's red bg
    // around the door rectangle and inner's blue/green content inside it.
    const W = 320
    const H = 240

    // ----- inner level (the destination world)
    const innerScene = new THREE.Scene()
    innerScene.background = new THREE.Color('#001a3f')
    innerScene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const innerCube = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: '#33ff66', roughness: 0.4 })
    )
    innerCube.position.set(0, 0, -2)
    innerScene.add(innerCube)
    const innerAnchor: PortalAnchor = {
      position: [0, 0, 0],
      normal: [0, 0, -1],
      up: [0, 1, 0],
      halfWidth: 1,
      halfHeight: 1
    }

    // ----- outer level (the user-visible world, with a child portal mesh)
    const outerScene = new THREE.Scene()
    outerScene.background = new THREE.Color('#3f0010')
    outerScene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const outerAnchor: PortalAnchor = {
      position: [0, 0, -10],
      normal: [0, 0, -1],
      up: [0, 1, 0],
      halfWidth: 1,
      halfHeight: 1
    }
    // Mesh placed inside outer scene at the child-portal door pose. The
    // mesh itself is invisible (makePortalPlane → MeshBasicMaterial with
    // visible:false); it serves only as a world-pose source for the
    // stencil mask machinery.
    const outerChildPortalMesh = makePortalPlane(new THREE.Vector2(2, 2))
    outerChildPortalMesh.position.set(0, 0, -2)
    outerScene.add(outerChildPortalMesh)

    // ----- wire up
    // Inner pair: outer-host ↔ inner-target. Construct the endpoint BEFORE
    // calling target.start() so the endpoint's onMessage handler is
    // subscribed when sendReady fires synchronously over the loopback —
    // otherwise the portal:ready is dropped and isReady() returns false.
    const innerLoop = createLoopbackPair()
    const innerEndpoint = makeHeadlessEndpoint({ transport: innerLoop.hostTransport })
    const innerTarget = makeHeadlessTarget({
      scene: innerScene,
      anchor: innerAnchor,
      width: W,
      height: H,
      transport: innerLoop.targetTransport
    })
    innerTarget.start()

    // Outer pair: driver ↔ outer-target
    const outerLoop = createLoopbackPair()
    const outerTarget = makeHeadlessTarget({
      scene: outerScene,
      anchor: outerAnchor,
      width: W,
      height: H,
      transport: outerLoop.targetTransport,
      portals: [{ anchor: outerChildPortalMesh, endpoint: innerEndpoint }]
    })
    outerTarget.start()

    let frameMsg: HeadlessFrameMessage | null = null
    outerLoop.hostTransport.onMessage((msg) => {
      if (msg.type === 'portal:frame') frameMsg = msg as unknown as HeadlessFrameMessage
    })

    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    cam.updateProjectionMatrix()
    outerLoop.hostTransport.post({
      type: 'portal:setPose',
      pose: { position: [0, 0, 3], forward: [0, 0, -1], up: [0, 1, 0] },
      projection: Array.from(cam.projectionMatrix.elements),
      viewport: { width: W, height: H },
      time: 0
    })

    // Loopback delivers synchronously top-to-bottom: driver→outer→inner→
    // back-up, so by the time post() returns we have the composited frame.
    expect(frameMsg).not.toBeNull()
    const fm = frameMsg as unknown as HeadlessFrameMessage
    writeFileSync(
      '/tmp/portal-headless-recursion-smoke.png',
      colorBufferToPNG(fm.color, fm.width, fm.height)
    )

    // Center pixel should NOT be the outer scene's red bg (we're looking
    // through the child portal door at center). It should be inner's blue
    // bg or the green cube. Either way, blue channel > red channel.
    const cx = Math.floor(fm.width / 2)
    const cy = Math.floor(fm.height / 2)
    const idx = (cy * fm.width + cx) * 4
    const r = fm.color[idx]
    const g = fm.color[idx + 1]
    const b = fm.color[idx + 2]
    // Inner content (blue bg or green cube) should show through the door.
    // Loose check: a non-red-dominant pixel at center is enough.
    expect(b + g).toBeGreaterThan(r)

    // Corner pixel should be outer's red bg (red-dominant).
    const cornerR = fm.color[0]
    const cornerB = fm.color[2]
    expect(cornerR).toBeGreaterThan(cornerB)

    outerTarget.stop()
    innerTarget.stop()
  })

  it('writes a recognisable PNG for visual eyeballing', () => {
    const W = 320
    const H = 240
    const { scene, anchor } = buildSimpleScene()
    const { hostTransport, targetTransport } = createLoopbackPair()

    let frameMsg: HeadlessFrameMessage | null = null
    hostTransport.onMessage((msg) => {
      if (msg.type === 'portal:frame') frameMsg = msg as unknown as HeadlessFrameMessage
    })

    const target = makeHeadlessTarget({
      scene,
      anchor,
      width: W,
      height: H,
      transport: targetTransport
    })
    target.start()

    const cam = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    cam.updateProjectionMatrix()
    hostTransport.post({
      type: 'portal:setPose',
      pose: { position: [0, 0, 3], forward: [0, 0, -1], up: [0, 1, 0] },
      projection: Array.from(cam.projectionMatrix.elements),
      viewport: { width: W, height: H },
      time: 0
    })

    const fm = frameMsg as unknown as HeadlessFrameMessage
    writeFileSync(
      '/tmp/portal-headless-target-smoke.png',
      colorBufferToPNG(fm.color, fm.width, fm.height)
    )

    target.stop()
  })
})
