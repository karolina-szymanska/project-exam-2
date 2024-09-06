import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBed, FaWifi, FaParking } from "react-icons/fa";
import { MdBreakfastDining, MdOutlinePets } from "react-icons/md";
import NoImage from "../../../assets/no_image.jpg";
import StarRatingCards from "../../StarRating/StarRatingCards";

function handleImageError(e) {
  e.target.src = NoImage;
  e.target.onError = null;
}

const VenueCard = ({ venue }) => {
  const { wifi, parking, breakfast, pets } = venue.meta;

  return (
    <Link to={`/venue/${venue.id}`} className="block h-full">
      <div className="flex h-full flex-col justify-between rounded-lg border bg-white p-4 py-4 hover:border-4 hover:border-blue-700">
        {venue.media && venue.media.length > 0 ? (
          <div className="relative block h-48 w-full">
            <img
              src={venue.media[0].url}
              alt={venue.media[0].alt || "Venue image"}
              className="h-full w-full rounded-lg object-cover"
              onError={handleImageError}
            />
            {venue.rating > 0 && (
              <div className="absolute right-2 top-2">
                <StarRatingCards rating={venue.rating} size={18} />
              </div>
            )}
          </div>
        ) : (
          <div className="block h-48 w-full">
            <img
              src={NoImage}
              alt="No Image"
              className="h-full w-full rounded-lg border object-cover"
            />
          </div>
        )}
        <div className="mt-2 flex flex-grow flex-col justify-between">
          <div>
            <h2 className="mt-1 truncate font-bold">{venue.name}</h2>
            <div className="flex items-center gap-1 border-b-2 border-blue-700 pb-2">
              <FaMapMarkerAlt />
              <p className="md:text-md truncate text-sm">
                {venue.location?.city}, {venue.location?.country}
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1">
            <FaBed size={20} />
            <span>{venue.maxGuests} Guests</span>
          </div>
          <p className="mt-3 text-lg">
            <b>${venue.price} </b> per night
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {wifi && (
              <div className="flex items-center gap-1">
                <FaWifi
                  size={20}
                  title="WiFi Available"
                  className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                />
              </div>
            )}
            {parking && (
              <div className="flex items-center gap-1">
                <FaParking
                  size={20}
                  title="Parking Available"
                  className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                />
              </div>
            )}
            {breakfast && (
              <div className="flex items-center gap-1">
                <MdBreakfastDining
                  size={20}
                  title="Breakfast Included"
                  className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                />
              </div>
            )}
            {pets && (
              <div className="flex items-center gap-1">
                <MdOutlinePets
                  size={20}
                  title="Pets Allowed"
                  className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VenueCard;
