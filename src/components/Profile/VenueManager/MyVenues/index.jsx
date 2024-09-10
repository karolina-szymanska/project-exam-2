import React from "react";
import { Link } from "react-router-dom";
import CreateNewVenueButton from "../CreateNewVenue";
import useFetchProfile from "../../../Hooks/useFetchProfile";
import Spinner from "../../../Spinner";
import NoImage from "../../../../assets/no_image.jpg";
import { GoTrash } from "react-icons/go";
import formatDate from "../../../DateFormatter";
import { handleDeleteVenue } from "../../../API/Delete";

const MyVenues = () => {
  const { profileData, isLoading, error } = useFetchProfile();

  if (isLoading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{`Error: ${error}`}</div>;
  }

  return (
    <div className="mt-6 border bg-white py-6 md:rounded-xl">
      <div className="flex flex-col items-center md:mr-8 md:flex-row md:justify-between">
        <h2 className="text-xl font-semibold uppercase text-orange-500 md:ms-6 md:text-2xl">
          My venues
        </h2>
        <div className="mr-2 mt-3 flex flex-col md:mr-7 md:mt-0">
          <CreateNewVenueButton />
        </div>
      </div>

      {profileData && profileData.venues.length === 0 ? (
        <p className="ms-6 mt-3 text-lg">
          You currently have no venues available...
        </p>
      ) : (
        <div className="rounded-xl p-3">
          {profileData &&
            profileData.venues.map((venue) => (
              <div
                key={venue.id}
                className="mb-3 mt-4 flex flex-col items-center rounded-lg border p-3 hover:bg-zinc-100 md:mx-6 md:flex-row"
              >
                <div className="py-4 md:px-6">
                  {venue.media && venue.media.length > 0 ? (
                    <Link
                      to={`/venue/${venue.id}`}
                      key={venue.id}
                      className="block"
                    >
                      <img
                        src={venue.media[0].url}
                        alt={venue.media[0].alt}
                        className="h-52 w-52 rounded-xl md:h-40 md:w-40"
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/venue/${venue.id}`}
                      key={venue.id}
                      className="block"
                    >
                      <img
                        src={NoImage}
                        alt="No Image Available"
                        className="h-52 w-52 rounded-xl md:h-40 md:w-40"
                      />
                    </Link>
                  )}
                </div>
                <div className="ms-3">
                  <div className="text-lg font-semibold">{venue.name}</div>
                  <div className="mt-3 text-center md:mt-0 md:flex md:gap-3 md:text-start">
                    <p>Venue created {formatDate(venue.created)}</p>
                    {venue.creates !== venue.updated && (
                      <p>(Updated {formatDate(venue.updated)})</p>
                    )}
                  </div>
                  <div className="flex flex-col py-6 md:flex-row">
                    <Link to={`/venue/bookings/${venue.id}`}>
                      <button className="mb-3 w-48 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 font-semibold uppercase hover:to-orange-500 md:mb-0 md:mr-2 md:w-44 md:text-xs">
                        View bookings
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteVenue(venue.id)}
                      className="flex w-48 items-center gap-1 rounded-full bg-gradient-to-t from-red-400 to-red-700 px-4 py-2 font-semibold uppercase text-white hover:from-red-500 hover:to-red-900 hover:font-bold md:w-44 md:text-xs"
                    >
                      <GoTrash size={16} />
                      Delete Venue
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyVenues;
