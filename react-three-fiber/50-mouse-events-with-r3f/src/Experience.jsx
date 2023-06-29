import { useFrame } from "@react-three/fiber";
import { meshBounds, useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const hamburger = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const handleClick = (event) => {
    const { object } = event;
    //object.material.color = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 75%)`);
    object.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  const handleSphereClick = (event) => {
    event.stopPropagation();
    console.log("sphere clicked");
  };
  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        onClick={handleSphereClick}
        onPointerEnter={(event) => event.stopPropagation()}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        //raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={handleClick}
        onPointerEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event) => {
          console.log(event.object.name);
          event.stopPropagation();
        }}
      />
    </>
  );
}
