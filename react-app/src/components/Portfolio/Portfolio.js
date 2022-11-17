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

// import store
import * as imageActions from '../../store/images';
import { useDispatch } from 'react-redux';

//? Portfolio component
const Portfolio = () => {

  /**
   * Controlled inputs
   */
  // set background color
  const { backgroundColor, setBackgroundColor } = useNavHeader();
  const { currentPage, setCurrentPage } = useNavHeader();

  // invoke dispatch
  const dispatch = useDispatch();

  
  const prevScrollY = useRef(0);
  
  useEffect(() => {
    if (currentPage !== "portfolio") {
      setCurrentPage("portfolio");
    }
    
    if (currentPage === "portfolio") {
      dispatch(imageActions.thunkGetImages("Product=True&Gallery=True"));
    }
    
    // on open, always scroll to top
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <section
      className="page-section"
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
