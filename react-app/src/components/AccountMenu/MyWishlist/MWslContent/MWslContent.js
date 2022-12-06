// src/components/AccountMenu/MyAccount/MWslContent/MWslContent.js

// import react
import { useEffect, useRef, useState } from 'react';

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

// import context
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
  const currentProductLikes = useSelector(productActions.getCurrentProductsByIds(currentProductsIdsUserLikes));

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

  // per wishlistLoaded
  useEffect(() => {
    window.addEventListener('scroll', useHorizontalScroll);
  }, [wishlistLoaded]);

  // invoke dispatch
  const dispatch = useDispatch();

  const elRef = useRef();

  // function to use horizontal scroll
  const useHorizontalScroll = () => {
    useEffect(() => {
      try {
        const el = elRef.current;
        if (el) {
          const onWheel = e => {
            if (e.deltaY == 0) return;
            e.preventDefault();
            el.scrollTo({
              left: el.scrollLeft + e.deltaY,
              behavior: "smooth"
            });
          };
          el.addEventListener("wheel", onWheel);
          return () => el.removeEventListener("wheel", onWheel);
        }
      } catch (e) {
        // nothing for now
      }
    }, []);
    return elRef;
  }

  const scrollRef = useHorizontalScroll();

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
      <ul
        ref={scrollRef}
        onClick={_ => {
          window.addEventListener('scroll', useHorizontalScroll);
        }}
        className="wishlist ul"
      >
        {
          currentProductLikes.map(currentProduct => {
            return (
              <li
                className="wishlist li"
                key={`Product ${currentProduct.id} | name: ${currentProduct.name}`}
              >
                {/* Figure to hold image and remove from wishlist */}
                {/* //* Product Preview Image */}
                <figure
                  className="wl preview-image-container"
                >
                  <img
                    src={currentProduct.preview_image}
                    alt="wishlist product preview-image"
                  />
                  {/* Figure for removing from wishlist */}
                  <figure
                    className="wl li un-wishlist"
                    onClick={e => {
                      e.stopPropagation();
                      handleLikeClick(currentProduct);
                    }}
                  >
                    <i className="fa-solid fa-xmark fa-sm" />
                  </figure>
                </figure>

                {/* //* Product Name */}
                <span
                  className="wl li name"
                >
                  {
                    currentProduct.name
                  }
                </span>

                {/* //* Product Price */}
                {
                  <span
                    className="wl li price"
                  >
                    $ {parseFloat(currentProduct.price).toFixed(2)} USD
                  </span>
                }

                {/* //* Button to add to cart */}
                {
                  // if quantity is not 0, show out of stock
                  // otherwise, show available
                  currentProduct.quantity <= 0 ?
                    <button
                      className='pt-out-of-stock wl'
                      type="button"
                    >
                      Out of Stock
                    </button>
                    :
                    currentUserInfo &&
                      currentUserInfo.role === "user" ?
                      <button
                        className='pt-available wl'
                        type="button"
                        onClick={_ => handleBuyButton(currentProduct)}
                      >
                        <span>
                          Add to Cart ( {currentProduct.quantity} left )
                        </span>
                      </button>
                      :
                      <button
                        className='pt-available wl'
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
        <section className="line-span-container AM wl first">
          <span className='line-span AM' />
        </section>

        {/* Lower */}
        <section className={`cis lower wishlist ${wishlistLoaded}`}>
          {
            wishlistLoaded
              ?
              <>
                {
                  loadCurrentWishlists()
                }
              </>
              :
              currentUserInfo.role === "user"
                ?
                <section className="no-loaded-wishlists">
                  <h2>
                    You haven't added any products yet.
                  </h2>
                  <NavLink
                    to=""
                  >
                    Start adding products
                  </NavLink>
                </section>
                :
                <>
                  <section className="no-loaded-wishlists administrator">
                    <h2>
                      You're currently logged in as administrator.
                    </h2>
                    <p>
                      Please log in as user to save your wishlist.
                    </p>
                  </section>
                </>
          }

        </section>

        {/* Line Span */}
        <section className="line-span-container AM wl">
          <span className='line-span AM' />
        </section>
      </section>
    </section>
  )
};

// export default component
export default MWslContent;
