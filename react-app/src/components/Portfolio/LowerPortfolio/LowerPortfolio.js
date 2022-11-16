// src/components/Portfolio/LowerPortfolio/LowerPortfolio.js

// import css
import './LowerPortfolio.css';

// import react-redux
import { useSelector } from 'react-redux';

// import react
import { useState } from 'react';

// import store
import * as imageActions from '../../../store/images';

//? LowerPortfolio component
const LowerPortfolio = () => {
  /**
   * Controlled inputs
   */
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * Selector functions
   */
  // grab all images
  const currentImages = useSelector(imageActions.getCurrentImages);

  return (
    <section id="lp-section">

    </section>
  );
};

// export default component
export default LowerPortfolio;
