// src/components/LandingPage/TopLanding/Carousel/ImageSlide/ImageSlide.js

// import css
import './ImageSlide.css';

//? ImageSlide component
const ImageSlide = ({ url }) => {
  // style for image slide
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  return (
    <section className="image-slide" style={styles}>
    </section>
  );
};

// export default component
export default ImageSlide;
