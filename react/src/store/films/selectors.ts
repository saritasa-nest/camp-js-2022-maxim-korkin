import { createSelector } from '@reduxjs/toolkit';
import { filmsAdapter } from './slice';
import { RootState } from '../store';

/** Selects loading state. */
export const selectIsLoadingFilms = createSelector((state: RootState) => state.films.isLoading, isLoading => isLoading);

/** Selects error. */
export const selectFilmsError = createSelector((state: RootState) => state.films.error, error => error);

export const selectHasNextPageOfFilms = createSelector((state: RootState) => state.films.hasNext, hasNext => hasNext);

/** Selects all films. */
export const {
  selectAll: selectAllFilms,
  selectById: selectFilmById,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
