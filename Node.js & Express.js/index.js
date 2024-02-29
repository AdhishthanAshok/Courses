const date = new Date();

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

exports.dayofWeek = function () {
  return days[date.getDay() - 1];
};
