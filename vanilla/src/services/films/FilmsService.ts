import { DocumentSnapshot, getDocs, limit, orderBy, query, QuerySnapshot, startAfter } from 'firebase/firestore';

import { getCollectionRef } from '../../firebase/getCollection';

import { FilmDTO } from './../../interfaces/films/DTO/FilmDTO';

/**
 * Service class which helps to work with firestore DB.
 */
export class FilmsService {
  private static filmsCollection = getCollectionRef<FilmDTO>('films');

  /**
   * Load certain amount of docs from the firestore ordering by a given field.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @param orderingField - Field to order the results. Default value if 'pk'.
   */
  public static fetchFirstPageOfFilms(limitOfFilmsOnPage = 2, orderingField = 'pk'): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(FilmsService.filmsCollection, orderBy(orderingField), limit(limitOfFilmsOnPage));

    return getDocs(filmsQuery);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load next page.
   * @param lastVisibleFilm - Last film on the current page.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @param orderingField - Field to order the results. Default value if 'pk'.
   * @returns
   */
  public static fetchNextPageOfFilms(
    lastVisibleFilm: DocumentSnapshot,
    limitOfFilmsOnPage = 2,
    orderingField = 'pk',
  ): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(FilmsService.filmsCollection, orderBy(orderingField), limit(limitOfFilmsOnPage), startAfter(lastVisibleFilm));

    return getDocs(filmsQuery);
  }
}
