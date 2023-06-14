import { useBodyReference, useImageReference } from '@/src/hooks/useReference';
import { Image, useGLTF, useTexture } from '@react-three/drei';
import React from 'react';
import { RepeatWrapping, Vector3 } from 'three';

import ImageLayerMaterial from './ImageLayerMaterial';
import DefaultMaterial from './DefaultMaterial';
import GalleryAnimation from './GalleryAnimation';
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';

const IMAGES = [
  {
    id: Math.random(),
    url: 'textures/image-0.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-1.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-2.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-3.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-10.jpg',
  },
];

function Gallery() {
  return (
    <GalleryAnimation>
      { IMAGES.map( ({ url, id }) => 
        <group key={ id }>
          <ImageTemplate>
            <Image
              url={ url }
              position={[0, 0.35, 0.04 ]} 
              scale={[3.5, 2.9]} 
              toneMapped={false}
            />
          </ImageTemplate>
        </group>
      ) }
    </GalleryAnimation>
  );
}

function ImageTemplate({ children }) {
  const item = React.useRef();
  const imageGeometry = useImageReference();
  const { nodes } = useGLTF('/box.glb');

  const normalMap = useTexture('/textures/normal-map-2.jpg');
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(4, 4);


  const imageBody = useControls('Image body', {
    roughness: { value: 0.3, min: 0, max: 1 },
    metalness: { value: 0.4, min: 0, max: 1 },
    envMapIntensity: { value: 1, min: 0, max: 10 },
  });

  // const imageSize = [ 4, 4.1 ];


  return (
    <group ref={ item } dispose={null} >
      { children }
      <mesh 
        scale={0.995}
        position={[0, 0.35, 0.045 ]}
        geometry={ imageGeometry.clone() } 
      >
        <ImageLayerMaterial />
      </mesh>
      <mesh
        scale={0.5} 
        geometry={ nodes.imageBody.geometry.clone() } 
      >
        <DefaultMaterial 
          color={'#ffffff'}
          normalScale={[-0.5, 0.5]}
          metalness={0.3}
          roughness={0.2}
          normalMap={normalMap}
          {...imageBody}
        />
      </mesh>
    </group>
  );
}

export default Gallery;