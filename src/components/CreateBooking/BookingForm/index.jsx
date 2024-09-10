import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { getVenueById } from "../../API/Venue";
import { createApiKey } from "../../API/ApiKey";
import { createBooking } from "../../API/Bookings";

const BookingForm = ({ price, venueId }) => {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(startDate.getTime() + 24 * 60 * 60 * 1000),
  );
  const [guests, setGuests] = useState(2);
  const [total, setTotal] = useState(0);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [maxGuests, setMaxGuests] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (isLoggedIn) {
          const apiKeyData = await createApiKey("User profile key");
          const apiKey = apiKeyData.data.key;
          const venueData = await getVenueById(venueId, apiKey);
          const { bookings, maxGuests } = venueData.data;

          setMaxGuests(maxGuests);

          if (maxGuests === 1) {
            setGuests(1);
          } else {
            setGuests(2);
          }

          if (bookings && Array.isArray(bookings)) {
            const bookedDates = bookings
              .map((booking) => {
                const range = [];
                let currentDate = new Date(booking.dateFrom);
                const endDate = new Date(booking.dateTo);

                while (currentDate <= endDate) {
                  range.push(new Date(currentDate));
                  currentDate.setDate(currentDate.getDate() + 1);
                }

                return range;
              })
              .flat();

            setUnavailableDates(bookedDates);
          }
        }
      } catch (error) {
        console.error("Error fetching venue bookings:", error);
      }
    };

    if (venueId) {
      fetchBookings();
    }
  }, [venueId, isLoggedIn]);

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const difference = (end - start) / (1000 * 60 * 60 * 24);
    return Math.max(0, difference);
  };

  const calculateTotalPrice = () => {
    const days = calculateDays();
    return price * (days === 0 ? 1 : days);
  };

  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [startDate, endDate, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newVenueId = venueId.startsWith("/venue/")
      ? venueId.substring(7)
      : venueId;

    const newData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: Number(guests),
      venueId: newVenueId,
    };

    try {
      if (isLoggedIn) {
        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;

        await createBooking(newData, apiKey);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleGuestsChange = (e) => {
    const value = Number(e.target.value);
    if (value < 1) {
      setGuests(1);
    } else if (value > maxGuests) {
      setGuests(maxGuests);
    } else {
      setGuests(value);
    }
  };

  return (
    <div className="m-4">
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="mb-3">
            <p>Check-in</p>
            <div className="flex items-center gap-2 rounded-xl border pl-3">
              <DatePicker
                showIcon
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  if (date >= endDate) {
                    const newEndDate = new Date(date);
                    newEndDate.setDate(newEndDate.getDate() + 1);
                    setEndDate(newEndDate);
                  }
                }}
                dateFormat="dd/MM/yyyy"
                excludeDates={unavailableDates}
                dayClassName={(date) => {
                  const formattedDate = date.toISOString().split("T")[0];
                  return unavailableDates.some(
                    (unavailableDate) =>
                      unavailableDate.toISOString().split("T")[0] ===
                      formattedDate,
                  )
                    ? "bg-red-600 text-white"
                    : undefined;
                }}
                minDate={new Date()}
                className="focus:outline-none"
              />
            </div>
          </div>
          <div className="mb-3">
            <p>Check-out</p>
            <div className="flex items-center gap-2 rounded-xl border pl-3">
              <DatePicker
                showIcon
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                excludeDates={unavailableDates}
                dayClassName={(date) => {
                  const formattedDate = date.toISOString().split("T")[0];
                  return unavailableDates.some(
                    (unavailableDate) =>
                      unavailableDate.toISOString().split("T")[0] ===
                      formattedDate,
                  )
                    ? "bg-red-600 text-white"
                    : undefined;
                }}
                minDate={startDate}
                className="focus:outline-none"
              />
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center gap-1">
            <p>Guests</p>
            <p className="text-sm">(Children count as 1 guest)</p>
          </div>
          <input
            type="number"
            placeholder="Guests"
            value={guests}
            onChange={handleGuestsChange}
            min={1}
            max={maxGuests}
            className="flex h-9 w-1/3 items-center rounded-xl border pl-5 pr-4 focus:outline-none"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="mb-5 w-full rounded-full bg-gradient-to-t from-blue-500 to-blue-700 px-8 py-2 font-semibold uppercase text-white hover:from-blue-600 hover:to-blue-900 hover:font-bold"
          >
            Book now
          </button>
        </div>
      </form>
      <div className="mr-3 flex justify-between border-b pb-2">
        <p>
          ${price} x {calculateDays()} nights
        </p>
        <p>${total}</p>
      </div>
      <div className="mr-3 mt-4 flex justify-between font-bold">
        <p>Total</p>
        <p>${total}</p>
      </div>
    </div>
  );
};

export default BookingForm;
