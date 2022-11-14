// src/components/context/NavHeaderContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const NavHeaderContext = createContext();
export const useNavHeader = () => useContext(NavHeaderContext);

// create provider for nav header page
export default function NavHeaderProvider({ children }) {
  // state for context
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [loadCartModal, setLoadCartModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#484644');

  // Landing Provider
  return (
    <>
      <NavHeaderContext.Provider
        value={{
          forgotPassword, setForgotPassword,
          showUserModal, setShowUserModal,
          loadCartModal, setLoadCartModal,
          backgroundColor, setBackgroundColor
        }}
      >
        {children}
      </NavHeaderContext.Provider>
    </>
  )
}
