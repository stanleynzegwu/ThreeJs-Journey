import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMatcapTexture, Center, Text3D, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

export default function Experience() {
  //   const [torusGeometry, setTorusGeometry] = useState();
  //   const [material, setMaterial] = useState();
  //   const donutGroup = useRef();

  const donuts = useRef([]);

  const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);

  const { size, height, curveSegments, bevelThickness, bevelSize, bevelOffset } = useControls(
    "contact shadows",
    {
      size: { value: 1, min: 0, max: 1 },
      height: { value: 0.2, min: 0, max: 1 },
      curveSegments: { value: 12, min: 0, max: 20 },
      bevelThickness: { value: 0.02, min: 0, max: 0.1 },
      bevelSize: { value: 0.02, min: 0, max: 0.1 },
      bevelOffset: { value: 0, min: 0, max: 1 },
      //bevelSegments: { value: 5, min: 0, max: 10 },
    }
  );
  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace;
    matcapTexture.needsUpdate = true;

    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);

  //   useFrame((state, delta) => {
  //     for (const donut of donutGroup.current.children) {
  //       donut.rotation.y += delta * 0.1;
  //     }
  //   });

  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.2;
    }
  });

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* <torusGeometry ref={setTorusGeometry} args={[1, 0.6, 16, 32]} />
      <meshMatcapMaterial ref={setMaterial} matcap={matcapTexture} /> */}

      <Center>
        <Text3D
          font="./fonts/helvetiker_regular.typeface.json"
          size={size}
          height={height}
          curveSegments={curveSegments}
          bevelEnabled
          bevelThickness={bevelThickness}
          bevelSize={bevelSize}
          bevelOffset={bevelOffset}
          bevelSegments={5}
        >
          HELLO R3F
          <meshMatcapMaterial matcap={matcapTexture} />
        </Text3D>
      </Center>

      {/* using group to ref and animate children */}
      {/* <group ref={donutGroup}>
        {[...Array(100)].map((value, index) => (
          <mesh
            geometry={torusGeometry}
            material={material}
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group> */}

      {[...Array(100)].map((value, index) => (
        <mesh
          ref={(element) => (donuts.current[index] = element)}
          geometry={torusGeometry}
          material={material}
          key={index}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
          scale={0.2 + Math.random() * 0.2}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        />
      ))}
    </>
  );
}
