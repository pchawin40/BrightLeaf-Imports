// src/components/About/LowerAbout/BottomLower/LBL/LBL.js

// import css
import './LBL.css';

//? LBL component
const LBL = () => {
  return (
    <section className="LBL-section">
      {/* Left */}
      <section className="BL left">
        {/* Contact Button */}
        <button>
          Contact
        </button>
      </section>

      {/* Right */}
      <section className="BL right">
        {/* Partnerships */}
        <section className="BL-right partnerships">
          <p>
            Our family at Brightleaf Imports is always willing and prepared to partner with local woodworkers,
            artisans and furniture stores for custom pieces, or purchasing of raw material. Please contact us
            if you are interested in a partnership or have any additional questions.
          </p>
        </section>
      </section>
    </section>
  );
};

// export default component
export default LBL;
