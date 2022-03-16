import { SortingDirection } from 'src/app/core/utils/enums/sorting-direction';
import { QueryConstraint, orderBy, limit, limitToLast, startAfter, endBefore, where } from 'firebase/firestore';

import { PaginationDirection } from '../../utils/enums/pagination-direction';
import { Film } from '../../models/film';

import { FilmsFetchOptions } from './films-fetch-options';
import { FilmSortingField } from './film-sorting-field';

/**
 * Function for getting sorting value from the film to use it as a constraint.
 * @param film - Film to get value from.
 * @param sortingField - Field we are sorting by.
 */
function getSortingFieldValue(film: Film, sortingField: FilmSortingField): string | number {
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
      return film.episodeId;
  }
}

/**
 * Function for getting QueryConstraints array for films fetching.
 * @param filmsFetchOptions - Options required for building query constraints.
 */
export function getFilmsQueryConstraints(
  { sortingOptions, paginationMode, firstVisibleFilm, lastVisibleFilm, countOfFilmsOnPage, titleSearchingValue }: FilmsFetchOptions,
): QueryConstraint[] {
  const queryConstraints: QueryConstraint[] = [];

  /** Need to sort exactly by title if the user wants to search by it. */
  if (titleSearchingValue !== '') {
    queryConstraints.push(orderBy(FilmSortingField.Title, SortingDirection.Ascending));

    const veryHighCodePoint = '\uf8ff';
    queryConstraints.push(where(FilmSortingField.Title, '>=', titleSearchingValue));
    queryConstraints.push(where(FilmSortingField.Title, '<=', `${titleSearchingValue}${veryHighCodePoint}`));
  } else {
    queryConstraints.push(orderBy(sortingOptions.sortingField, sortingOptions.direction));
  }

  /** If first and last visible films are equals to null then this is the first page loading.
   * So we do not need to add startAfter or endBefore constraints */
  if (firstVisibleFilm === null || lastVisibleFilm === null) {
    /** + 1 to know if there is next page. */
    queryConstraints.push(limit(countOfFilmsOnPage + 1));
    return queryConstraints;
  }

  if (paginationMode === PaginationDirection.Next) {
    queryConstraints.push(startAfter(getSortingFieldValue(lastVisibleFilm, sortingOptions.sortingField)));
    queryConstraints.push(limit(countOfFilmsOnPage + 1));
  } else if (paginationMode === PaginationDirection.Previous) {
    queryConstraints.push(endBefore(getSortingFieldValue(firstVisibleFilm, sortingOptions.sortingField)));
    queryConstraints.push(limitToLast(countOfFilmsOnPage + 2));
  }

  return queryConstraints;
}
