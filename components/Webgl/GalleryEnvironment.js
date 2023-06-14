import { Environment, Lightformer } from '@react-three/drei';

function GalleryEnvironment() {
  return (
    <>
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