// src/components/Portfolio/LowerPortfolio/DisplayGalleryModal/DisplayGalleryModal.js

// import css
import './DisplayGalleryModal.css';

// import component
import GalleryCarousel from './GalleryCarousel';

// import context
import { useImage } from '../../../../context/ImageContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as imageActions from '../../../../store/images';
import * as sessionActions from '../../../../store/session';

//? DisplayGalleryModal
const DisplayGalleryModal = ({ imageType }) => {
  const { currentPictureId, setCurrentPictureId } = useImage();

  /**
   * Selector functions
   */
  // grab images
  const currentImagesByType = useSelector(imageActions.getCurrentImagesByType(imageType));
  const currentImageById = useSelector(imageActions.getCurrentImageById(currentPictureId));

  // grab current user information
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * Controlled inputs
   */
  const [formReady, setFormReady] = useState(true);
  const [imageDescription, setImageDescription] = useState(
    currentImageById && currentImageById.description ? currentImageById.description : ""
  );
  const [descriptionInputLength, setDescriptionInputLength] = useState(0);
  const { showGalleryModal, setShowGalleryModal } = useImage();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    if (!formReady) {
      setFormReady(true);
    }
  }, [imageDescription, descriptionInputLength, formReady]);

  // per currentImageById
  useEffect(() => {
    if (currentImageById) {
      setImageDescription(currentImageById.description);
    }
  }, [currentImageById]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to display image based on type
  const showGallery = () => {
    return (
      <section className="dgm-inner-section">
        <GalleryCarousel imageType={imageType} />
      </section>
    )
  };

  // function to update image description
  const updateImageDescription = e => {
    setImageDescription(e.target.value.replace(/  +/g, ' '));
    setDescriptionInputLength(e.target.value.replace(/  +/g, ' ').length);
  }

  // function to handle submission of description edit
  const updateImage = e => {
    // prevent page from refreshing
    e.preventDefault();

    // get image description
    const editImage = {
      ...currentImageById,
      "description": imageDescription
    };

    // call on thunk to edit image
    dispatch(imageActions.thunkEditImage(editImage))
      .then(() => {
        dispatch(imageActions.thunkGetImages("Product=True&Gallery=True"));
      });
  };

  // function to check if edit image description is ready to be submitted
  const checkSubmitReady = () => {
    return (
      imageDescription.trim() !== ""
      &&
      (descriptionInputLength > 0 && descriptionInputLength <= 255 && imageDescription.trim() !== "" || imageDescription.length > 0)
    )
  }

  return (
    <section id="display-gallery-modal">
      {
        showGallery()
      }

      {/* Description Box */}
      <section className="dgm-description-box">
        <section className="dgm-description-box-description">
          <h4>
            {
              imageType
              &&
              imageType + " Portfolio"
            }
          </h4>
          <h5>
            {
              currentImageById &&
              currentImageById.description
            }
          </h5>
        </section>
        {
          currentUserInfo &&
          currentUserInfo.role === "administrator" &&
          <form className="dgm-db-text-form" onSubmit={updateImage}>
            <label htmlFor='dgm-textarea'>
              Enter new description
            </label>
            <figure className="dgm-textarea-container">
              <textarea
                name="dgm-textarea"
                className="dgm-db-textarea"
                value={imageDescription}
                onChange={updateImageDescription}
                placeholder={`Enter description ${currentImageById ? `for ${currentImageById.imageable_type} ${currentImageById.imageable_id}` : ""}`}
              />
              <span className={`valid-image ${255 - descriptionInputLength > 0}`}>
                {` ${imageDescription.trim() !== "" ? 255 - descriptionInputLength : 255} characters left`}
              </span>
            </figure>
            {/* Button to submit if administraotr */}
            <button
              className={`dgm-db-submit-btn ${checkSubmitReady()}`}
              type={`${checkSubmitReady() ? "submit" : "button"}`}
            >
              Edit Description
            </button>
          </form>
        }
      </section>

    </section>
  );
};

// export default component
export default DisplayGalleryModal;
