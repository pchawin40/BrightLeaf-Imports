// src/components/CheckOutModal/CheckOutModal.js

// import css
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAddress } from '../../context/AddressesContext';
import { useCheckOut } from '../../context/CheckOutContext';
import { useNavHeader } from '../../context/NavHeaderContext';
import './CheckOutModal.css';
import InnerLeft from './InnerLeft';
import InnerRight from './InnerRight';

//? CheckOutModal component
const CheckOutModal = () => {
  /**
   * Controlled inputs
   */
  const { showCheckoutModal, setShowCheckoutModal } = useCheckOut();
  const { currentStep, setCurrentStep } = useCheckOut();
  const { loadCartModal, setLoadCartModal } = useNavHeader();
  const { selectedAddress, setSelectedAddress } = useAddress();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [currentStep, selectedAddress]);

  // hide scroll
  document.body.style.overflowY = "hidden";

  return (
    // Checkout Modal: Outer Section
    <section className="checkoutmodal outer">
      <section className="checkoutmodal inner">
        {/* Inner Left */}
        <InnerLeft />

        {/* Inner Right */}
        <InnerRight />

        {/* Exit Modal Icon */}
        <i
          className="fa-solid fa-x fa-xl"
          onClick={_ => {
            setLoadCartModal(false);
            setShowCheckoutModal(false);

            document.body.style.overflowY = "scroll";
          }}
        />
      </section>
    </section>
  );
};

// export default component
export default CheckOutModal;
