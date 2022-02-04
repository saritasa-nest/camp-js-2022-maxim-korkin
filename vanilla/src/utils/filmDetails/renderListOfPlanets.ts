/**
 * Function renders list of planets of the film.
 * @param planetIds - Array with the ids of the planets.
 */
export const renderListOfPlanets = (planetIds: readonly number[]): void => {
  const filmDetailsContainer = document.querySelector('.film-details-container');

  if (filmDetailsContainer !== null) {
    const listOfPlanets = document.createElement('section');

    listOfPlanets.innerHTML = `
      <h3>List of planets</h3>
      <p>${planetIds}</p>
    `;

    filmDetailsContainer.append(listOfPlanets);
  }
};
