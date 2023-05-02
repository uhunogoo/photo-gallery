// import * as THREE from 'three';
import React, { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerformanceMonitor, PerspectiveCamera, } from '@react-three/drei';

import Background from './Background';
import BackgroundEnvironment from './BackgroundEnvironment';
import SceneLayer from './SceneLayer';
import GalleryEnvironment from './GalleryEnvironment';
import Gallery from './Gallery';
import { useCameraMove } from '@/src/hooks/useCameraMove';

// THREE.ColorManagement.enabled = true


function Experiance() {
  const [dpr, setDpr] = React.useState(1);
  
  const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 0, 0, 4 ]
  }
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
      <Perf position="top-left" />
      {/* <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} /> */}
      <AnimatedCamera {...cameraSettings} position={[ 0, 0, 8 ]} makeDefault />
      <Suspense fallback={null}>
        <SceneLayer renderPriority={1}>
          <PerspectiveCamera makeDefault { ...cameraSettings } />
          <fog attach={'fog'} color={ bgAndFog } near={-10} far={50} />
          {/* <fogExp2 attach="fog" color={ bgAndFog } density={ fogDensity } /> */}
          <pointLight args={[ pointLight, 10, 0, 1 ]} position={[0, 0, -0.2]}  />
          <BackgroundEnvironment />

          <Background count={40} radius={3.4} height={20} />
          
          <OrbitControls makeDefault />
        </SceneLayer>
        <SceneLayer renderPriority={2}>
          {/* <OrbitControls makeDefault /> */}
          <GalleryEnvironment />

          <Gallery />
        </SceneLayer>
      </Suspense>
    </Canvas>
  );
}

function AnimatedCamera({ ...delegated }) {
  const camera = useCameraMove();
  
  return (
    <PerspectiveCamera 
      ref={camera} 
      { ...delegated } 
    />
  );
}

export default Experiance;