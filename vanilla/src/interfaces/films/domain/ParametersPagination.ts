import { Film } from './Film';

/**
 * The first and last films on the page and whether the given page is the first or last.
 */
export interface ParametersPagination {

  /** * Last film on the page.*/
  lastFilm: Film;

  /** * First film on the page.*/
  firstFilm: Film;

  /** * Is the current page the first. */
  onFirstPage: boolean;

  /** * Is the current page the last.*/
  onLastPage: boolean;
}
