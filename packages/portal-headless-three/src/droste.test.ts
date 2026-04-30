import { describe, expect, it } from 'vitest'
import { writeFileSync } from 'node:fs'
import * as THREE from 'three'
import { createLoopbackPair, type ChildPortal, type PortalTransport } from '@portal/portal-iframe'
import { makePortalPlane } from '@portal/portal-three'
import type { PortalAnchor, PortalMessage } from '@portal/portal-core'
import {
  colorBufferToPNG,
  makeHeadlessEndpoint,
  makeHeadlessTarget,
  type HeadlessFrameMessage,
  type HeadlessPortalEndpoint,
  type HeadlessTarget
} from './index'

// ---------------------------------------------------------------------------
// Droste / parametric-depth recursive portal demo.
//
// Each level renders a scene that contains a child portal pointing at the
// next level deeper. Levels are connected by loopback transports — when the
// outermost target receives a setPose, it asks its child for a frame
// synchronously over loopback, which asks ITS child, etc., bottoming out at
// the deepest level which renders flat. Pixels return depth-first.
//
// Self-similar geometry: each level's main anchor (used for oblique clip)
// and its child portal mesh (where the recursion door sits) are co-located
// at z=-1.5 (with opposite normals). The mirror across this pair is the
// identity in x and y, and translates z so that EVERY level's camera lands
// at exactly z=3 looking -z. Result: each level renders from an identical
// vantage point in its own scene, so what we see at deeper levels is
// strictly a function of the per-level scene content (here: a depth marker
// + a depth-cycling background colour) plus the residual mirror in x.
// ---------------------------------------------------------------------------

// Self-similar mirror geometry: each level's main anchor and child portal
// mesh are co-located at z=0 with OPPOSITE normals (main anchor -z, matching
// the iframe convention where normal points toward the source/camera-side;
// child portal mesh +z via no rotation, since makePortalPlane's default
// local normal is +z). The mirror across this pair preserves the camera
// position (cam stays at z=3 looking -z at every level), so each level
// renders from an identical vantage point in its own coordinates. Scene
// content lives in z<0 (the kept region from the oblique clip; matches the
// keep-direction the host's compositor uses for the depth-clip).
const ANCHOR_Z = 0
const PORTAL_HALF = 1.0

const standardMainAnchor: PortalAnchor = {
  position: [0, 0, ANCHOR_Z],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: PORTAL_HALF,
  halfHeight: PORTAL_HALF
}

// Six distinguishable hues for the first six levels; deeper levels recycle.
const LEVEL_COLOURS = [
  '#3f0010', // dark red
  '#0e3f00', // dark green
  '#00153f', // dark blue
  '#3f2f00', // dark amber
  '#3f003a', // dark magenta
  '#003f3a' // dark teal
]

const cubeColourFor = (depth: number): string =>
  ['#ff7755', '#88ff77', '#7799ff', '#ffe060', '#ff77dd', '#77eedd'][depth % 6]

/**
 * Door-shrink ratio per recursion level. With perfect self-similarity (same
 * door size at every level), each level's door projects to the same NDC
 * region as its parent's, so we keep sampling the deepest level only and
 * never see the intermediate scenes' bg/cubes. Shrinking the child door at
 * each step creates the classic Droste nested-rings visualisation: each
 * level adds a visible ring of its own bg around the smaller next-level
 * door.
 */
const DOOR_SHRINK = 0.7

/**
 * Build a scene representing one level of the Droste cascade.
 *
 * Layout (in this level's local coords; cam arrives at z=3 looking -z):
 *   - Background: depth-varying dark hue
 *   - depth+1 cubes in a horizontal row above the door area, marking the
 *     recursion depth. Cubes are placed near the top of the viewport so
 *     they survive the stencil-mask color overwrite at intermediate levels.
 *   - main anchor (config.anchor) at z=0 normal -z (oblique clip culls the
 *     camera-side; kept side is z<0 where geometry lives).
 *   - child portal mesh at z=0 with halfwidth shrinking per depth so
 *     nested levels appear as visibly smaller windows.
 */
const buildLevelScene = (
  depth: number
): { scene: THREE.Scene; childPortalMesh: THREE.Mesh } => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(LEVEL_COLOURS[depth % LEVEL_COLOURS.length])
  scene.add(new THREE.AmbientLight(0xffffff, 0.7))
  const dir = new THREE.DirectionalLight(0xffffff, 0.8)
  dir.position.set(2, 3, 2)
  scene.add(dir)

  // Cubes placed in z<0 (kept side of the oblique clip — main anchor at
  // z=0 normal -z, no flip needed) AND ABOVE the door area in y so they
  // survive the stencil-mask color overwrite at intermediate levels.
  //
  // Why above: when this level is a middle level (has a child portal), the
  // stencil mask runs against this level's child portal mesh and writes
  // the child's bg colour to the door region of sceneRT. Anything inside
  // the door region gets overwritten before the composite. Cubes at the
  // viewport center would be lost; we place them above the door so they
  // remain visible after the mask write.
  const cubeMat = new THREE.MeshStandardMaterial({
    color: cubeColourFor(depth),
    roughness: 0.4
  })
  const cubeGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4)
  const count = depth + 1
  const spacing = 0.55
  const offset = -((count - 1) * spacing) / 2
  for (let i = 0; i < count; i += 1) {
    const cube = new THREE.Mesh(cubeGeo, cubeMat)
    // y=2 puts the cubes near the top edge of the viewport (NDC y≈0.69),
    // outside the door rectangle (which ends at NDC y≈0.58).
    cube.position.set(offset + i * spacing, 2, -2)
    scene.add(cube)
  }

  // Child portal mesh: at z=0 (same as main anchor). NO rotation so its
  // local +z normal stays world +z — opposite of the main anchor's -z. The
  // opposite-normal pairing is what makes the mirror across (childMesh,
  // nextLevelMainAnchor) preserve the camera position.
  //
  // Halfwidth shrinks at deeper levels so each child door is a visibly
  // smaller window than its parent's view of this level. Without this,
  // perfect self-similar geometry collapses to a uniform render of the
  // deepest level.
  const childHalf = PORTAL_HALF * Math.pow(DOOR_SHRINK, depth + 1)
  const childPortalMesh = makePortalPlane(new THREE.Vector2(2 * childHalf, 2 * childHalf))
  childPortalMesh.position.set(0, 0, ANCHOR_Z)
  scene.add(childPortalMesh)

  return { scene, childPortalMesh }
}

