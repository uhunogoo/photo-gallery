import React from 'react';
import { gsap } from 'gsap';
import PolaroidShot from './PolaroidShot';
import {useReference} from '../../hooks/useReference';

import { useControls } from 'leva';
import { useTexture } from '@react-three/drei';

function GalleryComponent() {
  // Textures
  const image = useTexture( '/textures/image-10.jpg' );
  const roughnessMap = useTexture('/textures/image-roughness-1.jpg');
  const normalMap = useTexture('/textures/normal-map-2.jpg');
  
  const settings = useControls('Card body ref', {
    metalness: {value: 0.6, max: 1, min: 0, step: 0.001 },
    roughness: {value: 0.15, max: 1, min: 0, step: 0.001 },
    envMapIntensity: { value: 1.5, min: 0, max: 12, step: 0.001 },
  });

  const shot = React.useRef();
  const [material, geometry, imageLayerGeometry] = useReference(settings, normalMap, roughnessMap);
 
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      // const tl = gsap.timeline({
      //   repeat: -1,
      //   yoyo: true,
      //   defaults: { 
      //     duration: 3,
      //     ease: 'power4'
      //   }
      // });
      // tl.from(shot.current.position, {
      //   y: -8,
      // });
      // tl.from(shot.current.rotation, {
      //   y: Math.PI * 2,
      // }, '<');
      // tl.from(shot.current.rotation, {
      //   x: Math.PI * 0.5,
      //   ease: 'back(1.2)'
      // }, '<');
    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={ shot }>
      <PolaroidShot 
        image={ image } 
        material={ material.clone() } 
        geometry={ geometry.clone() }
        imageLayerGeometry={ imageLayerGeometry.clone() } 
      />
    </group>
  );
}


export default GalleryComponent;