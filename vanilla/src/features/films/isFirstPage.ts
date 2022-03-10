import { FilmsService } from '../../services/films/FilmsService';

import { PaginationOptions } from '../../interfaces/options/PaginationOptions';

/**
 * Function which checks if the current page is the first page possible.
 * @param options - Options to determine if page is first.
 */
export const isFirstPage = async(options: PaginationOptions): Promise<boolean> => {
 const firstFilm = await FilmsService.fetchFirstFilm(options);
  return firstFilm.pk === options.film.pk;
};
