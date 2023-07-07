// import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import Player from "./Player.jsx";
import useGame from "./stores/useGame.js";

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      <color args={["lightblue"]} attach="background" />
      {/* <Perf position="top-left" /> */}

      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
}
