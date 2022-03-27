import { Box, CircularProgress } from '@mui/material';
import { memo, useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { fetchFilmById } from 'src/store/films/dispatchers';
import { selectFilmById, selectIsFilmExists, selectIsFilmLoaded } from 'src/store/films/selectors';

const FilmDetailsComponent: VFC = () => {
  const filmId = Number(useParams().filmId);

  const dispatch = useDispatch();

  const film = useAppSelector(state => selectFilmById(state, filmId));
  const isFilmLoaded = useAppSelector(state => selectIsFilmLoaded(state, filmId));
  const isFilmExists = useAppSelector(selectIsFilmExists);

  useEffect(() => {
    if (!isFilmLoaded) {
      dispatch(fetchFilmById(filmId));
    }
  }, [dispatch, isFilmLoaded, filmId]);

  if (!isFilmExists) {
    return <Navigate to="films" />;
  }

  if (film == null) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <h1>{film.title}</h1>
    </Box>
  );
};

export const FilmDetails = memo(FilmDetailsComponent);
