import { useEffect, useState } from "react";
import { createApiKey } from "../../../API/ApiKey";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdOutlineModeEdit } from "react-icons/md";
import { updateVenue } from "../../../API/Venue";

const UpdateVenueForm = ({ venueData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(venueData.name || "");
  const [description, setDescription] = useState(venueData.description || "");
  const [media, setMedia] = useState(venueData.media || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [meta, setMeta] = useState(venueData.meta || {});
  const [maxGuests, setMaxGuests] = useState(venueData.maxGuests || "");
  const [price, setPrice] = useState(venueData.price || "");
  const [rating, setRating] = useState(venueData.rating || "");
  const [address, setAddress] = useState(venueData.location?.address || "");
  const [zip, setZip] = useState(venueData.location?.zip || "");
  const [city, setCity] = useState(venueData.location?.city || "");
  const [country, setCountry] = useState(venueData.location?.country || "");
  const navigate = useNavigate();

  const handleCheckboxChangeMeta = (option) => {
    const updatedMeta = { ...meta };
    updatedMeta[option] = !updatedMeta[option];
    setMeta(updatedMeta);
  };

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    }
  }, [isModalOpen]);

  const handleUpdateVenueForm = async (e) => {
    e.preventDefault();

    if (!name || !description || isNaN(price) || isNaN(maxGuests)) {
      alert("Please fill out all required fields");
      return;
    }

    const updatedMeta = { ...venueData.meta, ...meta };

    let newData = {
      name,
      description,
      media,
      meta: updatedMeta,
      maxGuests: maxGuests ? parseInt(maxGuests) : venueData.maxGuests,
      price: price ? parseFloat(price) : venueData.price,
      rating: rating || venueData.rating,
      location: {
        address: address || venueData.location?.address,
        zip: zip || venueData.location?.zip,
        city: city || venueData.location?.city,
        country: country || venueData.location?.country,
      },
    };

    try {
      const apiKeyData = await createApiKey("User profile key");
      const apiKey = apiKeyData.data.key;
      await updateVenue(venueData.id, newData, apiKey);
      setIsModalOpen(false);
      navigate(`/venue/${venueData.id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error updating venue:", error);
      alert("Failed to update venue. Please try again later.");
    }
  };

  const handleClearField = (setter) => {
    setter("");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Implement save logic if needed
  };

  const handleMediaChangeAtIndex = (e, index) => {
    const newMediaUrl = e.target.value;
    const updatedMedia = [...media];
    updatedMedia[index] = { url: newMediaUrl };
    setMedia(updatedMedia);
  };

  const handleAddMedia = () => {
    if (newImageUrl.trim() !== "") {
      setMedia([...media, { url: newImageUrl }]);
      setNewImageUrl("");
    }
  };

  const removeMediaAtIndex = (index) => {
    const updatedMedia = [...media];
    updatedMedia.splice(index, 1);
    setMedia(updatedMedia);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="mt-4 flex items-center gap-1 rounded-full bg-gradient-to-t from-blue-500 to-blue-700 px-4 py-2 uppercase text-white hover:to-blue-900 hover:font-semibold"
      >
        <MdOutlineModeEdit size={20} />
        <p>Update</p>
      </button>

      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            overflow: "auto",
          }}
        >
          <div
            className="modal-content"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "100vh",
              overflowY: "auto",
            }}
          >
            <span
              className="flex cursor-pointer justify-end text-3xl"
              onClick={closeModal}
            >
              &times;
            </span>

            <form onSubmit={handleUpdateVenueForm}>
              <h2 className="mb-5 text-center text-xl font-semibold uppercase text-blue-700">
                Update Venue
              </h2>
              <div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Title.."
                    className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setName)}
                    className="absolute right-3 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="description"
                    placeholder="Description.."
                    className="w-full rounded-xl border py-2 pl-3 pr-10 focus:border-blue-700 focus:bg-white focus:outline-none"
                    style={{ height: "130px" }}
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setDescription)}
                    className="absolute right-3 top-0 cursor-pointer text-gray-800"
                  />
                </div>

                <div>
                  {media.map((item, index) => (
                    <div
                      key={index}
                      className="mb-4 flex items-center justify-between"
                    >
                      <input
                        value={item.url}
                        onChange={(e) => handleMediaChangeAtIndex(e, index)}
                        type="url"
                        name={`url-${index}`}
                        placeholder="Image URL.."
                        className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => removeMediaAtIndex(index)}
                        className="ms-2 w-36 rounded-full bg-gradient-to-t from-red-400 to-red-500 py-1 hover:from-red-400 hover:to-red-700 hover:font-semibold hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <div className="relative mb-4 flex items-center">
                    <input
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      type="url"
                      placeholder="New Image URL..."
                      className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={handleAddMedia}
                      className="ms-2 w-36 whitespace-nowrap rounded-full bg-gradient-to-t from-orange-300 to-orange-400 py-1 hover:from-orange-400 hover:to-orange-500 hover:font-semibold hover:text-white"
                    >
                      Add Image
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex gap-5">
                    <div className="mb-4 flex items-center">
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        name="price"
                        placeholder="Price.."
                        className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div className="mb-4 flex items-center">
                      <input
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        type="number"
                        name="maxGuests"
                        placeholder="Max guests.."
                        className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex flex-col">
                  <p>[x] This Venue offers</p>
                  <div className="mr-3 flex justify-between">
                    <div>
                      <input
                        type="checkbox"
                        id="wifi"
                        name="meta"
                        checked={meta["wifi"]}
                        onChange={() => handleCheckboxChangeMeta("wifi")}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="wifi">Wifi</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="pets"
                        name="meta"
                        checked={meta["pets"]}
                        onChange={() => handleCheckboxChangeMeta("pets")}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="pets">Pets</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="parking"
                        name="parking"
                        checked={meta["parking"]}
                        onChange={() => handleCheckboxChangeMeta("parking")}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="parking">Parking</label>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        id="breakfast"
                        name="meta"
                        checked={meta["breakfast"]}
                        onChange={() => handleCheckboxChangeMeta("breakfast")}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="breakfast">Breakfast</label>
                    </div>
                  </div>
                </div>

                <h3 className="mb-2 text-lg font-semibold uppercase text-blue-700">
                  Location
                </h3>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    name="address"
                    placeholder="Address..."
                    className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setAddress)}
                    className="absolute right-3 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    type="text"
                    name="zip"
                    placeholder="Post code..."
                    className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setZip)}
                    className="absolute right-3 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    name="city"
                    placeholder="City..."
                    className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setCity)}
                    className="absolute right-3 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="relative mb-4 flex items-center">
                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    name="country"
                    placeholder="Country..."
                    className="w-full rounded-xl border py-1 pl-3 focus:border-blue-700 focus:bg-white focus:outline-none"
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setCountry)}
                    className="absolute right-3 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="mb-4 flex flex-col text-lg">
                  <p>[x] Select your rating for the venue</p>
                  <div className="mr-3 flex justify-between">
                    {[1, 2, 3, 4, 5].map((option) => (
                      <div key={option}>
                        <input
                          type="checkbox"
                          id={option}
                          name="rating"
                          checked={rating === option}
                          onChange={() => setRating(option)}
                          className="mr-2 accent-blue-700"
                        />
                        <label htmlFor="rating">{option}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position: "relative", textAlign: "center" }}>
                <button
                  onClick={handleSave}
                  className="mb-5 w-36 rounded-full bg-gradient-to-t from-blue-500 to-blue-700 px-4 py-2 uppercase text-white hover:to-blue-900 hover:font-semibold"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateVenueForm;
