// src/components/LandingPage/TopLanding/Carousel/Arrow/Arrow.js

// import css
import './Arrow.css';

//? Arrow component
const Arrow = ({ direction, clickFunction, glyph }) => {
  return (
    <figure
      className={`slide-arrow ${direction}`}
      onClick={clickFunction}
    >
      {glyph}
    </figure>
  );
};

// export default component
export default Arrow;
