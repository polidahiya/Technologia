const formatDate = (customdate, time = false) => {
  const date = new Date(customdate);

  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  const day = date.getDate();
  const year = date.getFullYear();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];

  if (time) {
    return `${day} ${month} ${year} - ${hours}:${minutes} ${ampm}`;
  } else {
    return `${day} ${month} ${year}`;
  }
};

export default formatDate;
