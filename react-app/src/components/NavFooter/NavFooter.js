// src/components/NavFooter/NavFooter.js

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import css
import './NavFooter.css';

// import react
import { useEffect, useRef, useState } from 'react';

// import react-router-dom
import { NavLink } from 'react-router-dom';

//? NavFooter component
const NavFooter = () => {
  /**
   * Controlled inputs
   */
  const [color, setColor] = useState('white');
  const { currentPage, setCurrentPage } = useNavHeader();

  const prevScrollY = useRef(0);

  // function to handle changing of background based on y scroll position
  const changeBackground = () => {

    const currentScrollY = window.scrollY;

    // if currentPage is landing, use these variables
    let colorCondition;

    if (currentPage === "landing") {
      colorCondition = (window.scrollY >= window.innerHeight - (window.innerHeight / 1.05)) && window.scrollY < (4 * (window.innerHeight / 1.25))
    } else if (currentPage === "portfolio") {
      colorCondition = (window.scrollY >= window.innerHeight - (window.innerHeight / 1.05)) && window.scrollY < (2 * (window.innerHeight / 1.7))
    }

    // if mid, change to black
    if (colorCondition) {
      setColor('black');
    } else {
      setColor('white');
    }

    prevScrollY.current = currentScrollY;
  }

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, [color]);

  return (
    <section id="nav-footer-section">
      <NavLink
        to="/"
        onClick={_ => {
          return window.open('https://github.com/pchawin40', '_blank')
        }}
      >
        <i
          className="fa-brands fa-github nfs-icon nav-footer-icons"
          style={{
            color,
            transition: "color 1s ease"
          }}
        />
      </NavLink>
      <NavLink
        to="/"
        onClick={_ => {
          return window.open('https://www.linkedin.com/in/chawin-pathompornvivat/', '_blank')
        }}
      >
        <i
          id="nav-footer-icon"
          className="fa-brands fa-linkedin-in"
          style={{
            color,
            transition: "color 1s ease"
          }}
        />
      </NavLink>
    </section>
  );
};

// export default component
export default NavFooter;
