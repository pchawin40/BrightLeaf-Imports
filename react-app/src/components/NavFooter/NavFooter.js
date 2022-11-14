// src/components/NavFooter/NavFooter.js

// import css
import './NavFooter.css';

// import react
import { useEffect, useRef, useState } from 'react';

// import react-router-dom
import { NavLink } from 'react-router-dom';

//? NavFooter component
const NavFooter = () => {
  const [color, setColor] = useState('white');

  const prevScrollY = useRef(0);

  // function to handle changing of background based on y scroll position
  const changeBackground = () => {

    const currentScrollY = window.scrollY;

    // if mid, change to black
    if (window.scrollY >= window.innerHeight - (window.innerHeight / 1.05) && window.scrollY < (5 * (window.innerHeight / 1.235))) {
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
        <i className={`fa-brands fa-github nfs-icon ${color}`} />
      </NavLink>
      <NavLink
        to="/"
        onClick={_ => {
          return window.open('https://www.linkedin.com/in/chawin-pathompornvivat/', '_blank')
        }}
      >
        <i className={`fa-brands fa-linkedin-in nfs-icon ${color}`} />
      </NavLink>
    </section>
  );
};

// export default component
export default NavFooter;
