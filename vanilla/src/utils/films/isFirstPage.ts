import { QueryDocumentSnapshot } from 'firebase/firestore';

import { FilmsService } from '../../services/films/FilmsService';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

import { OrderingFields } from '../enums/films/OrderingFields';
import { OrderingModes } from '../enums/films/OrderingModes';

/**
 * Function which checks if the current page is the first page possible.
 * @param firstFilmOnPage - First film on the current page.
 * @param orderingField - Current ordering field.
 * @param orderingMode - Current ordering mode.
 * @returns True or false.
 */
export const isFirstPage = async(
  firstFilmOnPage: QueryDocumentSnapshot<FilmDTO>,
  orderingField: OrderingFields,
  orderingMode: OrderingModes,
): Promise<boolean> => {
  const firstFilm = await FilmsService.fetchFirstFilm(orderingField, orderingMode);

  if (firstFilm.pk === firstFilmOnPage.data().pk) {
    return true;
  }
  return false;

};
