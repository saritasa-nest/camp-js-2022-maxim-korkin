import {
  query, getDocs, limit, QueryConstraint, startAfter, orderBy, where,
} from 'firebase/firestore';
import { FilmsFilters } from 'src/features/films/components/Filters/Filters';
import { Film } from 'src/models/Film';
import { FilmSortingField } from 'src/models/FilmSortingField';
import { Pagination } from './Pagination';
import { Firebase } from './firebase.service';
import { FilmDto } from '../dtos/film.dto';
import { FilmMapper } from '../mappers/film.mapper';
import { SortingFieldDto } from '../dtos/sortingFieldDto.dto';

/** Options required to build query constraints. */
export interface FilmsFetchingOptions {
  /** Count of films to fetch. */
  readonly countOfFilms: number;

  /** Last visible film. */
  readonly lastVisibleFilm: Film | null;

  /** Filter options. */
  readonly filters: FilmsFilters;
}

/** Function for getting value of the film field we are sorting by.
 * @param film - Film to get value from.
 * @param sortingField - Field.
 */
function getSortingFieldValue(film: Film, sortingField: FilmSortingField): string {
  switch (sortingField) {
    case FilmSortingField.title:
      return film.title;
    case FilmSortingField.director:
      return film.director;
    case FilmSortingField.releaseDate:
      return film.releaseDate.toISOString();
    default:
      throw new Error(`Failed to recognize '${sortingField}' sorting field.`);
  }
}

/** Function for getting query constraints for films fetching based on options provided.
 * @param options - Options to builds constraints.
 */
function getFilmsQueryConstraints(options: FilmsFetchingOptions): QueryConstraint[] {
  const constraints: QueryConstraint[] = [];

  /** Fetching +1 to know if there is next page. */
  constraints.push(limit(options.countOfFilms + 1));

  const { searchValue, sortingField } = options.filters;

  if (searchValue.trim() !== '') {
    constraints.push(orderBy(SortingFieldDto.Title));
    /* Adding searching constraint.
       The \uf8ff character used in the query is a very high code point in the Unicode range.
       Because it is after most regular characters in Unicode,
       the query matches all values that start with searching value. */
    const veryHighCodePoint = '\uf8ff';
    constraints.push(where(SortingFieldDto.Title, '>=', searchValue));
    constraints.push(where(SortingFieldDto.Title, '<=', `${searchValue}${veryHighCodePoint}`));
    if (options.lastVisibleFilm !== null) {
      constraints.push(startAfter(getSortingFieldValue(options.lastVisibleFilm, FilmSortingField.title)));
    }
  } else {
    constraints.push(orderBy(SortingFieldDto[sortingField]));
    if (options.lastVisibleFilm !== null) {
      constraints.push(startAfter(getSortingFieldValue(options.lastVisibleFilm, options.filters.sortingField)));
    }
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
  export async function fetchFilms(options: FilmsFetchingOptions): Promise<Pagination<Film>> {
    const filmsQuery = query(filmsCollection, ...getFilmsQueryConstraints(options));
    const filmsSnapshot = await getDocs(filmsQuery);
    const hasNext = filmsSnapshot.docs.length === (options.countOfFilms + 1);
    const films: Film[] = hasNext
      ? Firebase.mapQuerySnapshotToArray<FilmDto, Film>(filmsSnapshot, FilmMapper.fromDto).slice(0, -1)
      : Firebase.mapQuerySnapshotToArray<FilmDto, Film>(filmsSnapshot, FilmMapper.fromDto);
    return {
      entities: films,
      hasNext,
    };
  }

  /**
   * Fetches film by id.
   * @param id - Id of the film to fetch.
   * @returns - Fetched film.
   * @throws - Error in case film with provided id doesn't exist.
   */
  export async function fetchFilmById(id: number): Promise<Film> {
    const filmsQuery = query(filmsCollection, where('pk', '==', id), limit(1));
    const filmsSnapshot = await getDocs(filmsQuery);
    if (filmsSnapshot.empty) {
      throw new Error(`Film with id ${id} doesn't exist`);
    }
    return FilmMapper.fromDto(filmsSnapshot.docs[0].data());
  }
}
