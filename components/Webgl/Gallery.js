import PhotoShot from './PhotoShot';
import React from 'react';
import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    id: Math.random(),
    url: 'textures/image-0.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-1.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-2.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-3.jpg',
  },
  {
    id: Math.random(),
    url: 'textures/image-10.jpg',
  },
];

function Gallery({ children }) {
  const gallery = React.useRef();
  React.useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.to(gallery.current.position,
        {
          y: 3 * (IMAGES.length - 1),
          ease: 'none',
          scrollTrigger: {
            scrub: 0.5,
            markers: true,
            snap: {
              snapTo: 1 / (IMAGES.length - 1),
              duration: { min: 0.1, max: 0.6 },
              directional: false,
              ease: 'power1'
            } 
          }
        }
      );

      const tl = gsap.timeline({ 
        scrollTrigger: {
          scrub: 0.8,
          snap: {
            snapTo: 1 / (IMAGES.length - 1),
            duration: { min: 0.1, max: 0.6 },
            directional: false,
            ease: 'power1'
          } 
        },
        defaults: {
          ease: 'none',
          duration: 1,
        }
      });

      gallery.current.children?.map((item, i, array) => {
        const isLastItem = (i + 1) === array.length;
        if (i !== 0) {
          tl.from(item.position, { 
            z: '+=2',
            ease: 'power3.out'
          });
          tl.from(item.rotation, { 
            x: -Math.PI * 0.4,
            ease: 'sine.in'
          }, '<+=10%');
        }

        // Reverse animation
        if (!isLastItem) {
          tl.to(item.scale, { 
            x: 0.9,
            y: 0.9,
            ease: 'power2.out' 
          });
          tl.to(item.position, { 
            y: '+=1.4',
            z: '-=2',
            ease: 'circ.in'
          }, '<');
          tl.to(item.rotation, {
            x: Math.PI * 0.5,
            z: Math.PI * 0.5,
            ease: 'circ.in'
          }, '<');
        };
      });


    }, gallery);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <group
        ref={ gallery }
        dispose={ null }
      >
        {IMAGES.map((image, i) => (
          <MotionGroup key={image.id} stepY={-i * 3}>
            <PhotoShot
              map={image.url}
              type="gallery"
              scale={0.25}
              position-z={0}
            />
          </MotionGroup>
        ))}
      </group>

      {children}
    </>
  );
}

const Group = React.forwardRef(({children, delay }, ref) => {
  const el = React.useRef();
  const angle = Math.PI * 0.08;

  React.useImperativeHandle(ref, () => {
    const transition = {
      duration: 0.3,
      ease: 'expo.out'
    };
    const moveX = gsap.quickTo(el.current.position, 'x', transition);
    const moveY = gsap.quickTo(el.current.position, 'y', transition);
    const rotateY = gsap.quickTo(el.current.rotation, 'y', transition);
    const rotateX = gsap.quickTo(el.current.rotation, 'x', transition);
    // return our API
    return {
      moveTo(x, y) {
        moveX( 0.1 * x );
        moveY( 0.1 * y );
        rotateY( x * angle );
        rotateX( y * angle );
      }
    };
  }, [delay]);
  
  return (
    <group ref={el}>{ children }</group>
  );
});


function MotionGroup({ children, stepY }) {
  const el = React.useRef();
  
  function handlePointerMove(event) {
    const { uv } = event; 
    el.current.moveTo(
      (uv.x - 0.5) * 2, 
      (uv.y - 0.5) * 2
    );
  }
  
  function handleReset() {
    el.current.moveTo( 0, 0 );
  }
  
  return (
    <group position-y={stepY} dispose={null}>
      <HoverCatcher
        scale={[ 2.15, 2.3 ]}
        handlePointerMove={ handlePointerMove }
        handleReset={ handleReset }
      />
      <Group
        ref={el}
        dispose={null}
      >
        { children }
      </Group>
    </group>
  );
} 

function HoverCatcher({ handlePointerMove, handleReset, scale }) {
  const applyedScale = scale || [1, 1];
  return (
    <mesh
      onPointerMove={ handlePointerMove }
      onPointerLeave={ handleReset }
      scale={[ ...applyedScale, 1 ]}
      visible={false}
    >
      <planeGeometry />
    </mesh>
  )
}

export default Gallery;
