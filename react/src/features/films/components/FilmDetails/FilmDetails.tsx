import { Box, CircularProgress, Typography } from '@mui/material';
import { memo, useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { fetchFilmById } from 'src/store/films/dispatchers';
import {
  selectFilmById, selectIsFilmLoaded, selectFilmDetailsError,
} from 'src/store/films/selectors';

const FilmDetailsComponent: VFC = () => {
  const filmId = Number(useParams().filmId);

  const dispatch = useDispatch();

  const film = useAppSelector(state => selectFilmById(state, filmId));
  const isFilmLoaded = useAppSelector(state => selectIsFilmLoaded(state, filmId));
  const error = useAppSelector(selectFilmDetailsError);

  useEffect(() => {
    if (!isFilmLoaded) {
      dispatch(fetchFilmById(filmId));
    }
  }, [dispatch, isFilmLoaded, filmId]);

  if (film == null) {
    return <CircularProgress />;
  }

  if (error) {
    return <Navigate to="films" />;
  }

  return (
    <Box>
      <Typography variant="h2">{film.title}</Typography>
      <Typography variant="body1">{film.openingCrawl}</Typography>
      <Typography variant="subtitle1">{`Release date: ${film.releaseDate.toDateString()}`}</Typography>
      <Typography variant="subtitle1">{`Director: ${film.director}`}</Typography>
      <Typography variant="subtitle1">Producers:</Typography>
      <ul>
        {film.producers.map(producer => <li key={producer}>{producer}</li>)}
      </ul>
    </Box>
  );
};

export const FilmDetails = memo(FilmDetailsComponent);
