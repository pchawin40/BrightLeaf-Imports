// src/components/ProductFormModal/ProductFormModal.js

// import context
import { useProduct } from '../../context/ProductContext';
import { useImage } from '../../context/ImageContext';

// import css
import './ProductFormModal.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as productActions from '../../store/products';
import * as imageActions from '../../store/images';

//? ProductFormModal component
const ProductFormModal = () => {
  const { currentProductId, setCurrentProductId } = useProduct();

  /**
   * Selector functions
   */
  const currentProductById = useSelector(productActions.getCurrentProductById(currentProductId ? currentProductId : null));
  const currentImagesByProductId = useSelector(imageActions.getCurrentImagesByProductId(currentProductId));

  /**
   * Controlled inputs
   */
  const { showProductFormModal, setShowProductFormModal } = useProduct();
  const { editProduct, setEditProduct } = useProduct();

  // dictate whether form is ready to submit
  const [formReady, setFormReady] = useState(true);

  // set product price (grab existing if exists)
  const [productName, setProductName] = useState(
    currentProductById && currentProductById.name ? currentProductById.name : ""
  );

  // set product name length (to see if exists)
  const [productNameLength, setProductNameLength] = useState(0);

  // set product price (grab existing if exists)
  const [productPrice, setProductPrice] = useState(
    currentProductById && currentProductById.price ? currentProductById.price : 0
  );

  // set product description (grab existing if exists)
  const [productDescription, setProductDescription] = useState(
    currentProductById && currentProductById.description ? currentProductById.description : ""
  );

  // set product price length (to see if exists)
  const [productDescriptionLength, setProductDescriptionLength] = useState(0);

  // set product quantity
  const [productQuantity, setProductQuantity] = useState(
    currentProductById && currentProductById.quantity ? currentProductById.quantity : 0
  );

  // set product preview image (grab existing if exists)
  const [productPreviewImage, setProductPreviewImage] = useState(
    currentProductById && currentProductById.preview_image ? currentProductById.preview_image : ""
  );

  // set product shopall images (grab existing if exists)
  const [productGalleryImages, setProductGalleryImages] = useState(null);

  // set preview image loading
  const [previewImageLoading, setPreviewImageLoading] = useState(false);

  // set product gallery image
  const [galleryImageLoading, setGalleryImageLoading] = useState(false);


  /**
   * UseEffect
   */
  useEffect(() => {
    if (!formReady) {
      setFormReady(true);
    }

  }, [formReady, productName, productPrice, productDescription]);

  // function to update product name
  const updateProductName = e => {
    setProductName(e.target.value);
    setProductNameLength(e.target.value.length);
  };

  // function to update product price
  const updateProductPrice = e => {
    setProductPrice(e.target.value);
  }

  // function to update product description
  const updateProductDescription = e => {
    setProductDescription(e.target.value);
    setProductDescriptionLength(e.target.value.length);
  }

  // function to update product quantity
  const updateProductQuantity = e => {
    setProductQuantity(e.target.value);
  };

  // function to update product preview image
  const updateProductPreviewImage = e => {
    setProductPreviewImage(e.target.value);
  }

  // function to submit an image for gallery
  const updateProductGalleryImages = e => {

  }

  // function to post/put product
  const handleProductSubmit = e => {
    // prevent page from refreshing
    e.preventDefault();

    // get product information
    const product = {
      ...currentProductById,
      "name": productName,
      "description": productDescription,
      "price": productPrice,
      "quantity": productQuantity,
      "preview_image": productPreviewImage
    };
  };

  // invoke dispatch
  const dispatch = useDispatch();

  // function to check if input length are entered
  const checkInputEntered = () => {
    return (
      productNameLength > 0 &&
      productDescriptionLength > 0
    );
  };

  // function to display product form
  const displayProductForm = () => {
    return (
      <form
        className="dpf-form"
        onSubmit={handleProductSubmit}
      >
        {/* //* Product Title */}
        <section className="dpf-section title">
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
        </section>

        {/* //* Product Information */}
        <section className="dpf-section information">
          {/* Product Name */}
          <label htmlFor='product_name'>Product Name</label>
          <input
            name='product_name'
            type='text'
            value={productName}
            onChange={updateProductName}
          />

          {/* Product Price */}
          <label htmlFor='product_price'>Product Price</label>
          <input
            name='product_price'
            type='number'
            min="0"
            value={productPrice}
            onChange={updateProductPrice}
          />

          {/* Product Quantity */}
          <label htmlFor='product_quantity'>Product Quantity</label>
          <input
            name='product_quantity'
            type='number'
            min="0"
            value={productQuantity}
            onChange={updateProductQuantity}
          />

          {/* Product Description */}
          <label htmlFor='product_description'>Enter new description</label>
          <textarea
            name='product_description'
            type='text'
            value={productDescription}
            onChange={updateProductDescription}
          />
        </section>

        {/* //* Product Image and Submit section */}
        <section className="dpf-section image-submit">
          {/* Image to display sample image to add */}
          <figure
            className="imm-sample-image-figure"
            onClick={_ => document.querySelector('.im-image-input').click()}
          >
            {previewImageLoading ? (
              <img
                src='https://cdn.dribbble.com/users/2077073/screenshots/6005120/loadin_gif.gif'
                alt='Loading'
              />
            ) : (
              productPreviewImage ?
                <img
                  src={productPreviewImage}
                  alt={"add display"}
                />
                :
                // Picture dropper
                <figure
                  className="imm-sample-image-figure-inner"
                >
                  <input
                    type='file'
                    accept='image/*'
                    className="im-image-input"
                    onChange={updateProductPreviewImage}
                  />
                  <i className="fa-solid fa-image" />
                  <br />
                  <span>
                    Click here to add image
                  </span>
                </figure>
            )}
          </figure>

          <section className="im-button-containers">
            {/* Button to reset image */}
            <button
              className={`reset-image button`}
              onClick={_ => setProductPreviewImage("")}
              type="button"
              style={{
                backgroundColor: productPreviewImage.length > 0 ? "#80ab63" : "gray",
                cursor: productPreviewImage.length > 0 ? "pointer" : "default"
              }}
            >
              Reset Preview Picture
            </button>
          </section>

          {/* Submit Button */}
          <button
            type='submit'
          // onClick={}
          >
            Submit Product
          </button>
        </section>


        {/* //* Image Gallery Display */}
        <section className="dpf-section gallery">
          <ul>
            {
              currentImagesByProductId && Object.values(currentImagesByProductId).map(image => {
                return (
                  <li>
                    <img
                      src={image.url}
                      alt={`Gallery Display: Image ${image.id}`}
                    />
                  </li>
                );
              })
            }
            {/* Add Image */}
            <li>
              <figure
                className="imm-sample-image-figure-inner"
              >
                <input
                  type='file'
                  accept='image/*'
                  className="im-image-input"
                  onChange={updateProductGalleryImages}
                />
                <i className="fa-solid fa-image" />
                <br />
                <span>
                  Click here to add image
                </span>
              </figure>
            </li>
          </ul>
        </section>
      </form>
    );
  };

  return (
    <section className="pfm-section">
      {/* Display Product Form */}
      {
        displayProductForm()
      }

      {/* Exit Modal Icon */}
      <i
        className="fa-solid fa-x fa-lg exit-modal-icon"
        onClick={_ => setShowProductFormModal(false)}
      />
    </section>
  );
};

// export default component
export default ProductFormModal;
