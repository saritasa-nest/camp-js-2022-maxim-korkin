import { getSearchParam } from './getSearchParam';

type CorrectFunction = (primaryKey: number) => Promise<void>;

/**
 * Function which checks primary key from the search params and runs function depending on its correction.
 * @param correctPrimaryKeyFunction - Function to run in case of correct primary key.
 * @param incorrectPrimaryKeyFunction - Function to tun in case of incorrect primary key.
 */
export function checkPrimaryKeyFromSearchParamsAndInitPage(
  correctPrimaryKeyFunction: CorrectFunction,
  incorrectPrimaryKeyFunction: Function,
): void {
  const primaryKey = Number(getSearchParam('pk'));

  if (!isNaN(primaryKey)) {
    correctPrimaryKeyFunction(primaryKey);
  } else {
    incorrectPrimaryKeyFunction();
  }
}
