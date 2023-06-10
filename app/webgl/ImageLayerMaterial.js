import { useControls } from 'leva';
import { useTexture } from '@react-three/drei';
import { AdditiveBlending, RepeatWrapping } from 'three';

import DefaultMaterial from './DefaultMaterial';

function ImageLayerMaterial() {
  const roughnessMap = useTexture('/textures/image-roughness.jpg');
  const normalMap = useTexture('/textures/normal-map-2.png');
  normalMap.repeat.set(0.5, 0.5);
  normalMap.rotation = Math.PI * 0.25;
  normalMap.center.set(0.5, 0.5)
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  
  const {normalScale, ...photoSettings} = useControls('Image layer',{
    normalScale: {value: 0.1, max: 1, min: -1, step: 0.001 },
    metalness: {value: 1, max: 1, min: 0, step: 0.001 },
    roughness: {value: 0.17, max: 1, min: 0, step: 0.001 },
    envMapIntensity: { value: 1, min: 0, max: 12, step: 0.001 }
  });

  return (
    <DefaultMaterial
      color={'#000000'}
      normalScale={[ -normalScale, normalScale ]}
      metalness={1}
      roughness={0.3}
      normalMap={normalMap}
      roughnessMap={roughnessMap} 
      blending={ AdditiveBlending }
      premultipliedAlpha
      toneMapping={false}
      { ...photoSettings }
    />
  );
}

export default ImageLayerMaterial;