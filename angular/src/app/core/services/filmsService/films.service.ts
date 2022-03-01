import { CollectionReference } from 'firebase/firestore';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { collection, Firestore } from '@angular/fire/firestore';

import { Film } from '../../models/Film';
import { FilmDto } from '../mappers/dto/FilmDto/FilmDto';
import { FilmMapper } from '../mappers/FilmMapper';

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
  ) {
    this.filmsCollection = collection(this.firestore, FILMS_COLLECTION_NAME) as CollectionReference<FilmDto>;
  }

  public fetchFilms(): Observable<Film[]> {
    return this.filmsCollection
  }
}
