// src/components/CheckOutModal/InnerLeft/PaymentMethod/PaymentMethod.js

// import css 
import './PaymentMethod.css';

// import component
import PaymentForm from './PaymentForm';

// import context
import { useCheckOut } from '../../../../context/CheckOutContext';

// import libraries
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// TODO: To fix after for live site
const stripePromise = loadStripe("pk_live_51MAScNDXY8EB2pbFxrLtm1bsZYUOJ7lQBDlQzAiConfdBMBq2qI4WufoUJbRNQibJM9Fzhd0YleT914p9RNeT7hS00vg3epksW");

//? PaymentMethod component
const PaymentMethod = () => {
  /**
  * Controlled inputs
  */
  return (
    <section className="payment-method">
      {/* Payment Form */}
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </section>
  );
};

// export default component
export default PaymentMethod;
