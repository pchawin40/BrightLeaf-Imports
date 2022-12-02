// src/components/context/CheckOutContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const CheckOutContext = createContext();
export const useCheckOut = () => useContext(CheckOutContext);

// create provider for checkout page
export default function CheckOutProvider({ children }) {
  // state for context
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutReady, setCheckoutReady] = useState(false);

  // Checkout Provider
  return (
    <>
      <CheckOutContext.Provider
        value={{
          showCheckoutModal, setShowCheckoutModal,
          currentStep, setCurrentStep,
          checkoutReady, setCheckoutReady
        }}
      >
        {children}
      </CheckOutContext.Provider>
    </>
  )
}
