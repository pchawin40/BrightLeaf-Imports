// src/components/context/ProductContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const ProductContext = createContext();
export const useProduct = () => useContext(ProductContext);

// create provider for product page
export default function ProductProvider({ children }) {
  // state for context
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentProductImages, setCurrentProductImages] = useState([]);

  // Product Provider
  return (
    <>
      <ProductContext.Provider
        value={{
          currentProductId, setCurrentProductId,
          currentProductImages, setCurrentProductImages
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  )
}
