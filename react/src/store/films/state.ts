import { FilmsFilters } from 'src/features/films/components/Filters/Filters';

/**
 * Films state. Films itself are added by entity manager.
 */
export interface FilmsState {
  /** Ids of films which need to show in the list. */
  readonly visibleFilmIds: readonly number[];

  /** Shows if we are loading next page of films. */
  readonly isLoading: boolean;

  /** Error for films list. */
  readonly filmsListError?: string;

  /** Error for film details. */
  readonly filmDetailsError?: string;

  /** Shows if there is next page of films. */
  readonly hasNext: boolean;

  /** Id of the currently selected film. */
  readonly selectedFilmId?: number;

  /** Filters values. */
  readonly filmsListFilters: FilmsFilters;
}
