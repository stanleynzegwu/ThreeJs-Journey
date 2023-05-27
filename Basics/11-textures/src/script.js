import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Textures
// const image = new Image()
// const texture = new THREE.Texture(image)
// //you could also use addEventListener 
// image.onload = () => {
//     texture.needsUpdate = true
// }
// image.src = '/textures/door/color.jpg'
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => { 
//     console.log('onStart')
// }
// loadingManager.onProgress = () => { 
//     console.log('onProgress')
// }
// loadingManager.onLoad = () => { 
//     console.log('onLoaded')
// }
// loadingManager.onStart = () => { 
//     console.log('onStart')
// }
// loadingManager.onError = () => { 
//     console.log('onError')
// }
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
// const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const heightTexture = textureLoader.load('/textures/door/height.jpg')
// const normalTexture = textureLoader.load('/textures/door/normal.jpg')
// const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const checkerboardTexture = textureLoader.load('/textures/checkerboard-8x8.png')
checkerboardTexture.magFilter = THREE.NearestFilter
// checkerboardTexture.magFilter = THREE.NearestFilter
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ map: checkerboardTexture})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.z = 1
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

//BELOW WAS ME PLAYING AROUND

// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'; 

// const gui = new GUI();



// const sizes = {
//     width:window.innerWidth,
//     height:window.innerHeight
// }
// const obj = {
//     shouldRotate:false,
// }

// const scene = new THREE.Scene()
// const geometry = new THREE.BoxGeometry(1,1,1)
// const geometry1 = new THREE.SphereGeometry(1,2,2)
// const textureLoader = new THREE.TextureLoader()
// const colorTexture = textureLoader.load('/textures/door/color.jpg')
//  const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
//  const heightTexture = textureLoader.load('/textures/door/height.jpg')
//  const normalTexture = textureLoader.load('/textures/door/normal.jpg')
//  const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
//  const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
//  const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
//  let num = 0
//  const textureArr = [colorTexture,alphaTexture,heightTexture,normalTexture,ambientOcclusionTexture,metalnessTexture,roughnessTexture]
// const material = new THREE.MeshBasicMaterial({map:textureArr[num]})
// const material1 = new THREE.MeshBasicMaterial({color:'blue'})
// const canvas = document.querySelector('.webgl')

// //camera
// const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
// camera.position.z = 3

// //controls 
// const controls = new OrbitControls(camera,canvas)
// controls.enableDamping = true

// //mesh
// const mesh = new THREE.Mesh(geometry,material)
// const mesh1 = new THREE.Mesh(geometry1,material1)

// //scene
// scene.add(mesh)

// //renderer
// const renderer = new THREE.WebGLRenderer({canvas})
// renderer.setSize(sizes.width,sizes.height)


// // window.addEventListener('resize', () => {
// // sizes.width = window.innerWidth
// // sizes.height = window.innerHeight

// // camera.aspect = sizes.width/sizes.height
// // camera.updateProjectionMatrix()

// // renderer.setSize(sizes.width,sizes.height)
// // renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
// // })

// const parameters = {
//     changeTexture: () =>{
//         console.log(num)
//         const arrLength = textureArr.length - 1
    
//         let n = num === arrLength ? num = 0 : ++num
//         //const newTexture = new THREE.TextureLoader().load(newTextureUrl);
//         material.map = textureArr[n];
//         material.needsUpdate = true; 
//     },

//     shouldRotate: () => {
//         console.log(obj.shouldRotate)
//         return obj.shouldRotate = !obj.shouldRotate
//     }
// }
// //gui
// gui.add(mesh.position,'x').min(-3).max(3).step(0.01).name('elevation')
// gui.add(mesh.position,'y',-3,3,0.01)
// gui.add(mesh.position,'z',-3,3,0.01)
// gui.add(mesh.rotation,'x',-3,3,0.01)
// gui.add(mesh.rotation,'y',-3,3,0.01)
// gui.add(mesh.rotation,'z',-3,3,0.01,).name('rotation')
// gui.add(parameters,'changeTexture')
// gui.add(parameters,'shouldRotate')

// gui.add(mesh, 'visible')



// const clock = new THREE.Clock()


// const tick = () => {
  
//     const elapsedTime = clock.getElapsedTime()
//     obj.shouldRotate && (
//         mesh.position.y = Math.sin(elapsedTime)) && (
//         mesh.position.x = Math.cos(elapsedTime)
//         )
//     controls.update()
//     renderer.render(scene,camera)
//     window.requestAnimationFrame(tick)
// }
// tick()