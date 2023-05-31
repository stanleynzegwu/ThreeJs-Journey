import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */

/** 
//using glTF(and it works ame way with other formats except Draco..check below for how to use Draco)

// const gltfLoader = new GLTFLoader()

// gltfLoader.load('/models/FlightHelmet/glTF/FlightHelmet.gltf',
//     (gltf) => {
//         console.log(gltf)
//         //while the array still contains a child remove the first 
//         //because once you add a child it gets removed from the array(that's specific to how it's setup by gltf/threejs)

//         // while(gltf.scene.children.length){
//         //     scene.add(gltf.scene.children[0])
//         // }

//         //unpack to a separate independent array that has nothing to do with threejs then loop, 
//         //this way it doesn't remove it from the array after adding to the scene

//         // const children = [...gltf.scene.children]
//         // for(const child of children){
//         //     scene.add(child)
//         // }

//         scene.add(gltf.scene)
//     }
// )

*/

//let's use draco compression
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/') //path to /draco/ in static folder was copied from the node_modules, check resources for the Draco Decoder path

// const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

// gltfLoader.load('/models/Duck/glTF-Draco/Duck.gltf', //Note You can still load not compressed glTF file with the GLTFLoader and the Draco decoder is only loaded when needed. Time: 53:00
//     (gltf) => {
//         console.log(gltf)

//         scene.add(gltf.scene)
//     }
// )

//Animated Models
const gltfLoader = new GLTFLoader()

let mixer = null

gltfLoader.load(
    '/models/Fox/glTF/Fox.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.03, 0.03, 0.03)
        scene.add(gltf.scene)

        mixer = new THREE.AnimationMixer(gltf.scene)
        //const action = mixer.clipAction(gltf.animations[0])
        //const action = mixer.clipAction(gltf.animations[1])
        const action = mixer.clipAction(gltf.animations[2])
        action.play()
    }
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //Update Mixer
    if(mixer !== null){
        mixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()