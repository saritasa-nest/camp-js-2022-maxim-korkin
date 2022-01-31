import { QueryDocumentSnapshot } from 'firebase/firestore';

import { FilmsService } from '../../services/films/FilmsService';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

export const isLastPage = async(lastFilmOnPage: QueryDocumentSnapshot<FilmDTO>, orderingField: string): Promise<boolean> => {
  const lastFilm = await FilmsService.fetchLastFilm(orderingField);

  if (lastFilm.pk === lastFilmOnPage.data().pk) {
    return true;
  }
  return false;

};
