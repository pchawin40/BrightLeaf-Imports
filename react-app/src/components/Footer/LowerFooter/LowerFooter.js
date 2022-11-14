// src/components/Footer/LowerFooter/LowerFooter.js

// import component
import LowerFooterLeft from './LowerFooterLeft';
import LowerFooterRight from './LowerFooterRight';

// import css
import './LowerFooter.css';

//? LowerFooter component
const LowerFooter = () => {
  return (
    <section id="lower-footer-section">
      {/* Lower Footer: Left */}
      <LowerFooterLeft />

      {/* Lower Footer: Right */}
      <LowerFooterRight />
    </section>
  );
};

// export default component
export default LowerFooter;
