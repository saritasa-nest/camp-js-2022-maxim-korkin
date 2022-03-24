import {
  query, getDocs, limit, QueryConstraint, startAfter, orderBy,
} from 'firebase/firestore';
import { Film } from 'src/models/film';
import { Firebase } from './firebase.service';
import { FilmDto } from '../dtos/film.dto';
import { FilmMapper } from '../mappers/film.mapper';

/** Options required to build query constraints for films fetching. */
export interface FilmsFetchingOptions {
  /** Count of films to fetch. */
  readonly countOfFilms: number;

  /** Last visible film. */
  readonly lastVisibleFilm: Film | null;
}

interface FilmsFetchCursor {
  /** Fetched films. */
  readonly films: readonly Film[];
  /** Shows if there is next page of films. */
  readonly hasNext: boolean;
}

/** Function for getting query constraints for films fetching based on options provided.
 * @param options - Options to builds constraints.
 */
function getFilmsQueryConstraints(options: FilmsFetchingOptions): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  /** Fetching +1 to know if there is next page. */
  constraints.push(limit(options.countOfFilms + 1));

  constraints.push(orderBy('fields.title'));

  if (options.lastVisibleFilm !== null) {
    constraints.push(startAfter(options.lastVisibleFilm.title));
  }

  return constraints;
}

/**
 * Films service.
 */
export namespace FilmsService {

  const FILMS_COLLECTION_NAME = 'films';

  const filmsCollection = Firebase.getCollectionReference<FilmDto>(FILMS_COLLECTION_NAME);

  /**
   * Function for fetching next page of films.
   * @param options - Fetching options.
   */
  export async function fetchFilms(options: FilmsFetchingOptions): Promise<FilmsFetchCursor> {
    const filmsQuery = query(filmsCollection, ...getFilmsQueryConstraints(options));
    const filmsSnapshot = await getDocs(filmsQuery);
    const hasNext = filmsSnapshot.docs.length === (options.countOfFilms + 1);
    return {
      films: Firebase.mapQuerySnapshotToArray<FilmDto, Film>(filmsSnapshot, FilmMapper.fromDto).slice(0, -1),
      hasNext,
    };
  }
}
