import { useFrame } from "@react-three/fiber";
import {
  Lightformer,
  Environment,
  Sky,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
  SoftShadows,
  BakeShadows,
  useHelper,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();

  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1); //directionallight Helper

  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  const { sunPosition } = useControls("sky", {
    sunPosition: { value: [1, 2, 3] },
  });

  const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls(
    "environment map",
    {
      envMapIntensity: { value: 7, min: 0, max: 12 },
      envMapHeight: { value: 7, min: 0, max: 100 },
      envMapRadius: { value: 28, min: 10, max: 1000 },
      envMapScale: { value: 100, min: 10, max: 1000 },
    }
  );

  useFrame((state, delta) => {
    // const time = state.clock.elapsedTime;
    // cube.current.position.x = 2 + Math.sin(time);
    cube.current.rotation.y += delta * 0.2;

    sphere.current.rotation.x = state.clock.elapsedTime;
    sphere.current.position.x = -Math.sin(state.clock.elapsedTime) * 6;
  });

  return (
    <>
      {/* <Environment
        background
        files={[
          "./environmentMaps/2/px.jpg",
          "./environmentMaps/2/nx.jpg",
          "./environmentMaps/2/py.jpg",
          "./environmentMaps/2/ny.jpg",
          "./environmentMaps/2/pz.jpg",
          "./environmentMaps/2/nz.jpg",
        ]}
      /> */}
      {/* <Environment background files="./environmentMaps/the_sky_is_on_fire_2k.hdr">
        <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={"red"} />
        </mesh>
      </Environment> */}

      {/* <Environment background preset="sunset" >
        <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color={"red"} />
        </mesh>
      </Environment> */}

      {/* <Environment background>
        <color args={["black"]} attach="background" />
        <Lightformer position-z={-5} scale={10} color="red" intensity={10} form="ring" />
      </Environment> */}

      <Environment
        files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        ground={{
          height: envMapHeight,
          radius: envMapRadius,
          scale: envMapScale,
        }}
      ></Environment>

      {/* <BakeShadows /> */}

      {/* <SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11} /> */}

      <Perf position="top-left" />

      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          position={[1, 2, 3]}
          bias={0.001}
        />
      </AccumulativeShadows> */}

      <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        far={5}
        color={color}
        opacity={opacity}
        blur={blur}
        frames={1}
      />

      <OrbitControls makeDefault />

      {/* <directionalLight
        castShadow
        ref={directionalLight}
        position={sunPosition}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={2}
        shadow-camera-right={5}
        shadow-camera-bottom={-2}
        shadow-camera-left={-5}
      /> */}

      {/* <pointLight castShadow color={0xff0000} intensity={2} distance={10} decay={2} /> */}
      {/* <ambientLight intensity={0.5} /> */}
      {/* <Sky sunPosition={sunPosition} /> */}
      <mesh ref={sphere} position-y={1} position-x={-2} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
      </mesh>
      <mesh position-y={1} ref={cube} position-x={2} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
      </mesh>
      {/* <mesh position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" envMapIntensity={envMapIntensity} />
      </mesh> */}
    </>
  );
}

// import { useFrame } from "@react-three/fiber";
// import {
//   Stage,
//   Lightformer,
//   Environment,
//   Sky,
//   ContactShadows,
//   RandomizedLight,
//   AccumulativeShadows,
//   SoftShadows,
//   BakeShadows,
//   useHelper,
//   OrbitControls,
// } from "@react-three/drei";
// import { useRef } from "react";
// import { Perf } from "r3f-perf";
// import * as THREE from "three";
// import { useControls } from "leva";

// export default function Experience() {
//   const cube = useRef();

//   const directionalLight = useRef();
//   useHelper(directionalLight, THREE.DirectionalLightHelper, 1); //directionallight Helper

//   const { color, opacity, blur } = useControls("contact shadows", {
//     color: "#1d8f75",
//     opacity: { value: 0.4, min: 0, max: 1 },
//     blur: { value: 2.8, min: 0, max: 10 },
//   });

//   const { sunPosition } = useControls("sky", {
//     sunPosition: { value: [1, 2, 3] },
//   });

//   const { envMapIntensity, envMapHeight, envMapRadius, envMapScale } = useControls(
//     "environment map",
//     {
//       envMapIntensity: { value: 7, min: 0, max: 12 },
//       envMapHeight: { value: 7, min: 0, max: 100 },
//       envMapRadius: { value: 28, min: 10, max: 1000 },
//       envMapScale: { value: 100, min: 10, max: 1000 },
//     }
//   );

//   useFrame((state, delta) => {
//     // const time = state.clock.elapsedTime;
//     // cube.current.position.x = 2 + Math.sin(time);
//     cube.current.rotation.y += delta * 0.2;
//   });

//   return (
//     <>
//       <Perf position="top-left" />

//       <OrbitControls makeDefault />

//       <Stage
//         shadows={{
//           type: "contact",
//           opacity: 0.2,
//           blur: 3,
//         }}
//         environment="sunset"
//         preset="portrait"
//         intensity={2}
//       >
//         <mesh position-y={1} position-x={-2} castShadow>
//           <sphereGeometry />
//           <meshStandardMaterial color="orange" envMapIntensity={envMapIntensity} />
//         </mesh>
//         <mesh position-y={1} ref={cube} position-x={2} scale={1.5} castShadow>
//           <boxGeometry />
//           <meshStandardMaterial color="mediumpurple" envMapIntensity={envMapIntensity} />
//         </mesh>
//       </Stage>
//     </>
//   );
// }
