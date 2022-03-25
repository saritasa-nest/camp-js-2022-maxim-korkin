import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Film } from 'src/models/film';
import { fetchNextPageOfFilms } from './dispatchers';
import { FilmsState } from './state';

export const filmsAdapter = createEntityAdapter<Film>({
  selectId: film => film.id,
});

const initialState = filmsAdapter.getInitialState<FilmsState>({
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
      state.hasNext = action.payload.hasNext;
      state.isLoading = false;
    })
    .addCase(fetchNextPageOfFilms.rejected, (state, action) => {
      state.filmsListError = action.error.message;
      state.isLoading = false;
    }),
});

export const { setSelectedFilmId } = filmsSlice.actions;
