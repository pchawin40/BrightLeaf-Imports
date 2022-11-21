// src/components/ShopProduct/MainShopProduct/MainShopProduct.js

// import context
import { useProduct } from '../../../context/ProductContext.js';
import { useNavHeader } from '../../../context/NavHeaderContext.js';

// import css
import './MainShopProduct.css';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react
import { useEffect, useState } from 'react';

// import store
import * as productActions from '../../../store/products';
import * as imageActions from '../../../store/images';
import * as sessionActions from '../../../store/session';
import * as shoppingCartActions from '../../../store/shoppingCarts';

//? MainShopProduct component
const MainShopProduct = () => {
  /**
   * Controlled inputs
   */
  const { currentProductId, setCurrentProductId } = useProduct();
  const [prevProduct, setPrevProduct] = useState(null);
  const [nextProduct, setNextProduct] = useState(null);
  const [productLoaded, setProductLoaded] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const currentUserId = useSelector(sessionActions.getCurrentUserId);
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  const { showUserModal, setShowUserModal } = useNavHeader();
  const { showProductFormModal, setShowProductFormModal } = useProduct();
  const { editProduct, setEditProduct } = useProduct();

  /**
   * Selector functions
   */
  const currentProducts = useSelector(productActions.getCurrentProducts);
  const currentProductById = useSelector(productActions.getCurrentProductById(currentProductId));
  const currentImagesByProductId = useSelector(imageActions.getCurrentImagesByProductId(currentProductId));
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * UseEffect
   */
  useEffect(() => {
    // if (currentProductId) {
    //   setProductLoaded(true);
    // }
    if (Object.values(currentProducts).length >= 0 && !currentProductId) {
      setCurrentProductId(Object.values(currentProducts)[0]);
      setProductLoaded(true);
      setCurrentImageId(null);
    } else if (currentProductId) {
      setProductLoaded(true);
    }
  }, [currentProductId]);

  // per productLoaded
  useEffect(() => {
    // nothing for now
    // and currentImageId is not in the list for currentIamgesByProductId

    if (
      !currentImageId
      ||
      !currentImagesByProductId.find(image => image.id === currentImageId) && document.querySelector(".pm-is-figure")
    ) {
      if (document.querySelector(".pm-is-figure")) {
        document.querySelector(".pm-is-figure").click();
      }
    }
  }, [productLoaded, currentImageId]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to get previous product
  const getPrevProduct = () => {
    // if product is first in list or if length is 1, return false
    // if product is not first, return prev with left arrow
    if (Object.values(currentProducts).length >= 1 && currentProductId !== 1) {
      const currentPrevProduct = Object.values(currentProducts).find(product => product.id === (currentProductId - 1));
      return (
        <span>
          <i className="fa-solid fa-angle-left" />
          <NavLink
            className="span-selector"
            onClick={_ => {
              setCurrentProductId(currentPrevProduct.id)
              setProductLoaded(false);
              setCurrentImageId(null);
            }}
            to={`/product-page/${currentPrevProduct.name}`}
          >
            Prev
          </NavLink>
        </span>
      )
    } else {
      if (prevProduct) setPrevProduct(null);

      return (
        <>
          <i className="fa-solid fa-angle-left unavailable" />
          <span className="span-selector unavailable">
            Prev
          </span>
        </>
      );
    }
  }

  // function to get next product
  const getNextProduct = () => {
    // if product is last in list or if length is 1, return false
    // if product is not last, return next with right arrow
    if (Object.values(currentProducts).length > 1 && currentProductId !== Object.values(currentProducts).length) {
      const currentNextProduct = Object.values(currentProducts).find(product => product.id === (currentProductId + 1));

      return (
        <span>
          <NavLink
            className="span-selector"
            onClick={_ => {
              setCurrentProductId(currentNextProduct.id);
              setProductLoaded(false);
            }}
            to={`/product-page/${currentNextProduct.name}`}
          >
            Next
          </NavLink>
          <i className="fa-solid fa-angle-right" />
        </span>
      )
    } else {
      if (nextProduct) setNextProduct(null);

      return (
        <>
          <span className="unavailable span-selector">
            Next
          </span>
          <i className="fa-solid fa-angle-right unavailable" />
        </>
      )
    }
  }

  // function to display product images available
  // function to return current image selected
  const displayCurrentImageSelected = () => {
    if (productLoaded) {
      let newCurrentImage = currentImagesByProductId.find((image, index) => {
        if (currentImagesByProductId.length >= 0 && !currentImageId) {
          setCurrentImageId(currentImagesByProductId[0].id);
          return true;
        } else {
          return image.id === currentImageId
        }
      });


      if (newCurrentImage) {
        return (
          <figure className="pt-cis-figure">
            <img
              className="pt-cis-figure-img"
              src={newCurrentImage.url}
              alt={`Shop All image ${newCurrentImage.id}`}
            />
          </figure>
        );
      }
    }
  }

  // function to return image selectors
  const displayImageSelectors = () => {
    return (
      <ul>
        {
          Object.values(currentImagesByProductId).map((image, index) => {
            return (
              <li
                className={`pm-is-figure ${index}`}
                onClick={_ => setCurrentImageId(image.id)}
                key={`Image ${image.id} | Product ${currentProductId}`}
              >
                {
                  currentImageId === image.id || !currentImageId && index === 0
                    ?
                    // If image is selected, use filled square
                    <img
                      className="pm-is-figure img selected"
                      src={image.url}
                      alt={`CurrentImage ${image.id}`}
                    />
                    :
                    // Otherwise, use non-filled square
                    <img
                      className="pm-is-figure img un-selected"
                      src={image.url}
                      alt={`CurrentImage ${image.id}`}
                    />
                }
              </li>
            );
          })
        }
      </ul>
    );
  }

  // function to handle buy button
  const handleBuyButton = () => {
    if (currentProductById.quantity !== 0) {
      // TODO: To work on product update
      // subtract quantity from product
      currentProductById.quantity -= 1;
      dispatch(productActions.thunkUpdateProduct(currentProductById, currentProductId))
        .then(() => {
          //* only create new cart if there's no existing cart with existing item name and id
          if (Object.values(currentUserCarts).length > 0) {
            // check for existing cart
            const cartExists = Object.values(currentUserCarts).find(cartItem => cartItem.product_id === currentProductId);

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
            "product_id": currentProductId,
            "quantity": 1
          };

          return dispatch(shoppingCartActions.thunkPostCart(newCart));
        })
        .then(() => {
          dispatch(shoppingCartActions.thunkGetSessionUserCarts());
        })
    }
  }

  return (
    productLoaded &&
    <section className="lower-page-section shop-product">
      {/* //* Path */}
      {/* Example: Home / Shop All / Product Name */}
      <section className="lps inner product-path">
        <NavLink to="/">
          Home
        </NavLink>
        /
        <NavLink
          to="/product-page"
        >
          Shop All
        </NavLink>
        /
        {
          <span>
            {
              currentProductById.name
            }
          </span>
        }
      </section>

      {/* //* Prev Next Product Selector */}
      <section className="lps inner product-selector">
        {/* if there are prev and next, return vertical pipe */}
        {
          getPrevProduct()
        }
        <span className="vertical-line">
          |
        </span>
        {
          getNextProduct()
        }
      </section>

      {/* //* Product Image */}
      <section className="lps inner product-image">
        {
          displayCurrentImageSelected()
        }
        {
          displayImageSelectors()
        }
      </section>

      {/*  */}

      {/* //* Product Titles */}
      <section className="lps inner product-title">
        {/* Name */}
        <section className="product-title inner-section">
          <span className="pt-inner name">
            {
              currentProductById.name
            }
          </span>
          {
            currentUserInfo &&
            currentUserInfo.role === "administrator"
            &&
            <button
              className="pt-inner edit-button"
              onClick={_ => {
                setShowProductFormModal(true);
                setEditProduct(true);

              }}
            >
              Edit
            </button>
          }
        </section>

        {/* Id */}
        <span className="pt-inner id">
          {
            `SKU: ${currentProductById.id.toString().padStart(4, "0")}`
          }
        </span>

        {/* Price */}
        <span className="pt-inner price">
          $ {parseFloat(currentProductById.price).toFixed(2)} USD
        </span>

        {/* Buy/Like Toggle */}
        <section className="pt-inner buy-like">
          {/* Buy Button | Out of Stock */}
          {
            currentProductById.quantity <= 0 ?
              <button
                className='pt-out-of-stock'
                type="button"
              >
                Out of Stock
              </button>
              :
              currentUserInfo &&
                currentUserInfo.role === "user" ?
                <button
                  className='pt-available'
                  type="button"
                  onClick={handleBuyButton}
                >
                  <span>
                    Add to Cart ( {currentProductById.quantity} left )
                  </span>
                </button>
                :
                <button
                  className='pt-available'
                  type="button"
                  onClick={_ => setShowUserModal(true)}
                >
                  <span>
                    Sign In As User To Buy
                  </span>
                </button>
          }

          {/* Like Toggle */}
          <figure className="pt-like">
            <i className="fa-regular fa-heart" />
          </figure>
        </section>

        {/* Description */}
        <p className="pt-inner description">
          {
            currentProductById.description
          }
        </p>
      </section>

    </section>
  );
};

// export default component
export default MainShopProduct;
