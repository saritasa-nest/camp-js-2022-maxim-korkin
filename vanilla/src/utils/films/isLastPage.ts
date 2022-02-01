import { QueryDocumentSnapshot } from 'firebase/firestore';

import { FilmsService } from '../../services/films/FilmsService';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

import { OrderingFields } from '../enums/films/OrderingFields';
import { OrderingModes } from '../enums/films/OrderingModes';

/**
 * Function which checks if the current page is the last page possible.
 * @param lastFilmOnPage - Last film on the current page.
 * @param orderingField - Current ordering field.
 * @param orderingMode - Current ordering mode.
 * @returns True or false.
 */
export const isLastPage = async(
  lastFilmOnPage: QueryDocumentSnapshot<FilmDTO>,
  orderingField: OrderingFields, orderingMode: OrderingModes,
): Promise<boolean> => {
  const lastFilm = await FilmsService.fetchLastFilm(orderingField, orderingMode);

  if (lastFilm.pk === lastFilmOnPage.data().pk) {
    return true;
  }
  return false;

};
