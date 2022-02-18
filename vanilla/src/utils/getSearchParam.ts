/**
 * Function for getting primary key from the search params.
 * @param key - Search param key to look for.
 * @returns Primary key or null if it is incorrect.
 */
export const getSearchParam = (key: string): string | null => {
  const params = new URLSearchParams(location.search);

  return params.get(key);
};
