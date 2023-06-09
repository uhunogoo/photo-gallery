import React from 'react'
import { Vector3 } from 'three';

import { wrap } from 'framer-motion';
import { useFrame } from '@react-three/fiber';

function Background({ count = 4, height = 10, radius = 4, children}) {
  const shots = React.useMemo(() => {
    const result = [];
    // const branches = 18;

    for (let i = 0; i < count; i++) {
      const h = height * 2  * Math.random();

      const vec = new Vector3();
      const theta = Math.PI * 2 * Math.random();
      // const theta = (i % branches) / branches * Math.PI * 2;
      vec.setFromCylindricalCoords(
        radius, theta, h
      )
      const randomDirection = (Math.random() - 0.5) > 0 ? 1 : -1;
      // Push line parameters
      result.push({
        height,
        radius,
        rotation: [ 0, theta - Math.PI , 0  ],
        position: vec.toArray(),
        direction: randomDirection,
        scale: (0.25 + 0.15 * Math.random()) * 0.6,
        speed: 50 + Math.round(50 * Math.random())
      });
    }
    return result;
  }, [count, height, radius]);

  return (
    <group
      position-z={-height * 0.4} 
      rotation-x={-Math.PI * 0.5}
    >
      {shots.map( (props, i) => (
        <ShotTemplate key={i} {...props} >
          { children }
        </ShotTemplate>
      ))}
    </group>
  );
}

function ShotTemplate({ children, ...props }) {
  const ref = React.useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.2;
    const { current } = ref;
    
    const positionY = wrap(0, props.height * 2, props.position[1] - time * props.speed * 0.2 );

    const strength = 1 - positionY / (props.height * 2);
    const scaleFactor = 3.7 + (1 - strength) * 1.7 ;
    const theta = (time - positionY) * 0.1;

    current.rotation.x = props.rotation[0] + theta * props.direction;
    current.rotation.y = props.rotation[1] + theta * props.direction;

    current.position.set( 
      props.position[0] * scaleFactor,
      positionY,
      props.position[2] * scaleFactor
    );
  });

  return (
    <group
      ref={ ref }
      position={ props.position } 
      rotation={ props.rotation } 
      scale={ props.scale } 
      dispose={null}
    >
      { children }
    </group>
  )
} 


export default React.memo( Background );