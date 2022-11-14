// src/components/LandingPage/LowerLanding/LLUpperLow/LLUpperLow.js

// import css
import './LLUpperLow.css';

//? LLUpperLow component
const LLUpperLow = () => {
  return (
    <section id="ll-uls">
      {/* Lower Top: Left */}
      <section id="uls-left">
        {/* Lower Top: Left: Inner */}
        <section id="uls-left-inner">
          <figure id="uls-left-inner-figure">
            <img
              src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668397929/Brightleaf%20Imports/55ccf4_08b2360f40244493b52187c8bc8205f9_mv2_vxom8b.webp"
              alt="take a glance"
            />
          </figure>
        </section>
      </section>

      {/* Lower Top: Right */}
      <section id="uls-right">
        {/* Lower Top: Right: Inner */}
        <section id="uls-right-inner">
          <h2>
            Take A Glance
          </h2>
          <h3>
            To Where It Begins
          </h3>
          <button>
            View Portfolio
          </button>
        </section>
      </section>
    </section>
  );
};

// export default component
export default LLUpperLow;
