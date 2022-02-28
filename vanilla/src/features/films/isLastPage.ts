import { FilmsService } from '../../services/films/FilmsService';

import { PaginationOptions } from '../../interfaces/options/PaginationOptions';

/**
 * Function which checks if the current page is the last page possible.
 * @param options - Options to determine if page is last.
 */
export const isLastPage = async(options: PaginationOptions): Promise<boolean> => {
  const lastFilm = await FilmsService.fetchLastFilm(options);

  return lastFilm.pk === options.film.pk;
};
