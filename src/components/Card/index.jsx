import React from "react";
import VenueCard from "./venueCard";

const ProductCard = ({ venues }) => {
  return (
    <div className="mx-auto grid max-w-screen-lg grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};

export default ProductCard;
