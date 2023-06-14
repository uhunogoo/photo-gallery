import { useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import PhotoShot from './PhotoShot';
import { motion } from 'framer-motion-3d';
// import { Text } from '@react-three/drei';

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
  const { scrollYProgress } = useScroll();
  const positionY = useTransform( scrollYProgress, [0, 1], [0, 4 * (IMAGES.length - 1)] );
  // const scrollSmooth = useSpring( scrollYProgress, { stiffness: 350, damping: 50 } );
  // const positionY = useTransform( scrollSmooth, [0, 1], [0, 4 * (IMAGES.length - 1)] );

  return (
    <>
      <motion.group 
        dispose={null}
        position-y={ positionY }
      >
        {IMAGES.map((image, i) => (
          <MotionGroup key={image.id} stepY={-i * 4}>
            <PhotoShot
              map={image.url}
              type="gallery"
              scale={0.25}
              position-z={0}
            />
          </MotionGroup>
        ))}
      </motion.group>

      {children}
    </>
  );
}

function MotionGroup({ children, stepY }) {
  const angle = Math.PI * 0.08;
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);

  const xSmooth = useSpring(positionX, { mass: 0.5, damping: 40, stiffness: 400 });
  const ySmooth = useSpring(positionY, { mass: 0.5, damping: 40, stiffness: 400 });

  const rotateY = useTransform( xSmooth, [-1, 1], [-angle, angle] );
  const rotateX = useTransform( ySmooth, [-1, 1], [-angle, angle] );
  
  function handlePointerMove(event) {
    const { uv } = event; 
    positionX.set( (uv.x - 0.5) * 2 );
    positionY.set( (uv.y - 0.5) * 2 );
  }
  function handleReset() {
    positionY.set(0);
    positionX.set(0);
  }
  
  return (
    <group position-y={stepY} dispose={null}>
      <HoverCatcher
        scale={[ 2, 2.1 ]}
        handlePointerMove={ handlePointerMove }
        handleReset={ handleReset }
      />

      <motion.group
        rotation-y={ rotateY }
        rotation-x={ rotateX }
        dispose={null}
      >
        { children }
      </motion.group>
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
