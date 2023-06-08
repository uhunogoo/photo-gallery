'use client';

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { MeshPortalMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useControls } from 'leva'
import PhotoShot from './PhotoShot';
import Background from './Background';
import BackgroundEnvironment from './BackgroundEnvironment';
import GalleryEnvironment from './GalleryEnvironment';
// import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
// import BackgroundEnvironment from './BackgroundEnvironment';


export default function Scene() {
  const [dpr, setDpr] = React.useState(1);
  
  const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 0, 0, 5 ]
  }
  const backgroundCameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 0, 0, 5 ]
  }

  const { portal1, portal2, envBlur } = useControls({
    portal1: { value: 0.25, min: 0, max: 10 },
    portal2: { value: 0.25, min: 0, max: 1 },
    envBlur: { value: 0.2, min: 0, max: 1 }
  })
  
  const { bgAndFog, fogDensity, pointLight } = useControls('Base scene params',{
    bgAndFog: '#06060a',
    fogDensity: { value: 0.065, min: 0, max: 1 },
    pointLight: 'orange'
  });

  return (
    <Canvas
      dpr={dpr}
      camera={{ ...cameraSettings }}
    >
      <color attach="background" args={[ bgAndFog ]} />
      <PerspectiveCamera makeDefault { ...cameraSettings } />
      <Suspense fallback={null}>
        <mesh position={[0, 5, -5]}>
          <planeGeometry args={[ 30, 30]}/>
          <MeshPortalMaterial transparent blur={portal1}>
            <PerspectiveCamera makeDefault { ...backgroundCameraSettings } />
            <fog attach={'fog'} color={ bgAndFog } near={-10} far={50} />
            <pointLight args={[ pointLight, 10, 0, 1 ]} position={[0, 0, -0.2]}  />
            <BackgroundEnvironment />
            
            <Background count={10} radius={3.4} height={20} />
          </MeshPortalMaterial>
        </mesh>

        <PhotoShot type='gallery' scale={0.25} position-z={-1}/>
        <GalleryEnvironment />

        <OrbitControls makeDefault />
      </Suspense>
    </Canvas>
  )
}
