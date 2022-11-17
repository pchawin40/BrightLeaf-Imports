// src/components/LandingPage/TopLanding/Carousel/Carousel.js

// import css
import './Carousel.css';

// import component
import Arrow from "./Arrow";
import ImageSlide from "./ImageSlide";

// import react
import { useEffect, useState } from "react";

// import react-redux
import { useSelector } from 'react-redux';

// import store
import * as imageActions from '../../../../store/images';

//? Carousel Component
const Carousel = () => {
  /**
   * Controlled inputs
   */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * Selector functions
   */
  // grab "Gallery" type images
  const currentImages = useSelector(imageActions.getCurrentImages);

  /**
   * useEffect
   */
  // per currentImages
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
    <section className="carousel">
      {/* left Arrow */}
      {
        imageLoaded &&
        <Arrow
          direction="left"
          clickFunction={previousSlide}
          glyph={<i className="fa-solid fa-chevron-left fa-2xl" />}
        />
      }

      {/* ImageSlide component */}
      <ImageSlide url={
        imageLoaded ?
          Object.values(currentImages)[currentImageIndex].url
          :
          "https://thumbs.gfycat.com/GlaringBossyCrustacean-size_restricted.gif"
      } />

      {/* Right Arrow */}
      {
        imageLoaded &&
        <Arrow
          direction="right"
          clickFunction={nextSlide}
          glyph={<i className="fa-solid fa-chevron-right fa-2xl" />}
        />
      }

    </section>
  );
};

// export default component
export default Carousel;
