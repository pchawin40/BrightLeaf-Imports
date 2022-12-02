// src/components/CheckOutModal/InnerLeft/InnerLeft.js

// import css
import { useCheckOut } from '../../../context/CheckOutContext';
import CheckoutSteps from './CheckoutSteps';
import './InnerLeft.css';
import PaymentMethod from './PaymentMethod';
import ReviewItems from './ReviewItems';
import ShippingAddress from './ShippingAddress';

//? InnerLeft component
const InnerLeft = () => {
  /**
   * Controlled inputs
   */
  const { currentStep, setCurrentStep } = useCheckOut();

  /**
   * Selector functions
   */

  /**
   * UseEffect
   */


  // function to load button to go back or forward
  const loadButtonNav = () => {
    // Payment Method: Show Previous
    // Review Items: Show Previous
    if (currentStep > 1)
      return (
        <span
          className="true"
          onClick={_ => setCurrentStep(currentStep => currentStep - 1)}
        >
          <i class="fa-solid fa-angle-left" />
          Previous Step
        </span>
      )
    else
      return (
        <span className="false">
          <i class="fa-solid fa-angle-left" />
          Previous Step
        </span>
      )
  }


  // function to load main content
  const loadMainContent = () => {
    // if step 1, return shipping address
    if (currentStep === 1) {
      return <ShippingAddress />
    }

    // if step 2, return payment method
    if (currentStep === 2) {
      return <PaymentMethod />
    }

    // if step 3, return review items and shipping
    if (currentStep === 3) {
      return <ReviewItems />
    }
  }

  return (
    // Checkout Modal: Inner Section: Left
    < section className="checkoutmodal inner-section left" >
      {/* Inner Section: Left: Upper: Main Content */}
      < section className="cil upper main-content">
        {/* Button to go back */}
        <section>
          {
            loadButtonNav()
          }
        </section>

        {/* Load main content */}
        <section>
          {
            loadMainContent()
          }
        </section>
      </section >

      {/* Inner Section: Left: Lower: Checkout Steps Nav */}
      <CheckoutSteps />
    </section>
  );
};

// export default component
export default InnerLeft;
