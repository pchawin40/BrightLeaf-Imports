// src/components/ShopAll/LowerShopAll/ReviewSection/ReviewListModal/ReviewListModal.js

// import css
import './ReviewListModal.css';

// import context
import { useReview } from '../../../../../context/ReviewContext';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as reviewActions from '../../../../../store/reviews';
import * as userActions from '../../../../../store/users';
import * as sessionActions from '../../../../../store/session';

// import libraries
import moment from 'moment';

//? ReviewListModal component
const ReviewListModal = ({ setShowReviewListModal }) => {
  /**
   * Selector functions
   */
  const currentReviews = useSelector(reviewActions.getCurrentReviews);
  const currentUsers = useSelector(userActions.getCurrentUsers);
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * Controlled inputs
   */
  const { showReviewModal, setShowReviewModal } = useReview();
  const { currentReviewId, setCurrentReviewId } = useReview();
  const { editReview, setEditReview } = useReview();
  const { review, setReview } = useReview();
  const { rating, setRating } = useReview();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    if (!editReview) {
      // reset data upon page refreshing
      setReview("");
      setRating(0);
    }
  }, [editReview, showReviewModal, currentReviewId, currentReviews]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to handle delete of review
  const handleReviewDelete = reviewId => {
    // call on thunk to delete review
    // then fetch the new reviews
    dispatch(reviewActions.thunkDeleteReview(reviewId))
      .then(() => dispatch(reviewActions.thunkGetReviews()));
  }

  // function to load current reviews (load up to 5)
  const loadReviews = () => {
    if (currentReviews.length > 0 && currentUsers.length > 0) {
      const displayReviews = currentReviews.map((review, index) => {

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
            {/* Date time for review updated at */}
            <span>
              {moment(new Date(review.updated_at)).fromNow()}
            </span>

            <span>
              {/* Stars */}
              <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                  index += 1;
                  return (
                    <button
                      type="button"
                      key={index}
                      className={index <= (review.stars) ? "on star-button display" : "off star-button display"}
                    >
                      <span className="star-span display">&#9733;</span>
                    </button>
                  );
                })}
              </div>
            </span>

            <p>
              {/* Review */}
              {review.review}
            </p>

            {
              currentUserInfo
              &&
              currentUserInfo.id === review.user_id &&
              <section className="review-icons-container">
                {/* Edit review figure */}
                <figure
                  className="edit-review-figure"
                  onClick={_ => {
                    setCurrentReviewId(review.id);
                    setEditReview(true);
                    setShowReviewModal(true);
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
            }
          </li>
        )
      }
      );

      return (
        <ul className="review-modal-ul">
          {
            displayReviews
          }
        </ul>
      );
    } else {
      setShowReviewListModal(false);
    }
  }

  return (
    <section className="review-list-modal">

      <section className="rlm inner-title-container">
        <h2>
          Customer Reviews
        </h2>
        {/* Exit Modal Icon */}
        <i
          className="fa-solid fa-x fa-lg review-list-exit"
          onClick={_ => setShowReviewListModal(false)}
        />
      </section>

      {/* load reviews */}
      {
        loadReviews()
      }

    </section>
  );
};

// export default component
export default ReviewListModal;
