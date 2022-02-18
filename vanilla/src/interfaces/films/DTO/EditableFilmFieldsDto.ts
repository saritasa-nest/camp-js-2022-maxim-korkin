/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Interface describing editable fields of film in firestore DB so they can be updated.
 */
export interface EditableFilmFieldsDto {

  /** Title of the film. */
  readonly 'fields.title': string;

  /** Opening crawl of the film. */
  readonly 'fields.opening_crawl': string;

  /** ID of the episode in the series of films. */
  readonly 'fields.episode_id': number;

  /** Release date of the film. */
  readonly 'fields.release_date': string;

  /** Director of the film. */
  readonly 'fields.director': string;

  /** Producer of the film.*/
  readonly 'fields.producer': string;

  /** An array containing IDs of the planets in the film. */
  readonly 'fields.planets': readonly number[];

  /** An array containing IDs of characters in the film. */
  readonly 'fields.characters': readonly number[];

  /** Edition date. */
  readonly 'fields.edited': string;
}
