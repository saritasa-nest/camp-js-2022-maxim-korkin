/**
 * Function for getting string representation of date in yyyy-mm-dd format.
 * @param date - Date object to make string from.
 * @returns String representation of date.
 */
export const getDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = `0${date.getMonth()}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);

  return `${year}-${month}-${day}`;
};
