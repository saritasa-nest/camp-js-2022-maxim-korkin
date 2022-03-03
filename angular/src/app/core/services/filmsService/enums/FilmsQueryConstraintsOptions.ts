import { FirstAndLastVisibleFilms } from './FirstAndLastVisibleFilms';
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

  /** First and last visible films on the page. */
  readonly firstAndLastVisibleFilms: FirstAndLastVisibleFilms | null;

  /** Count of films on single page. */
  readonly countOfFilmsOnPage: number;
}
