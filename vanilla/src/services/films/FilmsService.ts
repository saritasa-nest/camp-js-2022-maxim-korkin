import { endBefore, getDocs, limit, limitToLast, orderBy, query, startAfter, where } from 'firebase/firestore';

import { getCollectionRef } from '../../firebase/getCollection';

import { OrderingFields } from '../../utils/enums/films/OrderingFields';
import { OrderingModes } from '../../utils/enums/films/OrderingModes';

import { Film } from '../../interfaces/films/film/Film';
import { FilmDto } from '../../interfaces/films/DTO/FilmDto';

import { FilmMapper } from './../../utils/mappers/FilmMapper';

import { mapQuerySnapshotToArray } from './../../utils/films/mapQuerySnapshotToArray';

const defaultLimitOfFilms = 2;

/**
 * Service class which helps to work with firestore DB.
 */
export class FilmsService {
  private static filmsCollection = getCollectionRef<FilmDto>('films');

  /**
   * Load certain amount of docs from the firestore ordering by a given field.
   * @param orderingField - Field to order the results. Default value if 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchFirstPageOfFilms(
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    limitOfFilmsOnPage = defaultLimitOfFilms,
  ): Promise<Film[]> {
    const filmsQuery = query(FilmsService.filmsCollection, orderBy(orderingField, orderingMode), limit(limitOfFilmsOnPage));

    const filmDocs = await getDocs(filmsQuery);

    return mapQuerySnapshotToArray(filmDocs);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load next page.
   * @param lastVisibleFilm - Last film on the current page.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchNextPageOfFilms(
    lastVisibleFilm: Film,
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    limitOfFilmsOnPage = defaultLimitOfFilms,
  ): Promise<Film[]> {
    const lastVosibleFilmQuery = query(FilmsService.filmsCollection, where('pk', '==', lastVisibleFilm.pk));

    const lastVisibleFilmDoc = (await getDocs(lastVosibleFilmQuery)).docs[0];

    const filmsQuery = query(
      FilmsService.filmsCollection,
      orderBy(orderingField, orderingMode),
      limit(limitOfFilmsOnPage),
      startAfter(lastVisibleFilmDoc),
    );

    const filmDocs = await getDocs(filmsQuery);

    return mapQuerySnapshotToArray(filmDocs);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load previos page.
   * @param firstVisibleFilm - First film on the current page.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchPrevPageOfFilms(
    firstVisibleFilm: Film,
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    limitOfFilmsOnPage = defaultLimitOfFilms,
  ): Promise<Film[]> {
    const firstVosibleFilmQuery = query(FilmsService.filmsCollection, where('pk', '==', firstVisibleFilm.pk));

    const firstVisibleFilmDoc = (await getDocs(firstVosibleFilmQuery)).docs[0];

    const filmsQuery = query(
      FilmsService.filmsCollection,
      orderBy(orderingField, orderingMode),
      limitToLast(limitOfFilmsOnPage),
      endBefore(firstVisibleFilmDoc),
    );

    const filmDocs = await getDocs(filmsQuery);

    return mapQuerySnapshotToArray(filmDocs);
  }

  /**
   * Method for getting the last document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @returns Last film in the db.
   */
  public static async fetchLastFilm(orderingField: OrderingFields, orderingMode: OrderingModes): Promise<Film> {
    const lastFilmQuery = query(FilmsService.filmsCollection, orderBy(orderingField, orderingMode), limitToLast(1));

    const lastFilmSnapshot = await getDocs(lastFilmQuery);

    return FilmMapper.fromDto(lastFilmSnapshot.docs[0].data());
  }

  /**
   * Method for getting the first document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @returns First film in the db.
   */
  public static async fetchFirstFilm(orderingField: OrderingFields, orderingMode: OrderingModes): Promise<Film> {
    const firstFilmQuery = query(FilmsService.filmsCollection, orderBy(orderingField, orderingMode), limit(1));

    const firstFilmSnapshot = await getDocs(firstFilmQuery);

    return FilmMapper.fromDto(firstFilmSnapshot.docs[0].data());
  }
}