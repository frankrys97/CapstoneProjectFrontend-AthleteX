import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../style/ScrollToTopButton.scss';

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    showButton && (
      <button className="scroll-to-top" onClick={scrollToTop} data-aos="fade-up">
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
