import { FilmFields } from './FilmFields';

/**
 * Interface describing the film.
 */
export interface Film {

  /** Fileds which describe the film. */
  readonly fields: FilmFields;

  /** Model. */
  readonly model: string;

  /** Primary key of the film. */
  readonly pk: number;
}
