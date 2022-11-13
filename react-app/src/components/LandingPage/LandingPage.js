// src/components/LandingPage/LandingPage.js

// import css
import './LandingPage.css';

// export component
import Footer from "../Footer";
import NavHeader from "../NavHeader";
import LowerLanding from "./LowerLanding";
import TopLanding from "./TopLanding";

//? LandingPage component
const LandingPage = () => {
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
