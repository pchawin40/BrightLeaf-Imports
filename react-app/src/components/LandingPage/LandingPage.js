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

  useEffect(() => {
    if (currentPage !== "landing") setCurrentPage("landing");
  }, [currentPage]);

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
