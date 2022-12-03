// src/components/CheckOutModal/InnerRight/InnerRight.js

// import css
import './InnerRight.css';

//import react-router-dom
import { NavLink } from 'react-router-dom';
import { useCheckOut } from '../../../context/CheckOutContext';
import { useEffect } from 'react';
import PaymentForm from '../InnerLeft/PaymentMethod/PaymentForm';

//? InnerRight component
const InnerRight = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();
  const { stripeLoaded, setStripeLoaded } = useCheckOut();

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
        loadReviewItemsIR()
      );
    }

    // if step 3, return review items and shipping
    if (currentStep === 3) {
      return (
        loadPaymentMethodIR()
      );
    }
  }

  // function to load step 1: Shipping Address
  const loadShippingAddressIR = () => {
    return (
      <>
        {/* Place Order */}
        < button
          onClick={_ => setCurrentStep(currentStep => currentStep + 1)}
        >
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
        < button
          className={`stripe ${stripeLoaded}`}
        >
          Checkout
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
        < button
          onClick={_ => setCurrentStep(currentStep => currentStep + 1)}
        >
          Proceed to Payment
        </button >

        {/* Quick Fine Line */}
        < p >
          By placing your order, you agree to Brightleaf Import's &nbsp;
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
      <aside className="cir inner-main">

        {/* Submit Container */}
        < section className="cir submit-container" >
          {
            loadInnerRightContent()
          }
        </section >

        <span className='line-span' />

        {/* Order Summary */}
        < section className="cir order-summary" >
          {/* Header */}
          <h2>
            Order Summary
          </h2>

          <section className='cir order-summary inner'>
            {/* Items $ */}
            <p>
              <span>
                Items:
              </span>
              <span>
                $USD
              </span>
            </p>

            {/* Shipping & Handling */}
            <p>
              <span>
                Shipping & handling:
              </span>
              <span>
                $USD
              </span>
            </p>

            <p className="line-span-container">
              <span />
              <span className='line-span' />
            </p>

            {/* Total before tax */}
            <p>
              <span>
                Total before tax:
              </span>
              <span>
                $USD
              </span>
            </p>

            {/* Estimated tax to be collected */}
            <p>
              <span>
                Estimated tax to be collected:
              </span>
              <span>
                $USD
              </span>
            </p>

          </section>

          <span className='line-span' />

          {/* Order total */}
          <p className="cir order-total">
            <span>
              Order total:
            </span>
            <span>
              $USD
            </span>
          </p>

        </section >
      </aside>
    </aside >
  );
};

// export default component
export default InnerRight;
