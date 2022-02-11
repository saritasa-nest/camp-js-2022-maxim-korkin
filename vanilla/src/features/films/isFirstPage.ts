import { FilmsService } from '../../services/films/FilmsService';

import { FetchOptionsPagination } from '../../interfaces/options/FetchOptionsPagination';

/**
 * Function which checks if the current page is the first page possible.
 * @param options - Options to determine if page is first.
 */
export const isFirstPage = async(options: FetchOptionsPagination): Promise<boolean> => {
 const firstFilm = await FilmsService.fetchFirstFilm(options.orderingField, options.orderingMode, options.valueSearch);
  return firstFilm.pk === options.film.pk;
};
