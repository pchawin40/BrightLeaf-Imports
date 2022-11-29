// src/components/ShopAll/LowerShopAll/ReviewSection/ReviewSection.js

// import component
import StarSystem from './StarSystem';
import EditReviewModal from './EditReviewModal';

// import context
import { useReview } from '../../../../context/ReviewContext';
import { Modal } from '../../../../context/Modal';

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
import { useNavHeader } from '../../../../context/NavHeaderContext';

// import libraries
import moment from 'moment';

//? ReviewSection component
const ReviewSection = () => {
  /**
   * Selector functions
   */
  const currentReviews = useSelector(reviewActions.getCurrentReviews);
  const currentUsers = useSelector(userActions.getCurrentUsers);
  const currentUserId = useSelector(sessionActions.getCurrentUserId);
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

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
  const { showUserModal, setShowUserModal } = useNavHeader();

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // nothing for now
    // reset data upon page refreshing
    setReview("");
    setRating(0);
  }, [editReview, showReviewModal]);

  // invoke dispatch
  const dispatch = useDispatch();

  // function to update review
  const updateReview = e => {
    if (!editReview) {
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

  // function to load current reviews (load up to 5)
  const loadReviews = () => {
    if (currentReviews.length > 0 && currentUsers.length > 0) {
      const displayReviews = currentReviews.map((review, index) => {

        // find user's name from review's user_id
        const reviewUserEmail = currentUsers.find(user => user.id === review.user_id).email;

        if (index < 5) {
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
              }
            </li>
          )
        }
      }
      );

      return (
        currentReviews.length === 0
          ?
          <ul className="review-ul">
            No review to display. Post review by logging in as user.
          </ul>
          :
          <ul className="review-ul">
            {displayReviews}
            {/* // if more than 5 reviews, show "see more reviews" */}
            {
              currentReviews.length > 5
              &&
              <p
                className="more-review-link"
                onClick={_ => null}
              >
                {
                  `See ${currentReviews.length - 5} more reviews`
                }
              </p>
            }
          </ul>
      );
    }
  }

  // function to handle review submission
  const handleReviewSubmit = (e, currentReview) => {
    // prevent page from refreshing
    e.preventDefault();

    //* check if is user, if not, lead to sign in
    if (!currentUserInfo) {
      alert("Must be logged in as user to post review");
      return setShowUserModal(true);
    }

    //* if administrator, say must be user only to submit
    if (currentUserInfo && currentUserInfo.role !== "user") {
      setReview("");
      setRating(0);
      return alert("Must be user and not administrator to submit");
    }

    // get review
    const newReview = {
      ...currentReview,
      user_id: currentUserId,
      review,
      stars: rating
    };

    // reset form after grabbing data
    setReview("");
    setRating(0);

    // call on thunk to edit review
    // then do a dispatch to get all reviews
    dispatch(reviewActions.thunkPostReview(newReview))
      .then(() => dispatch(reviewActions.thunkGetReviews()))
  }

  const displayReviewForm = () => {
    return (
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
                    onClick={_ => setEditReview(false)}
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
          onClick={_ => setEditReview(false)}
        />

        <button
          type="submit"
          className="submit-review-btn"
        >
          Post Review
        </button>
      </form>
    )
  };

  // fetch all reviews
  return (
    <section className="review-section">
      {/* Title */}
      <h2>Customer Reviews</h2>

      <section className="review-section inner-display">
        {/* List of reviews */}
        {
          loadReviews()
        }

        {/* Display Review Form */}
        {
          displayReviewForm()
        }
      </section>


      {/* Textarea to insert reviews */}
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
