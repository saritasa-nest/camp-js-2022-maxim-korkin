import { Box, CircularProgress, List } from '@mui/material';
import {
  memo, SyntheticEvent, useEffect, VFC,
} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/store';
import { fetchNextPageOfFilms } from 'src/store/films/dispatchers';
import {
  selectFilmsListError, selectFilmsListFilters, selectHasNextPageOfFilms, selectIsLoadingFilms, selectVisibleFilms,
} from 'src/store/films/selectors';
import { FilmsListItem } from '../FilmsListItem/FilmsListItem';

const COUNT_OF_FILMS_TO_FETCH = 20;

const FilmsListComponent: VFC = () => {
  const dispatch = useDispatch();

  const films = useAppSelector(selectVisibleFilms);
  const isLoading = useAppSelector(selectIsLoadingFilms);
  const hasNext = useAppSelector(selectHasNextPageOfFilms);
  const filters = useAppSelector(selectFilmsListFilters);

  const filmsListError = useAppSelector(selectFilmsListError);

  /* Function for checking if the element has been scrolled to the bottom
   and fetching next page of films. */
  const onScroll = (event: SyntheticEvent): void => {
    const isBottom = event.currentTarget.scrollHeight - event.currentTarget.scrollTop
    === event.currentTarget.clientHeight;
    if (isBottom && !isLoading && hasNext) {
      dispatch(fetchNextPageOfFilms(
        { countOfFilms: COUNT_OF_FILMS_TO_FETCH, lastVisibleFilm: films[films.length - 1], filters },
      ));
    }
  };

  // Fetching first page of films.
  useEffect(() => {
    dispatch(fetchNextPageOfFilms({ countOfFilms: COUNT_OF_FILMS_TO_FETCH, lastVisibleFilm: null, filters }));
  }, [dispatch, filters]);

  return (
    <Box sx={{ height: '100%', maxHeight: '640px', overflowY: 'auto' }} onScroll={onScroll}>
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
