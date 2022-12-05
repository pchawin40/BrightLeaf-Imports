// src/components/NavHeader/NavHeader.js

// import component
import ShoppingCartModal from './ShoppingCartModal';
import UserModal from './UserModal';
import NavRight from '../NavRight';
import NavModal from '../NavRight/NavModal';

// import context
import { useNavHeader } from '../../context/NavHeaderContext';
import { useNavRight } from '../../context/NavRightContext';

// import component
import { Modal } from '../../context/Modal';

// import css
import './NavHeader.css';

// import react
import { useEffect, useRef, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as shoppingCartActions from '../../store/shoppingCarts';
import * as sessionActions from '../../store/session';
import * as productActions from '../../store/products';

//? NavHeader component
const NavHeader = () => {
  /**
   * Controlled inputs
   */
  const { headerColor, setHeaderColor } = useNavHeader();
  const { showUserModal, setShowUserModal } = useNavHeader();
  const { loadCartModal, setLoadCartModal } = useNavHeader();
  const { showNavModal, setShowNavModal } = useNavRight();
  const { currentPage, setCurrentPage } = useNavHeader();
  const { emailStep, setEmailStep } = useNavHeader();

  /**
  * Selector functions
  */
  // grab shopping carts data
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  const currentProducts = useSelector(productActions.getCurrentProducts);
  const currentItemsQuantity = useSelector(shoppingCartActions.getCurrentItemsQuantity);

  /**
   * UseEffect
   */
  useEffect(() => {
    dispatch(shoppingCartActions.thunkGetSessionUserCarts());
  }, [currentUserInfo])

  // invoke dispatch
  const dispatch = useDispatch();

  // function to get price of cart item
  const getCartItemPrice = (cartItem) => {
    // given cart item, get the quantity
    const cartItemQuantity = cartItem.quantity;
    // find product's price
    const cartItemPrice = Object.values(currentProducts).find(product => product.id === cartItem.product_id).price;

    return Math.ceil(((cartItemQuantity * cartItemPrice) * 100) / 100);
  }

  // function to get price of cart total
  const getCartTotal = () => {

    // set cart total 
    // setCartItemTotal(Math.ceil(newCartSum * 100) / 100);

    // for every cart item, invoke getCartItemPrice to find the cart item price
    let total = 0;

    Object.values(currentUserCarts).map(cart => {
      total += Math.ceil((getCartItemPrice(cart) * 100) / 100);
    });

    return total;
  }

  return (
    <section
      id="nav-header-container"
      style={{
        right: showNavModal ? "2.95vw" : "2.55vw"
      }}
    >
      <section id="nav-header-section" className={`nav-header-section-${!loadCartModal}`}>

        {/* User Modal */}
        <figure
          onClick={_ => setShowUserModal(true)}
          className="nh-figure user-modal"
          style={{
            color: headerColor,
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
            color: headerColor,
            transition: "color 1s ease"
          }}
        >
          <i className="fa-solid fa-cart-shopping fa-xl" />
          <span id="nhs-cart-span" className={`${headerColor === 'black' ? 'white' : 'black'}`}>
            {/* //TODO: TBD: To count how many items are in shopping cart for current user */}
            {
              currentItemsQuantity
            }
          </span>
        </figure>
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
            setShowUserModal(false);
            dispatch(shoppingCartActions.thunkGetSessionUserCarts());
            setEmailStep(0);
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
