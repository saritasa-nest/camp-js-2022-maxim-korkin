import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders list of planets of the film.
 * @param planetIds - Array with the ids of the planets.
 */
export const renderListOfPlanets = (planetIds: readonly number[]): void => {
  const listOfPlanetsInnerHtml = `
    <h3>List of planets</h3>
    <p>${planetIds}</p>
  `;

  appendSectionToSelector('.film-details-container', listOfPlanetsInnerHtml);
};
