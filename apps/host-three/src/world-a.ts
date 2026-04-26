import * as THREE from 'three'

export const createWorldA = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#101826')

  const hemi = new THREE.HemisphereLight(0xb9ccff, 0x223344, 1)
  scene.add(hemi)

  const dir = new THREE.DirectionalLight(0xffffff, 0.65)
  dir.position.set(3, 6, 2)
  scene.add(dir)

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(18, 18),
    new THREE.MeshStandardMaterial({ color: '#1b2a3f', roughness: 0.95, metalness: 0.03 })
  )
  floor.rotation.x = -Math.PI / 2
  scene.add(floor)

  const boxGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9)
  const boxMat = new THREE.MeshStandardMaterial({ color: '#5da9ff', roughness: 0.35 })
  for (let i = 0; i < 14; i += 1) {
    const box = new THREE.Mesh(boxGeo, boxMat)
    box.position.set(Math.sin(i * 0.5) * 4, 0.45, -3 - i * 0.65)
    scene.add(box)
  }

  return { scene }
}
