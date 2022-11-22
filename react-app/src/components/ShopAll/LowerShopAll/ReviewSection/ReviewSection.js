// src/components/ShopAll/LowerShopAll/ReviewSection/ReviewSection.js

// import component
import StarSystem from './StarSystem';

// import context
import { useReview } from '../../../../context/ReviewContext';

// import css
import './ReviewSection.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as reviewActions from '../../../../store/reviews';
import * as userActions from '../../../../store/users';
import * as sessionActions from '../../../../store/session';
import { Modal } from '../../../../context/Modal';
import EditReviewModal from './EditReviewModal';

//? ReviewSection component
const ReviewSection = () => {
  /**
   * Selector functions
   */
  const currentReviews = useSelector(reviewActions.getCurrentReviews);
  const currentUsers = useSelector(userActions.getCurrentUsers);
  const currentUserId = useSelector(sessionActions.getCurrentUserId);

  /**
   * Controlled inputs
   */
  const { review, setReview } = useReview();
  const [reviewLength, setReviewLength] = useState(0);
  const { rating, setRating } = useReview();
  const { showReviewModal, setShowReviewModal } = useReview();
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const { editReview, setEditReview } = useReview();
  const { hover, setHover } = useReview();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
  }, [editReview]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to update review
  const updateReview = e => {
    if (!editReview) {
      console.log('review', review);
      setReview(e.target.value);
      setReviewLength(e.target.value.length);
    }
  }


  // function to handle delete of review
  const handleReviewDelete = reviewId => {
    // call on thunk to delete review
    // then fetch the new reviews
    dispatch(reviewActions.thunkDeleteReview(reviewId))
      .then(() => dispatch(reviewActions.thunkGetReviews()));
  }

  // function to load current reviews
  const loadReviews = () => {
    if (currentReviews.length > 0 && currentUsers.length > 0) {
      const displayReviews = currentReviews.map(review => {

        // find user's name from review's user_id
        const reviewUserEmail = currentUsers.find(user => user.id === review.user_id).email;

        return (
          <li
            className="rs review-li"
            key={`Review ${review.id} | User ${review.user_id} | Product ${review.product_id}`}
          >
            <h3>
              {reviewUserEmail}
            </h3>
            <span>
              {review.updated_at}
            </span>

            <span>
              {/* Stars */}
              {
                `Rating: ${review.stars} of 5`
              }
            </span>

            <p>
              {/* Review */}
              {review.review}
            </p>



            <section className="review-icons-container">
              {/* Edit review figure */}
              <figure
                className="edit-review-figure"
                onClick={_ => {
                  setShowReviewModal(true);
                  setCurrentReviewId(review.id);
                  setEditReview(true);
                }}
              >
                <i className="fa-solid fa-pencil" />
              </figure>
              {/* Delete review figure */}
              <figure
                onClick={_ => handleReviewDelete(review.id)}
                className="delete-review-figure"
              >
                <i className="fa-solid fa-trash-can" />
              </figure>
            </section>
          </li>
        )
      }
      );

      return (
        <ul className="review-ul">
          {displayReviews}
        </ul>
      );
    }
  }

  // function to handle review submission
  const handleReviewSubmit = (e, currentReview) => {
    // prevent page from refreshing
    e.preventDefault();

    // get review
    const newReview = {
      ...currentReview,
      user_id: currentUserId,
      review,
      stars: rating
    };

    // call on thunk to edit review
    // then do a dispatch to get all reviews
    dispatch(reviewActions.thunkPostReview(newReview))
      .then(() => dispatch(reviewActions.thunkGetReviews()))
  }

  // fetch all reviews
  return (
    <section className="review-section">
      {/* Title */}
      <h2>Customer Reviews</h2>

      {/* List of reviews */}
      {
        loadReviews()
      }

      {/* Textarea to insert reviews */}
      <form className="insert-review-section form" onSubmit={handleReviewSubmit}>
        {/* StarSystem */}
        {
          !editReview
            ?
            <StarSystem />
            :
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={"off star-button"}
                  >
                    <span className="star-span">&#9733;</span>
                  </button>
                );
              })}
            </div>
        }

        {/* Textarea */}
        <textarea
          value={!editReview ? review : ""}
          onChange={updateReview}
          placeholder='Join the conversation'
        />

        <button
          type="submit"
        >
          Submit Review
        </button>
      </form>

      {showReviewModal && (
        <Modal
          onClose={(_) => {
            setEditReview(false);
            setShowReviewModal(false);
            setReview("");
            setHover(0);
          }}
        >
          <EditReviewModal currentReviewId={currentReviewId} />
        </Modal>
      )}
    </section>
  );
};

// export default component
export default ReviewSection;
