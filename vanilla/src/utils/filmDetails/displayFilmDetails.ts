import { Film } from './../../interfaces/films/film/Film';

import { renderListOfPlanets } from './renderListOfPlanets';

import { renderListOfCharacters } from './renderListOfCharacters';

import { renderMainInformation } from './renderMainInformation';

/**
 * Function which displays information about the film.
 * @param film - Film to display information about.
 */
export const displayFilmDetails = (film: Film): void => {
  renderMainInformation(film);

  renderListOfCharacters(film.characterIds);

  renderListOfPlanets(film.planetIds);
};
