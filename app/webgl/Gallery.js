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
  return (
    <>
      <motion.group 
        dispose={null}
        animate="moveY"
        variants={{
          moveY: {
            y: 4 * (IMAGES.length - 1),
            transition: {
              duration: IMAGES.length * 2,
              bounce: 0,
              ease: 'linear',
              repeat: Infinity,
              repeatType: "mirror"
            }
          }
        }}
      >
        {IMAGES.map((image, i) => (
          <PhotoShot
            key={image.id}
            map={image.url}
            type="gallery"
            scale={0.25}
            position-y={-i * 4}
            position-z={0}
          />
        ))}
      </motion.group>

      {children}
    </>
  );
}


export default Gallery;
