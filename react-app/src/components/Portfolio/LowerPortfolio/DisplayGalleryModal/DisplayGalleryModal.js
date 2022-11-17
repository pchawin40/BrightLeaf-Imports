// src/components/Portfolio/LowerPortfolio/DisplayGalleryModal/DisplayGalleryModal.js

// import css
import './DisplayGalleryModal.css';

// import react
import { useEffect } from 'react';

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as imageActions from '../../../../store/images';
import GalleryCarousel from './GalleryCarousel';

//? DisplayGalleryModal
const DisplayGalleryModal = ({ currentPictureId, imageType }) => {
  console.log("currentPictureId", currentPictureId);
  console.log("imageType", imageType);

  /**
   * Selector functions
   */
  const currentImagesByType = useSelector(imageActions.getCurrentImagesByType(imageType));
  const currentImageById = useSelector(imageActions.getCurrentImageById(currentPictureId));

  // function to display image based on type
  const showGallery = () => {
    // console.log('currentImagesByType', currentImagesByType);
    // console.log('currentImageById', currentImageById);

    return (
      <section className="dgm-inner-section">
        <GalleryCarousel />
      </section>
    )
  };

  return (
    <section id="display-gallery-modal">
      {
        showGallery()
      }

      {/* Description Box */}
      <h4>
        {
          currentImageById.description
        }
      </h4>
      <textarea
        className="dgm-textarea"
      />

      {/* Button to submit if administraotr */}
    </section>
  );
};

// export default component
export default DisplayGalleryModal;
