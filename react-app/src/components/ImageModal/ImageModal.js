// src/components/ImageModal/ImageModal.js

// import context
import { useImage } from '../../context/ImageContext';

// import css
import './ImageModal.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as imageActions from '../../store/images';

//? ImageModal component
const ImageModal = ({ imageType }) => {
  /**
   * Controlled inputs
   */
  const { showAddImageModal, setShowAddImageModal } = useImage();

  // dictate whether form is ready to submit
  const [formReady, setFormReady] = useState(true);

  // add picture description
  const [imageDescription, setImageDescription] = useState("");

  // description input length
  const [descriptionInputLength, setDescriptionInputLength] = useState(0);

  // add picture url
  const [imageAdd, setImageAdd] = useState("");

  // set image loading 
  const [imageLoading, setImageLoading] = useState(false);

  /**
   * Selector functions
   */
  // select current images
  const currentImagesByType = useSelector(imageActions.getCurrentImagesByType(imageType));

  // select current user info

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    if (!formReady) {
      setFormReady(true);
    }
  }, [imageDescription, imageAdd, formReady, setDescriptionInputLength]);

  // per imageAdd
  useEffect(() => {
    // nothing for now
  }, [imageAdd]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to update picture description
  const updateImageDescription = e => {
    setImageDescription(e.target.value.replace(/  +/g, ' '));
    setDescriptionInputLength(e.target.value.replace(/  +/g, ' ').length);
  }

  // add image
  const updateImage = e => {
    const file = e.target.files[0];

    if (file) {
      setImageAdd(file);
      fetchImageAdd(file);
    }
  }

  // function to handle adding image
  const onImageAdding = e => {
    // prevent page from refreshing
    e.preventDefault();

    // create image object to add to database
    const imageToAdd = {
      imageable_id: currentImagesByType.length + 1,
      imageable_type: imageType,
      url: imageAdd,
      description: imageDescription
    }

    // call on thunk to add image after getting imageToAdd data
    dispatch(imageActions.thunkPostImages(imageToAdd))
      .then(() => {
        // dispatch to get images for portfolio page
        dispatch(imageActions.thunkGetImages("Product=True&Gallery=True"));

        // turn image modal off after finish
        setShowAddImageModal(false);
      });
  }

  // function to convert given image file to url
  const fetchImageAdd = async file => {
    // set image loading to true while fetching
    setImageLoading(true);

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

        setImageAdd(currentPictureAdd.image_sample);
      }

      setImageLoading(false);
    }
  }

  // function to check if review is ready to be submitted
  const checkSubmitReady = () => {
    return (
      imageAdd.length > 0
      &&
      (descriptionInputLength > 0 && descriptionInputLength <= 255 && imageDescription.trim() !== "")
    )
  }

  return (
    <section id="image-modal">
      <form
        id="im-form"
        onSubmit={onImageAdding}
      >
        {/* Add Title */}
        <h2>
          {`${imageType === "Gallery" ? "Gallery" : imageType} Portfolio Photo`}
        </h2>

        {/* Image to display sample image to add */}
        <figure
          className="imm-sample-image-figure"
          onClick={_ => document.querySelector('.im-image-input').click()}
        >
          {imageLoading ? (
            <img
              src='https://cdn.dribbble.com/users/2077073/screenshots/6005120/loadin_gif.gif'
              alt='Loading'
            />
          ) : (
            imageAdd ?
              <img
                src={imageAdd}
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
                  onChange={updateImage}
                />
                <i className="fa-solid fa-image" />
                <br />
                <span>
                  Click here to add image
                </span>
              </figure>
          )}

        </figure>

        {/* Image description textarea container */}
        <section className="im-description-container">
          {/* Image description textarea */}
          <figure className="im-textarea-container">
            <textarea
              className="im-textarea-description"
              placeholder="Enter image description"
              onChange={updateImageDescription}
            />
            <span className={`valid-image ${255 - descriptionInputLength > 0}`}>
              {` ${imageDescription.trim() !== "" ? 255 - descriptionInputLength : 255} characters left`}
            </span>
          </figure>

          {/* Input length */}
          {
            descriptionInputLength > 0
            &&
            <span
              style={{
                color: 255 - descriptionInputLength >= 0 ? "black" : "red"
              }}
            >
              {255 - descriptionInputLength} characters left
            </span>
          }
        </section>

        <section className="im-button-containers">
          {/* Button to add image */}
          <button
            className={`add-image button ${checkSubmitReady()}`}
            type={`${checkSubmitReady() ? "submit" : "button"}`}
          >
            Submit Pictures
          </button>

          {/* Button to reset image */}
          <button
            className={`reset-image button`}
            onClick={_ => setImageAdd("")}
            type="button"
            style={{
              backgroundColor: imageAdd.length > 0 ? "#80ab63" : "gray",
              cursor: imageAdd.length > 0 ? "pointer" : "default"
            }}
          >
            Reset Picture
          </button>
        </section>

      </form>

      {/* Exit Modal Icon */}
      <i
        className="fa-solid fa-x fa-lg exit-modal-icon"
        onClick={_ => setShowAddImageModal(false)}
      />
    </section>
  );
}

// export default component
export default ImageModal;
