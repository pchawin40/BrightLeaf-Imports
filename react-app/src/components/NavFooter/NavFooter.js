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
  const { footerColor, setFooterColor } = useNavHeader();
  const { currentPage, setCurrentPage } = useNavHeader();

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
            color: footerColor,
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
            color: footerColor,
            transition: "color 1s ease"
          }}
        />
      </NavLink>
    </section>
  );
};

// export default component
export default NavFooter;
