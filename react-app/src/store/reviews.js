// src/store/reviews.js

/* --------- ACTIONS -------- */
//? Action: Load reviews
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";

// action creator: load reviews
export const loadReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews
  }
}

/* --------- THUNKS -------- */
export const thunkGetReviews = () => async (dispatch) => {
  // fetch all reviews
  const res = await fetch('/api/reviews/');

  if (res.ok) {
    // parse res to review data
    const reviewData = await res.json();

    // dispatch load reviews w/ loaded reviews
    dispatch(loadReviews(reviewData.reviews));

    // return reviews
    return reviewData;
  }

  // return res if unsuccesful
  return res;
}

/* --------- SELECTOR FUNCTIONS -------- */
/* --------- REDUCERS -------- */
const initialState = {}

export default function reviewReducer(state = initialState, action) {
  const newReviews = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newReviews, action.reviews);
  }
}
