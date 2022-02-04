/**
 * Function displays film not found page.
 */
export const displayFilmNotFound = (): void => {
  const filmDetailsContainer = document.querySelector('.film-details-container');

  if (filmDetailsContainer !== null) {
    const newElement = document.createElement('section');

    newElement.innerHTML = `
      <h4>404 - Film not found</h4>
      <a href="/">Back to the films table.</a>
    `;

    filmDetailsContainer.append(newElement);
  }
};
