import { Film } from '../films/domain/Film';

/**
 * The first and last films on the page and whether the given page is the first or last.
 */
export interface ParametersPagination {

  /** * Last film on the page.*/
  readonly lastFilm: Film;

  /** * First film on the page.*/
  readonly firstFilm: Film;

  /** * Is the current page the first. */
  readonly onFirstPage: boolean;

  /** * Is the current page the last.*/
  readonly onLastPage: boolean;
}
