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

//? Action: Create review
const CREATE_REVIEW = "images/CREATE_IMAGE";

// action creator: create review
export const createReview = review => {
  return {
    type: CREATE_REVIEW,
    review
  }
}

//? Action: Update review
const EDIT_REVIEW = "reviews/EDIT_REVIEWS";

// action creator: create review
export const editReview = review => {
  return {
    type: EDIT_REVIEW,
    review
  };
};

//? Action: Delete review
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// action creator: delete review
export const deleteReview = reviewId => {
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

/* --------- THUNKS -------- */
// thunk to get reviews
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

// thunk to create review
export const thunkPostReview = review => async (dispatch) => {
  // fetch route to post review
  const res = await fetch("/api/reviews/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(review)
  });

  // if successful
  if (res.ok) {
    const reviewData = await res.json();

    // if there's any error from res, return null
    if (reviewData.errors) {
      return null;
    }

    // dispatch setting review
    dispatch(createReview(reviewData));

    // if unsuccessful
  } else if (res.status < 500) {
    const data = await res.json();

    if (data['errors']) {
      return data;
    }
  }

  return ['An error occurred. Please try again.']
}

// thunk to update review
export const thunkEditReview = review => async (dispatch) => {
  // fetch route to edit review
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });

  // if successful
  if (res.ok) {
    // parse res to json
    const editedReview = await res.json();

    // dispatch setting review
    dispatch(editReview(editedReview));

    // return edited review
    return editReview;
  }

  // return nothing if there are error
  return null;
}

// thunk to delete review
export const thunkDeleteReview = reviewId => async (dispatch) => {
  // fetch route to delete review
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  // if successful, return res
  if (res.ok) {
    // proceed to delete review in redux
    dispatch(deleteReview(reviewId));
  }

  // else return nothing
  return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentReviews = state => Object.values(state.reviews);
export const getCurrentReviewById = reviewId => state => Object.values(state.reviews).find(review => review.id === reviewId);

/* --------- REDUCERS -------- */
const initialState = {}

export default function reviewReducer(state = initialState, action) {
  const newReviews = { ...state };

  switch (action.type) {
    // case to delete review
    case DELETE_REVIEW:
      delete newReviews[action.reviewId];

      return newReviews;
    default:
      return Object.assign({}, newReviews, action.reviews);
  }
}
