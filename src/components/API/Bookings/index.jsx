import { apiRequest } from "../ApiRequest";

export const createBooking = async (newData, apiKey) => {
  const endpoint = "/bookings";
  const response = await apiRequest(endpoint, "POST", newData, apiKey);
  return response;
};

export const getBookings = async (apiKey) => {
  return apiRequest("/bookings", "GET", null, apiKey);
};
