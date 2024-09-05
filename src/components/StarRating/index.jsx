import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const StarRate = ({ rating, size }) => {
  const [ratingValue, setRatingValue] = useState(null);

  useEffect(() => {
    setRatingValue(rating);
  }, [rating]);

  return (
    <>
      {[...Array(5)].map((_, index) => {
        const currentRate = index + 1;
        return (
          <label key={index}>
            <FaStar
              size={size}
              color={currentRate <= ratingValue ? "orange" : "gray"}
            />
          </label>
        );
      })}
    </>
  );
};

export default StarRate;
