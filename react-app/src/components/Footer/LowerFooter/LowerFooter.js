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
      {/* Lower Footer: Top */}
      <section id="lfs-top">
        {/* Lower Footer: Left */}
        <LowerFooterLeft />

        {/* Lower Footer: Right */}
        <LowerFooterRight />
      </section>

      {/* Lower Footer: Lower */}
      <section id="lfs-lower">

      </section>
    </section>
  );
};

// export default component
export default LowerFooter;
