import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, GizmoHelper, Hud, Lightformer, OrbitControls, PerformanceMonitor, PerspectiveCamera, PivotControls, RandomizedLight, SpotLight, useTexture } from '@react-three/drei';
import InstancedShotsLevitation from './InstancedShotsLevitation';
import { useControls } from 'leva';
import GalleryComponent from './GallaryComponent';
import { Perf } from 'r3f-perf';

function Experiance() {
  const [dpr, setDpr] = React.useState(1);
  const cameraSettings = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [ 0, 0, 4 ]
  }
  console.log( 2 )
  const { bgAndFog, fogDensity, pointLight } = useControls({
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
      {/* <Perf position="top-left" /> */}
      {/* <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} /> */}
      <fogExp2 attach="fog" color={ bgAndFog } density={ fogDensity } />
      <pointLight args={[ pointLight, 10, 0, 1 ]} position={[0, 0, 0]}  />
      
      
      
      <SceneEnvironment />
        <InstancedShotsLevitation 
          count={ 50 } 
          radius={ 3.4 } 
          height={ 10 }
        />
      {/* <OrbitControls makeDefault /> */}
      <Hud>
        <OrbitControls makeDefault />
        <PerspectiveCamera {...cameraSettings} position={[ 0, 0, 8 ]} makeDefault />
        
        <Test>
        </Test>

        <GalleryEnvironment />
      </Hud>
    </Canvas>
  );
}

function Test({ children }) {
  return (<>
    { children }
    <Suspense>
      <GalleryComponent />
    </Suspense>
  </>);
}

function SceneEnvironment() {
  return (
    <Environment
      far={40}
      resolution={512}
    >
      <color attach={'background'} args={['white']} />
      <Lightformer
        form={'ring'}
        intensity={100}
        color={ "orange" }
        scale={4} 
        target={[0, 0, -20]}
        position={[ 0, 0, -1 ]}
      />
      <Lightformer
        form={'ring'}
        intensity={100}
        color={ "green" }
        scale={1.5}
        target={[0, 0, -20]}
        position={[ 0, 0, -1 ]}
      />
    </Environment>
  );
}
function GalleryEnvironment() {
  // const map = useTexture('/textures/spark1.jpg')
  const environment = useControls('Environment',{
    intensity: { value: 1, min: 0, max: 10 },
    hemisphereLight: "#e5cea4",
    bacground: "#ffffff",
    type: { 
      value: 'circle', 
      options: { 'ring': 'ring', 'circle': 'circle', 'rect': 'rect' } 
    }
  });

  return (
    <>
      {/* <ambientLight intensity={0.5} /> */}
      <directionalLight 
        color={environment.bacground}
        position={[ 0, 3, 10 ]}
        intensity={2}
      />
      <Environment
        far={40}>
        <color attach={'background'} args={['white']} />
      </Environment>
    </>
  );
}

export default Experiance;