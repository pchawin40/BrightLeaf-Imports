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
const DisplayGalleryModal = ({ imageType, setShowGalleryModal }) => {
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
    currentImageById.description ? currentImageById.description : ""
  );
  const [descriptionInputLength, setDescriptionInputLength] = useState(0);

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
    setImageDescription(currentImageById.description);
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
    setImageDescription(e.target.value);
    setDescriptionInputLength(e.target.value.length);
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
              currentImageById.description
            }
          </h5>
        </section>
        {
          currentUserInfo &&
          currentUserInfo.role === "administrator" &&
          <form className="dgm-db-text-form" onSubmit={updateImage}>
            <textarea
              className="dgm-db-textarea"
              value={imageDescription}
              onChange={updateImageDescription}
              placeholder={`Enter description for ${currentImageById}`}
            />
            {/* Button to submit if administraotr */}
            <button
              className="dgm-db-submit-btn"
              type='submit'
              onClick={updateImage}
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
