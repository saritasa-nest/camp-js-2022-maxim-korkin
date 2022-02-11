import { FilmsService } from '../../services/films/FilmsService';

import { FetchOptionsPagination } from '../../interfaces/options/FetchOptionsPagination';

/**
 * Function which checks if the current page is the last page possible.
 * @param options - Options to determine if page is last.
 */
export const isLastPage = async(options: FetchOptionsPagination): Promise<boolean> => {
  const lastFilm = await FilmsService.fetchLastFilm(options.orderingField, options.orderingMode, options.valueSearch);

  return lastFilm.pk === options.film.pk;
};
