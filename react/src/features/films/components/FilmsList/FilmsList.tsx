import { Box, CircularProgress, List } from '@mui/material';
import {
  memo, SyntheticEvent, useEffect, VFC,
} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store';
import { fetchNextPageOfFilms } from 'src/store/films/dispatchers';
import {
  selectAllFilms, selectFilmsListError, selectHasNextPageOfFilms, selectIsLoadingFilms,
} from 'src/store/films/selectors';
import { FilmsListItem } from '../FilmsListItem/FilmsListItem';

const COUNT_OF_FILMS_TO_FETCH = 20;

const FilmsListComponent: VFC = () => {
  const dispatch = useDispatch();

  const films = useAppSelector(selectAllFilms);
  const isLoading = useAppSelector(selectIsLoadingFilms);
  const hasNext = useAppSelector(selectHasNextPageOfFilms);
  const filmsListError = useAppSelector(selectFilmsListError);

  /* Function for checking if the element has been scrolled to the bottom
   and fetching next page of films. */
  const onScroll = (event: SyntheticEvent): void => {
    const isBottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop
    === event.currentTarget.clientHeight;
    if (isBottom && !isLoading && hasNext) {
      dispatch(fetchNextPageOfFilms(
        { countOfFilms: COUNT_OF_FILMS_TO_FETCH, lastVisibleFilm: films[films.length - 1] },
      ));
    }
  };

  // Fetching first page of films.
  useEffect(() => {
    dispatch(fetchNextPageOfFilms({ countOfFilms: COUNT_OF_FILMS_TO_FETCH, lastVisibleFilm: null }));
  }, [dispatch]);

  return (
    <Box style={{ height: '100%', overflowY: 'auto' }} onScroll={onScroll}>
      <List>
        {films.map(film => (
          <FilmsListItem
            film={film}
            key={film.id}
          />
        ))}
      </List>
      {isLoading && <CircularProgress />}
      {filmsListError && <div>{filmsListError}</div>}
    </Box>
  );
};

export const FilmsList = memo(FilmsListComponent);
