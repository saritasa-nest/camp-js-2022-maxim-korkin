import { QueryDocumentSnapshot } from 'firebase/firestore';

import { FilmsService } from '../../services/films/FilmsService';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

import { OrderFields } from './../enums/OrderFields';

import { OrderModes } from './../enums/OrderModes';

export const isFirstPage = async(
  firstFilmOnPage: QueryDocumentSnapshot<FilmDTO>,
  orderingField: OrderFields,
  orderingMode: OrderModes,
): Promise<boolean> => {
  const firstFilm = await FilmsService.fetchFirstFilm(orderingField, orderingMode);

  if (firstFilm.pk === firstFilmOnPage.data().pk) {
    return true;
  }
  return false;

};
