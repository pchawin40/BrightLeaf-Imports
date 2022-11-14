// src/components/Footer/MidFooter/MidFooter.js

// import component
import MidFooterLeft from './MidFooterLeft';
import MidFooterRight from './MidFooterRight';

// import css
import './MidFooter.css';

//? MidFooter component
const MidFooter = () => {
  return (
    <section id="mid-footer-section">
      {/* Mid Footer: Left */}
      <MidFooterLeft />

      {/* Mid Footer: Right */}
      <MidFooterRight />
    </section>
  );
};

// export default component
export default MidFooter;
