import { useRef } from "react";
import {
  shaderMaterial,
  Sparkles,
  Center,
  useTexture,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";
import { useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";

export default function Experience() {
  const { nodes } = useGLTF("./model/myModel/portalm.glb");
  const bakedTexture = useTexture("./model/myModel/portal-baked.jpg");
  //   const { nodes } = useGLTF("./model/portal.glb");
  //   const bakedTexture = useTexture("./model/baked.jpg");
  bakedTexture.flipY = false;
  const { Scene, baked, poleLightA, poleLightB, portalLight } = nodes;

  const PortalMaterial = shaderMaterial(
    {
      uTime: 0,
      uColorStart: new THREE.Color("#ffffff"),
      uColorEnd: new THREE.Color("#000000"),
    },
    portalVertexShader,
    portalFragmentShader
  );
  const portalMaterial = useRef();
  extend({ PortalMaterial });

  useFrame((_, delta) => {
    portalMaterial.current.uTime += delta;
  });
  return (
    <>
      <color args={["#030202"]} attach={"background"} />
      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={baked.geometry} position={nodes.baked.position}>
          <meshBasicMaterial
            map={bakedTexture}
            // map-flipY={false}
          />
        </mesh>

        <mesh geometry={poleLightA.geometry} position={nodes.poleLightA.position}>
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>

        <mesh geometry={poleLightB.geometry} position={nodes.poleLightB.position}>
          <meshBasicMaterial color={"#ffffe5"} />
        </mesh>

        <mesh
          geometry={portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          {/* <shaderMaterial
            vertexShader={portalVertexShader}
            fragmentShader={portalFragmentShader}
            uniforms={{
              uTime: { value: 0 },
              uColorStart: { value: new THREE.Color("#ffffff") },
              uColorEnd: { value: new THREE.Color("#000000") },
            }}
          /> */}

          <portalMaterial ref={portalMaterial} />
        </mesh>

        <Sparkles size={6} scale={[4, 2, 4]} position-y={1} speed={0.2} count={40} />
      </Center>
    </>
  );
}
