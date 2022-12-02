// src/components/CheckOutModal/CheckOutModal.js

// import css
import { NavLink } from 'react-router-dom';
import './CheckOutModal.css';
import InnerLeft from './InnerLeft';
import InnerRight from './InnerRight';

//? CheckOutModal component
const CheckOutModal = () => {
  return (
    // Checkout Modal: Outer Section
    <section className="checkoutmodal outer-section">
      <section className="checkoutmodal inner-section">
        {/* Inner Left */}
        <InnerLeft />

        {/* Inner Right */}
        <InnerRight />
      </section>
    </section>
  );
};

// export default component
export default CheckOutModal;
