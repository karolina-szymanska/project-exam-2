/**
 * Calculates the difference in days between two dates.
 *
 * This function takes two dates as input and calculates the number of days
 * between them. It is used to determine the duration of a booking. The result
 * is always at least 1 day, even if the dates are the same.
 *
 * @param {string|Date} dateFrom - The start date of the booking.
 * @param {string|Date} dateTo - The end date of the booking.
 * @returns {number} The number of days between the two dates.
 *
 * @example
 * const days = calculateDaysDifference('2024-05-01', '2024-05-05');
 * console.log(days); // Outputs: 5
 */

export const calculateDaysDifference = (dateFrom, dateTo) => {
  const dateFromMs = new Date(dateFrom).getTime();
  const dateToMs = new Date(dateTo).getTime();

  const differenceMs = dateToMs - dateFromMs;

  const daysDifference = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

  return Math.max(daysDifference, 1);
};
