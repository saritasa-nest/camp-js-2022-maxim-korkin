import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { fetchNextPageOfFilms, fetchFilmById } from './dispatchers';
import { FilmsState } from './state';

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

const initialState = filmsAdapter.getInitialState<FilmsState>({
  visibleFilmIds: [],
  isLoading: false,
  filmsListError: undefined,
  hasNext: true,
});

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setSelectedFilmId: (state, action: PayloadAction<number>) => {
      state.selectedFilmId = action.payload;
    },
  },
  extraReducers: builder => builder
    .addCase(fetchNextPageOfFilms.pending, state => {
      state.isLoading = true;
      state.filmsListError = undefined;
    })
    .addCase(fetchNextPageOfFilms.fulfilled, (state, action) => {
      filmsAdapter.addMany(state, action.payload.films);
      action.payload.films.forEach(film => state.visibleFilmIds.push(film.id));
      state.hasNext = action.payload.hasNext;
      state.isLoading = false;
    })
    .addCase(fetchNextPageOfFilms.rejected, (state, action) => {
      state.filmsListError = action.error.message;
      state.isLoading = false;
    })
    .addCase(fetchFilmById.fulfilled, (state, action) => {
      if (action.payload !== null) {
        filmsAdapter.addOne(state, action.payload);
        state.selectedFilmId = action.payload.id;
      }
      state.filmDetailsError = undefined;
    })
    .addCase(fetchFilmById.rejected, (state, action) => {
      if (action.error.message) {
        state.filmDetailsError = action.error.message;
      }
    }),
});

export const { setSelectedFilmId } = filmsSlice.actions;
