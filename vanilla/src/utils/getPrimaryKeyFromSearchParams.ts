/**
 * Function for getting primary key from the search params.
 * @returns Primary key or null if it is incorrect.
 */
export const getPrimaryKeyFromSearchParams = (): number | null => {
  const params = new URLSearchParams(location.search);

  const primaryKey = Number(params.get('pk'));

  if (isNaN(primaryKey) || primaryKey === 0) {
    return null;
  }
  return primaryKey;
};
