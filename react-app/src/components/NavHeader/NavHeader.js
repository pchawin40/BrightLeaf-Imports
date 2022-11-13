// src/components/NavHeader/NavHeader.js

// import component
import ShoppingCartModal from './ShoppingCartModal/ShoppingCartModal';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';

// import component
import { Modal } from '../../context/Modal';
import UserModal from './UserModal/UserModal';

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
  const { showUserModal, setShowUserModal } = useNavHeader();
  const [showCartModal, setShowCartModal] = useState(false);

  const prevScrollY = useRef(0);

  // function to handle changing of background based on y scroll position
  const changeBackground = () => {
    const currentScrollY = window.scrollY;

    // if mid, change to black
    if (window.scrollY >= window.innerHeight && window.scrollY < (5 * window.innerHeight)) {
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
      <section id="nav-header-section">
        {/* User Modal */}
        <figure
          onClick={_ => setShowUserModal(true)}
          className={`nh-figure ${color}`}
        >
          <i className="fa-regular fa-user fa-xl" />
        </figure>
        {/* Shopping Cart Modal */}
        <figure
          onClick={_ => setShowCartModal(true)}
          className={`nh-figure ${color}`}
        >
          <i className="fa-solid fa-cart-shopping fa-xl" />
          <span id="nhs-cart-span" className={`${color === 'black' ? 'white' : 'black'}`}>
            {/* TBD: To count how many items are in shopping cart for current user */}
            0
          </span>
        </figure>
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

      {/* Shopping Cart Modal */}
      {/* User Modal */}
      {showCartModal && (
        <Modal
          onClose={(_) => {
            setShowCartModal(false)
            document.body.style.overflowY = "scroll"
          }}
        >
          <ShoppingCartModal setShowCartModal={setShowCartModal} />
        </Modal>
      )}
    </section>
  );
};

// export default component
export default NavHeader;
