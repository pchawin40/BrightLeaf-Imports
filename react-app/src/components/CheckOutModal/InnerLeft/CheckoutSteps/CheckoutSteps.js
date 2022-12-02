// src/components/CheckOutModal/InnerLeft/CheckoutSteps/CheckoutSteps.js

// import css
import './CheckoutSteps.css';

// import context
import { useCheckOut } from '../../../../context/CheckOutContext';

//? CheckoutSteps component
const CheckoutSteps = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();

  return (
    // Inner Section: Left: Lower: Checkout Steps Nav
    < section >
      {/* Step 1: Shipping Address */}
      < figure className={`cil lower payment-method ${currentStep >= 1}`} >
        <span>
          1
        </span>
        <span>
          Shipping Address
        </span>
      </figure >

      {/* Step 2: Payment Method */}
      < figure className={`cil lower payment-method ${currentStep >= 2}`} >
        <span>
          2
        </span>
        <span>
          Payment Method
        </span>
      </figure >

      {/* Step 3: Review items and shipping */}
      < figure className={`cil lower payment-method ${currentStep >= 3}`} >
        <span>
          3
        </span>
        <span>
          Review Items and Shipping
        </span>
      </figure >
    </section >
  );
};

// export default component
export default CheckoutSteps;
