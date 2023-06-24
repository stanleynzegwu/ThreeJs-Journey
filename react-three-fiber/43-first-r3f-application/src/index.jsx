import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import Experience from "./Experience";
const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <>
    <Canvas
      dpr={[1, 2]} //that's the default already, so you acn remove it
      gl={{
        antialias: true,
        //toneMapping: THREE.CineonToneMapping,
        toneMapping: THREE.ACESFilmicToneMapping, //this is the default toneMapping, so can remove it but i left it here for learning sake and the default is nice
        //outputColorSpace: THREE.LinearSRGBColorSpace,
        outputColorSpace: THREE.SRGBColorSpace, //this is the default outputColorSpace, so can remove it but i left it here for learning sake and the default is nice
      }}
      // orthographic
      camera={{
        // zoom: 100,
        fov: 45,
        near: 0.1,
        far: 200,
        position: [3, 2, 6],
      }}
    >
      <Experience />
    </Canvas>
  </>
);
