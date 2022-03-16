import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';
import { Film } from '../films/domain/Film';

import { FilterSortOptions } from './FilterSortOptions';

/** Parameters for pagination.*/
export interface PaginationOptions extends FilterSortOptions {

  /** First or last film on the current page.*/
  readonly film: Film;

  /** Current ordering mode.*/
  readonly orderingMode: OrderingModes;

  /** Current ordering field.*/
  readonly orderingField: OrderingFields;
}
