import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

const textueLoader = new THREE.TextureLoader()
const gradientTexture = textueLoader.load('/textures/gradients/3.jpg')
const matcapTexture = textueLoader.load('/textures/matcap/3.png')
const normalTexture = textueLoader.load('/textures/normal/normal.jpg')
gradientTexture.magFilter = THREE.NearestFilter

//mesh material
const material = new THREE.MeshToonMaterial({ color: '#ffeded',gradientMap:gradientTexture })
const material2 = new THREE.MeshStandardMaterial({color:'red'})
const material3 = new THREE.MeshMatcapMaterial({matcap:matcapTexture})
const material4 = new THREE.MeshNormalMaterial({map:normalTexture})
const materialArray = [material,material2,material3,material4]

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const objectsDistance = 4

// Material

// Meshes
const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
)
const mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 32),
    material
)
const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
)

mesh1.position.y = - objectsDistance * 0
mesh2.position.y = - objectsDistance * 1
mesh3.position.y = - objectsDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [ mesh1, mesh2, mesh3 ]

let materialArrayIndex =  0
const parameters = {
    materialColor: '#ffeded',
    changeMeshMaterial: () => {
        materialArrayIndex = materialArrayIndex === materialArray.length - 1 ? 0 : ++materialArrayIndex
        mesh1.material = materialArray[materialArrayIndex]
        mesh2.material = materialArray[materialArrayIndex]
        mesh3.material = materialArray[materialArrayIndex]
    }
}
/**
 * Particles
 */
const particlesCount = 500
//particles geometry
const particlesGeometry = new THREE.BufferGeometry()
const positions = new Float32Array(particlesCount * 3)
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3))

//points material
const pointsMaterial = new THREE.PointsMaterial({
    color:parameters.materialColor,
    size:0.02,
    sizeAttenuation: true,
    depthWrite:false
})

//points
const particles = new THREE.Points(particlesGeometry,pointsMaterial)
for(let i = 0; i < particlesCount; i++){
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshes.length
    positions[i3 + 2] = (Math.random() - 0.5) * 10
}
scene.add(particles)



/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

//gui
gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        material.color.set(parameters.materialColor)
        material2.color.set(parameters.materialColor)
        material3.color.set(parameters.materialColor)
        pointsMaterial.color.set(parameters.materialColor)
    })
    gui.add(parameters,'changeMeshMaterial')

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
//Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * scroll
 */
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () => {
    scrollY = window.scrollY

    const newSection = Math.round(scrollY / sizes.height)
    if(newSection != currentSection){
        currentSection = newSection

        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: 'power2.inOut',
                x: '+=6',
                y: '+=3',
                z: '+=1.5'
            }
        )
    }
})

/**
 * Animate
 */
let cursor = {
    x:0,
    y:0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})
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

    //Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    const parallaxX = cursor.x
    const parallaxY = - cursor.y

    cameraGroup.position.x = parallaxX - cameraGroup.position.x * 5 * deltaTime
    cameraGroup.position.y = parallaxY - cameraGroup.position.y * 5 * deltaTime
    //Animate meshes
    for(const mesh of sectionMeshes){
        mesh.rotation.x += deltaTime * 0.1
        mesh.rotation.y += deltaTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()