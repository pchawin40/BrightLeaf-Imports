// src/components/Footer/MidFooterRight/MidFooterRight.js

// import css
import './MidFooterRight.css';

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
            Shipping & Return
          </li>
          <li>
            Store Policy
          </li>
          <li>
            Payment Methods
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
            Home
          </li>
          <li>
            Shop All
          </li>
          <li>
            Portfolio
          </li>
          <li>
            About
          </li>
          <li>
            Contact
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
