import React, { useState } from "react";
import BookingDetails from "../../BookingDetails";

const MyBookingsProfilePage = ({ bookings, totalCount }) => {
  const [showExpired, setShowExpired] = useState(false);
  const [activeTab, setActiveTab] = useState("tab1");
  const [showAllBookings, setShowAllBookings] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const today = new Date();

  const currentBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) >= today,
  );

  const expiredBookings = bookings.filter(
    (booking) => new Date(booking.dateTo) < today,
  );

  const calculateTotalPrice = (pricePerNight, numberOfNights) => {
    return pricePerNight * numberOfNights;
  };

  if (totalCount === 0) {
    return (
      <div className="mt-6 border bg-white py-6 md:rounded-xl">
        <h2 className="ms-6 text-xl font-semibold uppercase text-blue-700 md:text-2xl">
          My bookings
        </h2>
        <p className="ms-6 mt-3 text-lg">
          {" "}
          You currently have no bookings available.
        </p>
      </div>
    );
  }

  const handleToggleBookings = () => {
    setShowAllBookings(!showAllBookings);
  };

  const renderBookings = (bookingList, isUpcoming) => {
    return (
      <ul className="mt-4 md:m-6">
        {bookingList.map((booking) => (
          <BookingDetails
            key={booking.id}
            booking={booking}
            calculateTotalPrice={calculateTotalPrice}
            isUpcoming={isUpcoming}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="mt-6 border bg-white py-6 md:rounded-xl">
      <div className="flex flex-col items-center md:mr-8 md:flex-row md:justify-between">
        <h2 className="text-xl font-semibold uppercase text-blue-700 md:ms-6 md:text-2xl">
          My bookings
        </h2>
      </div>

      <div className="tab-section mt-6 bg-opacity-40 backdrop-blur-lg backdrop-filter">
        <div className="flex flex-wrap">
          <button
            className={`flex-grow border-gray-300 text-xs uppercase hover:bg-gray-300 hover:bg-opacity-40 md:p-4 md:text-lg ${
              activeTab === "tab1"
                ? "border-l border-r border-t font-bold text-blue-700"
                : ""
            }`}
            onClick={() => handleTabClick("tab1")}
          >
            Upcoming Booking
          </button>
          <button
            className={`flex-grow p-4 text-xs uppercase hover:bg-zinc-200 hover:bg-opacity-40 md:text-lg ${
              activeTab === "tab2"
                ? "border-l border-r border-t font-bold text-blue-700"
                : ""
            }`}
            onClick={() => handleTabClick("tab2")}
          >
            Expired Booking
          </button>
        </div>
        <div>
          {activeTab === "tab1" && (
            <div
              id="tab1"
              className="tab-content border bg-white p-3 text-gray-700 md:p-6"
            >
              <div className="md:ms-6 md:text-lg">
                You have {currentBookings.length} upcoming bookings
              </div>

              {showAllBookings
                ? renderBookings(currentBookings, true)
                : renderBookings(currentBookings.slice(0, 2), true)}
              {currentBookings.length > 3 && (
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
          {activeTab === "tab2" && (
            <div
              id="tab2"
              className="tab-content border bg-white p-3 text-gray-700 md:p-6"
            >
              <div className="ms-6 text-red-700 md:text-lg">
                You have {expiredBookings.length} expired bookings
              </div>
              {showAllBookings
                ? renderBookings(expiredBookings, false)
                : renderBookings(expiredBookings.slice(0, 2), false)}
              {expiredBookings.length > 3 && (
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

export default MyBookingsProfilePage;
