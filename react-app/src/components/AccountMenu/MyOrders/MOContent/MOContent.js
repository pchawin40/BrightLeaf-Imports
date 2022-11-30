// src/components/AccountMenu/MyOrders/MOContent/MOContent.js

// import css
import './MOContent.css';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as shoppingCartActions from '../../../../store/shoppingCarts';
import * as productActions from '../../../../store/products';

// import context
import { useShoppingCart } from '../../../../context/ShoppingCartContext';

//? MOContent component
const MOContent = () => {
  /**
   * Controlled inputs
   */
  const { cartLoaded, setCartLoaded } = useShoppingCart();

  /**
   * Selector Functions
   */
  // select shopping cart
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  // select current available products
  const currentProducts = useSelector(productActions.getCurrentProducts);

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
      <section className="cis order-carts">
        {/* Cart List */}
        {
          currentUserCarts.map(cartItem => {
            return (<li key={"cart item: " + cartItem.id} className="scms-li">
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
            </li>);
          })
        }

        {/* Cart Total */}

        {/* Checkout */}
      </section>
    );
  };

  return (
    <section className="MOContent AM content-outer-section">
      <section className="MOContent AM content-inner-section">
        {/* Top */}
        <section className="cis top orders">
          <h1>
            My Orders
          </h1>
          <p>
            View your order history or check the status of a recent order
          </p>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className="cis lower orders">
          {
            Object.values(currentUserCarts).length > 0
              ?
              // If have shopping cart for current user, show carts
              <>
                {loadCarts()}
              </>
              :
              <>
                {/* // If No Shopping Carts for current user, show browse */}
                <h2>
                  You haven't placed any orders yet.
                </h2>
                <NavLink
                  to='/product-page'
                >
                  Start Browsing
                </NavLink>
              </>
          }
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Empty Section */}
        <section />
      </section>
    </section >
  );
}

// export default component
export default MOContent;
