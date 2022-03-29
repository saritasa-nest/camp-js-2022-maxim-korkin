import { Film } from './../models/film';

/**
 * Asserts that the object is a film.
 * @param object - Object to check.
 */
export function assertIsFilm(object: unknown): asserts object is Film {
  if (
    !Object.prototype.hasOwnProperty.call(object, 'director') ||
    !Object.prototype.hasOwnProperty.call(object, 'episodeId') ||
    !Object.prototype.hasOwnProperty.call(object, 'openingCrawl') ||
    !Object.prototype.hasOwnProperty.call(object, 'producers') ||
    !Object.prototype.hasOwnProperty.call(object, 'releaseDate') ||
    !Object.prototype.hasOwnProperty.call(object, 'title') ||
    !Object.prototype.hasOwnProperty.call(object, 'pk')
  ) {
    throw new Error('Object is not a Film');
  }
}
