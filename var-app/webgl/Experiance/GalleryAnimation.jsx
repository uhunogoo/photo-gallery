import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import React from 'react';

function GalleryAnimation({ children }) {
  const gallery = React.useRef();
  // const camera = useThree( state => state.camera );

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const { children } = gallery.current;
      const tl = gsap.timeline({ 
        paused: true, 
        defaults: {
          ease: 'none',
          duration: 1
        }
      });

      children?.map((item, i) => {
        const isLastItem = (i + 1) === children.length;
        const ID = 'id' + i;


        tl.from(item.scale, { 
          x: 0.75,
          y: 0.75,
          ease: 'power2.inOut' 
        });
        tl.from(item.position, { 
          y: -8,
          ease: 'power2.out' 
        }, '<');
        tl.from(item.rotation, { 
          y: -Math.PI * 0.5, 
          x: -Math.PI * 0.35,
          ease: 'power2.out'
        }, '<');
        
        tl.addPause();
        tl.add( ID );

        // Reverse animation
        if (!isLastItem) {
          tl.to(item.scale, { 
            x: 0.75,
            y: 0.75,
            ease: 'power2.inOut' 
          });
          tl.to(item.position, { 
            y: 8,
            ease: 'power2.in' 
          }, '<');
          tl.to(item.rotation, { 
            y: Math.PI *0.5, 
            x: Math.PI * 0.35,
            ease: 'power2.in'
          }, '<');
        };
      });
      tl.play();
      tl.timeScale(0.7);
      tl.tweenFromTo( 0, 'id4', { 
        // duration: 40,
        ease: 'none', 
        yoyo: true, 
        repeat: -1 
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <group ref={gallery} dispose={ null }>
      {children}
    </group>
  );
} 

export default GalleryAnimation;