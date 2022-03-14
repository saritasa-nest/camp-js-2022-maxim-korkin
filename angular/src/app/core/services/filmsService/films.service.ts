import { CollectionReference, getDocs, query, where } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map, first, defer, switchMap } from 'rxjs';
import { collection, deleteDoc, Firestore } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

import { Film } from '../../models/Film';
import { FilmDto } from '../mappers/dto/FilmDto/FilmDto.dto';
import { FilmMapper } from '../mappers/FilmMapper.service';
import { FilmsFetchOptions } from '../../../features/films/interfaces/FilmsFetchOptions';

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
   * Method for fetching films with the constraints builded from the fetch options provided.
   * @param fetchOptions - Options required for building query.
   */
  public fetchFilms(fetchOptions: FilmsFetchOptions): Observable<Film[]> {
    const filmsQuery = query(this.filmsCollection, ...getFilmsQueryConstraints(fetchOptions));
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
   * Removes film by primary key.
   * @param pk - Primary key of the film to remove.
   */
  public removeFilmByPrimaryKey(pk: number): Observable<void> {
    const filmQuery = query(this.filmsCollection, where('pk', '==', pk));
    return defer(() => getDocs(filmQuery)).pipe(
      map(snapshot => snapshot.docs[0].ref),
      switchMap(ref => defer(() => deleteDoc(ref))),
    );
  }
}
