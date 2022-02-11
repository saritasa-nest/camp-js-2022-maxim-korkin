import { OrderingFields } from '../../enums/films/OrderingFields';
import { PaginationModes } from '../../enums/films/PaginationModes';

/** Options for filtering and sorting.*/
export interface FetchOptionsFilterSort {

  /** Shows if we should fetch first, next or previous page.*/
  mode?: PaginationModes;

  /** Shows if we should use specific field to order data. Null if we dont need to change ordering field.*/
  newOrderingField?: OrderingFields | null;

  /** Shows by what value in the field we should search.*/
  valueSearch: string | undefined;
}
