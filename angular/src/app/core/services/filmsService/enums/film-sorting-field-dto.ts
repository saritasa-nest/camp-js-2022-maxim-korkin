import { FilmSortingField } from 'src/app/core/services/filmsService/enums/film-sorting-field';

/** Dto sorting film fields. */
export type FilmSortingFieldDto = 'fields.title' | 'fields.episode_id' | 'fields.release_date' | 'fields.director';

/** Maps FilmSortingField to dto. */
export const filmSortingFieldDtoMap: Record<FilmSortingField, FilmSortingFieldDto> = {
  [FilmSortingField.Title]: 'fields.title',
  [FilmSortingField.EpisodeId]: 'fields.episode_id',
  [FilmSortingField.ReleaseDate]: 'fields.release_date',
  [FilmSortingField.Director]: 'fields.director',
};
