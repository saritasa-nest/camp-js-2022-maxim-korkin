import { FilmsService } from './../../services/films/FilmsService';

/**
 * Function which deletes the film with provided primary key and redirects user to the table page.
 * @param primaryKey - Primary key of the film to delete.
 */
export const confirmDeletion = async(primaryKey: number): Promise<void> => {
  await FilmsService.deleteFilmByPrimaryKey(primaryKey);

  document.location = '/';
};
