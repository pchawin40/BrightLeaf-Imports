// src/components/Portfolio/LowerPortfolio/LowerPortfolio.js

// import component
import ImageModal from '../../ImageModal';

// import context
import { useImage } from '../../../context/ImageContext';
import { Modal } from '../../../context/Modal';

// import css
import './LowerPortfolio.css';

// import react-redux
import { useSelector } from 'react-redux';

// import react
import { useEffect, useState } from 'react';

// import store
import * as imageActions from '../../../store/images';
import * as sessionActions from '../../../store/session';

//? LowerPortfolio component
const LowerPortfolio = () => {
  /**
   * Controlled inputs
   */
  const [imageLoaded, setImageLoaded] = useState(false);
  const { showAddImageModal, setShowAddImageModal } = useImage();
  const [imageType, setImageType] = useState("None");

  /**
   * Selector functions
   */
  // grab all images
  const currentImages = useSelector(imageActions.getCurrentImages);
  // grab current user information
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

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

  const addMorePicButton = (type = "None") => {
    return (
      <button
        className="amp-button"
        value={type}
        onClick={_ => handleAddPicture(type)}
      >
        <i className="fa-solid fa-plus" />
        Add pictures
      </button>
    );
  };

  // function to display images
  const displayLoadedImages = (type = "None") => {
    // get images to display
    const displayImages = Object.values(currentImages).filter(image => image.imageable_type === type);

    if (imageLoaded) {
      if (displayImages.length <= 0) {
        // if image is loaded but no images, show content: no image, add more
        return (
          <ul className="lps-ul">
            <figure>
              No images available. Add more here

              {
                addMorePicButton(type)
              }
            </figure>
          </ul>
        )
      } else {
        // otherwise show normal image
        return (
          <ul className="lps-ul">
            {
              displayImages.map(image =>
                <figure
                  key={`image id ${image.id} | imageable_id ${image.imageable_id}`}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                  />

                  {/* Button to delete image */}
                  {
                    currentUserInfo.role === "administrator"
                    &&
                    <figure
                        
                        className="lps-ul-inner-figure"
                      >
                      <i className="fa-solid fa-xmark fa-xl" />
                    </figure>
                  }
                </figure>
              )
            }
          </ul>
        );
      }
    } else {
      // if image is not yet loaded, do a progress bar
      return (
        <ul className="lps-ul">
          <figure>
            <img
              src="https://thumbs.gfycat.com/GlaringBossyCrustacean-size_restricted.gif"
              alt="progress-bar"
            />
          </figure>
        </ul>
      );
    }
  };

  // function to check if session user is administrator
  const checkSessionUserType = () => {
    if (currentUserInfo && currentUserInfo.role) {
      return currentUserInfo.role === "administrator";
    } else {
      return false;
    }
  }

  // function to add more pictures based on type
  const handleAddPicture = (type) => {
    // set imageType from given type
    setImageType(type);

    // on click, set to show add image modal
    setShowAddImageModal(true);
  }

  // function to delete image
  

  return (
    <section id="lp-section">
      {/* // TODO: Implement both user interface AND administrator interface */}

      {/* Title */}
      <h1>
        Our Portfolio
      </h1>

      {/* Subtitle */}
      <h2>
        A closer look into the journey behind the craftsmanship
      </h2>

      {/* None Title */}
      <h3>
        wHERE IT bEGINS
      </h3>

      {/* None Text */}
      <p>
        Take a glance at the process behind our products. Brightleaf Imports is family owned, ethically sourced company that strives for perfection. Each piece is uniquely designed and hand-crafted to perfection.
      </p>

      {/* None Images */}
      {
        displayLoadedImages("None")
      }

      {/* Add "None" type image if administrator */}
      {
        checkSessionUserType()
        &&
        addMorePicButton("None")
      }

      {/* Product Title */}
      <h3>
        Uniquely crafted
      </h3>

      {/* Product Text */}
      <p>
        Brightleaf Imports is much more than your mass produced furniture manufacture. We offer unique designs such as epoxy, bow-ties, cuts, custom leg designs, live edge and more. Our artisans design a range of products, to include tables, shelving, benches and coasters. Take a look at some of our past projects.
      </p>

      {/* Product Images */}
      {
        displayLoadedImages("Product")
      }

      {/* Square to add more images (if administrator) */}
      {
        checkSessionUserType()
        &&
        addMorePicButton("Product")
      }

      {/* Image Modal */}
      {showAddImageModal && (
        <Modal
          onClose={(_) => {
            setShowAddImageModal(false)
          }}
        >
          <ImageModal imageType={imageType} />
        </Modal>
      )}
    </section>
  );
};

// export default component
export default LowerPortfolio;
