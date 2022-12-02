// src/components/CheckOutModal/InnerLeft/ShippingAddress/ShippingAddress.js

// import css 
import { useCheckOut } from '../../../../context/CheckOutContext';
import './ShippingAddress.css';

//? ShippingAddress component
const ShippingAddress = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();

  return (
    <section className="">
      [Shipping Address Component]

      {/* Use This Address Button */}
      <button
        onClick={_ => setCurrentStep(2)}
      >
        Use this address
      </button>
    </section>
  );
};

// export default component
export default ShippingAddress;
