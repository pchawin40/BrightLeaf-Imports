// src/components/ShippingReturn/SRContent/SRContent.js

// import css
import './SRContent.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

//? SRContent component
const SRContent = () => {
  return (
    <section className="SRContent section">
      {/* Header */}
      <h1>
        Shipping & Returns
      </h1>

      {/* Subsection: Shipping Policy */}
      <section className="SRContent sub-section policy">
        <h2>
          Shipping Policy
        </h2>
        <p>
          Brightleaf Imports offers domestic shipping only. Our team provides
          transportation and installation services for products based on the
          delivery address.Currently we only offer transportation and installation
          services for customers in Washington State and Oregon.Shipping fees are
          adjusted based on the shipping location.
        </p>
        <p>
          Please contact us if you have any questions regarding
        </p>

        {/* Contact button */}
        <figure>
          <NavLink to="/contact">
            <button>
              Contact
            </button>
          </NavLink>
        </figure>
      </section>

      {/* Subsection: Return & Exchange Policy */}
      <section className="SRContent sub-section return-exchange">
        <h2>
          Return & Exchange Policy
        </h2>
        <p>
          Please contact our customer service team if you have any issues with your
          purchase. We will do everything we can to assist you with any issues.
        </p>
      </section>
    </section>
  );
};

// export default component
export default SRContent;
