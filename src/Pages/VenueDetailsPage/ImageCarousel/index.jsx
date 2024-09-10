import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BASE_URL } from "../../../components/API";
import { useFetch } from "../../../components/Hooks/useFetch";
import { useState } from "react";
import Spinner from "../../../components/Spinner";

const VenueImages = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${BASE_URL}/venues/${id}`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return (
      <div className="text-center text-2xl">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.data) {
    return <div>No data available</div>;
  }

  const { media } = data.data;

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto mt-4 max-w-screen-md">
      <Link
        to={`/venue/${id}`}
        className="flex items-center gap-2 underline hover:text-blue-700"
      >
        <FaArrowLeft />
        Back to Venue
      </Link>

      <div className="mb-10 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        {media.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index}`}
            className="h-72 w-full cursor-pointer md:block md:max-h-72 lg:block"
            onClick={() => openModal(image.url)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mt-4 max-w-2xl rounded-lg bg-white p-4 md:mt-0 lg:w-1/2">
            <span
              className="flex cursor-pointer justify-end text-2xl"
              onClick={closeModal}
            >
              &times;
            </span>
            <img
              src={selectedImage}
              alt="Selected"
              className="mt-4 min-h-72 w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueImages;
