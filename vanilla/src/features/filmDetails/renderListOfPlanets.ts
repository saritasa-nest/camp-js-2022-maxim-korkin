import { PlanetsService } from './../../services/planets/PlanetsService';
import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders list of planets of the film.
 * @param planetIds - Array with the ids of the planets.
 */
export const renderListOfPlanets = async(planetIds: readonly number[]): Promise<void> => {
  const listOfPlanets = await PlanetsService.fetchPlanetsListByPrimaryKeys(planetIds);

  let listOfPlanetsInnerHtml = '<h3>List of planets</h3>';

  listOfPlanets.forEach((planet, index) => {
    listOfPlanetsInnerHtml += `<p>${index + 1})${planet.name}</p>`;
  });

  appendSectionToSelector('.film-details-container', listOfPlanetsInnerHtml);
};
