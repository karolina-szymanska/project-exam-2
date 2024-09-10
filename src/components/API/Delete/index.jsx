import { BASE_URL } from "..";
import { createApiKey } from "../ApiKey";

const deleteResource = async (
  resourceType,
  resourceId,
  confirmationMessage,
  successMessage,
  navigate,
) => {
  const accessToken = localStorage.getItem("accessToken");
  const shouldDelete = window.confirm(confirmationMessage);

  if (!shouldDelete) {
    return;
  }

  try {
    const apiKeyData = await createApiKey(`${resourceType} deletion key`);
    const apiKey = apiKeyData.data.key;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${BASE_URL}/${resourceType}s/${resourceId}`,
      options,
    );
    if (!response.ok) {
      throw new Error(`Failed to delete ${resourceType}`);
    }

    if (response.status === 204) {
      alert(successMessage);
      if (navigate) {
        navigate("/profile");
      } else {
        window.location.reload();
      }
      return;
    }

    const responseData = await response.json();

    if (responseData.success) {
      alert(successMessage);
      if (navigate) {
        navigate("/profile");
      } else {
        window.location.reload();
      }
    } else {
      throw new Error(`Failed to delete ${resourceType}`);
    }
  } catch (error) {
    console.error(`Error deleting ${resourceType}:`, error);
    alert(
      `An error occurred while deleting the ${resourceType}. Please try again.`,
    );
  }
};

export const handleDeleteVenue = async (venueId, navigate) => {
  const confirmationMessage = "Are you sure you want to delete this venue?";
  const successMessage = "Your venue is deleted successfully!";
  await deleteResource(
    "venue",
    venueId,
    confirmationMessage,
    successMessage,
    navigate,
  );
};

export const handleDeleteBooking = async (bookingId, navigate) => {
  const confirmationMessage = "Are you sure you want to delete this booking?";
  const successMessage = "Your booking is deleted successfully!";
  await deleteResource(
    "booking",
    bookingId,
    confirmationMessage,
    successMessage,
    navigate,
  );
};
