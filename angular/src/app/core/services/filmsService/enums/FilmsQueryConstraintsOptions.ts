import { Film } from 'src/app/core/models/Film';

import { PaginationModes } from './PaginationModes';
import { SortingFields } from './SortingFields';

/**
 * Films query constraints options.
 */
export interface FilmsQueryConstraintsOptions {

  /** Sorting field. */
  readonly sortingField: SortingFields;

  /** Pagination mode. */
  readonly paginationMode: PaginationModes;

  /** First or last visible film on the page. */
  readonly firstOrLastVisibleFilm: Film | null;
}