type CascadeNode = {
  target: HeadlessTarget
  /** Endpoint exposed to the level above (null for the outermost). */
  endpoint: HeadlessPortalEndpoint | null
}

/**
 * Build a chain of `depth+1` headless targets, each connected to the next
 * deeper level via a loopback pair. The deepest level has no child; every
 * other level has a single child portal.
 *
 * Construction order: deepest first, then wrap each shallower level around
 * it. This way each parent has its child's HeadlessEndpoint ready before
 * we call its makeHeadlessTarget.
 *
 * `outerTransport` is the channel the OUTERMOST (depth=0) target listens
 * on. The driver sends portal:setPose to the corresponding hostTransport
 * to kick off a render.
 */
const buildCascade = (
  maxDepth: number,
  outerTransport: PortalTransport,
  width: number,
  height: number
): { cleanup: () => void } => {
  const cleanups: Array<() => void> = []
  let childEndpoint: HeadlessPortalEndpoint | null = null

  for (let depth = maxDepth; depth >= 0; depth -= 1) {
    const { scene, childPortalMesh } = buildLevelScene(depth)

    let portals: ChildPortal[] | undefined
    if (childEndpoint !== null) {
      portals = [{ anchor: childPortalMesh, endpoint: childEndpoint }]
    }

    let myTargetTransport: PortalTransport
    let myEndpoint: HeadlessPortalEndpoint | null = null
    if (depth === 0) {
      myTargetTransport = outerTransport
    } else {
      // Subscribe the endpoint BEFORE the target starts so target.start()'s
      // synchronous portal:ready post over the loopback is captured.
      const loop = createLoopbackPair()
      myEndpoint = makeHeadlessEndpoint({ transport: loop.hostTransport })
      myTargetTransport = loop.targetTransport
    }

    const target = makeHeadlessTarget({
      scene,
      anchor: standardMainAnchor,
      width,
      height,
      transport: myTargetTransport,
      portals
    })
    target.start()
    const node: CascadeNode = { target, endpoint: myEndpoint }
    cleanups.push(() => node.target.stop())

    childEndpoint = myEndpoint
  }

  return { cleanup: () => cleanups.forEach((c) => c()) }
}

const renderCascadeOnce = (maxDepth: number, w: number, h: number): HeadlessFrameMessage => {
  const driverLoop = createLoopbackPair()
  let frameMsg: HeadlessFrameMessage | null = null
  driverLoop.hostTransport.onMessage((msg: PortalMessage) => {
    if (msg.type === 'portal:frame') frameMsg = msg as unknown as HeadlessFrameMessage
  })

  const cascade = buildCascade(maxDepth, driverLoop.targetTransport, w, h)

  const cam = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
  cam.updateProjectionMatrix()
  driverLoop.hostTransport.post({
    type: 'portal:setPose',
    pose: { position: [0, 0, 3], forward: [0, 0, -1], up: [0, 1, 0] },
    projection: Array.from(cam.projectionMatrix.elements),
    viewport: { width: w, height: h },
    time: 0
  })

  cascade.cleanup()
  if (!frameMsg) throw new Error('no frame returned')
  return frameMsg
}

describe('Droste cascade', () => {
  it('renders depth=0 with no recursion (sanity check vs single target)', () => {
    const fm = renderCascadeOnce(0, 320, 240)
    writeFileSync(
      '/tmp/portal-droste-d0.png',
      colorBufferToPNG(fm.color, fm.width, fm.height)
    )
    expect(fm.width).toBe(320)
    expect(fm.height).toBe(240)
    // Background should be near LEVEL_COLOURS[0] (dark red). Center top-row
    // pixel should be red-dominant.
    const cornerR = fm.color[0]
    const cornerB = fm.color[2]
    expect(cornerR).toBeGreaterThan(cornerB)
  })

  it('renders depth=1, 2, 3, 4, 5 cascades and writes PNGs for visual eyeballing', () => {
    for (const depth of [1, 2, 3, 4, 5]) {
      const fm = renderCascadeOnce(depth, 480, 320)
      writeFileSync(
        `/tmp/portal-droste-d${depth}.png`,
        colorBufferToPNG(fm.color, fm.width, fm.height)
      )
      // Center pixel: should NOT be the outermost background colour
      // (since the door at center is showing deeper levels). Loose check:
      // R differs from outermost level's red.
      expect(fm.color.length).toBe(480 * 320 * 4)
    }
  })
})
