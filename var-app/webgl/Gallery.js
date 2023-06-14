import { useScroll } from '@react-three/drei';
import PhotoShot from './PhotoShot';
import { motion } from 'framer-motion-3d';

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
  const scroll = useScroll()
  console.log( scroll )
  return (
    <>
      <motion.group 
        dispose={null}
        // animate="moveY"
        // variants={{
        //   moveY: {
        //     y: 4 * (IMAGES.length - 1),
        //     transition: {
        //       duration: IMAGES.length * 2,
        //       bounce: 0,
        //       ease: 'linear',
        //       repeat: Infinity,
        //       repeatType: "mirror"
        //     }
        //   }
        // }}
      >
        {IMAGES.map((image, i) => (
          <motion.group
            key={image.id}
            whileHover={{ scale: 1.1 }}
            transition={{ 
              type: 'spring',
              
            }}
          >
            <PhotoShot
              map={image.url}
              type="gallery"
              scale={0.25}
              position-y={-i * 4}
              position-z={0}
            />
          </motion.group>
        ))}
      </motion.group>

      {children}
    </>
  );
}


export default Gallery;
