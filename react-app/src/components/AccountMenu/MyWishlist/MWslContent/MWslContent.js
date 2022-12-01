// src/components/AccountMenu/MyAccount/MWslContent/MWslContent.js

// import react
import { useEffect, useState } from 'react';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import css
import './MWslContent.css';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as sessionActions from '../../../../store/session';
import * as productUserActions from '../../../../store/productUser';
import * as productActions from '../../../../store/products';
import * as shoppingCartActions from '../../../../store/shoppingCarts';
import { useNavHeader } from '../../../../context/NavHeaderContext';

//? MWslContent component
const MWslContent = () => {
  /**
   * Controlled inputs
   */
  const { showUserModal, setShowUserModal } = useNavHeader();
  const [wishlistLoaded, setWishlistLoaded] = useState(true);

  /**
   * Selector functions
   */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  const currentUserId = useSelector(sessionActions.getCurrentUserId);
  const currentProductsUserLikes = useSelector(productUserActions.getCurrentProductsUserLikes(currentUserId));
  const currentProductsIdsUserLikes = useSelector(productUserActions.getCurrentProductsIdsUserLikes(currentUserId));
  const currentProductLikes = useSelector(productActions.getCurrentProductLikes(currentProductsIdsUserLikes));

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // if wishlist is available, set it to true
    if (
      currentProductLikes
      &&
      currentProductLikes.length > 0
    ) {
      setWishlistLoaded(true);
    } else {
      setWishlistLoaded(false);
    }
  }, [currentUserId, currentProductsUserLikes, currentProductsIdsUserLikes, currentProductLikes]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle buy button
  const handleBuyButton = (currentProduct) => {
    if (currentProduct.quantity !== 0) {
      // TODO: To work on product update
      // subtract quantity from product
      currentProduct.quantity -= 1;
      dispatch(productActions.thunkUpdateProduct(currentProduct, currentProduct.id))
        .then(() => {
          //* only create new cart if there's no existing cart with existing item name and id
          if (Object.values(currentUserCarts).length > 0) {
            // check for existing cart
            const cartExists = Object.values(currentUserCarts).find(cartItem => cartItem.product_id === currentProduct.id);

            if (cartExists) {
              // if cart exist, add to cart
              cartExists.quantity += 1;

              return dispatch(shoppingCartActions.thunkUpdateCart(cartExists, cartExists.id));
            }
          }

          //* otherwise create new cart
          // add to cart modal
          const newCart = {
            "user_id": currentUserId,
            "product_id": currentProduct.id,
            "quantity": 1
          };

          return dispatch(shoppingCartActions.thunkPostCart(newCart));
        })
        .then(() => {
          dispatch(shoppingCartActions.thunkGetSessionUserCarts());
        })
    }
  }

  // function to handle like click
  const handleLikeClick = (currentProduct) => {
    const currentLikeProductById = currentProductsUserLikes.find(product => product.id === currentProduct.id);

    // toggled product user
    const toggledProductUser = {
      ...currentLikeProductById,
      likeToggle: !currentLikeProductById.likeToggle
    };

    // call dispatch to edit then grab the information
    return dispatch(productUserActions.thunkEditProductUser(toggledProductUser))
      .then(() => dispatch(productUserActions.thunkGetProductUsers()));
  };

  // function to load all wishlists products by current user
  const loadCurrentWishlists = () => {
    return (
      <ul className="wishlist ul">
        {
          currentProductLikes.map(currentProduct => {
            return (
              <li
                key={`Product ${currentProduct.id} | name: ${currentProduct.name}`}
              >
                {/* Figure to hold image and remove from wishlist */}
                <figure>
                  {/* //* Product Preview Image */}
                  {
                    <figure
                      className="wl preview-image-container"
                    >
                      <img
                        src={currentProduct.preview_image}
                        alt="wishlist product preview"
                      />
                    </figure>
                  }

                  {/* Figure for removing from wishlist */}
                  <figure
                    onClick={e => {
                      e.stopPropagation();
                      console.log("currentProduct inside figure", currentProduct);
                      handleLikeClick(currentProduct);
                    }}
                  >
                    <i className="fa-solid fa-xmark fa-xl" />
                  </figure>
                </figure>

                {/* //* Product Name */}
                <span>
                  {
                    currentProduct.name
                  }
                </span>

                {/* //* Product Price */}
                {
                  <span>
                    $ {parseFloat(currentProduct.price).toFixed(2)} USD
                  </span>
                }

                {/* //* Button to add to cart */}
                {
                  // if quantity is not 0, show out of stock
                  // otherwise, show available
                  currentProduct.quantity <= 0 ?
                    <button
                      className='pt-out-of-stock wishlist'
                      type="button"
                    >
                      Out of Stock
                    </button>
                    :
                    currentUserInfo &&
                      currentUserInfo.role === "user" ?
                      <button
                        className='pt-available wishlist'
                        type="button"
                        onClick={_ => handleBuyButton(currentProduct)}
                      >
                        <span>
                          Add to Cart ( {currentProduct.quantity} left )
                        </span>
                      </button>
                      :
                      <button
                        className='pt-available wishlist'
                        type="button"
                        onClick={_ => setShowUserModal(true)}
                      >
                        <span>
                          Sign In As User To Buy ( {currentProduct.quantity} available )
                        </span>
                      </button>
                }
              </li>
            );
          })
        }
      </ul>
    )
  };

  return (
    <section className="MWslContent AM content-outer-section">
      <section className="MWslContent AM content-inner-section">
        {/* Top */}
        <section className="cis top wishlist">
          <h1>
            My Wishlist
          </h1>
          <p>
            View favorite products you've saved to your wishlist.
          </p>
        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className="cis lower wishlist">
          {
            wishlistLoaded
              ?
              loadCurrentWishlists()
              :
              <>
                <h2>
                  You haven't added any products yet.
                </h2>
                <NavLink
                  to=""
                >
                  Start adding products
                </NavLink>
              </>
          }

        </section>

        {/* Line Span */}
        <section className="line-span-container AM">
          <span className='line-span AM' />
        </section>
      </section>
    </section>
  )
};

// export default component
export default MWslContent;
