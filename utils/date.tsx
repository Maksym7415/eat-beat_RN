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

export const dateFormat = (millisec) => {
  const date = new Date(millisec);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const date1 = `${year}-${month+1}-${day}`.split('-').map((d) => d.length < 2 ? '0' + d : d).join('-');
  const time = `${hours}:${minutes}`.split(':').map((t) => t.length < 2 ? '0' + t : t).join(':');
  return `${date1} ${time}`
} 

export const correctFormat = () => {
  const d = new Date();
  const hours =`${d.getHours()}:${d.getMinutes()}`;
  const times = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
    .split("/")
    .map((el) => (el.length === 1 ? "0" + el : el))
    .join("-");
  const format = times + " " + hours;
  return format;
}