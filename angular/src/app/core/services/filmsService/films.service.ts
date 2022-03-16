import { CollectionReference, query, QueryConstraint } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map, first } from 'rxjs';
import { collection, endBefore, Firestore, limit, limitToLast, orderBy, startAfter, where } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

import { Film } from '../../models/film';
import { FilmDto } from '../mappers/dto/film-dto/film-dto';
import { FilmMapper } from '../mappers/FilmMapper.service';
import { SortingDirection } from '../../utils/enums/sorting-direction';
import { PaginationDirection } from '../../utils/enums/pagination-direction';

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
  public fetchFilms(fetchOptions: FilmsFetchOptions): Observable<Film[]> {
    const filmsQuery = query(this.filmsCollection, ...this.getFilmsQueryConstraints(fetchOptions));
    return collectionData<FilmDto>(filmsQuery).pipe(
      map(films => films.map(film => this.filmMapper.fromDto(film))),
    );
  }

  /**
   * Fetches a film by primary key.
   * @param pk - Primary key to fetch the film.
   */
  public fetchFilmByPrimaryKey(pk: number): Observable<Film> {
    const filmQuery = query(this.filmsCollection, where('pk', '==', pk));
    return collectionData<FilmDto>(filmQuery).pipe(
      map(films => this.filmMapper.fromDto(films[0])),
      first(),
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
    let sortingField: FilmSortingField;
    let direction: SortingDirection;

    /** Checking if the user is searching by title. */
    if (titleSearchingValue !== '') {
      /** Need to sort exactly by title if the user is searching by it. */
      sortingField = FilmSortingField.Title;
      direction = SortingDirection.Ascending;

      /* Adding searching constraint.
         The \uf8ff character used in the query is a very high code point in the Unicode range.
         Because it is after most regular characters in Unicode, the query matches all values that start with searching value. */
      const veryHighCodePoint = '\uf8ff';
      queryConstraints.push(where(sortingField, '>=', titleSearchingValue));
      queryConstraints.push(where(sortingField, '<=', `${titleSearchingValue}${veryHighCodePoint}`));
    } else {
      /** Otherwise using sorting field and direction from the sorting options. */
      ({ sortingField, direction } = sortingOptions);
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
      queryConstraints.push(limitToLast(countOfFilmsOnPage + 2));
    }

    return queryConstraints;
  }

  /**
   * Function for getting sorting value from the film to use it as a constraint.
   * @param film - Film to get value from.
   * @param sortingField - Field we are sorting by.
   */
  private getSortingFieldValue(film: Film, sortingField: FilmSortingField): string | number {
    switch (sortingField) {
      case FilmSortingField.EpisodeId:
        return film.episodeId;
      case FilmSortingField.Title:
        return film.title;
      case FilmSortingField.ReleaseDate:
        return film.releaseDate.toISOString().slice(0, 10);
      case FilmSortingField.Director:
        return film.director;
      default:
        /** All film sorting fields should be declared above. If not then the error will be thrown so please add missing field case. */
        throw new Error('Failed to recognize FilmSortingField.');
    }
  }
}
