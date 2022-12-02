// src/components/CheckOutModal/InnerRight/InnerRight.js

// import css
import './InnerRight.css';

//import react-router-dom
import { NavLink } from 'react-router-dom';
import { useCheckOut } from '../../../context/CheckOutContext';
import { useEffect } from 'react';

//? InnerRight component
const InnerRight = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();

  /**
  * UseEffect
  */
  // per general
  useEffect(() => {
    // nothing for now
  }, [currentStep]);

  // function to load inner right content container
  const loadInnerRightContent = () => {
    // if step 1, return shipping address
    if (currentStep === 1) {
      return (
        loadShippingAddressIR()
      );
    }

    // if step 2, return payment method
    if (currentStep === 2) {
      return (
        loadPaymentMethodIR()
      );
    }

    // if step 3, return review items and shipping
    if (currentStep === 3) {
      return (
        loadReviewItemsIR()
      );
    }
  }

  // function to load step 1: Shipping Address
  const loadShippingAddressIR = () => {
    return (
      <>
        {/* Place Order */}
        < button >
          Use this address
        </button >

        {/* Quick Fine Line */}
        < p >
          Continue to step 3 to finish checking out.
          You'll have a chance to review and edit your order
          before it's final.
        </p >
      </>
    );
  }

  // function to load step 2: Payment Method
  const loadPaymentMethodIR = () => {
    return (
      <>
        {/* Place Order */}
        < button >
          Use this payment method
        </button >

        {/* Quick Fine Line */}
        < p >
          Continue to step 3 to finish checking out.
          You'll have a chance to review and edit your order
          before it's final.
        </p >
      </>
    );
  }

  // function to load step 3: Review Items and Shipping
  const loadReviewItemsIR = () => {
    return (
      <>
        {/* Place Order */}
        < button >
          Place Order
        </button >

        {/* Quick Fine Line */}
        < p >
          By placing your order, you agree to Brightleaf Import's
          < NavLink
            to="/shipping-returns"
          >
            Shipping and Return & Exchange Policy
          </NavLink >
        </p >
      </>
    );
  }

  return (
    // Checkout Modal: Inner Section: Right
    < aside className="checkoutmodal inner-section right" >
      {/* Submit Container */}
      < section className="cir submit-container" >
        {
          loadInnerRightContent()
        }
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
