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

/* --------- THUNKS -------- */
export const thunkGetImages = () => async (dispatch) => {
  // fetch all images
  const res = await fetch('/api/images');

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

/* --------- SELECTOR FUNCTIONS -------- */
/* --------- REDUCERS -------- */
const initialState = {}

export default function imageReducer(state = initialState, action) {
  const newImages = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newImages, action.images);
  }
}
