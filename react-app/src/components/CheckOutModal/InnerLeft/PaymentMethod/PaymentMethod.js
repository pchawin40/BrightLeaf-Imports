// src/components/CheckOutModal/InnerLeft/PaymentMethod/PaymentMethod.js

// import css 
import './PaymentMethod.css';

// import context
import { useCheckOut } from '../../../../context/CheckOutContext';

//? PaymentMethod component
const PaymentMethod = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();

  return (
    <section className="">
      [Payment Method Component]

      {/* Use This Address Button */}
      <button
        onClick={_ => setCurrentStep(3)}
      >
        Use this payment method
      </button>
    </section>
  );
};

// export default component
export default PaymentMethod;
