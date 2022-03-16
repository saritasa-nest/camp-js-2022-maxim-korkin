import { addDoc, deleteDoc, endBefore, getDocs, limit, limitToLast, orderBy, query, QueryConstraint, startAfter, updateDoc, where } from 'firebase/firestore';

import { getCollectionRef } from '../../firebase/getCollection';
import { OrderingFields } from '../../enums/films/OrderingFields';
import { Film } from '../../interfaces/films/domain/Film';
import { FirebaseService } from '../firebase/FirebaseService';
import { FilmDto } from '../../interfaces/films/DTO/FilmDTO';
import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreCollections';
import { FilmMapper } from '../../mappers/FilmMapper';
import { composeFilmFromForm } from '../../features/filmForm/composeFilmFromForm';
import { assertNotNull } from '../../utils/assertNotNull';
import { QueryConstraintParameters } from '../../interfaces/options/QueryConstraintParameters';

/**
 * Default limit of films on page.
 */
const DEFAULT_LIMIT_OF_FILMS = 2;

/**
 * Character to search for the first letters in the string.
 */
const SEARCH_SYMBOL = '~';

/**
 * Returns the query limits, including filtering, if applicable.
 * @param options - Parameters for generating a query constraint.
 * @returns Array with query constraint.
 */
function getQueryConstraint(options: QueryConstraintParameters):
  QueryConstraint[] {
  if (options.valueSearch) {
    return [
      where(OrderingFields.Title, '>=', options.valueSearch),
      where(OrderingFields.Title, '<=', options.valueSearch + SEARCH_SYMBOL),
      orderBy(OrderingFields.Title, options.orderingMode),
    ];
  }
  return [orderBy(options.orderingField, options.orderingMode)];
}

/**
 * Service class which helps to work with firestore DB.
 * Service class which helps to work with films in firestore DB.
 */
export class FilmsService {
  private static filmsCollection = getCollectionRef<FilmDto>(FirestoreCollections.Films);

  /**
   * Load certain amount of docs from the firestore ordering by a given field.
   * @param options - Parameters for generating a query constraint.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchFirstPageOfFilms(
    options: QueryConstraintParameters,
    limitOfFilmsOnPage = DEFAULT_LIMIT_OF_FILMS,
  ): Promise<Film[]> {
    const queryConstraints: readonly QueryConstraint[] = [
      limit(limitOfFilmsOnPage),
      ...getQueryConstraint(options),
    ];

    const filmsQuery = query(FilmsService.filmsCollection, ...queryConstraints);

    const filmDocs = await getDocs(filmsQuery);

    return FirebaseService.mapQuerySnapshotToArray<FilmDto, Film>(filmDocs, FilmMapper.fromDto);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load next page.
   * @param lastVisibleFilm - Last film on the current page.
   * @param options - Parameters for generating a query constraint.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchNextPageOfFilms(
    lastVisibleFilm: Film,
    options: QueryConstraintParameters,
    limitOfFilmsOnPage = DEFAULT_LIMIT_OF_FILMS,
  ): Promise<Film[]> {
    const lastVisibleFilmQuery = options.valueSearch ?
      query(FilmsService.filmsCollection, where(OrderingFields.Title, '==', lastVisibleFilm.title)) :
      query(FilmsService.filmsCollection, where('pk', '==', lastVisibleFilm.pk));

    const lastVisibleFilmDoc = (await getDocs(lastVisibleFilmQuery)).docs[0];

    const queryConstraints: readonly QueryConstraint[] = [
      limit(limitOfFilmsOnPage),
      ...getQueryConstraint(options),
      startAfter(lastVisibleFilmDoc),
    ];
    const filmsQuery = query(
      FilmsService.filmsCollection,
      ...queryConstraints,
    );

    const filmDocs = await getDocs(filmsQuery);

    return FirebaseService.mapQuerySnapshotToArray<FilmDto, Film>(filmDocs, FilmMapper.fromDto);
  }

  /**
   * Load certain amount of docs from the firestore ordering by a given field when the user wants to load previous page.
   * @param firstVisibleFilm - First film on the current page.
   * @param options - Parameters for generating a query constraint.
   * @param limitOfFilmsOnPage - Maximum count of films at a single page. Default value is 2.
   * @returns Array with films.
   */
  public static async fetchPrevPageOfFilms(
    firstVisibleFilm: Film,
    options: QueryConstraintParameters,
    limitOfFilmsOnPage = DEFAULT_LIMIT_OF_FILMS,
  ): Promise<Film[]> {
    const firstVisibleFilmQuery = options.valueSearch ?
      query(FilmsService.filmsCollection, where(OrderingFields.Title, '==', firstVisibleFilm.title)) :
      query(FilmsService.filmsCollection, where('pk', '==', firstVisibleFilm.pk));
    const firstVisibleFilmDoc = (await getDocs(firstVisibleFilmQuery)).docs[0];

    const queryConstraints: readonly QueryConstraint[] = [
      limitToLast(limitOfFilmsOnPage),
      ...getQueryConstraint(options),
      endBefore(firstVisibleFilmDoc),
    ];

    const filmsQuery = query(
      FilmsService.filmsCollection,
      ...queryConstraints,
    );

    const filmDocs = await getDocs(filmsQuery);

    return FirebaseService.mapQuerySnapshotToArray<FilmDto, Film>(filmDocs, FilmMapper.fromDto);
  }

