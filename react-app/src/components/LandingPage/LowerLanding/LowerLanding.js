// src/components/LandingPage/LowerLanding/LowerLanding.js

// import component
import LLLowerLow from './LLLowerLow';
import LLLowerTop from './LLLowerTop';
import LLUpperLow from './LLUpperLow';
import LLUpperTop from './LLUpperTop';

// import css
import './LowerLanding.css';

//? LowerLanding component
const LowerLanding = () => {
  return (
    <section id="lower-landing-section">
      {/* Lower Landing: Upper Top Section */}
      <LLUpperTop />

      {/* Lower Landing: Lower Top Section */}
      <LLLowerTop />

      {/* Lower Landing: Upper Low Section */}
      <LLUpperLow />

      {/* Lower Landing: Lower Low Section */}
      {/* <LLLowerLow /> */}
    </section>
  );
};

// export default component
export default LowerLanding;
