import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// /**
//  * Object
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }
// window.addEventListener('resize', () => {

//     //update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     //update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     //update renderer
//     renderer.setSize(sizes.width,sizes.height)
// })
// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 3
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()

const scene = new THREE.Scene()
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0xff0000}))
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:'blue'}))
const group = new THREE.Group()
group.add(mesh,mesh1)
group.position.set(-1,0,0)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.z = 3
mesh.position.set(-1,0,0)
mesh.rotation.x = Math.PI
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGL1Renderer({
    canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)
// scene.add(mesh,mesh1)
scene.add(group)
mesh1.position.set(2,0,0)

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width,sizes.height)
})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }

})
// const controls = new OrbitControls(camera,canvas)
// controls.enableDamping = true
// controls.enableZoom = false
// controls.autoRotate = true

//Animate
const clock = new THREE.Clock()
const tick = () => {
    let elapsedTime = clock.getElapsedTime()
    // controls.update()
    mesh.position.x = Math.cos(elapsedTime)
    mesh.position.y = Math.sin(elapsedTime)
    mesh1.position.y = Math.sin(elapsedTime)
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)

}

tick()