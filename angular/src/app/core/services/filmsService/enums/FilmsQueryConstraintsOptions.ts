import { SortingOptions } from './SortingOptions';
import { FirstAndLastVisibleFilms } from './FirstAndLastVisibleFilms';
import { PaginationModes } from './PaginationModes';

/**
 * Films query constraints options.
 */
export interface FilmsQueryConstraintsOptions {

  /** Sorting field. */
  readonly sortingOptions: SortingOptions;

  /** Pagination mode. */
  readonly paginationMode: PaginationModes;

  /** First and last visible films on the page. */
  readonly firstAndLastVisibleFilms: FirstAndLastVisibleFilms | null;

  /** Count of films on single page. */
  readonly countOfFilmsOnPage: number;
}
