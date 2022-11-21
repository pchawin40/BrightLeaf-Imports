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
    const file = e.target.files[0];

    if (file) {
      // add image file
      setProductPreviewImage(file);
      // fetch preview image add
      fetchPreviewImageAdd(file);
    }
  }

  // function to convert given image file to url
  const fetchPreviewImageAdd = async file => {
    // set image loading to true while fetching
    setPreviewImageLoading(true);

    // if received file, set current picture url
    if (file) {
      const formData = new FormData();
      formData.append('image_sample', file);

      // fetch image
      const res = await fetch('/api/images/sample', {
        method: 'POST',
        body: formData,
      });

      // if succesful response, set the picture
      if (res.ok) {
        const currentPictureAdd = await res.json();

        setProductPreviewImage(currentPictureAdd.image_sample);
      }

      setPreviewImageLoading(false);
    }
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
      name: productName,
      description: productDescription,
      price: productPrice,
      quantity: productQuantity,
      preview_image: productPreviewImage
    };

    // call on thunk to edit product if editProduct is true
    // otherwise post new product if editProduct is false
    dispatch(
      editProduct
        ?
        productActions.thunkUpdateProduct(product, product.id)
        :
        productActions.thunkPostProduct(product)
    )
      // either way, call on thunk to fetch product afterward
      .then(() => dispatch(productActions.thunkGetProducts()));
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
          <label
            className="information product_name"
            htmlFor='product_name'
          >
            Product Name
          </label>
          <input
            name='product_name'
            type='text'
            value={productName}
            onChange={updateProductName}
          />

          {/* Product Price */}
          <label
            className="information product_price"
            htmlFor='product_price'
          >
            Product Price (in USD $)
          </label>
          <input
            name='product_price'
            type='number'
            min="0"
            value={productPrice}
            onChange={updateProductPrice}
          />

          {/* Product Quantity */}
          <label
            className="information product_quantity"
            htmlFor='product_quantity'
          >
            Product Quantity
          </label>
          <input
            name='product_quantity'
            type='number'
            min="0"
            value={productQuantity}
            onChange={updateProductQuantity}
          />

          {/* Product Description */}
          <label
            className="information product_description"
            htmlFor='product_description'
          >
            Product Description
          </label>
          <textarea
            className="information product_description"
            name='product_description'
            type='text'
            value={productDescription}
            onChange={updateProductDescription}
          />
        </section>

        {/* //* Product Image and Submit section */}
        <section className="dpf-section image-submit">
          <label>
            Preview Image
          </label>

          {/* Image to display sample image to add */}
          <figure
            className="imm-sample-image-figure pfm"
            onClick={_ => !productPreviewImage && document.querySelector('.im-image-input').click()}
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

          {/* Submit Button */}
          <button
            className="dpf submit-button"
            type='submit'
          >
            Submit Product
          </button>
        </section>


        {/* //* Image Gallery Display */}
        <section className="dpf-section gallery">
          <span>
            Gallery Display
          </span>
          <ul>
            {
              currentImagesByProductId && Object.values(currentImagesByProductId).map(image => {
                return (
                  <li key={`Image Gallery: ${image.id}`}>
                    <figure>
                      <img
                        src={image.url}
                        alt={`Gallery Display: Image ${image.id}`}
                      />
                    </figure>
                  </li>
                );
              })
            }
            {/* Add Image */}
            <li>
              <figure
                className="dpf-section add-image"
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

        {/* Exit Modal Icon */}
        <i
          className="fa-solid fa-x fa-xl pfm-exit"
          onClick={_ => setShowProductFormModal(false)}
        />
      </form>
    );
  };

  return (
    <section className="pfm-section">
      {/* Display Product Form */}
      {
        displayProductForm()
      }
    </section>
  );
};

// export default component
export default ProductFormModal;
