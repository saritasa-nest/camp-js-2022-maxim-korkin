import { Film } from '../../interfaces/films/film/Film';

import { renderListOfPlanets } from './renderListOfPlanets';

import { renderListOfCharacters } from './renderListOfCharacters';

import { renderMainInformation } from './renderMainInformation';

/**
 * Function which displays information about the film.
 * @param film - Film to display information about.
 */
export const displayFilmDetails = async(film: Film): Promise<void> => {
  renderMainInformation(film);

  await renderListOfCharacters(film.characterIds);

  await renderListOfPlanets(film.planetIds);
};
