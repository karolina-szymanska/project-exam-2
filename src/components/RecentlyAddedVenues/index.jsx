import React, { useEffect, useState } from "react";
import { useFetch } from "../Hooks/useFetch";
import { BASE_URL } from "../API";
import Spinner from "../Spinner";
import VenueCard from "../Card/VenueCard";

function RecentlyAddedVenues() {
  const { data, loading, error } = useFetch(
    `${BASE_URL}/venues?sort=created&sortOrder=desc&limit=3`,
  );
  const [newestVenues, setNewestVenues] = useState([]);

  useEffect(() => {
    if (data && data.data) {
      setNewestVenues(data.data);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (newestVenues.length === 0) {
    return <div>No recently added venues available.</div>;
  }

  return (
    <div className="mt-4 py-5">
      <h2 className="mb-4 text-xl uppercase">Recently Added Venues</h2>
      <div className="flex gap-2 overflow-x-auto">
        {newestVenues.map((venue) => (
          <div
            key={venue.id}
            className="mx-2 w-80 flex-shrink-0 md:flex-shrink-0"
          >
            <div className="flex h-full flex-col">
              <VenueCard
                venue={venue}
                className="flex flex-1 flex-col overflow-hidden"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyAddedVenues;
