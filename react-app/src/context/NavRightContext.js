// src/components/context/NavRightContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const NavRightContext = createContext();
export const useNavRight = () => useContext(NavRightContext);

// create provider for nav right page
export default function NavRightProvider({ children }) {
  // state for context
  const [showNavModal, setShowNavModal] = useState(false);

  // Landing Provider
  return (
    <>
      <NavRightContext.Provider
        value={{
          showNavModal, setShowNavModal
        }}
      >
        {children}
      </NavRightContext.Provider>
    </>
  )
}
