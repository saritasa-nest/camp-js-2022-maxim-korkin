import { FilmSortingField } from 'src/models/FilmSortingField';

/** Possible sorting fields in db. */
export const SortingFieldDto: Record<FilmSortingField, string> = {
  [FilmSortingField.title]: 'fields.title',
  [FilmSortingField.releaseDate]: 'fields.release_date',
  [FilmSortingField.director]: 'fields.director',
};
