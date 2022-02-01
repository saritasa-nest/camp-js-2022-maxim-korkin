import { endBefore, getDocs, limit, limitToLast, orderBy, query, QueryDocumentSnapshot, QuerySnapshot, startAfter } from 'firebase/firestore';

import { getCollectionRef } from '../../firebase/getCollection';

import { OrderingFields } from '../../utils/enums/films/OrderingFields';
import { OrderingModes } from '../../utils/enums/films/OrderingModes';

import { FilmDTO } from './../../interfaces/films/DTO/FilmDTO';

/**
 * Service class which helps to work with firestore DB.
 */
export class FilmsService {
  private static filmsCollection = getCollectionRef<FilmDTO>('films');

  /**
   * Load certain amount of docs from the firestore ordering by a given field.
   * @param orderingField - Field to order the results. Default value if 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns
   */
  public static fetchFirstPageOfFilms(
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    limitOfFilmsOnPage = 2,
  ): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(FilmsService.filmsCollection, orderBy(orderingField, orderingMode), limit(limitOfFilmsOnPage));

    return getDocs(filmsQuery);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load next page.
   * @param lastVisibleFilm - Last film on the current page.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns
   */
  public static fetchNextPageOfFilms(
    lastVisibleFilm: QueryDocumentSnapshot<FilmDTO>,
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    limitOfFilmsOnPage = 2,
  ): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(
      FilmsService.filmsCollection,
      orderBy(orderingField, orderingMode),
      limit(limitOfFilmsOnPage),
      startAfter(lastVisibleFilm),
    );

    return getDocs(filmsQuery);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load previos page.
   * @param firstVisibleFilm - First film on the current page.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns
   */
  public static fetchPrevPageOfFilms(
    firstVisibleFilm: QueryDocumentSnapshot<FilmDTO>,
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    limitOfFilmsOnPage = 2,
  ): Promise<QuerySnapshot<FilmDTO>> {
    const filmsQuery = query(
      FilmsService.filmsCollection,
      orderBy(orderingField, orderingMode),
      limitToLast(limitOfFilmsOnPage),
      endBefore(firstVisibleFilm),
    );

    return getDocs(filmsQuery);
  }

  /**
   * Method for getting the last document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @returns
   */
  public static async fetchLastFilm(orderingField: OrderingFields, orderingMode: OrderingModes): Promise<FilmDTO> {
    const lastFilmQuery = query(FilmsService.filmsCollection, orderBy(orderingField, orderingMode), limitToLast(1));

    const lastFilmSnapshot = await getDocs(lastFilmQuery);

    return lastFilmSnapshot.docs[0].data();
  }

  /**
   * Method for getting the first document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @returns
   */
  public static async fetchFirstFilm(orderingField: OrderingFields, orderingMode: OrderingModes): Promise<FilmDTO> {
    const firstFilmQuery = query(FilmsService.filmsCollection, orderBy(orderingField, orderingMode), limit(1));

    const firstFilmSnapshot = await getDocs(firstFilmQuery);

    return firstFilmSnapshot.docs[0].data();
  }
}
