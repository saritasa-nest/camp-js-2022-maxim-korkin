import { Film } from '../films/domain/Film';

/** * Parameters of the current page.*/
export interface PageParameters {

  /** * Last film on the page or null if the page is empty.*/
  readonly lastFilm: Film | null;

  /** * First film on the page or null if the page is empty.*/
  readonly firstFilm: Film | null;

  /** * Shows if the current page is the last page possible.*/
  readonly onFirstPage: boolean;

  /** * Shows if the current page is the first page possible.*/
  readonly onLastPage: boolean;
}
