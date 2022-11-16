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
        <li>
          <NavLink
            onClick={_ => setShowNavModal(false)}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop-all">
            Shop All
          </NavLink>
        </li>
        <li>
          <NavLink to="/for-home">
            Portfolio
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            About
          </NavLink>
        </li>
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
