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
import * as productActions from '../../../store/products';

// import libraries
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";


//? ShoppingCartModal component
const ShoppingCartModal = ({ setShowCartModal }) => {
  /**
   * Controlled inputs
   */
  const { loadCartModal, setLoadCartModal } = useNavHeader();
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartDisplay, setCartDisplay] = useState([]);

  /**
   * Selector functions
   */
  // select user
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  // select shopping cart
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  // select current available products
  const currentProducts = useSelector(productActions.getCurrentProducts);

  /**
   * UseEffect
   */
  useEffect(() => {
    if (loadCartModal) {
      document.addEventListener('click', handleOutsideClick);
    }

    if (
      Object.values(currentUserCarts).length > 0
      &&
      Object.values(currentProducts).length > 0
    ) {
      // set to loaded
      setCartLoaded(true);

      const newCartDisplay = [];

      // set current products
      Object.values(currentUserCarts).map(cartItem => {
        console.log('cartItem', cartItem);
        const currentCartItem = {
          quantity: cartItem.quantity,
          price: cartItem.price,
          name: Object.values(currentProducts).find(product => product.id == cartItem.product_id).name
        };

        newCartDisplay.push(currentCartItem);
      });

      setCartDisplay(newCartDisplay);
      console.log('newCartDisplay', newCartDisplay);
    }
  }, [loadCartModal]);

  const box = createRef();

  // function to detect if click outside of custom modal
  const handleOutsideClick = e => {
    if (box && box.current && !box.current.contains(e.target)) {
      setLoadCartModal(false);
    }
  }

  // turn body overflow off on opening
  // document.body.style.overflowY = !currentUserInfo ? "hidden" : "scroll"

  return (
    <section
      id="shopping-cart-modal-outer-section"
      className={`${loadCartModal}`}
    >
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
            {
              cartLoaded
                ?
                <ul id="scms-ul">
                  {
                    cartDisplay.map(cartItem => {
                      return (
                        <li className="scms-li">
                          {/* Delete */}


                          {/* Add more */}

                          {/* Quantity */}
                          <span>
                            {
                              cartItem.quantity + "x"
                            }
                          </span>

                          {/* Name */}
                          <span>
                            {
                              cartItem.name
                            }
                          </span>

                          {/* Price */}
                          <span>
                            {
                              "$" + cartItem.price + " USD"
                            }
                          </span>
                        </li>
                      );
                    })
                  }
                  <button id="scms-ul-checkout-button">
                    Check Out
                  </button>
                </ul>
                :
                <p>
                  Cart is empty
                </p>
            }
          </section>
        </section>
      </Animate>
    </section>
  );
};

// export default component
export default ShoppingCartModal;
