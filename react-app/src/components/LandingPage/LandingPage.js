// src/components/LandingPage/LandingPage.js

// import css
import './LandingPage.css';

// export component
import Footer from "../Footer";
import NavHeader from "../NavHeader";
import LowerLanding from "./LowerLanding";
import TopLanding from "./TopLanding";

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import react
import { useEffect, useRef, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

//? LandingPage component
const LandingPage = () => {

  /**
   * Controlled inputs
   */
  const { backgroundColor, setBackgroundColor } = useNavHeader();
  const { currentPage, setCurrentPage } = useNavHeader();

  const prevScrollY = useRef(0);

  useEffect(() => {
    if (currentPage !== "landing") setCurrentPage("landing");
    console.log('landing', currentPage);
  }, [currentPage]);

  // function to handle changing of background based on y scroll position
  const changeBackground = () => {

    const currentScrollY = window.scrollY;

    // set background color
    if (window.scrollY >= window.innerHeight - (window.innerHeight / 1.25)) {
      setBackgroundColor('white');
    } else {
      setBackgroundColor('#484644');
    }

    prevScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, [backgroundColor]);

  return (
    <section
      id="landing-page-section"
    >
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
