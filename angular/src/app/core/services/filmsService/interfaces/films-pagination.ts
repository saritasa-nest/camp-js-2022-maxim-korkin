import { Film } from 'src/app/core/models/film';

/**
 * Films with pagination info.
 */
export interface FilmsAndPaginationInfo {

  /** Films array. */
  readonly films: Film[];

  /** Shows if there is next page. */
  readonly hasNext: boolean;

  /** Shows if there is prev page. */
  readonly hasPrev: boolean;
}
