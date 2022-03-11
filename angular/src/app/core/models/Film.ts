/**
 * Film model.
 */
export interface Film {

  /** Director of the film. */
  readonly director: string;

  /** ID of the episode in the series of films. */
  readonly episodeId: number;

  /** Opening crawl of the film. */
  readonly openingCrawl: string;

  /** Producers of the film.*/
  readonly producers: readonly string[];

  /** Release date of the film. */
  readonly releaseDate: Date;

  /** Title of the film. */
  readonly title: string;

  /** Primary key of the film. */
  readonly pk: number;

  /** Primary keys of the characters. */
  readonly characterPks: readonly number[];

  /** Primary keys of the planets. */
  readonly planetPks: readonly number[];
}
