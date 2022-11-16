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
    console.log('currentImagesByType', currentImagesByType);
    console.log('currentImageById', currentImageById);

    return <GalleryCarousel />
  };

  return (
    <section id="display-gallery-modal">
      <h1>
        Testing
      </h1>
      {
        showGallery()
      }
    </section>
  );
};

// export default component
export default DisplayGalleryModal;
