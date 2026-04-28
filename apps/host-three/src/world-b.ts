import * as THREE from 'three'

export const createWorldB = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#220d17')

  scene.add(new THREE.AmbientLight(0xfff3f7, 0.5))

  const key = new THREE.PointLight(0xff7799, 18)
  key.position.set(0, 3, 3)
  scene.add(key)

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(12, 64),
    new THREE.MeshStandardMaterial({ color: '#2f0f22', roughness: 0.95 })
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)

  const sphereGeo = new THREE.IcosahedronGeometry(0.45, 1)
  const sphereMat = new THREE.MeshStandardMaterial({ color: '#ff89ad', metalness: 0.2, roughness: 0.25 })

  const swarm: THREE.Mesh[] = []
  for (let i = 0; i < 24; i += 1) {
    const m = new THREE.Mesh(sphereGeo, sphereMat)
    m.position.set(Math.cos(i * 0.35) * 2.6, 0.8 + (i % 4) * 0.4, Math.sin(i * 0.35) * 2.6)
    scene.add(m)
    swarm.push(m)
  }

  // Diagnostic markers (kept commented for re-enable during portal alignment
  // debugging — see git log for the iframe Y-flip / oblique-clip work).
  // Mirrored in iframe demo's target.ts. Host should see cyan at door center
  // and magenta equally offset left/right, regardless of viewing angle.
  // const markerMat = (hex: number) => new THREE.MeshBasicMaterial({ color: hex })
  // const cyanMarker = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.05), markerMat(0x00ffff))
  // cyanMarker.position.set(0, 1.6, -0.05)
  // scene.add(cyanMarker)
  // const magLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), markerMat(0xff00ff))
  // magLeft.position.set(-1, 1.6, -0.05)
  // scene.add(magLeft)
  // const magRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.05), markerMat(0xff00ff))
  // magRight.position.set(1, 1.6, -0.05)
  // scene.add(magRight)

  const tick = (t: number) => {
    swarm.forEach((m, idx) => {
      m.position.y = 1.1 + Math.sin(t * 1.2 + idx * 0.3) * 0.5
      m.rotation.y = t * 0.6 + idx * 0.2
    })
  }

  return { scene, tick }
}
