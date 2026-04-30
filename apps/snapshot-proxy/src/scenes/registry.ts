import * as THREE from 'three'
import { decodeCameraPose } from '@portal/portal-core'
import {
  colorBufferToPNG,
  type HeadlessFrameMessage
} from '@portal/portal-headless-three'
import { buildDrosteCascade } from './droste'
import { buildPairScene, PAIR_DEFAULT_POSE } from './pair'

// ---------------------------------------------------------------------------
// Scene registry. Each scene exposes the same render(query, w, h) → PNG
// shape so /render?scene=name dispatches uniformly. Adding a new scene means
// adding one entry here; the HTTP layer doesn't need to change.
// ---------------------------------------------------------------------------

export type SceneRenderInput = {
  width: number
  height: number
  pose: string | null
  depth: number | null
}

export type SceneRenderResult = {
  png: Buffer
  meta: Record<string, string>
}

export type SceneEntry = {
  name: string
  render(input: SceneRenderInput): SceneRenderResult
}

const renderDroste = (input: SceneRenderInput): SceneRenderResult => {
  const { width, height } = input
  const depth = input.depth ?? 2

  const decoded = decodeCameraPose(input.pose)
  const pose = decoded
    ? { position: decoded.position, forward: decoded.forward }
    : { position: [0, 0, 3] as [number, number, number], forward: [0, 0, -1] as [number, number, number] }

  const cam = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
  cam.updateProjectionMatrix()

  const cascade = buildDrosteCascade(depth, width, height)
  let frameMsg: HeadlessFrameMessage | null = null
  cascade.hostTransport.onMessage((msg) => {
    if (msg.type === 'portal:frame') frameMsg = msg as unknown as HeadlessFrameMessage
  })
  cascade.hostTransport.post({
    type: 'portal:setPose',
    pose: { ...pose, up: [0, 1, 0] },
    projection: Array.from(cam.projectionMatrix.elements),
    viewport: { width, height },
    time: 0
  })

  if (!frameMsg) {
    cascade.cleanup()
    throw new Error('cascade did not produce a frame')
  }

  const fm = frameMsg as unknown as HeadlessFrameMessage
  const png = colorBufferToPNG(fm.color, fm.width, fm.height)
  cascade.cleanup()
  return { png, meta: { 'X-Render-Depth': String(depth) } }
}

const renderPair = (input: SceneRenderInput): SceneRenderResult => {
  const { width, height } = input
  const decoded = decodeCameraPose(input.pose)
  const pose = decoded
    ? { position: decoded.position, forward: decoded.forward }
    : PAIR_DEFAULT_POSE

  const scene = buildPairScene(width, height)
  try {
    const png = scene.render({
      position: pose.position,
      forward: pose.forward,
      width,
      height
    })
    return { png, meta: {} }
  } finally {
    scene.cleanup()
  }
}

export const SCENES: Record<string, SceneEntry> = {
  droste: { name: 'droste', render: renderDroste },
  pair: { name: 'pair', render: renderPair }
}

export const DEFAULT_SCENE = 'pair'
