/**
 * Function for getting string representation of date in yyyy-mm-dd format.
 * @param date - Date object to make string from.
 * @returns String representation of date.
 */
export const getDateString = (date: Date): string => {
  const year = `${date.getFullYear()}`.padStart(4, '0');
  const month = `${date.getMonth()}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};
