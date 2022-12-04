// src/components/LandingPage/LowerLanding/LLLowerTop/LLLowerTop.js

// import css
import './LLLowerTop.css';

// import react-router-dom
import { useHistory } from 'react-router-dom';

//? LLLowerTop component
const LLLowerTop = () => {
  // invoke history
  const history = useHistory();

  return (
    // Lower Top
    <section id="ll-lts">
      {/* Lower Top: Left */}
      <section id="lts-left">
        {/* Lower Top: Left: Top */}
        <section id="lts-left-top">
          {/* Lower Top: Left: Top: Inner */}
          <figure id="lts-left-top-inner-figure">
            {/* Picture */}
            <img
              src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668450314/Brightleaf%20Imports/102720045_614676142740747_20774271708246_nz7c6v.webp"
              alt="living-room-display"
            />
          </figure>
        </section>

        {/* Lower Top: Left: Lower */}
        <section id="lts-left-lower">
          {/* Our Pieces */}
          <figure>
            <i className="fa-sharp fa-solid fa-square fa-xs" />
            <span>
              Our Pieces
            </span>
          </figure>
          {/* Text */}
          <ul>
            <li>
              Coffee
            </li>
            <li>
              Dining
            </li>
            <li>
              Conferences
            </li>
            <li>
              End Tables
            </li>
          </ul>
          {/* Button */}
          <button
            onClick={_ => history.push('/product-page')}
          >
            Shop
          </button>
        </section>

      </section>

      {/* Lower Top: Right */}
      <section id="lts-right">
        {/* Lower Top: Right: Top */}
        <section id="lts-right-top">
          {/* Inner */}
          <section id="lts-right-top-inner">
            {/* Text */}
            <h2>
              Carving out
              <br />
              excellence.
            </h2>
          </section>
        </section>

        {/* Lower Top: Right: Lower */}
        <section id="lts-right-lower">
          {/* Picture */}
          <figure id="lts-right-lower-figure">
            <img
              src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668453546/Brightleaf%20Imports/55ccf4_5c13e82c4bc94d2eb3e0e99db87dcb16f000_eb4nrs.webp"
              alt="craft-tables"
            />
          </figure>
        </section>
      </section>
    </section>
  );
};

// export default component
export default LLLowerTop;
