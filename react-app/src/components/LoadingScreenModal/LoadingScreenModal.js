// src/components/LoadingScreenModal/LoadingScreenModal.js

// import css
import { useEffect } from 'react';
import { useLanding } from '../../context/LandingContext';
import './LoadingScreenModal.css';

// load loader
const loader = document.querySelector('.loader');

//? LoadingScreenModal component
const LoadingScreenModal = () => {
  /**
   * Controlled inputs
   */
  const { screenLoaded, setScreenLoaded } = useLanding();
  const { hideLoadingModal, setHideLoadingModal } = useLanding();

  /**
   * UseEffect
   */
  useEffect(() => {
    if (!screenLoaded) {
      // hide scroll
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }

    setTimeout(() => {
      setScreenLoaded(false);
    }, 1000);

    setTimeout(() => {
      setHideLoadingModal(true);
    }, 1600);
  }, [screenLoaded])

  return (
    <section
      className={`loading-screen modal ${screenLoaded ? "visible" : "invisible"}`}
    >
      {/* Inner */}
      <section className='inner loading-screen'>
        {/* company logo */}
        <figure>
          <img
            src="https://res.cloudinary.com/dfz7bzhoi/image/upload/v1668399359/image_nsflrd.webp"
            alt="company-logo-loading"
          />
          {/* Loading bar */}
          <figure
            className='loader'
          />
        </figure>

      </section>

    </section>
  )
}

// export default component
export default LoadingScreenModal;
