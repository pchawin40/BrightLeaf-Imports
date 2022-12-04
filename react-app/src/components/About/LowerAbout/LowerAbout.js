// src/components/About/LowerAbout/LowerAbout.js

// import css
import './LowerAbout.css';

// import component
import BottomLower from './BottomLower';
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
