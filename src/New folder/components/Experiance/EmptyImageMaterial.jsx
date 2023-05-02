import { useControls } from 'leva';
import { useTexture } from '@react-three/drei';

function ImageShot() {
  const roughnessMap = useTexture('/textures/image-roughness.jpg');
  const photoSettings = useControls('Card image',{
    metalness: {value: 0.14, max: 1, min: 0, step: 0.001 },
    roughness: {value: 1, max: 1, min: 0, step: 0.001 },
    envMapIntensity: { value: 0.8, min: 0, max: 12, step: 0.001 }
  });
  return (
    <>
      <meshPhysicalMaterial roughnessMap={roughnessMap} color={ 0x000000 } {...photoSettings} />
    </>
  );
}

export default ImageShot;