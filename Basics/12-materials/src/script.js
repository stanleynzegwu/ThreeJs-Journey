import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'

const gui = new  lil.GUI()
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
//Textures
const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter
//Because we use NearestFilter
gradientTexture.generateMipmaps = false

//object
// const material = new THREE.MeshBasicMaterial({color:'red',map:gradientTexture})
//material.side = THREE.BackSide
//material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()

//const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture})

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial({shininess:100,specular:'red'})

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

const material = new THREE.MeshStandardMaterial({map:colorTexture})
material.metalness = 0.50
material.roughness = 0.55
material.aoMap = ambientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = heightTexture
material.displacementScale = 0.05
material.metalnessMap = metalnessTexture
material.roughnessMap = roughnessTexture
material.normalMap = normalTexture
material.normalScale.set(0.5,0.5)

// material.wireframe = true
material.side = THREE.DoubleSide
// material.map = colorTexture

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1)
gui.add(material,'aoMapIntensity').min(0).max(1).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(0.5)


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5,64,64),material)
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2))
sphere.position.x = -2


const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1,100,100),material)
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5,0.2,64,128),material)
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2))
torus.position.x = 2
scene.add(sphere,plane,torus)

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update object
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x= 0.1 * elapsedTime
    plane.rotation.x= 0.1 * elapsedTime
    torus.rotation.x= 0.1 * elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()