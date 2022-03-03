import { CollectionReference, query } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject, combineLatest, switchMap, tap } from 'rxjs';
import { collection, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

import { Film } from '../../models/Film';
import { FilmDto } from '../mappers/dto/FilmDto/FilmDto';
import { FilmMapper } from '../mappers/FilmMapper.service';

import { SortingDirections } from './enums/SortingDirections';

import { SortingOptions } from './enums/SortingOptions';
import { FirstAndLastVisibleFilms } from './enums/FirstAndLastVisibleFilms';
import { FilmsQueryConstraintsOptions } from './enums/FilmsQueryConstraintsOptions';
import { getFilmsQueryConstraints } from './getFilmsQueryConstraints';
import { PaginationModes } from './enums/PaginationModes';
import { SortingFields } from './enums/SortingFields';

const FILMS_COLLECTION_NAME = 'films';

/**
 * Maximum count of films on a single page.
 */
const COUNT_OF_FILMS_ON_PAGE = 3;

/**
 * Count of fetched films which shows that there is next or previous page.
 */
const COUNT_OF_FILMS_FOR_NEXT_PAGE = COUNT_OF_FILMS_ON_PAGE + 1;

/**
 * Films service.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  /** Films on the current page. */
  public readonly films$: Observable<Film[]>;

  /** Shows if the current page is the last one. */
  public isLastPage$ = new BehaviorSubject(true);

  /** Shows if the current page is the first one. */
  public isFirstPage$ = new BehaviorSubject(true);

  /** Shows if we are searching or not. */
  public isSearching$ = new BehaviorSubject(false);

  private readonly paginationMode$ = new BehaviorSubject<PaginationModes>(PaginationModes.NEXT);

  private readonly sortingOptions$ = new BehaviorSubject<SortingOptions>(
    { sortingField: SortingFields.EpisodeId, direction: SortingDirections.ASCENDING, searchingValue: '' },
  );

  /** Null if this is the first page loading. */
  private firstAndLastVisibleFilms: FirstAndLastVisibleFilms | null = null;

  private readonly filmsCollection: CollectionReference<FilmDto>;

  public constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.filmsCollection = collection(this.firestore, FILMS_COLLECTION_NAME) as CollectionReference<FilmDto>;

    this.films$ = combineLatest([this.paginationMode$, this.sortingOptions$]).pipe(
      map(([paginationMode, sortingOptions]) => ({
          paginationMode,
          sortingOptions,
          firstAndLastVisibleFilms: this.firstAndLastVisibleFilms,
          countOfFilmsOnPage: COUNT_OF_FILMS_ON_PAGE,
      })),
      switchMap(options => this.fetchFilms(options)),
    );
  }

  /**
   * Method for fetching films.
   * @param constraints - Query constraints.
   */
  public fetchFilms(constraints: FilmsQueryConstraintsOptions): Observable<Film[]> {
    const filmsQuery = query(this.filmsCollection, ...getFilmsQueryConstraints(constraints));
    return collectionData<FilmDto>(filmsQuery).pipe(
      map(films => films.map(film => this.filmMapper.fromDto(film))),
      tap(films => {
        this.updatePaginationStatus(films.length, constraints.paginationMode);
      }),
      map(films => this.parseFilmsList(films, constraints.paginationMode)),
      tap(films => {
        this.updateFirstAndLastFilms(films);
      }),
    );
  }

  /**
   * Method used for fetching next or previous page of films.
   * @param paginationMode - Next or previous page.
   */
  public changePage(paginationMode: PaginationModes): void {
    this.paginationMode$.next(paginationMode);
  }

  /**
   * Method for resetting to default values.
   */
  public reset(): void {
    this.firstAndLastVisibleFilms = null;
    this.isLastPage$.next(true);
    this.isFirstPage$.next(true);
    this.isSearching$.next(false);
  }

  /**
   * Method for changing sorting options.
   * @param options - New options.
   */
  public changeSorting(options: SortingOptions): void {
    this.reset();
    this.paginationMode$.next(PaginationModes.NEXT);
    this.sortingOptions$.next(options);
  }

  /**
   * Method for search by title.
   * @param searchingValue - Value to search.
   */
  public searchByTitle(searchingValue: string): void {
    this.reset();
    this.sortingOptions$.next({
      sortingField: SortingFields.Title,
      direction: 'asc',
      searchingValue,
    });
    if (searchingValue !== '') {
      this.isSearching$.next(true);
    } else {
      this.isSearching$.next(false);
    }
  }

  /**
   * Method used as a side-effect in film fetching. Checks if this is first or last page.
   * @param countOfFilms - Count of fetched films.
   * @param paginationMode - Pagination mode.
   */
  private updatePaginationStatus(countOfFilms: number, paginationMode: PaginationModes): void {
    if (this.firstAndLastVisibleFilms === null) {
      this.isLastPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
    } else if (paginationMode === PaginationModes.NEXT) {
      this.isLastPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
      this.isFirstPage$.next(false);
    } else {
      this.isFirstPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
      this.isLastPage$.next(false);
    }
  }

  /**
   * Method used as a side-effect in film fetching. Updates first and last films on the current page.
   * @param films - Films array.
   * Make sure that this array contains only films on the current page without film displaying existence of next or previous page.
   */
  private updateFirstAndLastFilms(films: Film[]): void {
    this.firstAndLastVisibleFilms = {
      firstVisibleFilm: films[0],
      lastVisibleFilm: films.slice(-1)[0],
    };
  }

  /**
   * Method used in films fetching. Removes film which displays existence of next or previous page.
   * @param films - Array of films.
   * @param paginationMode - Pagination mode.
   */
  private parseFilmsList(films: Film[], paginationMode: PaginationModes): Film[] {
    if (films.length !== COUNT_OF_FILMS_FOR_NEXT_PAGE) {
      return films;
    }
    if (paginationMode === PaginationModes.NEXT) {
      return films.slice(0, -1);
    }
    return films.slice(1);
  }
}
