import { QueryConstraint, orderBy, limit, limitToLast, startAfter, endBefore } from 'firebase/firestore';

import { Film } from '../../models/Film';

import { FilmsQueryConstraintsOptions } from './enums/FilmsQueryConstraintsOptions';
import { PaginationModes } from './enums/PaginationModes';
import { SortingFields } from './enums/SortingFields';

/**
 * Function for getting sorting value from the film to use it as a constraint.
 * @param film - Film to get value from.
 * @param sortingField - Field we are sorting by.
 */
function getSortingFieldValue(film: Film, sortingField: SortingFields): unknown {
  switch (sortingField) {
    case SortingFields.EpisodeId:
      return film.episodeId;
    case SortingFields.Title:
      return film.title;
    default:
      return film.episodeId;
  }
}

/**
 * Function for getting QueryConstraints array for films fetching.
 * @param param0 - Object with values for constraints.
 */
export function getFilmsQueryConstraints(
  { sortingField, paginationMode, firstAndLastVisibleFilms, countOfFilmsOnPage }: FilmsQueryConstraintsOptions,
): QueryConstraint[] {
  const queryConstraints: QueryConstraint[] = [];

  queryConstraints.push(orderBy(sortingField));

  /** If firstAndLastVisibleFilms is equals to null then this is the first page loading.
   * and we do not need to add startAfter or endBefore constraint */
  if (firstAndLastVisibleFilms === null) {
    /** Adding + 1 to know if there is next or previous page. */
    queryConstraints.push(limit(countOfFilmsOnPage + 1));
    return queryConstraints;
  }

  if (paginationMode === PaginationModes.NEXT) {
    queryConstraints.push(startAfter(getSortingFieldValue(firstAndLastVisibleFilms.lastVisibleFilm, sortingField)));
    queryConstraints.push(limit(countOfFilmsOnPage + 1));
  } else if (paginationMode === PaginationModes.PREVIOUS) {
    queryConstraints.push(endBefore(getSortingFieldValue(firstAndLastVisibleFilms.firstVisibleFilm, sortingField)));
    queryConstraints.push(limitToLast(countOfFilmsOnPage + 2));
  }

  return queryConstraints;
}
