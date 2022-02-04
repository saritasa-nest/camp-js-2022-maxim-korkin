/**
 * Function renders list of characters of the film.
 * @param characterIds - Array with the ids of the charecters.
 */
export const renderListOfCharacters = (characterIds: readonly number[]): void => {
  const filmDetailsContainer = document.querySelector('.film-details-container');

  if (filmDetailsContainer !== null) {
    const listOfCharacters = document.createElement('section');

    listOfCharacters.innerHTML = `
      <h3>List of characters</h3>
      <p>${characterIds}</p>
    `;

    filmDetailsContainer.append(listOfCharacters);
  }
};
