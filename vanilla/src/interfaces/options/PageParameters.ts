import { Film } from '../films/domain/Film';

/**
 * The first and last films on the page and whether the given page is the first or last.
 */
export interface PageParameters {

  readonly lastFilm: Film | null;

  readonly firstFilm: Film | null;

  readonly onFirstPage: boolean;

  readonly onLastPage: boolean;
}
