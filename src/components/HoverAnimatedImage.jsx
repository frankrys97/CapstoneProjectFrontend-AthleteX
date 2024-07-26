import { motion } from 'framer-motion';

function HoverAnimatedImage({ src, alt }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
    />
  );
}

export default HoverAnimatedImage;
