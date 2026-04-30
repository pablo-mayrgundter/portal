import * as THREE from 'three'
import { createLoopbackPair, type ChildPortal, type PortalTransport } from '@portal/portal-iframe'
import { makePortalPlane } from '@portal/portal-three'
import type { PortalAnchor } from '@portal/portal-core'
import {
  makeHeadlessEndpoint,
  makeHeadlessTarget,
  type HeadlessPortalEndpoint,
  type HeadlessTarget
} from '@portal/portal-headless-three'

// Same Droste cascade machinery used in portal-headless-three's tests,
// extracted here so the snapshot proxy can build cascades on demand.
//
// Each level renders a depth-coloured background + per-depth cube count
// above the door area, plus a child portal that recurses to the next level.
// Doors shrink by DOOR_SHRINK per level so the recursion shows as visibly
// nested rings (instead of collapsing to a uniform deepest-level colour).

const ANCHOR_Z = 0
const PORTAL_HALF = 1.0
const DOOR_SHRINK = 0.7
const MAX_DEPTH = 12

const standardMainAnchor: PortalAnchor = {
  position: [0, 0, ANCHOR_Z],
  normal: [0, 0, -1],
  up: [0, 1, 0],
  halfWidth: PORTAL_HALF,
  halfHeight: PORTAL_HALF
}

const LEVEL_COLOURS = [
  '#3f0010',
  '#0e3f00',
  '#00153f',
  '#3f2f00',
  '#3f003a',
  '#003f3a'
]

const cubeColourFor = (depth: number): string =>
  ['#ff7755', '#88ff77', '#7799ff', '#ffe060', '#ff77dd', '#77eedd'][depth % 6]

const buildLevelScene = (
  depth: number
): { scene: THREE.Scene; childPortalMesh: THREE.Mesh } => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(LEVEL_COLOURS[depth % LEVEL_COLOURS.length])
  scene.add(new THREE.AmbientLight(0xffffff, 0.7))
  const dir = new THREE.DirectionalLight(0xffffff, 0.8)
  dir.position.set(2, 3, 2)
  scene.add(dir)

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
    cube.position.set(offset + i * spacing, 2, -2)
    scene.add(cube)
  }

  const childHalf = PORTAL_HALF * Math.pow(DOOR_SHRINK, depth + 1)
  const childPortalMesh = makePortalPlane(new THREE.Vector2(2 * childHalf, 2 * childHalf))
  childPortalMesh.position.set(0, 0, ANCHOR_Z)
  scene.add(childPortalMesh)

  return { scene, childPortalMesh }
}

export type DrosteCascade = {
  /** Tear down all targets in the cascade. */
  cleanup(): void
  /** outermost loop's hostTransport — driver POSTs setPose here, gets frame back. */
  hostTransport: PortalTransport
}

/**
 * Build a chain of `depth+1` headless targets connected via loopback pairs.
 * Caller drives `hostTransport` with a portal:setPose to render. Caller is
 * responsible for subscribing to portal:frame on the same hostTransport
 * BEFORE posting setPose.
 *
 * Construction order: deepest first, then wrap each shallower level around
 * it. Endpoints are subscribed before their target.start() so the synchronous
 * portal:ready post over loopback is captured.
 */
export const buildDrosteCascade = (
  maxDepth: number,
  width: number,
  height: number
): DrosteCascade => {
  if (maxDepth < 0 || maxDepth > MAX_DEPTH) {
    throw new Error(`droste cascade depth must be 0..${MAX_DEPTH}, got ${maxDepth}`)
  }

  const cleanups: Array<() => void> = []
  let childEndpoint: HeadlessPortalEndpoint | null = null

  const driverLoop = createLoopbackPair()

  for (let depth = maxDepth; depth >= 0; depth -= 1) {
    const { scene, childPortalMesh } = buildLevelScene(depth)

    let portals: ChildPortal[] | undefined
    if (childEndpoint !== null) {
      portals = [{ anchor: childPortalMesh, endpoint: childEndpoint }]
    }

    let myTargetTransport: PortalTransport
    let myEndpoint: HeadlessPortalEndpoint | null = null
    if (depth === 0) {
      myTargetTransport = driverLoop.targetTransport
    } else {
      const loop = createLoopbackPair()
      myEndpoint = makeHeadlessEndpoint({ transport: loop.hostTransport })
      myTargetTransport = loop.targetTransport
    }

    const target: HeadlessTarget = makeHeadlessTarget({
      scene,
      anchor: standardMainAnchor,
      width,
      height,
      transport: myTargetTransport,
      portals
    })
    target.start()
    cleanups.push(() => target.stop())

    childEndpoint = myEndpoint
  }

  return {
    cleanup: () => cleanups.forEach((c) => c()),
    hostTransport: driverLoop.hostTransport
  }
}
