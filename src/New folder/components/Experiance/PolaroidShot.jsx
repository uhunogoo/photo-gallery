import React from 'react';
import { useControls } from 'leva';
import { Image, useTexture } from '@react-three/drei';
import ImageLayerMaterial from './ImageLayerMaterial';

function PolaroidShot({ image, material, geometry, imageLayerGeometry }) {
  if( !image || !material || !geometry ) {
    console.warn( 'You miss image, material or geometry, please check it inside GalleryComponent!' );
    return null;
  }

  return (
    <group>
      <Image
        position={[0, 0.35, 0.04 ]} 
        scale={[3.5, 2.9]} 
        toneMapped={false}
        texture={ image } 
      />
      
      <mesh 
        scale={0.995}
        position={[0, 0.35, 0.045 ]}
        geometry={ imageLayerGeometry }
      >
        <ImageLayerMaterial />
      </mesh>

      <mesh material={ material } geometry={ geometry } />
    </group>
  );
}

export default PolaroidShot;