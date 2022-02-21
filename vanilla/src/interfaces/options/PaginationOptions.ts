/* eslint-disable jsdoc/require-jsdoc */
import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';
import { Film } from '../films/domain/Film';

import { FilterSortOptions } from './FilterSortOptions';

/** Options to determine if page is first or last.*/
export interface PaginationOptions extends FilterSortOptions {

  readonly film: Film;

  readonly orderingMode: OrderingModes;

  readonly orderingField: OrderingFields;
}
