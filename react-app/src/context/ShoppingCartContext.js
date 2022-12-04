// src/context/ShoppingCartContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const ShoppingCartContext = createContext();
export const useShoppingCart = () => useContext(ShoppingCartContext);

// create provider for shopping cart page
export default function ShoppingCartProvider({ children }) {
  // state for context
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartDisplay, setCartDisplay] = useState([]);

  // Shopping Cart Provider
  return (
    <>
      <ShoppingCartContext.Provider
        value={{
          cartLoaded, setCartLoaded,
          cartDisplay, setCartDisplay
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    </>
  )
}
