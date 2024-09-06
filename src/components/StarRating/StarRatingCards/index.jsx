import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const StarRatingCard = ({ rating, size = 16 }) => {
  const [ratingValue, setRatingValue] = useState(null);

  useEffect(() => {
    if (rating !== null && rating !== undefined) {
      setRatingValue(parseFloat(rating).toFixed(0));
    } else {
      setRatingValue(null);
    }
  }, [rating]);

  return (
    <div className="flex w-14 items-center justify-center rounded-full bg-blue-700 text-white">
      {ratingValue !== null && ratingValue !== 0 ? (
        <>
          <FaStar size={size} color="orange" />
          <span className="ml-1 font-semibold">{ratingValue}</span>
        </>
      ) : null}
    </div>
  );
};

export default StarRatingCard;
