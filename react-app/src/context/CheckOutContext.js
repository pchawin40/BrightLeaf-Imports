// src/components/context/CheckOutContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const CheckOutContext = createContext();
export const useCheckOut = () => useContext(CheckOutContext);

// create provider for checkout page
export default function CheckOutProvider({ children }) {
  // state for context
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Checkout Provider
  return (
    <>
      <CheckOutContext.Provider
        value={{
          showCheckoutModal, setShowCheckoutModal
        }}
      >
        {children}
      </CheckOutContext.Provider>
    </>
  )
}
