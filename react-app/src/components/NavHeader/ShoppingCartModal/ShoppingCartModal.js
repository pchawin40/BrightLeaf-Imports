// src/components/NavHeader/ShoppingCartModal/ShoppingCartModal.js

// import context
import { useNavHeader } from '../../../context/NavHeaderContext';

// import css
import './ShoppingCartModal.css';

// import react
import { useState, createRef, useEffect } from 'react';

//import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as sessionActions from '../../../store/session';
import * as shoppingCartActions from '../../../store/shoppingCarts';
import * as productActions from '../../../store/products';

// import libraries
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";
import { useShoppingCart } from '../../../context/ShoppingCartContext';


//? ShoppingCartModal component
const ShoppingCartModal = ({ setShowCartModal }) => {
  /**
   * Controlled inputs
   */
  const { loadCartModal, setLoadCartModal } = useNavHeader();
  const { cartLoaded, setCartLoaded } = useShoppingCart();
  const { cartDisplay, setCartDisplay } = useShoppingCart();

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
  }, [loadCartModal]);

  // per cart load
  useEffect(() => {
    if (
      Object.values(currentUserCarts).length > 0
      &&
      Object.values(currentProducts).length > 0
    ) {
      // set to loaded
      setCartLoaded(true);

      // set cart display
      setCartDisplay(currentUserCarts);
    }
  }, [cartLoaded, currentUserCarts]);

  const box = createRef();

  // invoke dispatch
  const dispatch = useDispatch();

  // function to detect if click outside of custom modal
  const handleOutsideClick = e => {
    if (box && box.current && !box.current.contains(e.target)) {
      setLoadCartModal(false);
    }
  }

  // function to handle quantity click
  const handleCartQuantity = (cartItem, newQuantity, addToCart = true) => {
    const existingProduct = Object.values(currentProducts).find(product => product.id === cartItem.product_id);
    // if quantity is less than 1, delete it from shopping cart
    if (newQuantity === 0) {
      // TODO: To fix glitch when deleting last item of last cart
      dispatch(shoppingCartActions.thunkDeleteCart(cartItem.id))
        .then(() => {
          // add quantity to product from removing from cart
          // grab existing product

          existingProduct.quantity += 1;
          dispatch(productActions.thunkUpdateProduct(existingProduct, existingProduct.id));
        })
        .then(() => {
          dispatch(shoppingCartActions.thunkGetSessionUserCarts())
          setCartLoaded(false);
        });
    } else {
      // nq < cq
      // if newQuantity is less than current cart item quantity...
      // set newProductQuantity as newQuantity + 1
      if (addToCart) {
        existingProduct.quantity -= 1;
      } else {
        // otherwise, set newProductQuantity as newQuantity - 1
        // newProductQuantity += 1;
        existingProduct.quantity += 1;
      }

      // else, update current cart item from user
      cartItem.quantity = newQuantity;
      dispatch(shoppingCartActions.thunkUpdateCart(cartItem, cartItem.id))
        .then(() => {
          dispatch(productActions.thunkUpdateProduct(existingProduct, existingProduct.id));
        })
    }
  };

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

  // function to check if there are enough product to add
  const checkProductQuantity = (productId) => {
    // check if product quantity is greater than 0
    const existingProduct = Object.values(currentProducts).find(product => product.id === productId);

    return existingProduct.quantity > 0;
  }

  return (
    <section
      id="shopping-cart-modal-outer-section"
      className={`${loadCartModal}`}
    >
      <Animate
        play={loadCartModal}
        duration={1}
        start={{
          transform: `translateX(400px)`
        }}
        end={{ transform: `translateX(-255px)` }}
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
                        <li key={"cart item: " + cartItem.id} className="scms-li">
                          <section className="scms-buttons-containers">
                            {/* Add more */}
                            {/* Check if there are enough product */}
                            {
                              checkProductQuantity(cartItem.product_id)
                                ?
                                // If there are still product, proceed to add to cart quantity
                                <i
                                  onClick={_ => handleCartQuantity(cartItem, cartItem.quantity + 1, true)}
                                  className="fa-solid fa-square-plus fa-lg scms-li-add-quantity"
                                />
                                :
                                // Otherwise disable handleCartQuantity
                                <i
                                  className="fa-solid fa-square-plus fa-lg scms-li-add-quantity unavailable"
                                />
                            }

                            {/* Delete */}
                            <i
                              onClick={_ => handleCartQuantity(cartItem, cartItem.quantity - 1, false)}
                              className="fa-solid fa-square-minus fa-lg scms-li-delete-quantity"
                            />
                          </section>

                          {/* Quantity */}
                          <section className="scms-li-span quantity">
                            <p>
                              {
                                cartItem.quantity + "x"
                              }
                            </p>
                          </section>

                          {/* Name */}
                          <section className="scms-li-span name">
                            <p>
                              {
                                cartItem.name.length > 15
                                  ?
                                  cartItem.name.slice(0, 15) + "..."
                                  :
                                  cartItem.name
                              }
                            </p>
                          </section>

                          {/* Price */}
                          <section className="scms-li-span price">
                            <p>
                              {
                                "$ "
                                +
                                getCartItemPrice(cartItem)
                                +
                                " USD"
                              }
                            </p>
                          </section>
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
                      {` $ ${getCartTotal()} USD`}
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
      </Animate >
    </section >
  );
};

// export default component
export default ShoppingCartModal;
