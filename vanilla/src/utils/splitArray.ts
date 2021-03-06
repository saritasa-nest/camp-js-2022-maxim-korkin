/**
 * Function for splitting an array to subarrays of a given size.
 * @param array - Array to split.
 * @param subArraySize - Size of subarrays.
 * @returns Array containing subarrays.
 */
export function splitArray<T>(array: readonly T[] | T[], subArraySize = 10): T[][] {
  const splittedArray: T[][] = [];

  for (let i = 0; i < Math.ceil(array.length / subArraySize); i++) {
    splittedArray.push(array.slice(i * subArraySize, (i + 1) * subArraySize));
  }

  return splittedArray;
}