  /**
   * Method for getting the last document from the collection ordered by the orderingField.
   * @param options - Parameters for generating a query constraint.
   * @returns Last film in the db.
   */
  public static async fetchLastFilm(
    options: QueryConstraintParameters,
  ): Promise<Film> {
    const queryConstraints: readonly QueryConstraint[] = [
      ...getQueryConstraint(options),
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
   * @param options - Parameters for generating a query constraint.
   * @returns First film in the db.
   */
  public static async fetchFirstFilm(
    options: QueryConstraintParameters,
  ): Promise<Film> {
    const queryConstraints: readonly QueryConstraint[] = [
      ...getQueryConstraint(options),
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
   * @returns Film with provided primary key or null if the film with such primary key doesn't exist.
   */
  public static async fetchFilmByPrimaryKey(primaryKey: number): Promise<Film | null> {
    const filmQuery = query(FilmsService.filmsCollection, where('pk', '==', primaryKey));

    const querySnapshot = await getDocs(filmQuery);

    if (querySnapshot.docs.length !== 0) {
      return FilmMapper.fromDto(querySnapshot.docs[0].data());
    }
    return null;
  }

  /**
   * Method for deleting film with provided primary key.
   * @param primaryKey - Primary key of the film to delete.
   */
  public static async deleteFilmByPrimaryKey(primaryKey: number): Promise<void> {
    const filmQuery = query(FilmsService.filmsCollection, where('pk', '==', primaryKey));

    const querySnapshot = await getDocs(filmQuery);

    const documentReference = querySnapshot.docs[0].ref;

    await deleteDoc(documentReference);
  }

  /**
   * Method for getting the highest primary key of the films.
   * @returns Highest existing primary key.
   */
  public static async getMaximumPrimaryKey(): Promise<number> {
    const filmQuery = query(FilmsService.filmsCollection, orderBy('pk', 'desc'), limit(1));

    const querySnapshot = await getDocs(filmQuery);

    return (querySnapshot.docs.length !== 0) ? querySnapshot.docs[0].data().pk : 1;
  }

  /**
   * Method for adding a new film with the values from the form to the firestore DB.
   * @param form - Form to get values from.
   */
  public static async addFilmFromFormValues(form: HTMLFormElement): Promise<void> {
    const newFilm = composeFilmFromForm(form);

    assertNotNull(newFilm);

    const highestPrimaryKey = await FilmsService.getMaximumPrimaryKey();

    const filmDto = FilmMapper.toDto(newFilm, highestPrimaryKey + 1);

    await addDoc(FilmsService.filmsCollection, filmDto);
  }

  /**
   * Method for updating film in the firestore DB.
   * @param film - Film with the new values.
   */
  public static async updateFilm(film: Film): Promise<void> {
    const filmQuery = query(FilmsService.filmsCollection, where('pk', '==', film.pk));

    const querySnapshot = await getDocs(filmQuery);

    const documentReference = querySnapshot.docs[0].ref;

    const newFilmFields = FilmMapper.toEditableFieldsDto(film);

    await updateDoc(documentReference, { ...newFilmFields });
  }
}
