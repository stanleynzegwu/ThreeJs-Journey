import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  // SSR,
  // DepthOfField,
  // Bloom,
  // Noise,
  // Glitch,
  // Vignette,
  EffectComposer,
} from "@react-three/postprocessing";
// import { GlitchMode, BlendFunction } from "postprocessing";
import { useControls } from "leva";
// import { blendingList, props } from "./LevaDebug";
import Drunk from "./Drunk";

export default function Experience() {
  const drunkRef = useRef();
  // const { blending } = useControls("Noise", {
  //   blending: {
  //     value: "SOFT_LIGHT",
  //     options: blendingList,
  //   },
  // });
  // const ssrProps = useControls("SSR", props);

  return (
    <>
      <color args={["#ffffff"]} attach={"background"} />
      <EffectComposer disableNormalPass>
        {/* <Vignette offset={0.3} darkness={0.9} blendFunction={BlendFunction.NORMAL} /> */}

        {/* <Glitch
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
          mode={GlitchMode.CONSTANT_WILD}
        /> */}

        {/* <Noise blendFunction={BlendFunction.SOFT_LIGHT} /> */}
        {/* <Noise premultiply blendFunction={BlendFunction[blending]} /> */}

        {/* <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} /> */}

        {/* <DepthOfField focusDistance={0.025} focalLength={0.025} bokehScale={6} /> */}

        {/* <SSR {...ssrProps} /> */}

        <Drunk ref={drunkRef} frequency={2} amplitude={0.1} />
      </EffectComposer>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        {/* <meshStandardMaterial
          color="white"
          emissive="orange"
          emissiveIntensity={10}
          toneMapped={false}
        /> */}
        {/* <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
        <meshStandardMaterial color="mediumPurple" />
      </mesh>

      <mesh receiveShadow position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" roughness={0} metalness={0} />
      </mesh>
    </>
  );
}
