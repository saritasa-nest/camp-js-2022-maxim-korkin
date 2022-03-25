/**
 * Films state. Films itself are added by entity manager.
 */
export interface FilmsState {
  /** Shows if we are loading next page of films. */
  readonly isLoading: boolean;

  /** Error. */
  readonly filmsListError?: string;

  /** Shows if there is next page of films. */
  readonly hasNext: boolean;

  /** Id of the currently selected film. */
  readonly selectedFilmId?: number;
}
