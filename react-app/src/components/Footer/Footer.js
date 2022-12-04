// src/components/Footer/Footer.js

// import component
import LowerFooter from './LowerFooter';
import MidFooter from './MidFooter';
import TopFooter from './TopFooter';

// import css
import './Footer.css';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import react
import { createRef, useEffect, useState } from 'react';

//? Footer component
const Footer = () => {
  /**
 * Controlled inputs
 */
  // set rect
  const { footerRect, setFooterRect } = useNavHeader();

  const element = createRef();

  // function to get x and y on window resize
  const getFooterHeight = () => {
    if (element.current) {
      const height = element.current.getBoundingClientRect().height;

      setFooterRect(height);
    }
  }

  // per background color
  useEffect(() => {
    // background color
    window.addEventListener('scroll', getFooterHeight);
    return () => window.removeEventListener('scroll', getFooterHeight);
  }, [element, footerRect]);

  return (
    <section
      ref={element}
      id="footer-section"
    >
      {/* //? Top */}
      <TopFooter />

      {/* //? Mid */}
      <MidFooter />

      {/* //? Lower */}
      <LowerFooter />
    </section>
  );
};

// export default component
export default Footer;
