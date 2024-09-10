export default function formatDate(timestamp) {
  const formattedDate = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return formattedDate.toLocaleString("en-GB", options);
}
