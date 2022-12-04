// src/components/ShopAll/LowerShopAll/ReviewSection/StarSystem/StarSystem.js

// import react
import { useContext } from 'react';

// import context
import { useReview } from '../../../../../context/ReviewContext';

// import css
import './StarSystem.css';

//? StarSystem component
const StarSystem = () => {
  const { rating, setRating, hover, setHover, editReview, setEditReview } = useReview();

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on star-button" : "off star-button"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star-span">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
}

// export component
export default StarSystem;
