import { Grid } from '@mui/material';
import { memo, VFC } from 'react';
import { FilmsList } from '../components/FilmsList/FilmsList';
import { NavBar } from '../components/NavBar/NavBar';

const FilmsPageComponent: VFC = () => (
  <>
    <NavBar />
    <Grid container style={{ height: '90vh' }}>
      <Grid item xs={4} style={{ height: '100%' }}>
        <FilmsList />
      </Grid>
    </Grid>
  </>
);

export const FilmsPage = memo(FilmsPageComponent);
