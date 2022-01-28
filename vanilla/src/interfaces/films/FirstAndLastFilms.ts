import { QueryDocumentSnapshot } from 'firebase/firestore';

import { FilmDTO } from './DTO/FilmDTO';

/**
 * Interface for the object containing first and last film displayed on the page.
 */
export interface FirstAndLastFilms {

  /** Field containing the first film displayed on the page. */
  readonly firstFilm: QueryDocumentSnapshot<FilmDTO> | null;

  /** Field containing the first film displayed on the page. */
  readonly lastFilm: QueryDocumentSnapshot<FilmDTO> | null;
}
