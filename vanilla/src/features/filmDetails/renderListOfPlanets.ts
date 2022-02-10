import { PlanetsService } from './../../services/planets/PlanetsService';
import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders list of planets of the film.
 * @param planetIds - Array with the ids of the planets.
 */
export const renderListOfPlanets = async(planetIds: readonly number[]): Promise<void> => {
  let listOfPlanetsInnerHtml = '<h3>List of planets</h3>';

  try {
    const listOfPlanets = await PlanetsService.fetchPlanetsListByPrimaryKeys(planetIds);

    listOfPlanets.forEach((planet, index) => {
      listOfPlanetsInnerHtml += `<p>${index + 1})${planet.name}</p>`;
    });
  } catch (error: unknown) {
    listOfPlanetsInnerHtml += '<p>Failed to load list of planets</p>';
  }

  appendSectionToSelector('.film-details-container', listOfPlanetsInnerHtml);
};
