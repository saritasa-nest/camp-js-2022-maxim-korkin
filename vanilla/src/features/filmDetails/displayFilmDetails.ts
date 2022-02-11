import { Film } from '../../interfaces/films/film/Film';

import { PlanetsService } from './../../services/planets/PlanetsService';
import { CharactersService } from './../../services/characters/CharactersService';
import { renderListOfPlanets } from './renderListOfPlanets';
import { renderListOfCharacters } from './renderListOfCharacters';
import { renderMainInformation } from './renderMainInformation';

/**
 * Function which displays information about the film.
 * @param film - Film to display information about.
 */
export const displayFilmDetails = async(film: Film): Promise<void> => {
  renderMainInformation(film);

  try {
    const listOfCharacters = await CharactersService.fetchCharactersListByPrimaryKeys(film.characterIds);

    renderListOfCharacters(listOfCharacters);
  } catch (error: unknown) {
    renderListOfCharacters(null);
  }

  try {
    const listOfPlanets = await PlanetsService.fetchPlanetsListByPrimaryKeys(film.characterIds);

    renderListOfPlanets(listOfPlanets);
  } catch (error: unknown) {
    renderListOfCharacters(null);
  }
};
