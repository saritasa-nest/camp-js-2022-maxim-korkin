import { Card, CardContent, Typography } from '@mui/material';
import { memo, VFC } from 'react';
import { Film } from 'src/models/film';

interface FilmCardProps {
  /** Film. */
  readonly film: Film;
}

const FilmCardComponent: VFC<FilmCardProps> = (props: FilmCardProps) => {
  const { film } = props;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {film.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const FilmCard = memo(FilmCardComponent);
