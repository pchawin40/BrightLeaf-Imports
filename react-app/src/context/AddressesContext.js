// src/components/context/AddressesContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const AddressesContext = createContext();
export const useAddress = () => useContext(AddressesContext);

// create provider for address page
export default function AddressProvider({ children }) {
  // state for context
  const [addressLoaded, setAddressLoaded] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Address Provider
  return (
    <>
      <AddressesContext.Provider
        value={{
          addressLoaded, setAddressLoaded,
          showAddressModal, setShowAddressModal
        }}
      >
        {children}
      </AddressesContext.Provider>
    </>
  )
}
