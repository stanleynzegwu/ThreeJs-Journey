import { OrbitControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { Perf } from "r3f-perf";

import NewBox from "./NewBox";

export default function Experience() {
  const { perfVisible } = useControls({
    perfVisible: true,
  });

  const { position, color, visible } = useControls("firstFolder", {
    scale: 2,
    position: {
      value: { x: 1, y: 0 },
      min: -4,
      max: 4,
      step: 0.01,
      joystick: "invertY",
    },
    color: "#ff0000",
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickMe: button(() => console.log("clicked")),
    choice: { options: ["a", "b", "c"] },
  });

  const { boxScale } = useControls("Box", {
    boxScale: {
      value: 2,
      min: -4,
      max: 4,
      step: 0.01,
    },
  });
  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={-2} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh position={[position.x, position.y, 0]} scale={boxScale}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <NewBox />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
}
