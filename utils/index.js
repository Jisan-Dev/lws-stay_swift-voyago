export const isDateInBetween = (date, startDate, endDate) => {
  return new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate);
};
export const getDayDifference = (from, to) => {
  return (new Date(to).getTime() - new Date(from).getTime()) / (24 * 60 * 60 * 1000) + 1;
};
