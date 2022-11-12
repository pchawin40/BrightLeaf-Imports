// src/components/context/NavHeaderContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const NavHeaderContext = createContext();
export const useNavHeader = () => useContext(NavHeaderContext);

// create provider for nav header page
export default function NavHeaderProvider({ children }) {
  // state for context
  const [forgotPassword, setForgotPassword] = useState(false);

  // Landing Provider
  return (
    <>
      <NavHeaderContext.Provider
        value={{
          forgotPassword, setForgotPassword
        }}
      >
        {children}
      </NavHeaderContext.Provider>
    </>
  )
}
