// src/components/context/AccountMenuContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const AccountMenuContext = createContext();
export const useAccountMenu = () => useContext(AccountMenuContext);

// create provider for account page
export default function AccountProvider({ children }) {
  // state for context
  const [displayName, setDisplayName] = useState("");

  // Account Provider
  return (
    <>
      <AccountMenuContext.Provider
        value={{
          displayName, setDisplayName
        }}
      >
        {children}
      </AccountMenuContext.Provider>
    </>
  )
}
