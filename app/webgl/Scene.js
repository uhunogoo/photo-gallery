'use client';

import React, { Suspense } from 'react';
import { useControls } from 'leva';

import { Canvas } from '@react-three/fiber';
import { Box, MeshPortalMaterial, OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import { motion } from 'framer-motion-3d';
// import PhotoShot from './PhotoShot';

// import Background from './Background';
// import BackgroundEnvironment from './BackgroundEnvironment';

import Gallery from './Gallery';
import GalleryEnvironment from './GalleryEnvironment';

// import { useMouseMove } from '../_hooks/useMouseMove';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';


export default function Scene() {
  const [dpr, setDpr] = React.useState(1);
  
  const cameraSettings = {
    fov: 35,
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

  const { portal1, envBlur } = useControls({
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
      
      <Suspense fallback={ null }>
        <Gallery />
      </Suspense>
      <GalleryEnvironment />
      <PointLightAnimate />

      {/* <mesh position={[0, 5, -5]}>
        <planeGeometry args={[ 30, 30]}/>
        <MeshPortalMaterial toneMapped transparent blur={portal1}>
          <PerspectiveCamera makeDefault { ...backgroundCameraSettings } />
          <fog attach={'fog'} color={ bgAndFog } near={-10} far={50} />
          <pointLight args={[ pointLight, 10, 0, 1 ]} position={[0, 0, -0.2]}  />
          <BackgroundEnvironment />
          
          <Background count={15} radius={3.4} height={20}>
            <Suspense fallback={
              <Box scale={[ 8, 8.2, 0.14 ]} /> 
            }>
              <PhotoShot/>
            </Suspense>
          </Background>
        </MeshPortalMaterial>
      </mesh> */}
      <EffectComposer>
        <Bloom 
          mipmapBlur 
          intensity={ 0.25 }
          luminanceThreshold={ 0.9 }
        />
      </EffectComposer>
      <OrbitControls makeDefault />
    </Canvas>
  )
}

function PointLightAnimate() {
  // const mouse = useMouseMove();
  
  const environment = useControls('Gallery environment', {
    color: "#ffffff",
    intensity: { value: 2, min: 0, max: 6, step: 0.001 },
  });
  
  return (<>
    <directionalLight 
      color={ 'white' }
      position={[ 1, 3, 3 ]}
      intensity={1}
      { ...environment }
    />
  </>)
}
