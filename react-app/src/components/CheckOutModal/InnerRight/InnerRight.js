// src/components/CheckOutModal/InnerRight/InnerRight.js

// import css
import './InnerRight.css';

//import react-router-dom
import { NavLink } from 'react-router-dom';

//? InnerRight component
const InnerRight = () => {
  return (
    // Checkout Modal: Inner Section: Right
    < aside className="checkoutmodal inner-section right" >
      {/* Submit Container */}
      < section className="cir submit-container" >
        {/* Place Order */}
        < button >
          Place Order
        </button >

        {/* Quick Fine Line */}
        < p >
          By placing your order, you agree to Brightleaf Import's
          <NavLink
            to="/shipping-returns"
          >
            Shipping and Return & Exchange Policy
          </NavLink >
        </p >
      </section >

      {/* Order Summary */}
      < section className="cir order-summary" >
        {/* Items $ */}

        {/* Shipping & Handling */}

        {/* Total before tax */}

        {/* Estimated tax to be collected */}

        {/* Order total */}
      </section >

      {/* Order Total */}
      < section className="cir order-total" >
        {/* Total ($ USD) */}
      </section >

      {/* Quick FAQ */}
      < section className="cir faq" >
        {/*  */}
      </section >
      <section>

      </section>
    </aside >
  );
};

// export default component
export default InnerRight;
