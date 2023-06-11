import { Image, useGLTF, useTexture } from '@react-three/drei';
import React from 'react';
import DefaultMaterial from './DefaultMaterial';
import { RepeatWrapping } from 'three';
import ImageLayerMaterial from './ImageLayerMaterial';

export function PhotoShot({ type = 'bg', emissive, emissiveIntensity, toneMapped, map, ...props}) {
  const { nodes } = useGLTF('/shot.glb');

  const [ normalMap, roughnessMap ] = useTexture([
    '/textures/normal-map-2.jpg',
    '/textures/image-roughness.jpg'
  ]);
  normalMap.wrapS = RepeatWrapping;
  normalMap.wrapT = RepeatWrapping;
  normalMap.repeat.set(4, 4);
  
  const imageParameters = {
    roughnessMap: roughnessMap, 
    color: 0x000000,
    roughness: 1,
    metalness: 0.14,
    envMapIntensity: 0.8,
    emissive,
    emissiveIntensity,
    toneMapped
  }

  const bodyParameters = { 
    color: 0xe5e5e5,
    roughness: 0.6,
    metalness: 0.8,
    normalScale: [-0.5, 0.5],
    envMapIntensity: 1,
    normalMap: normalMap,
    toneMapped: true
  };

  return (
    <group {...props} dispose={null}>
      { type === 'gallery' && (
        <Image 
          url={ map }
          scale={[7, 5.8]}
          position={[0, 0.65, 0.075] }
        />
      ) }
      <mesh
        name="film"
        rotation-y={-Math.PI * 0.5}
        scale={0.995}
        geometry={nodes.film.geometry}
        position={[0, 0.65, 0.09]}
      >
        { type === 'gallery' && <ImageLayerMaterial /> }
        { type === 'bg' && <DefaultMaterial {...imageParameters} /> }
      </mesh>
      <mesh
        name="imageBody"
        rotation-y={Math.PI * 0.5}
        geometry={nodes.imageBody.geometry}
      >
        { type === 'bg' 
          ? <meshBasicMaterial />
          : <DefaultMaterial { ...bodyParameters } />
        }
      </mesh>
    </group>
  );
}

useGLTF.preload('/shot.glb');

export default PhotoShot;