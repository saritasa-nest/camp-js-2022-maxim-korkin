import { Box } from '@mui/material';
import { memo, VFC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'src/store';
import { selectFilmById } from 'src/store/films/selectors';

const FilmDetailsComponent: VFC = () => {
  const { filmId } = useParams();

  const film = useAppSelector(state => selectFilmById(state, Number(filmId)));

  if (film == null) {
    return <Navigate to="films" />;
  }

  return (
    <Box>
      <h1>{film.title}</h1>
    </Box>
  );
};

export const FilmDetails = memo(FilmDetailsComponent);
