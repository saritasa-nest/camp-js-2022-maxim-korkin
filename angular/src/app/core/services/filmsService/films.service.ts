import { CollectionReference, orderBy, query, limit, Query, endAt, limitToLast, startAt } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map, tap, filter } from 'rxjs';
import { collection, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

import { Film } from '../../models/Film';
import { FilmDto } from '../mappers/dto/FilmDto/FilmDto';
import { FilmMapper } from '../mappers/FilmMapper.service';

import { PaginationModes } from './PaginationModes';

const FILMS_COLLECTION_NAME = 'films';

const COUNT_OF_FILMS_ON_THE_PAGE = 2;

/**
 * Films service.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmsService {

  private readonly filmsCollection: CollectionReference<FilmDto>;

  private lastVisibleFilm: Film | null = null;

  private firstVisibleFilm: Film | null = null;

  private afterLastVisibleFilm: Film | null = null;

  private beforeFirstVisibleFilm: Film | null = null;

  public constructor(
    private readonly firestore: Firestore,
    private readonly filmMapper: FilmMapper,
  ) {
    this.filmsCollection = collection(this.firestore, FILMS_COLLECTION_NAME) as CollectionReference<FilmDto>;
  }

  /**
   * Method for fetching films.
   */
  public fetchFilms(paginationMode: PaginationModes): Observable<Film[]> {
    let filmsQuery: Query<FilmDto>;
    if (paginationMode === PaginationModes.INIT) {
      filmsQuery = query(this.filmsCollection, orderBy('fields.episode_id'), limit(COUNT_OF_FILMS_ON_THE_PAGE + 1));
      return collectionData<FilmDto>(filmsQuery).pipe(
        map(films => films.map(film => this.filmMapper.fromDto(film))),
        tap(films => {
          if (films.length === 3) {
            this.afterLastVisibleFilm = films[2];
            this.lastVisibleFilm = films[1];
            this.firstVisibleFilm = films[0];
          }
        }),
        map(films => films.filter((film, index) => index !== 2)),
      );
    } else if (paginationMode === PaginationModes.NEXT) {
      filmsQuery = query(this.filmsCollection,
        orderBy('fields.episode_id'),
        startAt(this.lastVisibleFilm?.episodeId),
        limit(COUNT_OF_FILMS_ON_THE_PAGE + 2));
    } else {
      filmsQuery = query(this.filmsCollection,
        orderBy('fields.episode_id'),
        endAt(this.firstVisibleFilm?.episodeId),
        limitToLast(COUNT_OF_FILMS_ON_THE_PAGE + 2));
    }

    return collectionData<FilmDto>(filmsQuery).pipe(
      map(films => films.map(film => this.filmMapper.fromDto(film))),
      tap(films => {
        if (films.length === 4) {
          this.afterLastVisibleFilm = films[3];
          this.lastVisibleFilm = films[2];
          this.firstVisibleFilm = films[1];
          this.beforeFirstVisibleFilm = films[0];
        }
      }),
      map(films => films.filter((film, index) => index !== 0 && index !== 3)),
    );
  }
}
