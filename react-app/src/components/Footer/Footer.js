// src/components/Footer/Footer.js

// import component
import LowerFooter from './LowerFooter';
import MidFooter from './MidFooter';
import TopFooter from './TopFooter';

// import css
import './Footer.css';

//? Footer component
const Footer = () => {
  return (
    <section id="footer-section">
      {/* //? Top */}
      <TopFooter />

      {/* //? Mid */}
      <MidFooter />

      {/* //? Lower */}
      <LowerFooter />
    </section>
  );
};

// export default component
export default Footer;
