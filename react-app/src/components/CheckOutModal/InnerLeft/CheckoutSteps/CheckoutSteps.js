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
    < section className="cil lower checkoutsteps-container">
      {/* Step 1: Shipping Address */}
      < figure
        onClick={_ => (currentStep >= 1 && currentStep !== 1) && setCurrentStep(1)}
        className={`cil lower payment-method ${currentStep >= 1} ${currentStep !== 1 ? "current" : ""}`}
      >
        <span>
          1
        </span>
        <span>
          Shipping Address
        </span>
      </figure >

      {/* Step 2: Payment Method */}
      < figure
        onClick={_ => (currentStep >= 2 && currentStep !== 2) && setCurrentStep(2)}
        className={`cil lower payment-method ${currentStep >= 2} ${currentStep !== 2 ? "current" : ""}`}
      >
        <span>
          2
        </span>
        <span>
          Review Items and Shipping
        </span>
      </figure >

      {/* Step 3: Review items and shipping */}
      < figure
        onClick={_ => (currentStep >= 3 && currentStep !== 3) && setCurrentStep(3)}
        className={`cil lower payment-method ${currentStep >= 3} ${currentStep !== 3 ? "current" : ""}`}
      >
        <span>
          3
        </span>
        <span>
          Payment and Confirmation
        </span>
      </figure >
    </section >
  );
};

// export default component
export default CheckoutSteps;
