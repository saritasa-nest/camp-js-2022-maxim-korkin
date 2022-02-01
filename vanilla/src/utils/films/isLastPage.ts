import { QueryDocumentSnapshot } from 'firebase/firestore';

import { FilmsService } from '../../services/films/FilmsService';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

import { OrderFields } from './../enums/OrderFields';
import { OrderModes } from './../enums/OrderModes';

export const isLastPage = async(
  lastFilmOnPage: QueryDocumentSnapshot<FilmDTO>,
  orderingField: OrderFields, orderingMode: OrderModes,
): Promise<boolean> => {
  const lastFilm = await FilmsService.fetchLastFilm(orderingField, orderingMode);

  if (lastFilm.pk === lastFilmOnPage.data().pk) {
    return true;
  }
  return false;

};
