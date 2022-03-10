/**
 * Film model.
 */
export interface Film {

  /** An array containing IDs of characters in the film. */
  readonly characterIds: readonly number[];

  /** Director of the film. */
  readonly director: string;

  /** ID of the episode in the series of films. */
  readonly episodeId: number;

  /** Opening crawl of the film. */
  readonly openingCrawl: string;

  /** An array containing IDs of the planets in the film. */
  readonly planetIds: readonly number[];

  /** Producers of the film.*/
  readonly producers: readonly string[];

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
