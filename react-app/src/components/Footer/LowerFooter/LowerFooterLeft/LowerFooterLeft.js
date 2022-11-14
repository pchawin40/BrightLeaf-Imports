// src/components/Footer/LowerFooterLeft/LowerFooterLeft.js

// import css
import './LowerFooterLeft.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

//? LowerFooterLeft component
const LowerFooterLeft = () => {
  return (
    <section id="lfl-section">
      {/* Top */}
      <section id="lfl-section-top">
        <span>
          <NavLink
            to="/"
            onClick={_ => {
              return window.open('https://www.instagram.com/brightleafimports/', '_blank')
            }}
          >
            <i className="fa-brands fa-instagram" />
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/"
            onClick={_ => {
              return window.open('https://www.facebook.com/brightleafimportsseattle', '_blank')
            }}
          >
            <i className="fa-brands fa-facebook-f" />
          </NavLink>
        </span>
      </section>

      {/* Mid */}
      <section id="lfl-section-mid">
        <section id="lfl-section-mid-inner">
          <p>
            T
            :
            (360)
            584-3606
          </p>
          <p>
            E:
            info@brightleafimports.com
          </p>
        </section>
      </section>

      {/* Lower */}
      <section id="lfl-section-lower">
        {/* Lower Footer: Lower: Inner */}
        <section id="lfl-section-lower-inner">
          <p>
            www.brightleafimports.com
          </p>
        </section>
      </section>
    </section>
  );
};

// export default component
export default LowerFooterLeft;
