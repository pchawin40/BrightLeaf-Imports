// src/components/Footer/MidFooterRight/MidFooterRight.js

// import css
import './MidFooterRight.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

//? MidFooterRight component
const MidFooterRight = () => {
  return (
    <section id="mfr-section">
      {/* Help Section */}
      <section id="mfr-help-section">
        <h4>
          Help
        </h4>
        <ul>
          <li>
            <NavLink to="/shipping-returns">
              Shipping & Return
            </NavLink>
          </li>
          <li>
            <NavLink to="/store-policy">
              Store Policy
            </NavLink>
          </li>
          <li>
            <NavLink to="/store-policy">
              Payment Methods
            </NavLink>
          </li>
        </ul>
      </section>

      {/* Menu Section */}
      <section id="mfr-menu-section">
        <h4>
          Menu
        </h4>
        <ul>
          <li>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/for-home">
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop-all">
              Shop All
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </section>

      {/* Newsletter Section */}
      <section id="mfr-newsletter-section">
        {/* Newsletter */}
        <span>
          Newsletter
        </span>
        {/* Enter email */}
        <span>
          Enter Email*
        </span>
        {/* Email */}
        <section>
          <input
            placeholder="E-mail"
          />
          <button>
            Subscribe
          </button>
        </section>
      </section>
    </section>
  );
};

// export default component
export default MidFooterRight;
