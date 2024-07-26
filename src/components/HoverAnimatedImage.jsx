import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function HoverAnimatedImage({ src, alt, animationType }) {
  const animationSettings = {
    default: { scale: 1.1, rotate: 5, transition: { duration: 0.3 } },
    reverse: { scale: 1.1, rotate: -5, transition: { duration: 0.3 } },
    spin: { scale: 1.1, rotate: 720, transition: { duration: 1, ease: "easeOut" } },
    reverseSpin: { scale: 1.1, rotate: -720, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <motion.img
      src={src}
      alt={alt}
      className='img-fluid'
      whileHover={animationSettings[animationType] || animationSettings.default}
    />
  );
}

HoverAnimatedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  animationType: PropTypes.oneOf(['default', 'reverse', 'spin', 'reverseSpin']),
};

export default HoverAnimatedImage;
