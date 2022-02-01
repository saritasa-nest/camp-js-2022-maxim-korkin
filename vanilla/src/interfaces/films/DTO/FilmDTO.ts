import { FilmFieldsDTO } from './FilmFieldsDTO';

/**
 * Interface describing the film.
 */
export interface FilmDTO {

  /** Fileds which describe the film. */
  readonly fields: FilmFieldsDTO;

  /** Model in DB. */
  readonly model: string;

  /** Primary key of the film. */
  readonly pk: number;
}
