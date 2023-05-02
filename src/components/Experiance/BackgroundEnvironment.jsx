import { Environment, Lightformer } from '@react-three/drei';

function BackgroundEnvironment() {
  return (
    <Environment far={40} resolution={512} >
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

export default BackgroundEnvironment;