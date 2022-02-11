import { Planet } from '../../interfaces/planets/planet/Planet';

import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders list of planets of the film.
 * @param listOfPlanets - Array containing planets data or null in case of failing loading the list of planets.
 */
export const renderListOfPlanets = (listOfPlanets: Planet[]): void => {
  let listOfPlanetsInnerHtml = '<h3>List of planets</h3>';

  if (listOfPlanets === null) {
    listOfPlanetsInnerHtml += '<p>Failed to load list of planets.</p>';
  } else {
    listOfPlanets.forEach((planet, index) => {
      listOfPlanetsInnerHtml += `<p>${index + 1})${planet.name}</p>`;
    });
  }

  appendSectionToSelector('.film-details-container', listOfPlanetsInnerHtml);
};
