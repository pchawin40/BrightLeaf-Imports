// src/components/ShopAll/LowerShopAll/ReviewSection/EditReviewModal/EditReviewModal.js

// import css
import './EditReviewModal.css';

// import component
import StarSystem from '../StarSystem';

// import context
import { useReview } from '../../../../../context/ReviewContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as reviewActions from '../../../../../store/reviews';

//? EditReviewModal component
const EditReviewModal = ({ currentReviewId }) => {
  /**
   * Selector functions
   */
  const currentReviewById = useSelector(reviewActions.getCurrentReviewById(currentReviewId));

  /**
   * Controlled inputs
   */
  const { review, setReview } = useReview();
  const [reviewInputLength, setReviewInputLength] = useState(0);
  const { rating, setRating } = useReview();
  const { showReviewModal, setShowReviewModal } = useReview();

  /**
   * UseEffect
   */
  useEffect(() => {
    if (currentReviewById) {
      setReview(currentReviewById.review);
      setRating(currentReviewById.stars);
    }
  }, [currentReviewId]);

  // per general
  useEffect(() => {
    // nothing for now
  }, [review, rating]);


  // invoke dispatch
  const dispatch = useDispatch();

  // function to update review
  const updateReview = e => {
    setReview(e.target.value);
    setReviewInputLength(e.target.value.length);
  }

  // function to handle review editing
  const handleEditReview = (e) => {
    // prevent page from refreshing
    e.preventDefault();

    // editedReview variable
    const editedReview = {
      ...currentReviewById,
      review,
      stars: rating
    }

    // reset review data
    setReview("");
    setRating("");

    // call on thunk to edit review
    // then get reviews afterward
    // then set modal as false
    dispatch(reviewActions.thunkEditReview(editedReview, editedReview.id))
      .then(() => dispatch(reviewActions.thunkGetReviews()))
      .then(() => setShowReviewModal(false));
  }

  return (
    <section className="edit-review-modal">
      {/* Edit Review Form */}
      <form onSubmit={handleEditReview}>
        {/* Edit Review's review */}
        <section className="edit-inner-section review">
          <label htmlFor="review">
            Review
          </label>
          <textarea
            value={review}
            onChange={updateReview}
          />
        </section>
        {/* Edit Review's stars */}
        <StarSystem />
        {/* Edit Review's submit button */}
        <button>
          Post Review
        </button>
      </form>
    </section>
  );
};

// export default component
export default EditReviewModal;
