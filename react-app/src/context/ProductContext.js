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
  const [showProductFormModal, setShowProductFormModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  // Product Provider
  return (
    <>
      <ProductContext.Provider
        value={{
          currentProductId, setCurrentProductId,
          currentProductImages, setCurrentProductImages,
          showProductFormModal, setShowProductFormModal,
          editProduct, setEditProduct
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  )
}
