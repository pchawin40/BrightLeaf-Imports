// src/store/images.js

/* --------- ACTIONS -------- */
//? Action: Load images
const LOAD_IMAGES = 'images/LOAD_IMAGES';

// action creator: load images
export const loadImages = (images) => {
  return {
    type: LOAD_IMAGES,
    images
  }
}

//? Action: Create image
const CREATE_IMAGE = 'images/CREATE_IMAGE';

// action creator: add image
export const createImage = image => {
  return {
    type: CREATE_IMAGE,
    image
  }
}

//? Action: Delete image
const DELETE_IMAGE = 'images/DELETE_IMAGE';

// action creator: delete image
export const deleteImage = imageId => {
  return {
    type: DELETE_IMAGE,
    imageId
  }
}

/* --------- THUNKS -------- */
export const thunkGetImages = (searchParam = "") => async (dispatch) => {
  // fetch all images
  const res = await fetch(`/api/images/?${searchParam}`);

  if (res.ok) {
    // parse res to image data
    const imageData = await res.json();

    // dispatch load images w/ loaded images
    dispatch(loadImages(imageData.images));

    // return images
    return imageData;
  }

  // return res if unsucessful
  return res;
}

export const thunkPostImages = (imageToAdd) => async (dispatch) => {
  // destructure imageToAdd to place into formData
  const {
    imageable_id,
    imageable_type,
    url,
    description
  } = imageToAdd;

  // define form data
  const formData = new FormData();

  // put imageToAdd into form data
  formData.append("imageable_id", imageable_id);
  formData.append("imageable_type", imageable_type);
  formData.append("url", url);
  formData.append("description", description);

  // fetch route to post image
  const res = await fetch('/api/images/', {
    method: 'POST',
    body: formData
  });

  // if successful
  if (res.ok) {
    const imageData = await res.json();

    // if there's any error from res, return null
    if (imageData.errors) {
      return null;
    }

    // dispatch setting image
    dispatch(createImage(imageData));
    // if unsucessful
  } else if (res.status < 500) {
    const data = await res.json();

    if (data['errors']) {
      return data;
    }
  }

  return ['An error occurred. Please try again.']
}

// thunk to delete image
export const thunkDeleteImage = imageId => async (dispatch) => {
  // fetch route to delete image
  const res = await fetch(`/api/images/${imageId}`, {
    method: 'DELETE'
  });

  // if successful, return res
  if (res.ok) {
    // proceed to delete image in redux
    dispatch(deleteImage(imageId));
  }

  // else, return nothing
  return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentImages = state => state.images;
export const getCurrentImagesByType = type => state => Object.values(state.images).filter(image => image.imageable_type === type)

/* --------- REDUCERS -------- */
const initialState = {}

export default function imageReducer(state = initialState, action) {
  const newImages = { ...state };

  switch (action.type) {
    // case to load images
    case LOAD_IMAGES:
      return Object.assign({}, action.images);
    // case to delete cart
    case DELETE_IMAGE:
      delete newImages[action.imageId];

      return newImages;
    default:
      return Object.assign({}, newImages, action.images);
  }
}
