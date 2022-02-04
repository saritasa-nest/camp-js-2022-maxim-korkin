import { Film } from './../../interfaces/films/film/Film';

/**
 * Function renders main information about the film.
 * @param film - Film to be rendered.
 */
export const renderMainInformation = (film: Film): void => {
  const filmDetailsContainer = document.querySelector('.film-details-container');

  if (filmDetailsContainer !== null) {
    const mainInformation = document.createElement('section');

    mainInformation.innerHTML = `
      <h2>${film.title}</h2>
      <p>${film.openingCrawl}</p>
      <p>Director: ${film.director}</p>
      <p>Producers: ${film.producer}</p>
      <p>Release date: ${film.releaseDate.toLocaleDateString()}</p>
    `;

    filmDetailsContainer.append(mainInformation);
  }
};
