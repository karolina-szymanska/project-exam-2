import { apiRequest } from "../ApiRequest";

export const getProfile = async (username, apiKey) => {
  const endpoint = `/profiles/${username}?_bookings=true&_venues=true`;
  const response = await apiRequest(endpoint, "GET", null, apiKey);
  return response;
};

export const updateProfile = async (username, newData, apiKey) => {
  const endpoint = `/profiles/${username}`;
  const response = await apiRequest(endpoint, "PUT", newData, apiKey);
  return response;
};
