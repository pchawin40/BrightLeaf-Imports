// src/components/context/AddressesContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const AddressesContext = createContext();
export const useAddress = () => useContext(AddressesContext);

// create provider for address page
export default function AddressProvider({ children }) {
  // state for context
  const [displayName, setDisplayName] = useState("");

  // Address Provider
  return (
    <>
      <AddressesContext.Provider
        value={{
          displayName, setDisplayName
        }}
      >
        {children}
      </AddressesContext.Provider>
    </>
  )
}
