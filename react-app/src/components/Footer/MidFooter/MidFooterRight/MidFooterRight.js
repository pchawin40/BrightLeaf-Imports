// src/components/Footer/MidFooterRight/MidFooterRight.js

// import css
import './MidFooterRight.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

//? MidFooterRight component
const MidFooterRight = () => {

  /**
   * Controlled inputs
   */
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribeEmailLength, setSubscribeEmailLength] = useState(0);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [subscribeEmail]);

  // function to update email
  const updateSubscribeEmail = e => {
    setSubscribeEmail(e.target.value);
    setSubscribeEmailLength(e.target.value.length);
  }

  // function to handle subscribe to email
  const handleSubscribe = async e => {
    if (validateSubscribeEmail()) {
      const res = await fetch('/api/mail/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': subscribeEmail
        })
      });

      if (res.ok) {
        window.alert(`Thank you for subscribing. You have been subscribed to our newsletter at ${subscribeEmail}`);
      }
    } else {
      window.alert(`Your email was not valid. We have not added this email to our newsletter sender. Thank you for understanding.`);
    }
  }

  // function to validate subscription email
  const validateSubscribeEmail = () => {
    return String(subscribeEmail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

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
            <NavLink
              to="/store-policy"
              onClick={_ => {
                window.scrollTo(0, 0);
              }}
            >
              Store Policy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/store-policy"
              onClick={_ => {
                window.scrollTo(0, 0);
              }}
            >
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
            <NavLink to="/product-page">
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
            onChange={updateSubscribeEmail}
            value={subscribeEmail}
            placeholder="E-mail"
          />
          <button
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </section>
      </section>
    </section>
  );
};

// export default component
export default MidFooterRight;
