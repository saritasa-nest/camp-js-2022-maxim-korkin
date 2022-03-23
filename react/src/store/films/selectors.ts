import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

/** Selects films array. */
export const selectFilms = createSelector((state: RootState) => state.films.films, films => films);

/** Selects loading state. */
export const selectIsLoading = createSelector((state: RootState) => state.films.isLoading, isLoading => isLoading);

/** Selects error. */
export const selectError = createSelector((state: RootState) => state.films.error, error => error);
