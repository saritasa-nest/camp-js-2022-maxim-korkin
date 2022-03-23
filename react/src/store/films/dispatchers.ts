import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from 'src/api/services/films.service';

export const fetchNextPageOfFilms = createAsyncThunk(
  'films/films',
  () => FilmsService.fetchFilms(),
);
