// src/components/Footer/Footer.js

// import component
import LowerFooterLeft from './LowerFooterLeft';
import LowerFooterRight from './LowerFooterRight';
import MidFooterLeft from './MidFooterLeft';
import MidFooterRight from './MidFooterRight';
import TopFooterHeader from './TopFooterHeader';

// import css
import './Footer.css';

//? Footer component
const Footer = () => {
  return (
    <section id="footer-section">
      {/* Top Footer: Header */}
      <TopFooterHeader />

      {/* Mid Footer: Left */}
      <MidFooterLeft />

      {/* Mid Footer: Right */}
      <MidFooterRight />

      {/* Lower Footer: Left */}
      <LowerFooterLeft />

      {/* Lower Footer: Right */}
      <LowerFooterRight />

    </section>
  );
};

// export default component
export default Footer;
