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
    if (currentProductId) {
      setProductLoaded(true);
    }
  }, [currentProductId]);

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
            onClick={_ => setCurrentProductId(currentPrevProduct.id)}
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
            onClick={_ => setCurrentProductId(currentNextProduct.id)}
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
    console.log('test', (Object.values(currentProducts).filter((product, index) => {
      if (index !== 0 && index !== Object.values(currentProducts).length && product.id === currentProductId) return true;
    })));

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

  // function to display product image
  const displayProductImage = () => {

  }

  // function to display product images available

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
        displayProductImage()
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
