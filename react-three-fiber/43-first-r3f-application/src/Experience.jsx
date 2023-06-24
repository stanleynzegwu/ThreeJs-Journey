import { useRef } from "react";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CustomObject from "./CustomObject";

extend({ OrbitControls: OrbitControls });

const Experience = () => {
  const cubeRef = useRef();
  const groupRef = useRef();

  const three = useThree();
  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta;
    //groupRef.current.rotation.y += delta;

    // const { clock, camera } = state;

    // const angle = clock.elapsedTime;
    // camera.position.x = Math.sin(angle) * 8;
    // camera.position.z = Math.cos(angle) * 8;
    // camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
          {/* <sphereGeometry args={[1.5, 32, 32]} /> */}
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" />
        </mesh>
      </group>

      <CustomObject />
    </>
  );
};

export default Experience;
