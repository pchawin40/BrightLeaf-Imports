// src/components/LandingPage/LandingPage.js

// import css
import './LandingPage.css';

// export component
import Footer from "../Footer";
import NavHeader from "../NavHeader";
import LowerLanding from "./LowerLanding";
import TopLanding from "./TopLanding";

// import react
import { useEffect, useRef, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

//? LandingPage component
const LandingPage = () => {

  const [color, setColor] = useState('white');

  const prevScrollY = useRef(0);

  // function to handle changing of background based on y scroll position
  const changeBackground = () => {

    const currentScrollY = window.scrollY;

    // if mid, change to black
    if (window.scrollY >= window.innerHeight - (window.innerHeight / 1.05) && window.scrollY < (5 * (window.innerHeight / 1.235))) {
      setColor('black');
    } else {
      setColor('white');
    }

    prevScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, [color]);

  return (
    <section id="landing-page-section">
      {/* Top Landing */}
      <TopLanding />

      {/* Lower Landing */}
      <LowerLanding />

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default LandingPage;
