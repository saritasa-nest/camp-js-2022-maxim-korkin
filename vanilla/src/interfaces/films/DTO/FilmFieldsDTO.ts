/* eslint-disable @typescript-eslint/naming-convention */

/**
 * DTO interface describing the fields of film.
 */
export interface FilmFieldsDTO {

  /** An array containing IDs of characters in the film. */
  readonly characters: readonly number[];

  /** Creation date of the film in the DB. */
  readonly created: string;

  /** Director of the film. */
  readonly director: string;

  /** Edition date of the film in the DB. */
  readonly edited: string;

  /** ID of the episode in the series of films. */
  readonly episode_id: number;

  /** Opening crawl of the film. */
  readonly opening_crawl: string;

  /** An array containing IDs of the planets in the film. */
  readonly planets: readonly number[];

  /** Producer of the film.*/
  readonly producer: string;

  /** Release date of the film. */
  readonly release_date: string;

  /** An array containing IDs of the species in the film. */
  readonly species: readonly number[];

  /** An array containing IDs of the starships in the film. */
  readonly starships: readonly number[];

  /** Title of the film. */
  readonly title: string;

  /** An array containing IDs of the vehicles in the film. */
  readonly vehicles: readonly number[];
}
