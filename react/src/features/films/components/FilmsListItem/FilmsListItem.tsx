import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Film } from 'src/models/film';
import { useAppSelector } from 'src/store';
import { selectSelectedFilmId } from 'src/store/films/selectors';
import { setSelectedFilmId } from 'src/store/films/slice';

interface Props {
  /** Film. */
  readonly film: Film;
}

const FilmsListItemComponent: VFC<Props> = ({
  film,
}) => {
  const dispatch = useDispatch();

  const selectedFilmId = useAppSelector(selectSelectedFilmId);

  const onListItemClick = (): void => {
    dispatch(setSelectedFilmId(film.id));
  };

  return (
    <ListItem disablePadding component={Link} to={`film/${film.id}`}>
      <ListItemButton
        selected={film.id === selectedFilmId}
        onClick={onListItemClick}
      >
        <ListItemText primary={film.title} />
      </ListItemButton>
    </ListItem>
  );
};

export const FilmsListItem = memo(FilmsListItemComponent);
