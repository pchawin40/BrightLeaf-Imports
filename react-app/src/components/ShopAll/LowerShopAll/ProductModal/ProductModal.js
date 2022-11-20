// src/components/ShopAll/LowerShopAll/ProductModal/ProductModal.js

// import component
import UserModal from '../../../NavHeader/UserModal';

// import context
import { useProduct } from '../../../../context/ProductContext';
import { useNavHeader } from '../../../../context/NavHeaderContext';
import { Modal } from '../../../../context/Modal';

// import css
import './ProductModal.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import store
import * as productActions from '../../../../store/products';
import * as imageActions from '../../../../store/images';
import * as shoppingCartActions from '../../../../store/shoppingCarts';
import * as sessionActions from '../../../../store/session';

//? ProductModal component
const ProductModal = ({ setShowProductModal }) => {
  /**
   * Controlled inputs
   */
  const { currentProductId, setCurrentProductId } = useProduct();
  const { currentProductImages, setCurrentProductImages } = useProduct();
  const [currentImageId, setCurrentImageId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState({});
  const { showUserModal, setShowUserModal } = useNavHeader();

  /**
   * Selector inputs
   */
  const currentProductById = useSelector(productActions.getCurrentProductById(currentProductId));
  const currentImagesByProductId = useSelector(imageActions.getCurrentImagesByProductId(currentProductId));
  const currentUserId = useSelector(sessionActions.getCurrentUserId);
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);

  /**
   * UseEffect
   */
  // per current image id
  useEffect(() => {
    if (currentImagesByProductId && currentProductById && !imageLoaded) {
      setImageLoaded(true);
    }
  }, [imageLoaded]);

  // per general
  useEffect(() => {
    // nothing for now
  }, [currentProductById]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to return current image selected
  const displayCurrentImageSelected = () => {
    const newCurrentImage = Object.values(currentImagesByProductId).find(image => {

      if (currentImagesByProductId.length >= 0 && !currentImageId) {
        setCurrentImageId(image.id);
        return image;
      } else {
        return image.id === currentImageId
      }
    });

    return (
      <figure className="pm-cis-figure">
        <img
          src={newCurrentImage.url}
          alt={`Shop All image ${newCurrentImage.id}`}
        />
      </figure>
    );
  }

  // function to return image selectors
  const displayImageSelectors = () => {
    return (
      <ul>
        {
          Object.values(currentImagesByProductId).map((image, index) => {
            return (
              <li
                className="pm-is-figure"
                onClick={_ => setCurrentImageId(image.id)}
                key={`Image ${image.id} | Product ${currentProductId}`}
              >
                {
                  currentImageId === image.id || !currentImageId && index === 0
                    ?
                    // If image is selected, use filled square
                    <i className="fa-solid fa-square select-square" />
                    :
                    // Otherwise, use non-filled square
                    <i className="fa-regular fa-square select-square" />
                }
              </li>
            );
          })
        }
      </ul>
    );
  }

  // function to return product text quick details
  const displayProductText = () => {
    return (
      <>
        {/* Product Name */}
        <p className="pm-dpt name">
          {
            currentProductById.name
          }
        </p>

        {/* Product Price */}
        <p className="pm-dpt price">
          $ {parseFloat(currentProductById.price).toFixed(2)} USD
        </p>

        {/* Product Id */}
        <p className="pm-dpt id">
          {
            `SKU: ${currentProductById.id.toString().padStart(4, "0")}`
          }
        </p>
      </>
    )
  };

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

          dispatch(shoppingCartActions.thunkPostCart(newCart));
        })
        .then(() => {
          dispatch(shoppingCartActions.thunkGetSessionUserCarts());
        })
    }
  }

  return (
    imageLoaded &&
    <section id="product-modal">
      {/* //? Show quick preview */}

      {/* Image Aside */}
      <aside className="pm-image-aside">
        {/* Product Image */}
        {
          displayCurrentImageSelected()
        }

        {/* Image Selector */}
        {
          displayImageSelectors()
        }
      </aside>

      {/* Text Quick Details Section */}
      <section className="pm-text-section">
        {/* Product Text Details */}
        {
          displayProductText()
        }

        {/* Button to buy (or out of stock if out) */}
        {
          currentProductById.quantity <= 0 ?
            <button
              className='pm-button out-of-stock'
              type="button"
            >
              Out of Stock
            </button>
            :
            currentUserInfo &&
              currentUserInfo.role === "user" ?
              <button
                className='pm-button available'
                type="button"
                onClick={handleBuyButton}
              >
                <span>
                  Add to Cart ( {currentProductById.quantity} left )
                </span>
              </button>
              :
              <button
                className='pm-button available'
                type="button"
                onClick={_ => setShowUserModal(true)}
              >
                <span>
                  Sign In As User To Buy
                </span>
              </button>
        }

        {/* View More Details that open up to another page */}
        <span className="pm-navlink">
          <NavLink
            to={`/product-page/${currentProductById.name}`}
          >
            View More Details
          </NavLink>
        </span>
      </section>

      <i
        onClick={_ => setShowProductModal(false)}
        className="fa-sharp fa-solid fa-x fa-xl exit-modal-icon"
      />
    </section>
  );
}

// export default component
export default ProductModal;
