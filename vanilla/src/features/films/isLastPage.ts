import { FilmsService } from '../../services/films/FilmsService';

import { Film } from '../../interfaces/films/film/Film';

import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';

/**
 * Function which checks if the current page is the last page possible.
 * @param lastFilmOnPage - Last film on the current page.
 * @param orderingField - Current ordering field.
 * @param orderingMode - Current ordering mode.
 */
export const isLastPage = async(
  lastFilmOnPage: Film,
  orderingField: OrderingFields,
  orderingMode: OrderingModes,
): Promise<boolean> => {
  const lastFilm = await FilmsService.fetchLastFilm(orderingField, orderingMode);

  return lastFilm.pk === lastFilmOnPage.pk;
};
