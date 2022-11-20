// src/components/context/NavHeaderContext.js
import { useState, useContext, createContext, useRef, useEffect } from 'react';
import ShopProduct from '../components/ShopProduct';

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

    // set background color
    if (window.scrollY >= window.innerHeight - (window.innerHeight / 1.25)) {
      setBackgroundColor(newColor);
    } else {
      // change to default color...
      // if not shopProduct
      if (currentPage !== "shopproduct") {
        setBackgroundColor('#484644');
      }
    }

    prevScrollY.current = currentScrollY;
  }

  // function to handle changing of header color based on y scroll position
  const changeHeaderColor = () => {

    const currentScrollY = window.scrollY;

    // body height
    const bodyHeight = document.querySelector("body").getBoundingClientRect().height;

    // if currentPage is landing, use these for color
    let headerColorCondition;

    if (currentPage === "landing") {
      headerColorCondition = window.scrollY >= window.innerHeight - (window.innerHeight / 10) && window.scrollY < (4 * (window.innerHeight * 1.05));
    } else if (currentPage === "shopproduct") {
      headerColorCondition = window.scrollY < (bodyHeight - (1.1 * footerRect));
    } else {
      headerColorCondition = window.scrollY >= window.innerHeight - (window.innerHeight / 10) && window.scrollY < (bodyHeight - (1.1 * footerRect));
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

    const bodyHeight = document.querySelector("body").getBoundingClientRect().height;

    // check currentPage and their variables conditions
    let footerColorCondition;

    // if current page is shop product, show 'black' on top
    if (currentPage === "shopproduct") {
      footerColorCondition = window.scrollY < (bodyHeight - (1.95 * footerRect));
    }
    else {
      footerColorCondition = (window.scrollY >= window.innerHeight - (window.innerHeight / 1.05)) && window.scrollY < (bodyHeight - (1.95 * footerRect));
    }



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
    window.addEventListener('load', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
      window.removeEventListener('load', changeBackground);
    }
  }, [backgroundColor, currentPage]);

  // per header color
  useEffect(() => {
    window.addEventListener('scroll', changeHeaderColor);
    window.addEventListener('load', changeHeaderColor);
    const navRight = document.getElementById("nav-rn-figure");

    if (navRight) navRight.addEventListener('click', changeHeaderColor);

    return () => {
      window.removeEventListener('scroll', changeHeaderColor);
      window.removeEventListener('load', changeHeaderColor);
      if (navRight) navRight.removeEventListener('click', changeHeaderColor);
    }
  }, [headerColor, currentPage]);

  // per footer color
  useEffect(() => {
    window.addEventListener('scroll', changeFooterColor);
    window.addEventListener('load', changeFooterColor);
    return () => {
      window.removeEventListener('scroll', changeFooterColor);
      window.removeEventListener('load', changeFooterColor);
    }
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
