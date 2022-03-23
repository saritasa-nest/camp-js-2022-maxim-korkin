import {
  AppBar, Box, Button, Stack,
} from '@mui/material';
import { memo, useEffect, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store';
import { signOut } from 'src/store/auth/dispatchers';
import { fetchNextPageOfFilms } from 'src/store/films/dispatchers';
import { selectFilms } from 'src/store/films/selectors';
import { FilmCard } from '../components/filmCard/FilmCard';

const FilmsPageComponent: VFC = () => {
  const dispatch = useDispatch();

  const films = useAppSelector(selectFilms);
  // const isLoading = useAppSelector(selectIsLoading);

  const handleSignOut = (): void => {
    dispatch(signOut());
  };

  useEffect(() => {
    dispatch(fetchNextPageOfFilms());
  }, [dispatch]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
        </AppBar>
      </Box>
      <Stack>
        {films.map(film => <FilmCard film={film} />)}
      </Stack>
    </>

  );
};

export const FilmsPage = memo(FilmsPageComponent);
