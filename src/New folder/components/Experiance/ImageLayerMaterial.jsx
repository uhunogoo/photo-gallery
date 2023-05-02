import { useTexture } from '@react-three/drei';
import { useControls } from 'leva';
import { RepeatWrapping, AdditiveBlending } from 'three';


function ImageLayerMaterial() {
  const roughnessMap = useTexture('/textures/image-roughness.jpg');
  const normalMap = useTexture('/textures/normal-map-4.jpg');
  normalMap.repeat.set(3, 3);
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  
  const photoSettings = useControls('Image layer',{
    normalScale: {value: 0.1, max: 1, min: -1, step: 0.001 },
    metalness: {value: 1, max: 1, min: 0, step: 0.001 },
    roughness: {value: 0.65, max: 1, min: 0, step: 0.001 },
    envMapIntensity: { value: 0, min: 0, max: 12, step: 0.001 }
  });

  return (
    <meshStandardMaterial
      color={'#000000'}
      normalScale={0.1}
      roughness={0.65}
      metalness={1}
      normalMap={normalMap}
      roughnessMap={roughnessMap} 
      blending={ AdditiveBlending }
      premultipliedAlpha
      { ...photoSettings }
    />
  );
}

export default ImageLayerMaterial;