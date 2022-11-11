// src/components/NavHeader/NavHeader.js

// import css
import './NavHeader.css';

// import react
import { useEffect, useRef, useState } from 'react';

//? NavHeader component
const NavHeader = () => {
  /**
   * Controlled inputs
   */
  const [color, setColor] = useState('white');

  const prevScrollY = useRef(0);

  const changeBackground = () => {
    const currentScrollY = window.scrollY;

    if (window.scrollY >= window.innerHeight && window.scrollY < (5 * window.innerHeight)) {
      setColor('black');
    } else if (
      window.scrollY >= (5 * window.innerHeight)
    ) {
      setColor('white');
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
    <section id="nav-header-container">
      <section id="nav-header-section">
        {/* User Modal */}
        <figure className={`nh-figure ${color}`}>
          <i className="fa-regular fa-user fa-xl"/>
        </figure>
        {/* Shopping Cart Modal */}
        <figure className={`nh-figure ${color}`}>
          <i className="fa-solid fa-cart-shopping fa-xl" />
          <span className={`${color === 'black' ? 'white' : 'black'}`}>
            {/* TBD: To count how many items are in shopping cart for current user */}
            0
          </span>
        </figure>
      </section>
    </section>
  );
};

// export default component
export default NavHeader;
