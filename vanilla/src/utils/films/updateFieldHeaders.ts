import { OrderingModes } from '../enums/OrderingModes';
import { OrderingFields } from '../enums/OrderingFields';

import { getNewActiveHeader } from './getNewActiveHeader';

/**
 * Function updates table header classes so we can see which field we are ordering by and how.
 * @param orderingField - Field we are ordering by.
 * @param orderingMode - Shows if the ordering is ascending or descending.
 */
export const updateFieldHeaders = (orderingField: OrderingFields, orderingMode: OrderingModes): void => {
  const oldMarkedHeader = document.querySelector('.active-header');

  if (oldMarkedHeader !== null) {
    oldMarkedHeader.classList.remove('active-header', 'descending', 'ascending');
  }
  const newActiveHeader = getNewActiveHeader(orderingField);

  if (newActiveHeader !== null) {
    newActiveHeader.classList.add('active-header');

    if (orderingMode === OrderingModes.Ascending) {
      newActiveHeader.classList.add('ascending');
    } else if (orderingMode === OrderingModes.Descending) {
      newActiveHeader.classList.add('descending');
    }
  }
};
