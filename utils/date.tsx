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
  const day = date.getDate() + ''
  return {
    month: months[date.getMonth()],
    day: day.length === 1 ? '0' + day : day,
  };
};
