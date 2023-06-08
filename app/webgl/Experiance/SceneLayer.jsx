import { Hud } from "@react-three/drei";

function SceneLayer({ children, ...delegated }) {
  return (
    <Hud { ...delegated }>
      { children }
    </Hud>
  );
}

export default SceneLayer;