// src/components/context/ImageContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const ImageContext = createContext();
export const useImage = () => useContext(ImageContext);

// create provider for image page
export default function ImageProvider({ children }) {
  // state for context
  const [showAddImageModal, setShowAddImageModal] = useState(false);
  const [currentPictureId, setCurrentPictureId] = useState(1);

  // Image Provider
  return (
    <>
      <ImageContext.Provider
        value={{
          showAddImageModal, setShowAddImageModal,
          currentPictureId, setCurrentPictureId
        }}
      >
        {children}
      </ImageContext.Provider>
    </>
  )
}
