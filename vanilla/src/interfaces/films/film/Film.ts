import { FilmFields } from './FilmFields';

/**
 * Interface describing the film.
 */
export interface Film {

  /** Fileds which describe the film. */
  readonly fields: FilmFields;

  /** Model in DB. */
  readonly model: string;

  /** Primary key(ID) of the film. */
  readonly pk: number;
}
