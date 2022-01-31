import { endBefore, getDocs, limit, limitToLast, orderBy, query, QueryDocumentSnapshot, QuerySnapshot, startAfter } from 'firebase/firestore';

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
  public static fetchFirstPageOfFilms(orderingField = 'pk', limitOfFilmsOnPage = 2): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(FilmsService.filmsCollection, orderBy(orderingField), limit(limitOfFilmsOnPage));

    return getDocs(filmsQuery);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load next page.
   * @param lastVisibleFilm - Last film on the current page.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @returns
   */
  public static fetchNextPageOfFilms(
    lastVisibleFilm: QueryDocumentSnapshot<FilmDTO>,
    orderingField = 'pk',
    limitOfFilmsOnPage = 2,
  ): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(FilmsService.filmsCollection, orderBy(orderingField), limit(limitOfFilmsOnPage), startAfter(lastVisibleFilm));

    return getDocs(filmsQuery);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load previos page.
   * @param firstVisibleFilm - First film on the current page.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @returns
   */
  public static fetchPrevPageOfFilms(
    firstVisibleFilm: QueryDocumentSnapshot<FilmDTO>,
    orderingField = 'pk',
    limitOfFilmsOnPage = 2,
  ): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(FilmsService.filmsCollection,
      orderBy(orderingField),
      limitToLast(limitOfFilmsOnPage),
      endBefore(firstVisibleFilm));

    return getDocs(filmsQuery);
  }
}
