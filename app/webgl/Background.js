import React from 'react'
import { Vector3 } from 'three';

import { motion as motion3d } from 'framer-motion-3d';
import { wrap, useMotionValue, useMotionValueEvent, useTime, useTransform } from 'framer-motion';

import PhotoShot from './PhotoShot';

function Background({ count = 4, height = 10, radius = 4 }) {
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
        console.log( randomDirection )
      // Push line parameters
      result.push({
        rotation: [ 0, theta - Math.PI , 0  ],
        position: vec.toArray(),
        direction: randomDirection,
        scale: 0.25 + 0.15 * Math.random(),
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
        <ShotTemplate 
          key={i} 
          {...props} 
          height={ height }
          radius={ radius }
        />
      ))}
    </group>
  );
}

function ShotTemplate({
  positionStep,
  position = [0, 0, 0], 
  rotation, 
  scale,
  ...props
}) {

  const x = useMotionValue( position[0] );
  const z = useMotionValue( position[2] );
  
  const time = useTime();
  const y = useTransform(time, value => {
    const seconds = value / 1000;
    return wrap(0, props.height * 2, position[1] - seconds * props.speed * 0.15 ); 
  });
  useMotionValueEvent(y, 'change', (latest) => {
    const strength = 1 - latest / (props.height * 2);
    const scaleFactor = 3.7 + (1 - strength) * 1.7 ;

    x.set( position[0] * scaleFactor );
    z.set( position[2] * scaleFactor );
  });

  return (
    <motion3d.group
      position={[ x, y, z ]} 
      scale={scale} 
      dispose={null} 
      initial={{
        rotateX: rotation[0],
        rotateY: rotation[1]
      }}
      animate={{
        rotateX: rotation[0] + Math.PI * 2 * props.direction,
        rotateY: rotation[1] + Math.PI * 2 * props.direction,
      }}
      transition={{
        rotateX: { duration: props.speed / 15, ease: "linear", repeat: Infinity },
        rotateY: { duration: props.speed / 10, ease: "linear", repeat: Infinity }
      }}
    >
      <PhotoShot  toneMapped={ false } />
    </motion3d.group>
  )
} 


export default Background;