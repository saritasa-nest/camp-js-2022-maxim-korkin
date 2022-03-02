import { CollectionReference, query } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject, combineLatest, switchMap, tap } from 'rxjs';
import { collection, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

import { Film } from '../../models/Film';
import { FilmDto } from '../mappers/dto/FilmDto/FilmDto';
import { FilmMapper } from '../mappers/FilmMapper.service';

import { FilmsQueryConstraintsOptions } from './enums/FilmsQueryConstraintsOptions';
import { getFilmsQueryConstraints } from './getFilmsQueryConstraints';
import { SortingFields } from './enums/SortingFields';
import { PaginationModes } from './enums/PaginationModes';

const FILMS_COLLECTION_NAME = 'films';

/**
 * Films service.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  public readonly films$: Observable<Film[]>;

  public isLastPage$ = new BehaviorSubject(true);

  public isFirstPage$ = new BehaviorSubject(true);

  private readonly paginationMode$ = new BehaviorSubject<PaginationModes>(PaginationModes.NEXT);

  private readonly sortingField$ = new BehaviorSubject<SortingFields>(SortingFields.EpisodeId);

  private firstVisibleFilm: Film | null = null;

  private lastVisibleFilm: Film | null = null;

  private readonly filmsCollection: CollectionReference<FilmDto>;

  public constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.filmsCollection = collection(this.firestore, FILMS_COLLECTION_NAME) as CollectionReference<FilmDto>;

    this.films$ = combineLatest([this.paginationMode$, this.sortingField$]).pipe(
      map(([paginationMode, sortingField]) => ({ paginationMode, sortingField, firstOrLastVisibleFilm: this.lastVisibleFilm })),
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
        this.updateFirstAndLastFilms(films);
      }),
      map(films => films.slice(0, -1)),
    );
  }

  /**
   *
   * @param paginationMode
   */
  public changePage(paginationMode: PaginationModes): void {
    this.paginationMode$.next(paginationMode);
  }

  public resetFirstAndLastFilm(): void {
    this.firstVisibleFilm = null;
    this.lastVisibleFilm = null;
  }

  private updatePaginationStatus(countOfFilms: number, paginationMode: PaginationModes): void {
    if (countOfFilms !== 3) {
      if (paginationMode === PaginationModes.NEXT) {
        this.isLastPage$.next(true);
      } else {
        this.isFirstPage$.next(true);
      }
    }
  }

  private updateFirstAndLastFilms(films: Film[]): void {
    this.firstVisibleFilm = films[0];

    this.lastVisibleFilm = films[1];
  }
}
