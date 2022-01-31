import { QueryDocumentSnapshot } from 'firebase/firestore';

import { FilmsService } from '../../services/films/FilmsService';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

export const isFirstPage = async(firstFilmOnPage: QueryDocumentSnapshot<FilmDTO>, orderingField: string): Promise<boolean> => {
  const firstFilm = await FilmsService.fetchFirstFilm(orderingField);

  if (firstFilm.pk === firstFilmOnPage.data().pk) {
    return true;
  }
  return false;

};
