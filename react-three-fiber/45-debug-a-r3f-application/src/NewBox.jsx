import { useControls } from "leva";

const NewBox = () => {
  const { scale, position } = useControls("NewBox", {
    scale: {
      value: 1,
      step: 0.01,
    },
    position: {
      value: { x: 0, y: 0, z: 3 },
      min: -10,
      max: 10,
      step: 0.01,
    },
  });

  return (
    <mesh position={[position.x, position.y, position.z]} scale={scale}>
      <boxGeometry />
      <meshBasicMaterial color="brown" />
    </mesh>
  );
};

export default NewBox;
