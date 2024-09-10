import { useEffect, useState } from "react";
import { createApiKey } from "../../../API/ApiKey";
import { createVenue } from "../../../API/Venue";
import { IoCloseOutline } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";

const CreateNewVenueForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [media, setMedia] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [meta, setMeta] = useState([]);
  const [maxGuests, setMaxGuests] = useState("");
  const [maxGuestsError, setMaxGuestsError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [rating, setRating] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

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

  const handleCreateNewVenueForm = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      let metaObject = {};
      meta.forEach((item) => {
        metaObject[item] = true;
      });

      let newData = {
        name,
        description,
        media,
        meta: metaObject,
        maxGuests: parseInt(maxGuests),
        price: parseFloat(price),
        rating: rating || 0,
        location: {
          address,
          zip,
          city,
          country,
        },
      };

      try {
        const apiKeyData = await createApiKey("User profile key");
        const apiKey = apiKeyData.data.key;
        const venueData = await createVenue(newData, apiKey);
        closeModal();
        window.location.reload();
      } catch (error) {
        console.error("Error creating new venue:", error);
        alert("Failed to create venue. Please try again later.");
      }
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Title is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!price.trim()) {
      setPriceError("Price must be a valid number greater than 0");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (!maxGuests.trim()) {
      setMaxGuestsError("Max Guests must be a valid number greater than 0");
      isValid = false;
    } else {
      setMaxGuestsError("");
    }

    return isValid;
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

  const handleCheckboxChangeMeta = (option) => {
    if (meta.includes(option)) {
      setMeta(meta.filter((item) => item !== option));
    } else {
      setMeta([...meta, option]);
    }
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
    <div style={{ position: "relative" }}>
      <button onClick={openModal} className="flex items-center gap-1">
        <AiFillPlusCircle size={30} className="text-blue-700" />
        <p className="text-blue-700 hover:underline">add venue</p>
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

            <form onSubmit={handleCreateNewVenueForm}>
              <h2 className="mb-5 text-center text-xl font-semibold uppercase text-blue-700">
                Create a new venue
              </h2>
              <div>
                <div
                  className={`relative flex flex-col ${nameError ? "mb-1" : "mb-5"}`}
                >
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Title.."
                    className={`w-full rounded-xl border py-1 pl-3 pr-10 focus:border-blue-700 focus:bg-white focus:outline-none ${
                      nameError && "border-red-700"
                    }`}
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setName)}
                    className="absolute right-3 top-1 cursor-pointer text-gray-800"
                  />

                  {nameError && (
                    <p className="mt-1 text-red-700">{nameError}</p>
                  )}
                </div>
                <div
                  className={`relative flex flex-col ${descriptionError ? "mb-1" : "mb-5"}`}
                >
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    name="description"
                    placeholder="Description.."
                    className={`w-full rounded-xl border py-1 pl-3 pr-10 focus:border-blue-700 focus:bg-white focus:outline-none ${
                      descriptionError && "border-red-700"
                    }`}
                    style={{ height: "100px" }}
                  />
                  <IoCloseOutline
                    size={30}
                    onClick={() => handleClearField(setDescription)}
                    className="absolute right-3 top-2 cursor-pointer text-gray-800"
                  />
                  {descriptionError && (
                    <p className="mt-1 text-red-700">{descriptionError}</p>
                  )}
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
                        className="ms-2 w-36 rounded-full bg-gradient-to-t from-red-400 to-red-600 py-1 text-white hover:from-red-400 hover:to-red-700 hover:font-semibold hover:text-white"
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
                      className="ms-2 w-36 whitespace-nowrap rounded-full bg-gradient-to-t from-orange-300 to-orange-400 py-1 hover:to-orange-500 hover:font-semibold"
                    >
                      Add Image
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex gap-5">
                    <div className="relative mb-5 flex flex-col">
                      <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        name="price"
                        placeholder="Price.."
                        className={`w-full rounded-xl border py-1 pl-3 pr-10 focus:border-blue-700 focus:bg-white focus:outline-none ${
                          priceError && "border-red-700"
                        }`}
                      />
                      {priceError && (
                        <p className="mt-1 text-red-700">{priceError}</p>
                      )}
                    </div>
                    <div className="relative mb-5 flex flex-col">
                      <input
                        value={maxGuests}
                        onChange={(e) => setMaxGuests(e.target.value)}
                        type="number"
                        name="maxGuests"
                        placeholder="Max guests.."
                        className={`w-full rounded-xl border py-1 pl-3 pr-10 focus:border-blue-700 focus:bg-white focus:outline-none ${
                          maxGuestsError && "border-red-700"
                        }`}
                      />
                      {maxGuestsError && (
                        <p className="mt-1 text-red-700">{maxGuestsError}</p>
                      )}
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
                        checked={meta.includes("wifi")}
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
                        checked={meta.includes("pets")}
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
                        checked={meta.includes("parking")}
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
                        checked={meta.includes("breakfast")}
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
                    onClick={() => handleClearField(set)}
                    className="absolute right-3 cursor-pointer text-gray-800"
                  />
                </div>
                <div className="mb-4 flex flex-col text-lg">
                  <p>[x] Select your rating for the venue</p>
                  <div className="mr-3 flex justify-between">
                    <div>
                      <input
                        type="checkbox"
                        id="1"
                        name="rating"
                        checked={rating === 1}
                        onChange={() => setRating(1)}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="rating">1</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="2"
                        name="rating"
                        checked={rating === 2}
                        onChange={() => setRating(2)}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="rating">2</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="3"
                        name="rating"
                        checked={rating === 3}
                        onChange={() => setRating(3)}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="rating">3</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="4"
                        name="rating"
                        checked={rating === 4}
                        onChange={() => setRating(4)}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="rating">4</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="5"
                        name="rating"
                        checked={rating === 5}
                        onChange={() => setRating(5)}
                        className="mr-2 accent-blue-700"
                      />
                      <label htmlFor="rating">5</label>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ position: "relative", textAlign: "center" }}>
                <button
                  type="submit"
                  className="mb-5 w-44 rounded-full bg-gradient-to-t from-blue-500 to-blue-700 py-2 font-semibold uppercase text-white hover:to-blue-900 hover:font-bold"
                >
                  Create Venue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewVenueForm;
