import gsap from 'gsap'

import React, { Suspense } from 'react'
import { Vector3 } from 'three';
import { Instance, Instances } from '@react-three/drei'
import { useReference } from '@/src/hooks/useReference';
import ImageShot from './EmptyImageMaterial';

const PARTS = [ 'body', 'image' ];

function InstancedShotsLevitation({ count, height, radius }) {
  const shots = React.useMemo(() => {
  const result = [];

  for (let i = 0; i < count; i++) {
    const vec = new Vector3();
    const h = height * 2  * Math.random();
    vec.setFromCylindricalCoords( 
      radius, // radius
      Math.PI * 2 * Math.random(), // theta 
      h // height
    );
    const position = vec.toArray();
    
    const rotate = Math.PI * 2;
    const rotation = [
      gsap.utils.random( -rotate, rotate ),
      gsap.utils.random( -rotate, rotate ),
      0
    ];
    
    // Push line parameters
    result.push({
      rotation: rotation,
      position: position,
      scale: gsap.utils.random(0.25, 0.4),
      speed: gsap.utils.random(10, 40)
    })
  }
  return result;
}, [count, height, radius]);

const [material, geometry] = useReference();
return (
  <group position-z={-0.5 * height} rotation-x={-Math.PI * 0.5}>
    { PARTS.map(type => {
      const isImage = type === 'image';
      const positionStep = isImage && [0, 0.35, 0.045 ];
      
      return (
        <Instances 
          key={type} 
          range={count} 
          geometry={ !isImage && geometry }
          material={ !isImage && material }
        >
          { isImage && (<>
            <planeGeometry args={[ 3.5, 2.9, 1, 1 ]} />
            <Suspense>
              <ImageShot />
            </Suspense>
            </>) }

          <GenerateInstances 
            shots={ shots }
            height={height} 
            radius={radius} 
            positionStep={ positionStep }
          />
        </Instances>
      );
    }) }
  </group>
);
}
function GenerateInstances({ shots, ...delegated }) {
  const photosGroup = React.useRef();

  return (
    <group dispose={null} ref={photosGroup} >
      {shots.map( (props, i) => (
        <ShotTemplate key={i} {...props} {...delegated} />
      ))}
    </group>
  );
}

function ShotTemplate({ 
  speed,
  height,
  radius,
  positionStep,
  position = [0, 0, 0], 
  rotation, 
  scale,
}) {
  const el = React.useRef( null );
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const positions = el.current.position; 
      const rotations = el.current.rotation; 
      function modify(v, el) {
        const strength = 1.0 - el.y / (height * 2);
        return v * Math.abs( (0.5 + 0.5 * strength) * radius );
      }
      const v = gsap.utils.wrap([ -Math.PI * 2, Math.PI * 2 ]);
      function rotation(i) {
        return '+=' + v(i);
      }

      const tl = gsap.timeline({
        defaults: {
          repeat: -1,
          duration: speed / 2,
          ease: 'none',
          immediateRender: true,
        }
      });
      tl.to(positions, {
        y: '-=' + height * 2,
        x: '*=1',
        z: '*=1',
        modifiers: {
          y: gsap.utils.wrap(0, height * 2),
          x: modify,
          z: modify
        }
      });
      tl.to(rotations, {
        x: rotation,
        y: rotation,
      }, '<');
    });

    return () => ctx.revert();
  }, [ speed, height, radius ]);

  return (
    <group ref={ el } position={ position } rotation={rotation} scale={scale} dispose={null} >
      <Instance position={positionStep} />
    </group>
  )
} 

export default React.memo( InstancedShotsLevitation );