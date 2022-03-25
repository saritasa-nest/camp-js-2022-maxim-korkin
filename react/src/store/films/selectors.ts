import { createSelector } from '@reduxjs/toolkit';
import { filmsAdapter } from './slice';
import { RootState } from '../store';

/** Selects loading state. */
export const selectIsLoadingFilms = createSelector((state: RootState) => state.films.isLoading, isLoading => isLoading);

/** Selects error. */
export const selectFilmsListError = createSelector((state: RootState) => state.films.filmsListError, error => error);

/** Selects flag which shows if there is next page of films for fetching. */
export const selectHasNextPageOfFilms = createSelector((state: RootState) => state.films.hasNext, hasNext => hasNext);

export const selectSelectedFilmId = createSelector(
  (state: RootState) => state.films.selectedFilmId,
  selectedFilmId => selectedFilmId,
);

export const {
  /** Selects all films. */
  selectAll: selectAllFilms,
  /** Selects films by its id. */
  selectById: selectFilmById,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
