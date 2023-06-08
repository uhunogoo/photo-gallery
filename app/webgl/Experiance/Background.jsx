import gsap from 'gsap'

import { Vector3 } from 'three';
import React from 'react'
import { Instance, Instances, useTexture } from '@react-three/drei'
import { useBodyReference, useImageReference } from '@/src/hooks/useReference';
import DefaultMaterial from './DefaultMaterial';

const TYPE = [ 'image', 'body' ];

function Background({ count = 4, height = 10, radius = 4 }) {
  const shots = React.useMemo(() => {
    const result = [];
    // const branches = 18;
    const wrap = gsap.utils.wrap([-1, 1]);

    for (let i = 0; i < count; i++) {
      const h = height * 2  * Math.random();

      const vec = new Vector3();
      const theta = Math.PI * 2 * Math.random();
      // const theta = (i % branches) / branches * Math.PI * 2;

      // vec.x = radius * (Math.random() - 0.5) * 2;
      // vec.z = radius * (Math.random() - 0.5);
      vec.x = radius * Math.cos( theta );
      vec.z = radius * Math.sin( theta );
      vec.y = -height * 2;

      const randomDirection = wrap( i * (1 - Math.random()) );

      // Push line parameters
      result.push({
        rotation: [ 0, -theta - Math.PI /  2, 0  ],
        position: vec.toArray(),
        direction: randomDirection,
        scale: gsap.utils.random(0.25, 0.4),
        speed: gsap.utils.random(50, 100, 1)
      });
    }
    return result;
  }, [count, height, radius]);

  return (
    <group 
      position-z={-height * 0.4} 
      // position-y={-height * 0.5} 
      // position-x={-radius} 

      rotation-x={-Math.PI * 0.5}
    >
      { TYPE.map( type =>
        <InstanceGeneration 
          key={type} 
          type={type}
          count={ count }
        >
          <AnimatedInstance parameters={{ shots, height, radius }}>
            {shots.map( (props, i) => (
              <ShotTemplate 
                key={i} 
                {...props} 
                height={ height }
                radius={ radius }
                positionStep={ type === 'image' && [ 0, 0.35, 0.045 ]}
              />
            ))}
          </AnimatedInstance>
        </InstanceGeneration>
      ) }
    </group>
  );
}

function AnimatedInstance({ parameters, children }) {
  const target = React.useRef();
  React.useEffect(() => {
    const { shots, height } = parameters;
    const positionWrap = gsap.utils.wrap( 0, height * 2 );
    const { children } = target.current;

    // let data = 0;

    // function mouseAction() {
    //   return data += 2;
    // }

    // window.addEventListener('wheel', mouseAction);

    function tickerAction( time ) {
      children.forEach( (item, id) => {
        const { position, rotation, direction, speed } = shots[id];
        const timer = (time * speed) / 20;

        const newPositionY = positionWrap(position[1] - timer); 
        const strength = 1.0 - newPositionY / (height * 2);
        const scaleFactor = 3.7 + (1 - strength) * 1.7 ;
        const theta = (timer - newPositionY) * 0.1;

        item.children[0].rotation.x = rotation[0] + theta * direction;
        item.rotation.y = rotation[1] + theta * direction;

        item.position.y = newPositionY;
        item.position.x = position[0] * scaleFactor;
        item.position.z = position[2] * scaleFactor;

        item.scale.setScalar( strength * 0.5 );
      });
    }
    
    //add ticker
    gsap.ticker.add(tickerAction);
    return () => {
      gsap.ticker.remove(tickerAction);
      // window.removeEventListener('wheel', mouseAction);
    }
  }, [ parameters ]);
  return (
    <group ref={target} dispose={null} >
      { children }
    </group>
  );
}

function InstanceGeneration({ type, count, children}) {
  const isImage = type === 'image';
  const roughnessMap = useTexture('/textures/image-roughness.jpg');
  
  const bodyParameters = {};
  const imageParameters = {
    roughnessMap: roughnessMap, 
    color: 0x000000,
    roughness: 1,
    metalness: 0.14,
    envMapIntensity: 0.8
  }
  
  const imageGeometry = useImageReference();
  const bodyGeometry = useBodyReference();
  
  const materialParameters = isImage ? imageParameters : bodyParameters;
  const geometry = isImage ? imageGeometry : bodyGeometry;

  return (
    <Instances range={count} geometry={ geometry } >
      <DefaultMaterial {...materialParameters} />
      { children }
    </Instances>
  );
}

function ShotTemplate({ 
  positionStep,
  position = [0, 0, 0], 
  rotation, 
  scale,
}) {
  const el = React.useRef( null );
  // React.useEffect(() => {
  //   const position = el.current.position.clone();
  //   const positionWrap = gsap.utils.wrap( 0, height * 2 );
  //   const coefficient = { k: 0 };

  //   gsap.to(coefficient, {
  //     repeat: -1,
  //     k: '+=' + 20,
  //     ease: 'power4.in',
  //     duration: 2,
  //   });

  //   function myFunction( time, delta ) {
  //     const timer = (time * speed) / 10;

  //     el.current.rotation.x += ((delta / 100) * direction[1]) / 10;
  //     el.current.rotation.y += ((delta / 100) * direction[0]) / 10;

  //     const newPositionY = positionWrap(position.y - timer - coefficient.k); 
  //     const strength = 1.0 - newPositionY / (height * 2);
  //     const scaleFactor = Math.abs( (0.6 + 0.4 * strength) * radius );

  //     el.current.position.y = newPositionY;
  //     el.current.position.x = position.x * scaleFactor;
  //     el.current.position.z = position.z * scaleFactor;
  //   }
    
  //   //add ticker
  //   gsap.ticker.add(myFunction);
  //   return () => {
  //     gsap.ticker.remove(myFunction);
  //   }
  // }, [speed, radius, height, direction]);

  return (
    <group ref={ el } position={ position } rotation={rotation} scale={scale} dispose={null} >
      <group>
        <Instance position={positionStep} />
      </group>
    </group>
  )
} 


export default Background;