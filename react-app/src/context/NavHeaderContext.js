// src/components/context/NavHeaderContext.js
import { useState, useContext, createContext, useRef, useEffect } from 'react';

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
  const [headerColor, setHeaderColor] = useState('white');
  const [currentPage, setCurrentPage] = useState("landing");
  const [footerColor, setFooterColor] = useState('white');
  const [footerRect, setFooterRect] = useState(0);

  const prevScrollY = useRef(0);
  // function to handle changing of background based on y scroll position
  const changeBackground = () => {

    const currentScrollY = window.scrollY;

    // check currentPage and their variables conditions
    // set new color
    let newColor;
    if (currentPage === "landing") {
      newColor = "white";
    } else if (currentPage === "portfolio") {
      newColor = "white";
    }

    // set color condition
    let colorCondition;
    if (currentPage === "landing") {
      colorCondition = window.scrollY >= window.innerHeight - (window.innerHeight / 10) && window.scrollY < (4 * (window.innerHeight * 1.05));
    } else if (currentPage === "portfolio") {
      colorCondition = (window.scrollY >= window.innerHeight - (window.innerHeight / 10)) && window.scrollY < (2 * (window.innerHeight * 1.08))
    }

    // set footer color condition

    // set background color
    if (window.scrollY >= window.innerHeight - (window.innerHeight / 1.25)) {
      setBackgroundColor(newColor);
    } else {
      setBackgroundColor('#484644');
    }

    prevScrollY.current = currentScrollY;
  }

  // function to handle changing of header color based on y scroll position
  const changeHeaderColor = () => {

    const currentScrollY = window.scrollY;


    // if currentPage is landing, use these for color
    let headerColorCondition;

    if (currentPage === "landing") {
      headerColorCondition = window.scrollY >= window.innerHeight - (window.innerHeight / 10) && window.scrollY < (4 * (window.innerHeight * 1.05));
    } else if (currentPage === "portfolio") {
      headerColorCondition = window.scrollY >= window.innerHeight - (window.innerHeight / 10) && window.scrollY < (4 * (window.innerHeight * .985));
    }

    // if mid, change to black
    if (headerColorCondition) {
      setHeaderColor('black');
    } else {
      setHeaderColor('white');
    }

    prevScrollY.current = currentScrollY;
  }

  // function to handle changing of footer color based on y scroll position
  const changeFooterColor = () => {

    const currentScrollY = window.scrollY;

    // body height (4700) - rect (700)

    const bodyHeight = document.querySelector("body").getBoundingClientRect().height;

    // check currentPage and their variables conditions
    let footerColorCondition = (window.scrollY >= window.innerHeight - (window.innerHeight / 1.05)) && window.scrollY < (bodyHeight - (1.95 * footerRect));

    // if mid, change to black
    if (footerColorCondition) {
      setFooterColor('black');
    } else {
      setFooterColor('white');
    }

    prevScrollY.current = currentScrollY;
  }

  // per background color
  useEffect(() => {
    // background color
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, [backgroundColor, currentPage]);

  // per header color
  useEffect(() => {
    window.addEventListener('scroll', changeHeaderColor);
    return () => window.removeEventListener('scroll', changeHeaderColor);
  }, [headerColor, currentPage]);

  // per footer color
  useEffect(() => {
    window.addEventListener('scroll', changeFooterColor);
    return () => window.removeEventListener('scroll', changeFooterColor);
  }, [footerColor, currentPage]);

  // Landing Provider
  return (
    <>
      <NavHeaderContext.Provider
        value={{
          forgotPassword, setForgotPassword,
          showUserModal, setShowUserModal,
          loadCartModal, setLoadCartModal,
          backgroundColor, setBackgroundColor,
          headerColor, setHeaderColor,
          currentPage, setCurrentPage,
          footerColor, setFooterColor,
          footerRect, setFooterRect
        }}
      >
        {children}
      </NavHeaderContext.Provider>
    </>
  )
}
