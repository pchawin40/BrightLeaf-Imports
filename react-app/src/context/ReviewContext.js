// src/components/context/ReviewContext.js
import { useState, useContext, createContext } from 'react';

// set up context
export const ReviewContext = createContext();
export const useReview = () => useContext(ReviewContext);

// create provider for review page
export default function ReviewProvider({ children }) {
  // state for context
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editReview, setEditReview] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);

  // Review Provider
  return (
    <>
      <ReviewContext.Provider
        value={{
          review, setReview,
          rating, setRating,
          hover, setHover,
          showReviewModal, setShowReviewModal,
          editReview, setEditReview,
          currentReviewId, setCurrentReviewId
        }}
      >
        {children}
      </ReviewContext.Provider>
    </>
  )
}
