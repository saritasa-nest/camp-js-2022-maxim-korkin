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
  { sortingField, paginationMode, firstOrLastVisibleFilm }: FilmsQueryConstraintsOptions,
): QueryConstraint[] {
  const queryConstraints: QueryConstraint[] = [];

  queryConstraints.push(orderBy(sortingField));

  if (paginationMode === PaginationModes.NEXT) {
    queryConstraints.push(limit(3));
    if (firstOrLastVisibleFilm !== null) {
      queryConstraints.push(startAfter(getSortingFieldValue(firstOrLastVisibleFilm, sortingField)));
    }
  } else if (paginationMode === PaginationModes.PREVIOUS) {
    queryConstraints.push(limitToLast(3));
    if (firstOrLastVisibleFilm !== null) {
      queryConstraints.push(endBefore(getSortingFieldValue(firstOrLastVisibleFilm, sortingField)));
    }
  }

  return queryConstraints;
}
