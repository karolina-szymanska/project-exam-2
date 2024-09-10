import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createApiKey } from "../../../API/ApiKey";
import { getProfile } from "../../../API/Profile";
import { useFetch } from "../../../Hooks/useFetch";
import { BASE_URL } from "../../../API";
import formatDate from "../../../DateFormatter";
import { calculateDaysDifference } from "../../../CalculateDays";
import Spinner from "../../../Spinner";

const VenueBookings = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${BASE_URL}/venues/${id}?_bookings=true`,
  );
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState("current");
  const [showAllBookings, setShowAllBookings] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          throw new Error("Username not found in local storage");
        }

        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;
        const profile = await getProfile(username, apiKey);
        setProfileData(profile.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.data || !data.data.bookings) {
    return <p>No bookings available for this venue.</p>;
  }

  const today = new Date();

  const currentBookings = data.data.bookings.filter(
    (booking) => new Date(booking.dateTo) >= today,
  );

  const expiredBookings = data.data.bookings.filter(
    (booking) => new Date(booking.dateTo) < today,
  );

  const sortedCurrentBookings = currentBookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
  );

  const sortedExpiredBookings = expiredBookings.sort(
    (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
  );

  const venueName = data.data.name;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowAllBookings(false);
  };

  const handleToggleBookings = () => {
    setShowAllBookings(!showAllBookings);
  };

  const renderBookings = (bookings) => {
    return (
      <ul className="mt-4 md:m-6">
        {bookings.map((booking) => (
          <li
            key={booking.id}
            className="m-5 mx-10 flex flex-col items-center gap-4 rounded-xl border bg-white p-4 md:flex-row"
          >
            <img
              src={booking.customer.avatar.url}
              alt={booking.customer.avatar.alt}
              className="h-36 w-48 rounded-full md:h-24 md:w-24"
            />
            <div>
              <p>Name of Guest: {booking.customer.name}</p>
              <p>Date From: {formatDate(booking.dateFrom)}</p>
              <p>Date To: {formatDate(booking.dateTo)}</p>
              <p>
                Number of Days:{" "}
                {calculateDaysDifference(booking.dateFrom, booking.dateTo)}
              </p>
              <p>Number of Guests: {booking.guests}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mb-6 mt-12 bg-white md:rounded-xl">
      <h1 className="mb-6 text-center text-2xl uppercase text-blue-700">
        {venueName} Bookings
      </h1>
      <div className="tab-section mt-6 bg-opacity-40 backdrop-blur-lg backdrop-filter">
        <div className="flex flex-wrap">
          <button
            className={`flex-grow border-gray-300 text-xs uppercase hover:bg-gray-300 hover:bg-opacity-40 md:p-4 md:text-lg ${
              activeTab === "current"
                ? "border-l border-r border-t font-bold text-blue-700"
                : ""
            }`}
            onClick={() => handleTabClick("current")}
          >
            Current Bookings
          </button>
          <button
            className={`flex-grow p-4 text-xs uppercase hover:bg-zinc-200 hover:bg-opacity-40 md:text-lg ${
              activeTab === "expired"
                ? "border-l border-r border-t font-bold text-blue-700"
                : ""
            }`}
            onClick={() => handleTabClick("expired")}
          >
            Expired Bookings
          </button>
        </div>
        <div>
          {activeTab === "current" && (
            <div
              id="current"
              className="tab-content rounded-b-xl border bg-white p-3 text-gray-700 md:p-6"
            >
              <div className="md:ms-6 md:text-lg">
                You have {sortedCurrentBookings.length} current bookings
              </div>
              {showAllBookings
                ? renderBookings(sortedCurrentBookings)
                : renderBookings(sortedCurrentBookings.slice(0, 3))}
              {sortedCurrentBookings.length > 2 && (
                <div className="mt-4 text-center">
                  <button
                    className="mt-4 rounded-full bg-gradient-to-t from-blue-500 to-blue-700 px-4 py-2 uppercase text-white hover:to-blue-900 hover:font-semibold"
                    onClick={handleToggleBookings}
                  >
                    {showAllBookings ? "Show Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          )}
          {activeTab === "expired" && (
            <div
              id="expired"
              className="tab-content rounded-b-xl border bg-white p-3 text-gray-700 md:p-6"
            >
              <div className="text-red-700 md:ms-6 md:text-lg">
                You have {sortedExpiredBookings.length} expired bookings
              </div>
              {showAllBookings
                ? renderBookings(sortedExpiredBookings)
                : renderBookings(sortedExpiredBookings.slice(0, 3))}
              {sortedExpiredBookings.length > 2 && (
                <div className="mt-4 text-center">
                  <button
                    className="mt-4 rounded-full bg-gradient-to-t from-blue-500 to-blue-700 px-4 py-2 uppercase text-white hover:to-blue-900 hover:font-semibold"
                    onClick={handleToggleBookings}
                  >
                    {showAllBookings ? "Show Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueBookings;
