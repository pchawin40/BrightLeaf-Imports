// src/components/About/LowerAbout/LowerAbout.js

// import css
import BottomLower from './BottomLower/BottomLower';
import './LowerAbout.css';
import TopLower from './TopLower';

//? LowerAbout component
const LowerAbout = () => {
  return (
    <section className="lower-about-section">
      {/* Top Lower */}
      <TopLower />

      {/* Bottom Lower */}
      <BottomLower />
    </section>
  );
};

// export default component
export default LowerAbout;
