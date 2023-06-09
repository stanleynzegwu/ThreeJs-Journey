import { Clone, useGLTF } from "@react-three/drei";

const Model = () => {
  const model = useGLTF("./hamburger.glb");

  return (
    <>
      <Clone object={model.scene} scale={0.3} position-x={-4} />;
      <Clone object={model.scene} scale={0.3} />;
      <Clone object={model.scene} scale={0.3} position-x={4} />;
    </>
  );
};

useGLTF.preload("./hamburger.glb");

export default Model;
