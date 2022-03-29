import { CollectionReference, query, QueryConstraint, limit, limitToLast, orderBy, startAfter, where, endBefore } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { collection, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

import { Film } from '../../models/film';
import { FilmDto } from '../mappers/dto/film-dto/film-dto.dto';
import { FilmMapper } from '../mappers/film-mapper';
import { SortingDirection } from '../../utils/enums/sorting-direction';
import { PaginationDirection } from '../../utils/enums/pagination-direction';
import { Pagination } from '../../models/pagination';

import { FilmSortingFieldDto, filmSortingFieldDtoMap } from './enums/film-sorting-field-dto';
import { FilmsFetchOptions } from './interfaces/films-fetch-options';
import { FilmSortingField } from './enums/film-sorting-field';

const FILMS_COLLECTION_NAME = 'films';

/**
 * Films service.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private readonly filmsCollection: CollectionReference<FilmDto>;

  public constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.filmsCollection = collection(this.firestore, FILMS_COLLECTION_NAME) as CollectionReference<FilmDto>;
  }

  /**
   * Method for fetching films with the constraints builded from the fetch options provided.
   * @param fetchOptions - Options required for building query.
   */
  public fetchFilms(fetchOptions: FilmsFetchOptions): Observable<Pagination<Film>> {
    const filmsQuery = query(this.filmsCollection, ...this.getFilmsQueryConstraints(fetchOptions));
    return collectionData<FilmDto>(filmsQuery).pipe(
      map(films => films.map(film => this.filmMapper.fromDto(film))),
      map(films => ({
        items: this.parseFilmsList(films, fetchOptions),
        ...this.getPaginationStatus(
            films.length,
            fetchOptions,
        ),
      })),
    );
  }

  /**
   * Fetches a film by primary key.
   * @param pk - Primary key to fetch the film.
   * @throws - Error in case film with provided id not found.
   */
  public fetchFilmByPrimaryKey(pk: number): Observable<Film> {
    const filmQuery = query(this.filmsCollection, where('pk', '==', pk));
    return collectionData<FilmDto>(filmQuery).pipe(
      tap(films => {
        if (films.length === 0) {
          throw new Error(`Film with primary key ${pk} not found`);
        }
      }),
      map(films => this.filmMapper.fromDto(films[0])),
    );
  }

  /**
   * Function for getting QueryConstraints array for films fetching.
   * @param filmsFetchOptions - Options required for building query constraints.
   */
  private getFilmsQueryConstraints(
    { sortingOptions, paginationMode, firstVisibleFilm, lastVisibleFilm, countOfFilmsOnPage, titleSearchingValue }: FilmsFetchOptions,
  ): QueryConstraint[] {
    const queryConstraints: QueryConstraint[] = [];

    /**
     * Sorting field and direction depends on whether the user is searching or not.
     */
    let sortingField: FilmSortingFieldDto;
    let direction: SortingDirection;

    /** Checking if the user is searching by title. */
    if (titleSearchingValue !== '') {
      /** Need to sort exactly by title if the user is searching by it. */
      sortingField = filmSortingFieldDtoMap[FilmSortingField.Title];
      direction = SortingDirection.Ascending;

      /**
       * Adding searching constraint.
       * The \uf8ff character used in the query is a very high code point in the Unicode range.
       * Because it is after most regular characters in Unicode, the query matches all values that start with searching value.
       */
      const veryHighCodePoint = '\uf8ff';
      queryConstraints.push(where(sortingField, '>=', titleSearchingValue));
      queryConstraints.push(where(sortingField, '<=', `${titleSearchingValue}${veryHighCodePoint}`));
    } else {
      /** Otherwise using sorting field and direction from the sorting options. */
      sortingField = filmSortingFieldDtoMap[sortingOptions.sortingField];
      ({ direction } = sortingOptions);
    }

    /** Sorting constraint. */
    queryConstraints.push(orderBy(sortingField, direction));

    /* If first and last visible films are equals to null then this is the first page loading
       so we do not need to add startAfter or endBefore constraints. */
    if (firstVisibleFilm === null || lastVisibleFilm === null) {
      /** + 1 to know if there is next page. */
      queryConstraints.push(limit(countOfFilmsOnPage + 1));
      return queryConstraints;
    }

    if (paginationMode === PaginationDirection.Next) {
      queryConstraints.push(startAfter(this.getSortingFieldValue(lastVisibleFilm, sortingField)));
      queryConstraints.push(limit(countOfFilmsOnPage + 1));
    } else if (paginationMode === PaginationDirection.Previous) {
      queryConstraints.push(endBefore(this.getSortingFieldValue(firstVisibleFilm, sortingField)));

      /* Looks like limitToLast with endBefore counts the last document we dont need and then endBefore constraint
         just removes it from the result so we are getting one less document than expected so i use +2 here instead of +1 */
      queryConstraints.push(limitToLast(countOfFilmsOnPage + 2));
    }

    return queryConstraints;
  }

  /**
   * Function for getting sorting value from the film to use it as a constraint.
   * @param film - Film to get value from.
   * @param sortingField - Field we are sorting by.
   */
  private getSortingFieldValue(film: Film, sortingField: FilmSortingFieldDto): string | number {
    switch (sortingField) {
      case filmSortingFieldDtoMap.episodeId:
        return film.episodeId;
      case filmSortingFieldDtoMap.title:
        return film.title;
      case filmSortingFieldDtoMap.releaseDate:
        /* Formatting date to a DB format YYYY-MM-DD. */
        return film.releaseDate.toISOString().slice(0, 10);
      case filmSortingFieldDtoMap.director:
        return film.director;
      default:
        /* All film sorting fields should be declared above. If not then the error will be thrown so please add missing field case. */
        throw new Error(`Failed to recognize ${sortingField} FilmSortingField.`);
    }
  }

  private getPaginationStatus(
    countOfFilms: number, { paginationMode, firstVisibleFilm, countOfFilmsOnPage }: FilmsFetchOptions,
  ): Omit<Pagination<Film>, 'items'> {
    if (firstVisibleFilm === null) {
      return { hasNext: countOfFilms === countOfFilmsOnPage + 1, hasPrev: false };
    } else if (paginationMode === PaginationDirection.Next) {
      return { hasNext: countOfFilms === countOfFilmsOnPage + 1, hasPrev: true };
    }
    return { hasNext: true, hasPrev: countOfFilms === countOfFilmsOnPage + 1 };
  }

  /**
   * Method used in films fetching. Removes film which indicates existence of next or previous page.
   * @param films - Array of films.
   * @param paginationMode - Pagination mode.
   */
  private parseFilmsList(films: readonly Film[], { paginationMode, countOfFilmsOnPage }: FilmsFetchOptions): readonly Film[] {
    /** Case when we dont have film we dont need to display. */
    if (films.length !== countOfFilmsOnPage + 1) {
      return films;
    }

    /** Removes last film if we loaded next page. */
    if (paginationMode === PaginationDirection.Next) {
      return films.slice(0, -1);
    }

    /** Removes first film if we loaded previous page. */
    return films.slice(1);
  }
}
