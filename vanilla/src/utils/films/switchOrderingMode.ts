import { OrderModes } from './../enums/OrderModes';

export const switchOrderMode = (
  currentOrderMode: OrderModes,
): OrderModes => (currentOrderMode === OrderModes.Ascending) ? OrderModes.Descending : OrderModes.Ascending;
