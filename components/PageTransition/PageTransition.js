import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
}

export default function PageTransition({children}) {
  const route = usePathname();
  return(
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ bounce: 0, duration: 0.3}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}