import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
//Animations 

//TIME
// let time = Date.now()


// const tick = () => {

//     //TIME  
//     const currentTime = Date.now()
//     const delatTime = currentTime - time
//     time = currentTime

//     mesh.rotation.x -= 0.002 * delatTime
//     renderer.render(scene, camera)

//  window.requestAnimationFrame(tick)
// }

//WITH CLOCK
// const clock = new THREE.Clock()
// const tick = () => {

//     //Clock
//     const elapsedTime = clock.getElapsedTime()
//     // mesh.rotation.x = elapsedTime

//     //experiment with Math.sin(...) it will go up and down if you are updating position.y
//     // mesh.position.y = Math.sin(elapsedTime  )
//     // mesh.position.x = Math.cos(elapsedTime  )

//     camera.position.y = Math.sin(elapsedTime  )
//     camera.position.x = Math.cos(elapsedTime  )
//     camera.lookAt(mesh.position)

//     renderer.render(scene, camera)

//  window.requestAnimationFrame(tick)
// }

//WITH GSAP
gsap.to(mesh.position, {duration:1, delay:1, x:2})
gsap.to(mesh.position, {duration:1, delay:2, x:0})
const tick = () => {

    renderer.render(scene, camera)

 window.requestAnimationFrame(tick)
}
tick()
