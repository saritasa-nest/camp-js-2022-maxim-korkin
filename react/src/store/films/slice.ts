import { createSlice } from '@reduxjs/toolkit';
import { fetchNextPageOfFilms } from './dispatchers';

import { initialState } from './state';

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(fetchNextPageOfFilms.pending, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchNextPageOfFilms.fulfilled, (state, action) => {
      state.films.push(...action.payload);
      state.isLoading = false;
    })
    .addCase(fetchNextPageOfFilms.rejected, (state, action) => {
      state.error = action.error.message;
    }),
});
