// src/components/context/ProductUserContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const ProductUserContext = createContext();
export const useProductUser = () => useContext(ProductUserContext);

// create provider for product user
export default function ProductUserProvider({ children }) {

  // Product User Provider
  return (
    <>
      <ProductUserContext.Provider
        value={{

        }}
      >
        {children}
      </ProductUserContext.Provider>
    </>
  )
}
