// src/components/NavHeader/NavHeader.js

// import component
import ShoppingCartModal from './ShoppingCartModal';
import UserModal from './UserModal';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import component
import { Modal } from '../../context/Modal';

// import css
import './NavHeader.css';

// import react
import { useEffect, useRef, useState } from 'react';

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as shoppingCartActions from '../../store/shoppingCarts';

// import libraries
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";
import NavRight from '../NavRight';

//? NavHeader component
const NavHeader = () => {
  /**
   * Controlled inputs
   */
  const [color, setColor] = useState('white');
  const { showUserModal, setShowUserModal } = useNavHeader();
  // const [showCartModal, setShowCartModal] = useState(false);
  const { loadCartModal, setLoadCartModal } = useNavHeader();

  /**
  * Selector functions
  */
  // grab shopping carts data
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  const prevScrollY = useRef(0);

  /**
   * UseEffect
   */

  // function to handle changing of background based on y scroll position
  const changeBackground = () => {

    const currentScrollY = window.scrollY;

    // if mid, change to black
    if (window.scrollY >= window.innerHeight - (window.innerHeight / 10) && window.scrollY < (4 * (window.innerHeight * 1.05))) {
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
    <section id="nav-header-container">
      <section id="nav-header-section" className={`nav-header-section-${!loadCartModal}`}>

        {/* User Modal */}
        <figure
          onClick={_ => setShowUserModal(true)}
          className="nh-figure user-modal"
          style={{
            color,
            transition: "color 1s ease"
          }}
        >
          <i className="fa-regular fa-user fa-xl nh-user-icon" />
        </figure>

        {/* Shopping Cart Modal */}
        <figure
          onClick={_ => {
            setLoadCartModal(true);
          }}
          className="nh-figure"
          style={{
            color,
            transition: "color 1s ease"
          }}
        >
          <i className="fa-solid fa-cart-shopping fa-xl" />
          <span id="nhs-cart-span" className={`${color === 'black' ? 'white' : 'black'}`}>
            {/* //TODO: TBD: To count how many items are in shopping cart for current user */}
            {
              Object.values(currentUserCarts).length
            }
          </span>
        </figure>

        <NavRight />
      </section>
      {/* Shopping Cart Modal */}
      <section
        id="nav-header-scm-section"
        className={`nav-header-scm-section-${loadCartModal}`}
      >
        <ShoppingCartModal />
      </section>

      {/* User Modal */}
      {showUserModal && (
        <Modal
          onClose={(_) => {
            setShowUserModal(false)
            document.body.style.overflowY = "scroll"
          }}
        >
          <UserModal />
        </Modal>
      )}

      {/* //! TODO: To fix that its not 'sticky' */}
    </section>
  );
};

// export default component
export default NavHeader;
