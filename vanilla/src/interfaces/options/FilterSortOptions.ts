import { OrderingFields } from '../../enums/films/OrderingFields';
import { PaginationModes } from '../../enums/films/PaginationModes';

/** Options for filtering and sorting.*/
export interface FilterSortOptions {

  readonly mode?: PaginationModes;

  /** Null if we dont need to change ordering field.*/
  readonly newOrderingField: OrderingFields | null;

  readonly valueSearch: string | null;
}
