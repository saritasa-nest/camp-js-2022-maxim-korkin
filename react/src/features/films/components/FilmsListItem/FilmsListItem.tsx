import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { memo, VFC } from 'react';
import { Film } from 'src/models/film';

interface Props {
  /** Film. */
  readonly film: Film;
}

const FilmsListItemComponent: VFC<Props> = ({ film }) => (
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemText primary={film.title} />
    </ListItemButton>
  </ListItem>
);

export const FilmsListItem = memo(FilmsListItemComponent);
