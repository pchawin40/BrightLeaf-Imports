// src/components/NavHeader/ShoppingCartModal/ShoppingCartModal.js

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import css
import './ShoppingCartModal.css';

// import react
import { useState, createRef, useEffect } from 'react';

//import react-redux
import { useSelector } from 'react-redux';

// import store
import * as sessionActions from '../../../store/session';
import * as shoppingCartActions from '../../../store/shoppingCarts';

// import libraries
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";


//? ShoppingCartModal component
const ShoppingCartModal = ({ setShowCartModal }) => {
  /**
   * Controlled inputs
   */
  const { loadCartModal, setLoadCartModal } = useNavHeader();

  /**
   * Selector functions
   */
  // select user
  // const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  // select shopping cart
  // const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);

  /**
   * UseEffect
   */
  useEffect(() => {
    if (loadCartModal) {
      document.addEventListener('click', handleOutsideClick);
    }
  }, [loadCartModal]);

  const box = createRef();

  // function to detect if click outside of custom modal
  const handleOutsideClick = e => {
    if (box && !box.current.contains(e.target)) {
      setLoadCartModal(false);
    }
  }

  // turn body overflow off on opening
  // document.body.style.overflowY = !currentUserInfo ? "hidden" : "scroll"

  return (
    // <section
    //   id="shopping-cart-modal-outer-section"
    //   className={`${loadCartModal}`}
    // >
    <Animate
      play={loadCartModal}
      duration={.8}
      start={{
        transform: `translateX(400px)`
      }}
      end={{ transform: `translateX(-240px)` }}
    >
      <section
        id="shopping-cart-modal-section"
        ref={box}
      >
        {/* Top Section */}
        <section id="scms-top-section">
          <i
            onClick={_ => {
              setLoadCartModal(false);
              document.body.style.overflowY = "scroll";
            }}
            className="fa-solid fa-chevron-right"
          />

          <p>
            Cart
          </p>
        </section>

        {/* Lower Section */}
        <section id="scms-lower-section">
          <p>
            Cart is empty
          </p>
        </section>
      </section>
    </Animate>
    // </section>
  );
};

// export default component
export default ShoppingCartModal;
