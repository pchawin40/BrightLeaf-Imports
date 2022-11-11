// src/components/context/LandingContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const LandingContext = createContext();
export const useLanding = () => useContext(LandingContext);

// create provider for landing page
export default function LandingProvider({ children }) {
  // state for context
  

  // Landing Provider
  return (
    <>
      <LandingContext.Provider
        value={{}}
      >
        {children}
      </LandingContext.Provider>
    </>
  )
}
