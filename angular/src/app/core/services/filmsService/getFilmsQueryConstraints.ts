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
 * @param sortingOptions - Options used for sorting results.
 * @param paginationMode - Either next or previous. Next is also used for fetching the very first page.
 * @param firstAndLastVisibleFilms - Object with first and last films on the current page which are used to get next or previous page.
 * @param countOfFilmsOnPage - Count of films on the single page.
 */
export function getFilmsQueryConstraints(
  { sortingOptions, paginationMode, firstVisibleFilm, lastVisibleFilm, countOfFilmsOnPage, titleSearchingValue }: FilmsFetchOptions,
): QueryConstraint[] {
  const queryConstraints: QueryConstraint[] = [];

  if (titleSearchingValue !== '') {
    queryConstraints.push(orderBy(SortingFields.Title, 'asc'));

    const veryBigSymbol = '\uf8ff';
    queryConstraints.push(where(sortingOptions.sortingField, '>=', titleSearchingValue));
    queryConstraints.push(where(sortingOptions.sortingField, '<=', `${titleSearchingValue}${veryBigSymbol}`));

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

  queryConstraints.push(orderBy(sortingOptions.sortingField, sortingOptions.direction));

  /** If firstAndLastVisibleFilms is equals to null then this is the first page loading.
   * and we do not need to add startAfter or endBefore constraints */
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
