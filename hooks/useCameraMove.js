import React from 'react';
import { useFrame, useThree } from '@react-three/fiber'

import { Vector3 } from 'three';

export function useCameraMove() {
  const cameraRef = React.useRef();
  const lookAt = React.useMemo( () => new Vector3(), [] );
  const vec = React.useMemo( () => new Vector3(), [] );
  const vecClone = React.useMemo( () => vec.clone(), [] );
   
  useFrame((state) => {
    // vec.lerp( vecClone.set( state.mouse.x, state.mouse.y, 0 ), 0.08 );
    cameraRef.current.updateProjectionMatrix();
    
    cameraRef.current.position.x = vec.x * 0.2;
    cameraRef.current.position.y = vec.y * 0.2;
    
    // cameraRef.current.lookAt( lookAt );
  }, 2);

  return cameraRef;
}