// src/components/ShopAll/LowerShopAll/LowerShopAll.js

// import css
import './LowerShopAll.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as productActions from '../../../store/products';

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
      console.log("product", product);
      console.log("product.preview_image", product.preview_image);
      return (
        <figure
          key={`Product ${product.id}`}
          className="lp-product-figure"
        >
          {/* image */}
          <img
            src={product.preview_image}
            alt={product.name}
          />

          {/* product name */}
          <span>
            {product.name}
          </span>

          {/* product price */}
          <span>
            $ {product.price} USD
          </span>
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
      <button>
        Contact
      </button>

      {/* Product Images */}
      {
        loadProducts()
      }
    </section>
  );
};

// export default component
export default LowerShopAll;
