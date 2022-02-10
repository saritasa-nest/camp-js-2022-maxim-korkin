import { endBefore, getDocs, limit, limitToLast, orderBy, query, QueryConstraint, startAfter, where } from 'firebase/firestore';

import { getCollectionRef } from '../../firebase/getCollection';

import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';

import { Film } from '../../interfaces/films/film/Film';

import { FirebaseService } from '../firebase/FirebaseService';
import { FilmDto } from '../../interfaces/films/DTO/FilmDTO';

import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreFollections';

import { FilmMapper } from '../../mappers/FilmMapper';

/**
 * Default limit of films on page.
 */
const DEFAULT_LIMIT_OF_FILMS = 2;

/**
 * Returns the query limits, including filtering, if applicable.
 * @param orderingField - Field to order the results. Default value if 'pk'.
 * @param orderingMode - Indicates if order should be ascending or descending.
 * @param valueSearch - Shows by what value in the field we should search.
 * @returns Array with query constraint.
 */
function getQueryConstraint(orderingField: OrderingFields, orderingMode: OrderingModes, valueSearch: string): QueryConstraint[] {
  if (valueSearch) {
    return [
      where(OrderingFields.Title, '>=', valueSearch),
      where(OrderingFields.Title, '<=', `${valueSearch}~`),
      orderBy(OrderingFields.Title, orderingMode),
    ];
  }
  return [orderBy(orderingField, orderingMode)];

}

/**
 * Service class which helps to work with firestore DB.
 */
export class FilmsService {
  private static filmsCollection = getCollectionRef<FilmDto>(FirestoreCollections.Films);

  /**
   * Load certain amount of docs from the firestore ordering by a given field.
   * @param orderingField - Field to order the results. Default value if 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param valueSearch - Shows by what value in the field we should search.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchFirstPageOfFilms(
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    valueSearch: string,
    limitOfFilmsOnPage = DEFAULT_LIMIT_OF_FILMS,
  ): Promise<Film[]> {
    const queryConstraints: QueryConstraint[] = [
      limit(limitOfFilmsOnPage),
      ...getQueryConstraint(orderingField, orderingMode, valueSearch),
    ];

    const filmsQuery = query(FilmsService.filmsCollection, ...queryConstraints);

    const filmDocs = await getDocs(filmsQuery);

    return FirebaseService.mapQuerySnapshotToArray(filmDocs);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load next page.
   * @param lastVisibleFilm - Last film on the current page.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param valueSearch - Shows by what value in the field we should search.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchNextPageOfFilms(
    lastVisibleFilm: Film,
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    valueSearch: string,
    limitOfFilmsOnPage = DEFAULT_LIMIT_OF_FILMS,
  ): Promise<Film[]> {
    const lastVisibleFilmQuery = valueSearch ?
      query(FilmsService.filmsCollection, where(OrderingFields.Title, '==', lastVisibleFilm.title)) :
      query(FilmsService.filmsCollection, where('pk', '==', lastVisibleFilm.pk));

    const lastVisibleFilmDoc = (await getDocs(lastVisibleFilmQuery)).docs[0];

    const queryConstraints: QueryConstraint[] = [
      limit(limitOfFilmsOnPage),
      ...getQueryConstraint(orderingField, orderingMode, valueSearch),
      startAfter(lastVisibleFilmDoc),
    ];
    const filmsQuery = query(
      FilmsService.filmsCollection,
      ...queryConstraints,
    );

    const filmDocs = await getDocs(filmsQuery);

    return FirebaseService.mapQuerySnapshotToArray(filmDocs);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load previos page.
   * @param firstVisibleFilm - First film on the current page.
   * @param orderingField - Field to order the results. Default value is 'pk'.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param valueSearch - Shows by what value in the field we should search.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchPrevPageOfFilms(
    firstVisibleFilm: Film,
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    valueSearch: string,
    limitOfFilmsOnPage = DEFAULT_LIMIT_OF_FILMS,
  ): Promise<Film[]> {
    const firstVisibleFilmQuery = valueSearch ?
      query(FilmsService.filmsCollection, where(OrderingFields.Title, '==', firstVisibleFilm.title)) :
      query(FilmsService.filmsCollection, where('pk', '==', firstVisibleFilm.pk));
    const firstVisibleFilmDoc = (await getDocs(firstVisibleFilmQuery)).docs[0];

    const queryConstraints: QueryConstraint[] = [
      limitToLast(limitOfFilmsOnPage),
      ...getQueryConstraint(orderingField, orderingMode, valueSearch),
      endBefore(firstVisibleFilmDoc),
    ];

    const filmsQuery = query(
      FilmsService.filmsCollection,
      ...queryConstraints,
    );

    const filmDocs = await getDocs(filmsQuery);

    return FirebaseService.mapQuerySnapshotToArray(filmDocs);
  }

  /**
   * Method for getting the last document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param valueSearch - Shows by what value in the field we should search.
   * @returns Last film in the db.
   */
  public static async fetchLastFilm(
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    valueSearch: string,
  ): Promise<Film> {
    const queryConstraints: QueryConstraint[] = [
      ...getQueryConstraint(orderingField, orderingMode, valueSearch),
      limitToLast(1),
    ];

    const lastFilmQuery = query(
      FilmsService.filmsCollection,
      ...queryConstraints,
    );

    const lastFilmSnapshot = await getDocs(lastFilmQuery);

    return FilmMapper.fromDto(lastFilmSnapshot.docs[0].data());
  }

  /**
   * Method for getting the first document from the collection ordered by the orderingField.
   * @param orderingField - Field to order the results.
   * @param orderingMode - Indicates if order should be ascending or descending.
   * @param valueSearch - Shows by what value in the field we should search.
   * @returns First film in the db.
   */
  public static async fetchFirstFilm(
    orderingField: OrderingFields,
    orderingMode: OrderingModes,
    valueSearch: string,
  ): Promise<Film> {
    const queryConstraints: QueryConstraint[] = [
      ...getQueryConstraint(orderingField, orderingMode, valueSearch),
      limit(1),
    ];

    const firstFilmQuery = query(
      FilmsService.filmsCollection,
      ...queryConstraints,
    );

    const firstFilmSnapshot = await getDocs(firstFilmQuery);

    return FilmMapper.fromDto(firstFilmSnapshot.docs[0].data());
  }

  /**
   * Method for getting film with provided primary key.
   * @param primaryKey - Primary key of the film.
   * @returns Film with provided primary key or null if the film with such primary key doesnt exist.
   */
  public static async fetchFilmByPrimaryKey(primaryKey: number): Promise<Film | null> {
    const filmQuery = query(FilmsService.filmsCollection, where('pk', '==', primaryKey));

    const querySnapshot = await getDocs(filmQuery);

    if (querySnapshot.docs.length !== 0) {
      return FilmMapper.fromDto(querySnapshot.docs[0].data());
    }
    return null;
  }
}
