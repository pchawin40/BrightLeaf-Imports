// src/components/Portfolio/Portfolio.js

// import css
import './Portfolio.css';

// import component
import Footer from "../Footer";
import LowerPortfolio from "./LowerPortfolio";
import TopPortfolio from "./TopPortfolio";

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import react
import { useEffect, useRef } from 'react';

//? Portfolio component
const Portfolio = () => {

  /**
   * Controlled inputs
   */
  // set background color
  const { backgroundColor, setBackgroundColor } = useNavHeader();
  const { currentPage, setCurrentPage } = useNavHeader();

  const prevScrollY = useRef(0);

  useEffect(() => {
    if (currentPage !== "portfolio") setCurrentPage("portfolio");
    console.log('currentPage', currentPage);
  }, [currentPage]);

  // function to handle changing of background based on y scroll position
  const changeBackground = () => {

    const currentScrollY = window.scrollY;

    // set background color
    if (window.scrollY >= window.innerHeight - (window.innerHeight / 1.25)) {
      setBackgroundColor('white');
    } else {
      setBackgroundColor('#242424');
    }

    prevScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, [backgroundColor]);

  return (
    <section
      id="portfolio-section"
      style={{
        backgroundColor,
        transition: "background-color 1s ease"
      }}
    >
      {/* Top Portfolio Section */}
      <TopPortfolio />

      {/* Lower Portfolio Section */}
      <LowerPortfolio />

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default Portfolio;
