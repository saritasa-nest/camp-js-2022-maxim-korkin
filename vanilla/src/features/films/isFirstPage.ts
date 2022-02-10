import { FilmsService } from '../../services/films/FilmsService';

import { Film } from '../../interfaces/films/film/Film';

import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';

/**
 * Function which checks if the current page is the first page possible.
 * @param firstFilmOnPage - First film on the current page.
 * @param orderingField - Current ordering field.
 * @param orderingMode - Current ordering mode.
 * @param valueSearch - Shows by what value in the field we should search.
 */
export const isFirstPage = async(
  firstFilmOnPage: Film,
  orderingField: OrderingFields,
  orderingMode: OrderingModes,
  valueSearch: string,
): Promise<boolean> => {
 const firstFilm = await FilmsService.fetchFirstFilm(orderingField, orderingMode, valueSearch);
  return firstFilm.pk === firstFilmOnPage.pk;
};
