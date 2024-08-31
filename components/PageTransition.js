// Zoom in from the center during transition
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      key={children.key}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.5, opacity: 0 }}
      transition={{ type: 'tween', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
