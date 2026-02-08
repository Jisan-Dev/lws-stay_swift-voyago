export const isDateInBetween = (date, startDate, endDate) => {
  return new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate);
};
