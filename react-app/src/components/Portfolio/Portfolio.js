// src/components/Portfolio/Portfolio.js

// import css
import './Portfolio.css';

// import component
import Footer from "../Footer";
import LowerPortfolio from "./LowerPortfolio";
import TopPortfolio from "./TopPortfolio";

//? Portfolio component
const Portfolio = () => {
  return (
    <section id="portfolio-section">
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
