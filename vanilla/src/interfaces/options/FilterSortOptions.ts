import { OrderingFields } from '../../enums/films/OrderingFields';
import { PaginationModes } from '../../enums/films/PaginationModes';

/** Options for filtering and sorting.*/
export interface FilterSortOptions {

  /** Shows if we should fetch first, next or previous page.*/
  readonly mode?: PaginationModes;

  /** Null if we dont need to change ordering field.*/
  readonly newOrderingField: OrderingFields | null;

  /** * The actual search value entered by the user.*/
  readonly valueSearch: string | null;
}
