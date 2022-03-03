import { Film } from 'src/app/core/models/Film';

/**
 * Interface for containing first and last visible films on the current page of films.
 */
export interface FirstAndLastVisibleFilms {

  /**
   * First visible film on the page.
   */
  readonly firstVisibleFilm: Film;

  /**
   * Last visible film on the page.
   */
  readonly lastVisibleFilm: Film;
}
