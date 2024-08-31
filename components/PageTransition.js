// components/PageTransition.js
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      key={children.key}
      initial={{ x: '100vw', opacity: 0 }} // Start off-screen to the right
      animate={{ x: 0, opacity: 1 }} // Slide into view
      exit={{ x: '-100vw', opacity: 20 }} // Slide out to the left
      transition={{ type: 'tween', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
