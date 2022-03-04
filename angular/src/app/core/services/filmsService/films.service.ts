import { CollectionReference, query } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { collection, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

import { Film } from '../../models/Film';
import { FilmDto } from '../mappers/dto/FilmDto/FilmDto';
import { FilmMapper } from '../mappers/FilmMapper.service';
import { FilmsFetchOptions } from '../../utils/interfaces/FilmsFetchOptions';

import { getFilmsQueryConstraints } from './getFilmsQueryConstraints';

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
   * Method for fetching films.
   * @param fetchOptions - Options required for building query.
   */
  public fetchFilms(fetchOptions: FilmsFetchOptions): Observable<Film[]> {
    const filmsQuery = query(this.filmsCollection, ...getFilmsQueryConstraints(fetchOptions));
    return collectionData<FilmDto>(filmsQuery).pipe(
      map(films => films.map(film => this.filmMapper.fromDto(film))),
    );
  }
}
