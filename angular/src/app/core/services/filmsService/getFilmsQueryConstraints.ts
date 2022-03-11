import { QueryConstraint, orderBy, limit, limitToLast, startAfter, endBefore, where } from 'firebase/firestore';

import { Film } from '../../models/Film';
import { FilmsFetchOptions } from '../../utils/interfaces/FilmsFetchOptions';
import { PaginationModes } from '../../utils/enums/PaginationModes';
import { SortingFields } from '../../utils/enums/SortingFields';

/**
 * Function for getting sorting value from the film to use it as a constraint.
 * @param film - Film to get value from.
 * @param sortingField - Field we are sorting by.
 */
function getSortingFieldValue(film: Film, sortingField: SortingFields): string | number {
  switch (sortingField) {
    case SortingFields.EpisodeId:
      return film.episodeId;
    case SortingFields.Title:
      return film.title;
    case SortingFields.ReleaseDate:
      return film.releaseDate.toISOString().slice(0, 10);
    case SortingFields.Director:
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
    queryConstraints.push(orderBy(SortingFields.Title, 'asc'));

    const veryBigSymbol = '\uf8ff';
    queryConstraints.push(where(SortingFields.Title, '>=', titleSearchingValue));
    queryConstraints.push(where(SortingFields.Title, '<=', `${titleSearchingValue}${veryBigSymbol}`));
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

  if (paginationMode === PaginationModes.NEXT) {
    queryConstraints.push(startAfter(getSortingFieldValue(lastVisibleFilm, sortingOptions.sortingField)));
    queryConstraints.push(limit(countOfFilmsOnPage + 1));
  } else if (paginationMode === PaginationModes.PREVIOUS) {
    queryConstraints.push(endBefore(getSortingFieldValue(firstVisibleFilm, sortingOptions.sortingField)));
    queryConstraints.push(limitToLast(countOfFilmsOnPage + 2));
  }

  return queryConstraints;
}