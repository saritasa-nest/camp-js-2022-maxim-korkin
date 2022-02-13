import { Film } from '../../interfaces/films/domain/Film';
import { PlanetsService } from '../../services/planets/PlanetsService';
import { CharactersService } from '../../services/characters/CharactersService';

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
    const characters = await CharactersService.fetchCharactersListByPrimaryKeys(film.characterIds);

    renderListOfCharacters(characters);
  } catch (error: unknown) {
    renderListOfCharacters(null);
  }

  try {
    const planets = await PlanetsService.fetchPlanetsListByPrimaryKeys(film.characterIds);

    renderListOfPlanets(planets);
  } catch (error: unknown) {
    renderListOfCharacters(null);
  }
};
