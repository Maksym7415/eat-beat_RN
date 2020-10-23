const months = [
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];

export const getDate = (date) => {
  console.log(date);
  return {
    month: months[date.getMonth() + 1],
    day: date.getDate(),
  };
};
