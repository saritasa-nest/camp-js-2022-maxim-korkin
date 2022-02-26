/**
 * Interface describing the film.
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

  /** Producer of the film.*/
  readonly producers: string[];

  /** Release date of the film. */
  readonly releaseDate: Date;

  /** Title of the film. */
  readonly title: string;

  /** Primary key of the film. */
  readonly pk?: number;
}
