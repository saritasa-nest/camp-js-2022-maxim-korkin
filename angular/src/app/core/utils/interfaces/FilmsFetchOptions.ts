import { Film } from 'src/app/core/models/Film';

import { PaginationModes } from '../enums/PaginationModes';

import { SortingOptions } from './SortingOptions';

/**
 * Options used for fetching films by the FilmsService.
 */
export interface FilmsFetchOptions {

  /** Field to sort by and direction. */
  readonly sortingOptions: SortingOptions;

  /** Describes if we should fetch next page or previous one. */
  readonly paginationMode: PaginationModes;

  /** First visible film on the current page. */
  readonly firstVisibleFilm: Film | null;

  /** Last visible film on the current page. */
  readonly lastVisibleFilm: Film | null;

  /** Title searching value.*/
  readonly titleSearchingValue: string;

  /** Count of films on single page. */
  readonly countOfFilmsOnPage: number;

}
