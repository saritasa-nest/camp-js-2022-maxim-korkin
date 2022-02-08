import { OrderingModes } from '../../enums/films/OrderingModes';

/**
 * Function switches ordering mode.
 * @param currentOrderingMode - Current ordering mode.
 * @returns Opposite ordering mode.
 */
export const switchOrderMode = (
  currentOrderingMode: OrderingModes,
): OrderingModes => (currentOrderingMode === OrderingModes.Ascending) ? OrderingModes.Descending : OrderingModes.Ascending;
