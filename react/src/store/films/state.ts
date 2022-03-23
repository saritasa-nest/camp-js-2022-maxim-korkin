import { Film } from 'src/models/film';

/**
 * Films state.
 */
export interface FilmsState {
  /**
   * Films.
   */
  readonly films: Film[];

  /**
   * Shows if we are loading next page of films.
   */
  readonly isLoading: boolean;

  /**
   * Error.
   */
  readonly error?: string;
}

export const initialState: FilmsState = {
  films: [],
  isLoading: false,
};
