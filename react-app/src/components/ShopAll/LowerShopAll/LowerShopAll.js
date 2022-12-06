// src/components/ShopAll/LowerShopAll/LowerShopAll.js

// import component
import ProductModal from './ProductModal';
import ReviewSection from './ReviewSection';

// import context
import { useProduct } from '../../../context/ProductContext';
import { Modal } from '../../../context/Modal';
import ReviewProvider from '../../../context/ReviewContext';

// import css
import './LowerShopAll.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { NavLink } from 'react-router-dom';

// import store
import * as productActions from '../../../store/products';
import * as sessionActions from '../../../store/session';
import * as imageActions from '../../../store/images';

//? LowerShopAll component
const LowerShopAll = () => {
  /**
   * Controlled inputs
   */
  const [productLoaded, setProductLoaded] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const { currentProductId, setCurrentProductId } = useProduct();
  const { showProductFormModal, setShowProductFormModal } = useProduct();
  const { editProduct, setEditProduct } = useProduct();

  /**
   * Selector functions
   */
  // grab current products
  const currentProducts = useSelector(productActions.getCurrentProducts);
  // grab current user information
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * UseEffect
   */
  useEffect(() => {
    if (currentProducts && Object.values(currentProducts).length > 0) {
      setProductLoaded(true);
    }
  }, [currentProducts]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle delete product
  const handleDeleteProduct = productId => {
    // delete image first
    dispatch(imageActions.thunkDeleteImage())

    // then delete product
    dispatch(productActions.thunkDeleteProduct(productId))
      .then(() => {
        dispatch(productActions.thunkDeleteProduct(productId));
      })
  }

  // load products
  const loadProducts = () => {
    const displayProducts = Object.values(currentProducts).map(product => {
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
            <span
              onClick={_ => {
                setCurrentProductId(product.id);
                setShowProductModal(true)
              }
              }
            >
              <span>
                Quick Preview
              </span>
            </span>

            {/* Only shows if administrator */}
            {
              currentUserInfo
              && currentUserInfo.role === "administrator"
              &&
              <figure
                onClick={e => {
                  e.stopPropagation();

                  handleDeleteProduct(product.id)
                }}
                className="lps-ul-inner-figure"
              >
                <i className="fa-solid fa-xmark fa-xl" />
              </figure>
            }
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
              <NavLink
                to={`/product-page/${product.name}`}
                onClick={_ => setCurrentProductId(product.id)}
              >
                <button className='lp-product-button available'>
                  View Product
                </button>
              </NavLink>
          }
        </figure>
      );
    });

    if (displayProducts.length > 0) {
      return (
        <section className="products-container">
          {displayProducts}
        </section>
      );
    } else {
      return (
        <section className="no-product-section">
          <span className="no-product-available">
            No product currently available.
            <br />
            {
              currentUserInfo
                && currentUserInfo.role === "administrator"
                ? "Add a product by clicking on the button below."
                : "Log in as an administrator to add more products"
            }

          </span>
        </section>
      )
    }
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

      {
        loadProducts()
      }


      {/* Add product section (if administrator) */}
      <section className="section-add-product">
        {
          currentUserInfo &&
          currentUserInfo.role === "administrator" &&
          <button
            onClick={_ => {
              setCurrentProductId(null);
              setEditProduct(false);
              setShowProductFormModal(true);
            }}
          >
            Add Product
          </button>
        }
      </section>

      {/* Review Section */}
      <ReviewProvider>
        <ReviewSection />
      </ReviewProvider>

      {/* Product Modal */}
      {
        showProductModal && (
          <Modal
            onClose={(_) => {
              setCurrentProductId(null);
              setShowProductModal(false)
            }}
            currentVisible={false}
          >
            <ProductModal setShowProductModal={setShowProductModal} />
          </Modal>
        )
      }
    </section >
  );
};

// export default component
export default LowerShopAll;
