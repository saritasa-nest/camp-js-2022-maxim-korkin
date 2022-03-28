import { Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { memo, VFC } from 'react';
import { useDispatch } from 'react-redux';
import { FormikSelect } from 'src/components/FormikSelect/FormikSelect';
import { FormikTextField } from 'src/components/FormikTextField/FormikTextField';
import { FilmSortingField } from 'src/models/FilmSortingField';
import { useAppSelector } from 'src/store';
import { selectFilmsListFilters, selectIsLoadingFilms } from 'src/store/films/selectors';
import { removeVisibleFilms, setFilmsFilters } from 'src/store/films/slice';

/** Filters values. */
export interface FilmsFilters {
  /** Title searching value. */
  readonly searchValue: string;

  /** Sorting field. */
  readonly sortingField: FilmSortingField;
}

const FiltersComponent: VFC = () => {
  const dispatch = useDispatch();

  const filter = useAppSelector(selectFilmsListFilters);

  const isLoading = useAppSelector(selectIsLoadingFilms);

  const onSubmit = (values: FilmsFilters): void => {
    if (filter.searchValue !== values.searchValue || filter.sortingField !== values.sortingField) {
      dispatch(removeVisibleFilms());
      dispatch(setFilmsFilters(values));
    }
  };

  const initialValues: FilmsFilters = {
    searchValue: '',
    sortingField: FilmSortingField.title,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Form>
        <FormikTextField name="searchValue" label="title" />
        <FormikSelect
          name="sortingField"
          label="Sort"
          options={[
            FilmSortingField.title,
            FilmSortingField.director,
            FilmSortingField.releaseDate,
          ]}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" disabled={isLoading}>Apply</Button>
      </Form>
    </Formik>
  );
};

export const Filters = memo(FiltersComponent);
