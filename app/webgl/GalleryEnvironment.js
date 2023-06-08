import { useControls } from 'leva';
import { Environment, Lightformer } from '@react-three/drei';

function GalleryEnvironment() {
  const environment = useControls('Gallery environment', {
    color: "#ffffff",
    intensity: { value: 2, min: 0, max: 6, step: 0.001 },

  });

  return (
    <>
      <directionalLight 
        color={ 'white' }
        position={[ 1, 3, 10 ]}
        intensity={2}
        { ...environment }
      />
      <Environment far={40} >
        <Lightformer
          form={'rect'}
          intensity={10}
          color={ "orange" }
          scale={[ 2, 20]}
          position={[5, 1, 0 ]} 
          rotation-x={-Math.PI * 0.25}
          rotation-y={-Math.PI * 0.25}
        />
        <Lightformer
          form={'rect'}
          intensity={10}
          color={ "white" }
          scale={[ 2, 20]}
          position={[-5, -1, 0 ]} 
          rotation-x={Math.PI * 0.25}
          rotation-y={Math.PI * 0.25}
        />
        <Lightformer
          form={'rect'}
          intensity={10}
          color={ "green" }
          scale={[ 1, 20]}
          position={[-4.5, -2.5, 0 ]} 
          rotation-x={Math.PI * 0.25}
          rotation-y={Math.PI * 0.25}
        />
      </Environment>
    </>
  );
}

export default GalleryEnvironment;