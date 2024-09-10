import { apiRequest } from "../ApiRequest";

export const createVenue = async (newData, apiKey) => {
  const endpoint = `/venues`;
  const response = await apiRequest(endpoint, "POST", newData, apiKey);
  return response;
};

export const updateVenue = async (id, newData, apiKey) => {
  const endpoint = `/venues/${id}`;
  const response = await apiRequest(endpoint, "PUT", newData, apiKey);
  return response;
};

export const getVenueById = async (venueId, apiKey) => {
  const endpoint = `/venues/${venueId}?_bookings=true`;
  const response = await apiRequest(endpoint, "GET", null, apiKey);
  return response;
};
