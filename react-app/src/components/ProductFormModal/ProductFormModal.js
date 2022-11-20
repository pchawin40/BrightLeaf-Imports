// src/components/ProductFormModal/ProductFormModal.js

// import context
import { useProduct } from '../../context/ProductContext';

// import css
import './ProductFormModal.css';

// import react
import { useState } from 'react';
import { useSelector } from 'react-redux';

// import store
import * as productActions from '../../store/products';

//? ProductFormModal component
const ProductFormModal = () => {
  /**
   * Controlled inputs
   */
  const { showProductFormModal, setShowProductFormModal } = useProduct();
  const { editProduct, setEditProduct } = useProduct();
  const { currentProductId, setCurrentProductId } = useProduct();

  /**
   * Selector functions
   */
  // const currentProductById = useSelector(
  //   editProduct && productActions.getCurrentProductById(currentProductId)
  // );

  // dictate whether form is ready to submit
  const [formReady, setFormReady] = useState(true);
  const [productName, setProductName] = useState();

  if (editProduct) {
    // console.log("currentProductById", currentProductById);
  }

  // function to display product form
  const displayProductForm = () => {
    return (
      <form

        onSubmit={handleAddEditProduct}
      >
        <h1>
          {
            editProduct
              ?
              <>
                Edit Product
              </>
              :
              <>
                Add Product
              </>
          }
        </h1>

        {/* Product Name */}

        {/* Product Price */}

        {/* Product Description */}

        {/* Product Image */}

        {/* Submit Button */}

        {/* Exit Modal Icon */}
      </form>
    );
  };

  // function to add/edit product
  const handleAddEditProduct = () => {

  }

  return (
    <section className="pfm-section">
      {/* Display Product Form */}
      {
        displayProductForm()
      }

      <i
        className="fa-solid fa-x fa-lg exit-modal-icon"
        onClick={_ => setShowProductFormModal(false)}
      />
    </section>
  );
};

// export default component
export default ProductFormModal;
