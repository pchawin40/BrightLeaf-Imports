// src/components/ShopAll/LowerShopAll/LowerShopAll.js

// import css
import './LowerShopAll.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as productActions from '../../../store/products';
import { NavLink } from 'react-router-dom';

//? LowerShopAll component
const LowerShopAll = () => {
  /**
   * Controlled inputs
   */
  const [productLoaded, setProductLoaded] = useState(false);

  /**
   * Selector functions
   */
  const currentProducts = useSelector(productActions.getCurrentProducts);

  /**
   * UseEffect
   */
  useEffect(() => {
    if (currentProducts && Object.values(currentProducts).length > 0) {
      setProductLoaded(true);
    }
  }, [currentProducts]);

  // load products
  const loadProducts = () => {
    const displayProducts = Object.values(currentProducts).map(product => {
      // console.log("product.quantity", produc)
      return (
        <figure
          key={`Product ${product.id}`}
          className="lp-product-figure"
        >
          <figure className="lp-product-img-figure">
            {/* image */}
            <img
              src={product.preview_image}
              alt={product.name}
            />
            <span>
              <span>
                Quick Preview
              </span>
            </span>
          </figure>

          {/* product name */}
          <span className="lp-product-span name">
            {product.name}
          </span>

          {/* product price */}
          <span className='lp-product-span price'>
            $ {parseFloat(product.price).toFixed(2)} USD
          </span>

          {
            product.quantity <= 0 ?
              <button className='lp-product-button out-of-stock'>
                Out of Stock
              </button>
              :
              <button className='lp-product-button available'>
                Buy Now ( {product.quantity} left )
              </button>
          }
        </figure>
      );
    });

    return displayProducts;
  }

  return (
    <section className="lower-page-section">
      {/* Title */}
      <h1>
        All Products
      </h1>

      {/* Subtitle */}
      <p>
        Every product is unique and hand-crafted in its own way. Please contact us for custom orders so we can meet your exact specifications.
      </p>

      {/* Contact button */}
      <NavLink to="/contact">
        <button>
          Contact
        </button>
      </NavLink>

      {/* Product Images */}
      <section className="products-container">
        {
          loadProducts()
        }
      </section>
    </section>
  );
};

// export default component
export default LowerShopAll;
