// src/components/CheckOutModal/InnerLeft/InnerLeft.js

// import css
import './InnerLeft.css';

// import react-redux
import { useSelector } from 'react-redux';

// import context
import { useCheckOut } from '../../../context/CheckOutContext';

// import component
import CheckoutSteps from './CheckoutSteps';
import PaymentMethod from './PaymentMethod';
import ReviewItems from './ReviewItems';
import ShippingAddress from './ShippingAddress';

// import store
import * as shoppingCartActions from '../../../store/shoppingCarts';
import { useEffect } from 'react';

//? InnerLeft component
const InnerLeft = () => {
  /**
   * Controlled inputs
   */
  const { currentStep, setCurrentStep } = useCheckOut();

  /**
   * Selector functions
   */
  const currentItemsQuantity = useSelector(shoppingCartActions.getCurrentItemsQuantity);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [currentItemsQuantity]);


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
          <i className="fa-solid fa-angle-left" />
          Previous Step
        </span>
      )
    else
      return (
        <span className="false">
          <i className="fa-solid fa-angle-left" />
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
          <h1>
            Checkout
            (
            <span>
              {
                currentItemsQuantity <= 1
                  ?
                  `${currentItemsQuantity} item`
                  :
                  `${currentItemsQuantity} items`
              }
            </span>
            )
          </h1>
          <span />
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
