'use client'
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 40 },
}

export default function Block({children}) {
  const route = usePathname();
  children.key = route;

  return(
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={{ bounce: 0, duration: 2}}
      >
        <div className="text-center">
          { route }
        </div>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}