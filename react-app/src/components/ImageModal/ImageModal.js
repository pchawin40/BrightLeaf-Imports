// src/components/ImageModal/ImageModal.js

// import context
import { useImage } from '../../context/ImageContext';

// import css
import './ImageModal.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as imageActions from '../../store/images';

//? ImageModal component
const ImageModal = ({ imageType }) => {
  /**
   * Controlled inputs
   */
  const { showAddImageModal, setShowAddImageModal } = useImage();

  // dictate whether form is ready to submit
  const [formReady, setFormReady] = useState(true);

  // add picture description
  const [imageDescription, setImageDescription] = useState("");

  // add picture url
  const [imageAdd, setImageAdd] = useState("");

  // set image loading 
  const [imageLoading, setImageLoading] = useState(false);

  /**
   * Selector functions
   */
  // select current images
  const currentImagesByType = useSelector(imageActions.getCurrentImagesByType(imageType));

  // select current user info

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    if (!formReady) {
      setFormReady(true);
    }
  }, [imageDescription, imageAdd, formReady]);

  // per imageAdd
  useEffect(() => {
    setImageLoading(false);

    // reset image sample after setting image loading to false
    //! TODO
    // document.querySelector('.im-image-input').value = '';
  }, [imageAdd]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to update picture description
  const updateImageDescription = e => {
    setImageDescription(e.target.value);
  }

  // add image
  const updateImage = e => {
    const file = e.target.files[0];

    if (file) {
      setImageAdd(file);
      fetchImageAdd(file);
    }
  }

  // function to handle adding image
  const onImageAdding = e => {
    // prevent page from refreshing
    e.preventDefault();

    // imageable_id: get length of all images by imageType
    // imageable_type
    // url
    // description

    const imageToAdd = {
      imageable_id: currentImagesByType.length + 1,
      imageable_type: imageType,
      url: imageAdd,
      description: imageDescription
    }

    // call on thunk to add image after getting imageToAdd data
    dispatch(imageActions.thunkPostImages(imageToAdd))
      .then(() => {
        // dispatch to get images
        dispatch(imageActions.thunkGetImages("Product=True&None=True"));
      });
  }

  // function to convert given image file to url
  const fetchImageAdd = async file => {
    // set image loading to true while fetching
    setImageLoading(true);

    // if received file, set current picture url
    if (file) {
      const formData = new FormData();
      formData.append('image_sample', file);

      // fetch image
      const res = await fetch('/api/images/sample', {
        method: 'POST',
        body: formData,
      });

      // if succesful response, set the picture
      if (res.ok) {
        const currentPictureAdd = await res.json();

        console.log('here');
        console.log('currentPictureAdd', currentPictureAdd);

        setImageAdd(currentPictureAdd.image_sample);
      }
    }
  }

  return (
    <section id="image-modal">
      <form
        id="im-form"
        onSubmit={onImageAdding}
      >
        {/* Picture dropper */}
        <figure>
          <input
            type='file'
            accept='image/*'
            className="im-image-input"
            onChange={updateImage}
          />

          Upload image
        </figure>

        {/* Image description input */}
        <input
          placeholder="Enter image description"
          onChange={updateImageDescription}
        />

        {/* Button to add image */}
        <button
          onClick={onImageAdding}
          type="submit"
        >
          Add Pictures for {imageType === "None" ? "Gallery" : imageType}
        </button>
      </form>

      {/* Exit Modal Icon */}
      <i
        className="fa-solid fa-x fa-xl exit-modal"
        onClick={_ => setShowAddImageModal(false)}
      />
    </section>
  );
}

// export default component
export default ImageModal;
