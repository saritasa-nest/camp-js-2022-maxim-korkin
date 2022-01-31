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
   * @param orderingField - Field to order the results. Default value if 'pk'.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns
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

  /**
   * Method for getting the last document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @returns
   */
  public static async fetchLastFilm(orderingField: string): Promise<FilmDTO> {
    const lastFilmQuery = query(FilmsService.filmsCollection, orderBy(orderingField), limitToLast(1));

    const lastFilmSnapshot = await getDocs(lastFilmQuery);

    return lastFilmSnapshot.docs[0].data();
  }

  /**
   * Method for getting the first document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @returns
   */
  public static async fetchFirstFilm(orderingField: string): Promise<FilmDTO> {
    const firstFilmQuery = query(FilmsService.filmsCollection, orderBy(orderingField), limit(1));

    const firstFilmSnapshot = await getDocs(firstFilmQuery);

    return firstFilmSnapshot.docs[0].data();
  }
}