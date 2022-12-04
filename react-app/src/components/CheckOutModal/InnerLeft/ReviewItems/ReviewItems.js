// src/components/CheckOutModal/InnerLeft/ReviewItems/ReviewItems.js

// import css 
import './ReviewItems.css';

// import context
import { useCheckOut } from '../../../../context/CheckOutContext';
import { useAddress } from '../../../../context/AddressesContext';
import { useNavHeader } from '../../../../context/NavHeaderContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as shoppingCartActions from '../../../../store/shoppingCarts';
import * as productActions from '../../../../store/products';
import * as sessionActions from '../../../../store/session';
import { useShoppingCart } from '../../../../context/ShoppingCartContext';

//? ReviewItems component
const ReviewItems = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();
  const { selectedAddress, setSelectedAddress } = useAddress();
  const [reviewProductLoaded, setProductReviewLoaded] = useState(false);;
  const { showUserModal, setShowUserModal } = useNavHeader();
  const { cartLoaded, setCartLoaded } = useShoppingCart();

  /**
   * Selector functions
   */
  const currentCartProductIds = useSelector(shoppingCartActions.getCurrentCartProductIds);
  const currentCartProducts = useSelector(productActions.getCurrentProductsByIds(currentCartProductIds));
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  const currentUserId = useSelector(sessionActions.getCurrentUserId);
  const currentProducts = useSelector(productActions.getCurrentProducts);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    if (currentCartProductIds && currentCartProducts) {
      setProductReviewLoaded(true);
    }
  }, [currentCartProductIds, currentCartProducts, reviewProductLoaded]);

  // invoke dispatch
  const dispatch = useDispatch();


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

  // function to load carts
  const loadCarts = () => {
    return (
      <ul className="cis order-carts ul ri">
        {/* Cart List */}
        {
          currentUserCarts.map(cartItem => {
            return (<li key={"cart item: " + cartItem.id} className="coc li orders">
              <section className="clo left-containers">
                <section className="clo buttons-containers">
                  {/* Add more */}
                  {/* Check if there are enough product */}
                  {
                    checkProductQuantity(cartItem.product_id)
                      ?
                      // If there are still product, proceed to add to cart quantity
                      <i
                        onClick={_ => handleCartQuantity(cartItem, cartItem.quantity + 1, true)}
                        className="fa-solid fa-square-plus fa-lg clo li-add-quantity"
                      />
                      :
                      // Otherwise disable handleCartQuantity
                      <i
                        className="fa-solid fa-square-plus fa-lg clo li-add-quantity unavailable"
                      />
                  }

                  {/* Delete */}
                  <i
                    onClick={_ => handleCartQuantity(cartItem, cartItem.quantity - 1, false)}
                    className="fa-solid fa-square-minus fa-lg clo li-delete-quantity"
                  />
                </section>

                {/* Quantity */}
                <section className="clo li-span quantity-container">
                  <p>
                    {
                      cartItem.quantity + "x"
                    }
                  </p>
                </section>

                {/* Name */}
                <section className="clo li-span name">
                  <p>
                    {
                      cartItem.name.length > 100
                        ?
                        cartItem.name.slice(0, 100) + "..."
                        :
                        cartItem.name
                    }
                  </p>
                </section>
              </section>

              {/* Price */}
              <section className="clo li-span price">
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
            </li>);
          })
        }
      </ul>
    );
  };

  return (
    <section className="cil main-content ri">
      <h2>
        Review Items
      </h2>

      {
        // load review items
        loadCarts()
      }

      {/* line span */}
      <span className='line-span cil' />

      {/* Use This Address Button */}
      <figure>
        <button
          className="cil use-address"
          onClick={_ => setCurrentStep(3)}
        >
          Proceed to Payment
        </button>

        {/* Cart Items total */}
        <span>
          Order Total:
        </span>
        <span>
          {` $ ${getCartTotal()} USD`}
        </span>
      </figure>

    </section>
  );
};

// export default component
export default ReviewItems;
