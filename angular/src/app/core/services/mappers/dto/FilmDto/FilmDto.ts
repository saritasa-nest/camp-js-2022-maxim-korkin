import { FilmFieldsDto } from './FilmFieldsDto';

/**
 * Interface describing the film.
 */
export interface FilmDto {

  /** Fields which describe the film. */
  readonly fields: FilmFieldsDto;

  /** Model in DB. */
  readonly model: string;

  /** Primary key of the film. */
  readonly pk: number;
}
