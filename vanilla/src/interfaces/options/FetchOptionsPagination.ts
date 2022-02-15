import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';
import { Film } from '../films/domain/Film';

import { FetchOptionsFilterSort } from './FetchOptionsFilterSort';

/** Options to determine if page is first or last.*/
export interface FetchOptionsPagination extends FetchOptionsFilterSort{

  /** First or last film on the current page.*/
  film: Film;

  /** Current ordering field.*/
  orderingMode: OrderingModes;

  /** Current ordering mode.*/
  orderingField: OrderingFields;
}
