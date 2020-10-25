const months = [
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
  "Dec",
];

export const getDate = (date: Date) => {
  return {
    month: months[date.getMonth()],
    day: date.getDate(),
  };
};
