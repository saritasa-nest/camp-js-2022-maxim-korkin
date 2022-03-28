import { createSelector } from '@reduxjs/toolkit';
import { Film } from 'src/models/Film';
import { filmsAdapter } from './slice';
import { RootState } from '../store';

/** Selects loading state. */
export const selectIsLoadingFilms = createSelector(
  (state: RootState) => state.films.isLoading,
  isLoading => isLoading,
);

/** Selects error. */
export const selectFilmsListError = createSelector(
  (state: RootState) => state.films.filmsListError,
  error => error,
);

/** Selects flag which shows if there is next page of films for fetching. */
export const selectHasNextPageOfFilms = createSelector(
  (state: RootState) => state.films.hasNext,
  hasNext => hasNext,
);

/** Selects id of the currently selected film. */
export const selectSelectedFilmId = createSelector(
  (state: RootState) => state.films.selectedFilmId,
  selectedFilmId => selectedFilmId,
);

/** Selects flag which shows if the film with the given id already fetched. */
export const selectIsFilmLoaded = createSelector(
  (state: RootState, id: number) => state.films.ids.includes(id),
  isFilmLoaded => isFilmLoaded,
);

export const selectFilmDetailsError = createSelector(
  (state: RootState) => state.films.filmDetailsError,
  filmDetailsError => filmDetailsError,
);

export const selectFilmsListFilters = createSelector(
  (state: RootState) => state.films.filmsListFilters,
  filmsListFilters => filmsListFilters,
);

/** Selects visible films. */
export const selectVisibleFilms = createSelector(
  (state: RootState) => state.films.entities,
  (state: RootState) => state.films.visibleFilmIds,
  (films, visibleFilmIds) => {
    const visibleFilms: Film[] = [];
    visibleFilmIds.forEach(id => {
      const film = films[id];
      if (film != null) {
        visibleFilms.push(film);
      }
    });
    return visibleFilms;
  },
);

export const {
  /** Selects all films. */
  selectAll: selectAllFilms,
  /** Selects film by its id. */
  selectById: selectFilmById,
} = filmsAdapter.getSelectors<RootState>(state => state.films);
