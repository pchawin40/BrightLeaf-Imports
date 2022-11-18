// src/components/ShopAll/LowerShopAll/ProductModal/ProductModal.js

// import context
import { useProduct } from '../../../../context/ProductContext';

// import css
import './ProductModal.css';

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as productActions from '../../../../store/products';
import * as imageActions from '../../../../store/images';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

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

  /**
   * Selector inputs
   */
  const currentProductById = useSelector(productActions.getCurrentProductById(currentProductId));
  const currentImages = useSelector(imageActions.getCurrentImages);
  const currentImagesByProductId = useSelector(imageActions.getCurrentImagesByProductId(currentProductId));

  /**
   * UseEffect
   */
  // per current image id
  useEffect(() => {
    if (currentImagesByProductId && currentProductById && !imageLoaded) {
      setImageLoaded(true);
    }
  }, [imageLoaded]);

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
            <button
              className='pm-button available'
              type="button"
            >
              <span>
                Buy Now ( {currentProductById.quantity} left )
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
