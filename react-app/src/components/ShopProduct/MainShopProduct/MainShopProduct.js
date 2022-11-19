// src/components/ShopProduct/LowerShopProduct/LowerShopProduct.js

// import context
import { useProduct } from '../../../context/ProductContext.js';

// import css
import './MainShopProduct.js';

// import react-redux
import { useSelector } from 'react-redux';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import react
import { useEffect, useState } from 'react';

// import store
import * as productActions from '../../../store/products';
import * as imageActions from '../../../store/images';

//? LowerShopProduct component
const LowerShopProduct = () => {
  /**
   * Controlled inputs
   */
  const { currentProductId, setCurrentProductId } = useProduct();
  const [prevProduct, setPrevProduct] = useState(null);
  const [nextProduct, setNextProduct] = useState(null);
  const [productLoaded, setProductLoaded] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  /**
   * Selector functions
   */
  const currentProducts = useSelector(productActions.getCurrentProducts);
  const currentProductById = useSelector(productActions.getCurrentProductById(currentProductId));
  const currentImagesByProductId = useSelector(imageActions.getCurrentImagesByProductId(currentProductId));

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
      console.log('document.querySelector(".pm-cis-figure")', document.querySelector(".pm-is-figure"));
      if (document.querySelector(".pm-is-figure")) {
        document.querySelector(".pm-is-figure").click();
      }
    }
  }, [productLoaded, currentImageId]);

  // function to get previous product
  const getPrevProduct = () => {
    // if product is first in list or if length is 1, return false
    // if product is not first, return prev with left arrow
    if (Object.values(currentProducts).length >= 1 && currentProductId !== 1) {
      const currentPrevProduct = Object.values(currentProducts).find(product => product.id === (currentProductId - 1));
      return (
        <>
          <i className="fa-solid fa-angle-left" />
          <NavLink
            onClick={_ => {
              setCurrentProductId(currentPrevProduct.id)
              setProductLoaded(false);
              setCurrentImageId(null);
            }}
            to={`/product-page/${currentPrevProduct.name}`}
          >
            Prev
          </NavLink>
        </>
      )
    } else {
      if (prevProduct) setPrevProduct(null);
    }
  }

  // function to get next product
  const getNextProduct = () => {
    // if product is last in list or if length is 1, return false
    // if product is not last, return next with right arrow
    if (Object.values(currentProducts).length > 1 && currentProductId !== Object.values(currentProducts).length) {
      const currentNextProduct = Object.values(currentProducts).find(product => product.id === (currentProductId + 1));
      return (
        <>
          <NavLink
            onClick={_ => {
              setCurrentProductId(currentNextProduct.id);
              setProductLoaded(false);
            }}
            to={`/product-page/${currentNextProduct.name}`}
          >
            Next
          </NavLink>
          <i className="fa-solid fa-angle-right" />
        </>
      )
    } else {
      if (nextProduct) setNextProduct(null);
    }
  }

  // function to display vertical line between previous and next
  const displayVerticalLine = () => {
    // if list is greater than 1 and current id is not the first or the last, then show vertical line
    if (
      Object.values(currentProducts).length > 1
      &&
      Object.values(currentProducts)[0] !== currentProductById
      &&
      currentProductId !== Object.values(currentProducts).length
      &&
      Object.values(currentProducts).length > 1
    ) {
      return (
        <span>
          |
        </span>
      )
    }
  }

  // function to display product images available
  // function to return current image selected
  const displayCurrentImageSelected = () => {
    if (productLoaded) {
      const newCurrentImage = currentImagesByProductId.find((image, index) => {
        console.log(`index: ${index} |\n image.id: ${image.id} |\n currentImagesByProductId: ${currentImagesByProductId} |\n currentImageId: ${currentImageId} |\n currentImagesByProductId.length >= 0 && !currentImageId: ${currentImagesByProductId.length >= 0 && !currentImageId}`)
        if (currentImagesByProductId.length >= 0 && !currentImageId) {
          console.log();
          console.log('FIRST IF');
          console.log();
          setCurrentImageId(currentImagesByProductId[0].id);
          return true;
        } else {
          // if (image.id === currentImageId) {
          //   console.log("\nimage.id\n", image.id);
          //   setCurrentImageId(image.id);
          // }
          return image.id === currentImageId
        }
      });

      if (newCurrentImage) {
        return (
          <figure className="pm-cis-figure">
            <img
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

  return (
    productLoaded &&
    <section className="lower-page-section">
      {/* //* Path */}
      {/* Example: Home / Shop All / Product Name */}
      <p>
        <NavLink to="/">
          Home
        </NavLink>
        /
        <NavLink to="product-page">
          Shop All
        </NavLink>
        /
        {
          currentProductById.name
        }
      </p>

      {/* //* Prev Next Product Selector */}
      <p>
        {/* if there are prev and next, return vertical pipe */}
        {
          getPrevProduct()
        }
        {
          displayVerticalLine()
        }
        {
          getNextProduct()
        }
      </p>

      {/* //* Product Image */}
      {
        displayCurrentImageSelected()
      }
      {
        displayImageSelectors()
      }

      {/*  */}

      {/* //* Product Titles */}
      <section className="product-title">
        {/* Name */}
        <span>
          {
            currentProductById.name
          }
        </span>

        {/* Id */}
        <span>
          {
            currentProductById.id
          }
        </span>

        {/* Price */}
        <span>
          {
            currentProductById.price
          }
        </span>

        {/* Buy buttons */}
        <button>
          buy | out of stock
        </button>

        {/* Like Toggle */}
        <figure>
          <i className="fa-regular fa-heart" />
        </figure>

        {/* Description */}
        <p>
          {
            currentProductById.description
          }
        </p>
      </section>

    </section>
  );
};

// export default component
export default LowerShopProduct;
