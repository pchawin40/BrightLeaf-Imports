// src/components/Portfolio/LowerPortfolio/DispalyGalleryModal/GalleryCarousel/GalleryCarousel.js

// import css
import './GalleryCarousel.css';

// import component
import Arrow from '../../../../LandingPage/TopLanding/Carousel/Arrow';
import ImageSlide from '../../../../LandingPage/TopLanding/Carousel/ImageSlide';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as imageActions from '../../../../../store/images';

//? GalleryCarousel component
const GalleryCarousel = () => {
  /**
   * Controlled inputs
   */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * Selector functions
   */
  // grab current images
  const currentImages = useSelector(imageActions.getCurrentImages);

  /**
   * UseEffect
   */
  useEffect(() => {
    // set image to loaded if there are current images
    if (Object.values(currentImages) && Object.values(currentImages).length > 0) {
      setImageLoaded(true);
    }
  }, [currentImages]);

  // function to handle previous slide
  const previousSlide = () => {
    if (imageLoaded) {
      const lastIndex = Object.values(currentImages).length - 1;
      const shouldResetIndex = currentImageIndex === 0;
      const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
      setCurrentImageIndex(index);
    }
  }

  // function to handle next slide
  const nextSlide = () => {
    const lastIndex = Object.values(currentImages).length - 1;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index);
  }

  return (
    <section className="carousel gc-section" >
      {/* Left GalleryArrow */}
      {
        imageLoaded &&
        <Arrow
          direction="left"
          clickFunction={previousSlide}
          glyph={<i className="fa-solid fa-chevron-left fa-2xl" />}
        />
      }

      {/* GalleryImageSlide */}
      <ImageSlide url={
        imageLoaded ?
          Object.values(currentImages)[currentImageIndex].url
          :
          "https://thumbs.gfycat.com/GlaringBossyCrustacean-size_restricted.gif"
      } />

      {/* Right GalleryArrow */}
      {
        imageLoaded &&
        <Arrow
          direction="right"
          clickFunction={nextSlide}
          glyph={<i className="fa-solid fa-chevron-right fa-2xl" />}
        />
      }
    </section >
  );
};

// export default component
export default GalleryCarousel;
