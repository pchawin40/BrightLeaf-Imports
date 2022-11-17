// src/components/NavRight/NavModal/NavModalRight/NavModalRight.js

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import context
import { useNavRight } from '../../../../context/NavRightContext';

// import css
import './NavModalRight.css';

//? NavModalRight component
const NavModalRight = () => {
  const { showNavModal, setShowNavModal } = useNavRight();

  return (
    <section id="nmr-section">
      {/* Menu List */}
      <ul id="nmr-menu-ul">
        {/* Home */}
        <li>
          <NavLink
            onClick={_ => {
              document.querySelector("#nav-rn-figure").click();
            }}
            to="/"
          >
            Home
          </NavLink>
        </li>

        {/* About */}
        <li>
          <NavLink to="/about">
            About
          </NavLink>
        </li>

        {/* Portfolio */}
        <li>
          <NavLink
            onClick={_ => {
              document.querySelector("#nav-rn-figure").click();
            }}
            to="/for-home"
          >
            Portfolio
          </NavLink>
        </li>

        {/* Shop All */}
        <li>
          {/* //TODO: To work on Shop All */}
          <NavLink
            onClick={_ => {
              document.querySelector("#nav-rn-figure").click();
            }}
            to="/product-page"
          >
            Shop All
          </NavLink>
        </li>

        {/* Contact */}
        <li>
          <NavLink to="/contact">
            Contact
          </NavLink>
        </li>
      </ul>
    </section>
  );
}

// export default component
export default NavModalRight;
