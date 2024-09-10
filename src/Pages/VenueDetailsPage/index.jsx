import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/API";
import { useFetch } from "../../components/Hooks/useFetch";
import { MdOutlineEmail } from "react-icons/md";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FaArrowLeft, FaBed, FaWifi, FaParking } from "react-icons/fa";
import { MdOutlinePets, MdBreakfastDining } from "react-icons/md";
import { useEffect, useState } from "react";
import StarRate from "../../components/StarRating";
import formatDate from "../../components/DateFormatter";
import NoImage from "../../assets/no_image.jpg";
import Spinner from "../../components/Spinner";
import BookingFormLink from "../../components/CreateBooking/BookingFormLink";
import BookingForm from "../../components/CreateBooking/BookingForm";
import UpdateVenueForm from "../../components/Profile/VenueManager/UpdateVenue";
import { GoTrash } from "react-icons/go";
import TruncateText from "../../components/TruncateText";
import { handleDeleteVenue } from "../../components/API/Delete";

const VenueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    `${BASE_URL}/venues/${id}?_owner=true&_bookings=true`,
  );
  const [isOwner, setIsOwner] = useState(false);
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const loggedInUserEmail = localStorage.getItem("userEmail");

  const maxNameLength = 49;
  const maxDescriptionLength = 200;

  useEffect(() => {
    if (data && data.data) {
      const { owner } = data.data;
      setIsOwner(owner.email === loggedInUserEmail);
    }
  }, [data, loggedInUserEmail]);

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

  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  const handleUpdateVenueForm = async (venueData) => {
    try {
      const apiKeyData = await createApiKey("Venue update key");
      const apiKey = apiKeyData.data.key;

      const response = await updateVenue(venueData, apiKey);
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  const {
    name,
    description,
    maxGuests,
    location,
    media,
    price,
    rating,
    created,
    updated,
    meta: { wifi, parking, breakfast, pets },
    owner: {
      name: ownerName,
      email: ownerEmail,
      avatar: { url: ownerAvatarUrl },
    },
  } = data.data;

  return (
    <div className="mx-auto max-w-screen-md rounded-xl border bg-white md:my-6">
      <div className="ms-4 mt-4">
        {isOwner ? (
          <Link
            to={`/profile`}
            className="flex items-center gap-2 underline hover:text-blue-700"
          >
            <FaArrowLeft />
            Back to Profile
          </Link>
        ) : (
          <Link
            to={`/listings`}
            className="flex items-center gap-2 underline hover:text-blue-700"
          >
            <FaArrowLeft />
            Back to List of Venues
          </Link>
        )}
      </div>

      <div className="py-4 md:px-6">
        {media && media.length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-6">
            {media.length === 1 ? (
              <div className="col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full max-h-[300px] w-full md:rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = NoImage;
                  }}
                />
              </div>
            ) : (
              <div className="relative col-span-2 flex items-center md:col-span-4">
                <img
                  src={media[0].url}
                  alt={`Image 1`}
                  className="h-full max-h-[300px] w-full md:rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = NoImage;
                  }}
                />
                {media.length > 1 && (
                  <button className="absolute bottom-1 right-4 mb-5 rounded-full bg-gradient-to-t from-orange-300 to-orange-400 px-4 py-2 text-sm font-semibold uppercase hover:from-orange-400 hover:to-orange-500 hover:text-white">
                    <Link to={`/venue/images/${id}`}>View all</Link>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {!media || media.length === 0 ? (
          <div className="relative col-span-2 flex items-center md:col-span-4">
            <img
              src={NoImage}
              alt="No Image"
              className="mx-auto max-h-[300px] border md:rounded-xl"
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 break-all md:grid-cols-2">
          <div className="m-4 mt-4">
            <div className="flex flex-col md:flex-row md:gap-3">
              <h1 className="text-xl font-bold">
                {" "}
                <TruncateText text={name} maxLength={maxNameLength} />
              </h1>
              <div className="flex items-center py-1">
                {rating ? (
                  <StarRate rating={rating} size={20} />
                ) : (
                  <StarRate size={20} />
                )}
              </div>
            </div>

            <div>
              <div className="flex md:hidden">
                {!isOwner && isLoggedIn && (
                  <div className="mt-2 flex items-center gap-1 md:hidden">
                    <IoCalendarNumberOutline
                      size={24}
                      className="text-blue-700"
                    />
                    <BookingFormLink venueId={id} />
                  </div>
                )}
                {isOwner && isLoggedIn && (
                  <div className="flex items-center gap-4">
                    <UpdateVenueForm
                      venueData={data.data}
                      onUpdate={handleUpdateVenueForm}
                    />
                    <button
                      onClick={() => handleDeleteVenue(id, navigate)}
                      className="mt-4 flex flex-row items-center gap-1 rounded-full bg-gradient-to-t from-red-500 to-red-700 px-4 py-2 uppercase text-white hover:to-red-800 hover:font-semibold"
                    >
                      <GoTrash size={20} />
                      Delete
                    </button>
                  </div>
                )}

                {!isLoggedIn && (
                  <div className="mt-6 rounded-xl border border-blue-700 bg-white p-4">
                    <div>
                      You need to{" "}
                      <Link
                        to="/login"
                        className="font-semibold uppercase text-blue-700 underline"
                      >
                        log in
                      </Link>{" "}
                      to make a booking.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 font-semibold">Description</div>
            <div className="mb-3">
              {" "}
              <TruncateText
                text={description}
                maxLength={maxDescriptionLength}
              />
            </div>
            <div className="mt-1 flex items-center gap-1 font-medium">
              <FaBed size={24} />
              <p>{maxGuests} Guests</p>
            </div>

            <div className="mt-6">
              <div className="mt-1 flex gap-1 text-lg text-blue-700">
                <p>Price</p>
                <p>${price} per night</p>
              </div>
            </div>

            {wifi || breakfast || parking || pets ? (
              <div className="py-4">
                <p className="font-semibold">Facilities at Venue</p>
                <ul className="mt-2 grid grid-cols-2 gap-4">
                  {wifi && (
                    <li className="flex items-center gap-2">
                      <FaWifi
                        size={20}
                        title="WiFi Available"
                        className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                      />
                      <span>WiFi</span>
                    </li>
                  )}
                  {breakfast && (
                    <li className="flex items-center gap-2">
                      <MdBreakfastDining
                        size={20}
                        title="Breakfast Included"
                        className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                      />
                      <span>Breakfast</span>
                    </li>
                  )}
                  {parking && (
                    <li className="flex items-center gap-2">
                      <FaParking
                        size={20}
                        title="Parking Available"
                        className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                      />
                      <span>Parking</span>
                    </li>
                  )}
                  {pets && (
                    <li className="flex items-center gap-2">
                      <MdOutlinePets
                        size={20}
                        title="Pets Allowed"
                        className="h-8 w-8 rounded-full bg-blue-700 p-1 text-white"
                      />
                      <span>Pets</span>
                    </li>
                  )}
                </ul>
              </div>
            ) : null}

            {location.address ||
            location.city ||
            location.zip ||
            location.country ? (
              <div className="mt-4">
                <p className="font-semibold">Location</p>
                {location.address && (
                  <p className="truncate">Address: {location.address}</p>
                )}
                {location.city && (
                  <p className="truncate">City: {location.city}</p>
                )}
                {location.zip && (
                  <p className="truncate">ZIP: {location.zip}</p>
                )}
                {location.country && (
                  <p className="truncate">Country: {location.country}</p>
                )}
              </div>
            ) : null}

            <div className="mt-6">
              <p className="text-xs">Venue created: {formatDate(created)}</p>
              {created !== updated && (
                <p className="text-xs">Updated: {formatDate(updated)}</p>
              )}
            </div>

            <div className="mt-3 py-4">
              <p className="font-semibold">Hosted by</p>
              <div className="mt-2 flex items-center gap-4 rounded-xl border p-3">
                <img
                  src={ownerAvatarUrl}
                  alt="profile image of host"
                  className="h-16 w-16 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = NoImage;
                  }}
                />
                <div className="flex-1">
                  <p
                    className="truncate font-semibold"
                    style={{ maxWidth: "180px" }}
                  >
                    {ownerName}
                  </p>
                  <div className="group relative flex items-center gap-1">
                    <MdOutlineEmail size={20} />
                    <p className="max-w-[160px] truncate">{ownerEmail}</p>
                    {ownerEmail.length > 20 && (
                      <span className="absolute top-0 m-2 hidden w-auto whitespace-nowrap rounded-lg bg-zinc-700 p-2 text-white group-hover:block">
                        {ownerName}
                        <div className="flex items-center gap-1">
                          <MdOutlineEmail size={20} /> {ownerEmail}
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden grid-cols-6 p-2 md:block">
            {!isOwner && isLoggedIn && (
              <div className="mt-6 rounded-xl border bg-white p-4">
                <BookingForm price={price} venueId={id} />
              </div>
            )}
            {isOwner && isLoggedIn && (
              <div className="flex items-center justify-between">
                <UpdateVenueForm
                  venueData={data.data}
                  onUpdate={handleUpdateVenueForm}
                />
                <button
                  onClick={() => handleDeleteVenue(id, navigate)}
                  className="mt-4 flex flex-row items-center gap-1 rounded-full bg-gradient-to-t from-red-500 to-red-700 px-3 py-2 uppercase text-white hover:to-red-800 hover:font-semibold"
                >
                  <GoTrash size={16} />
                  Delete Venue
                </button>
              </div>
            )}
            {!isLoggedIn && (
              <div className="mt-6 rounded-xl border border-blue-700 bg-white p-4">
                <p>
                  You need to{" "}
                  <Link
                    to="/login"
                    className="font-semibold uppercase text-blue-700 underline"
                  >
                    log in
                  </Link>{" "}
                  to make a booking.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetailsPage;
