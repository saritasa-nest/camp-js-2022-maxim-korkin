import { createAsyncThunk } from '@reduxjs/toolkit';
import { FilmsService } from 'src/api/services/films.service';
import { FilmsFetchingOptions } from '../../api/services/films.service';

export const fetchNextPageOfFilms = createAsyncThunk(
  'films/films',
  (options: FilmsFetchingOptions) => FilmsService.fetchFilms(options),
);

export const fetchFilmById = createAsyncThunk(
  'films/filmById',
  (id: number) => FilmsService.fetchFilmById(id),
);
