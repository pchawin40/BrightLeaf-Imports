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
  const [cartItemTotal, setCartItemTotal] = useState(0);

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

      // initialize new cart display
      const newCartDisplay = [];
      // initialize new cart total
      let newCartSum = 0;

      // set current products
      Object.values(currentUserCarts).map(cartItem => {
        // set cart items
        const currentCartItem = {
          quantity: cartItem.quantity,
          price: cartItem.price,
          name: Object.values(currentProducts).find(product => product.id == cartItem.product_id).name
        };

        newCartDisplay.push(currentCartItem);

        // set cart total
        newCartSum += cartItem.price;
      });

      // set cart display
      setCartDisplay(newCartDisplay);

      // set cart total 
      setCartItemTotal(Math.ceil(newCartSum * 100) / 100);
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
                          {/* Add more */}
                          <i className="fa-solid fa-square-plus scms-li-add-quantity" />

                          {/* Delete */}
                          <i className="fa-solid fa-square-minus scms-li-delete-quantity" />

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
                  {/* Cart Items total */}
                  <section id="scms-cart-total-section">
                    <span>
                      Total
                    </span>
                    <span>
                      {`$${cartItemTotal} USD`}
                    </span>
                  </section>

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
