/**
 * Interface describing the film.
 */
export interface Film {

  /** An array containing IDs of characters in the film. */
  readonly characterIds: readonly number[];

  /** Creation date of the film in the DB. */
  readonly created: Date;

  /** Director of the film. */
  readonly director: string;

  /** Edition date of the film in the DB. */
  readonly edited: Date;

  /** ID of the episode in the series of films. */
  readonly episodeId: number;

  /** Opening crawl of the film. */
  readonly openingCrawl: string;

  /** An array containing IDs of the planets in the film. */
  readonly planetIds: readonly number[];

  /** Producer of the film.*/
  readonly producer: string;

  /** Release date of the film. */
  readonly releaseDate: Date;

  /** An array containing IDs of the species in the film. */
  readonly specieIds: readonly number[];

  /** An array containing IDs of the starships in the film. */
  readonly starshipIds: readonly number[];

  /** Title of the film. */
  readonly title: string;

  /** An array containing IDs of the vehicles in the film. */
  readonly vehicleIds: readonly number[];

  /** Primary key of the film. */
  readonly pk: number;
}
