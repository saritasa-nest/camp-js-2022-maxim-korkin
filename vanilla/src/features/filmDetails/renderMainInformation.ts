import { Film } from '../../interfaces/films/domain/Film';

import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders main information about the film.
 * @param film - Film to be rendered.
 */
export const renderMainInformation = (film: Film): void => {
  const mainInformationInnerHtml = `
    <h2>${film.title}</h2>
    <p>${film.openingCrawl}</p>
    <p>Director: ${film.director}</p>
    <p>Producers: ${film.producer}</p>
    <p>Release date: ${film.releaseDate.toLocaleDateString()}</p>
  `;

  appendSectionToSelector('.film-details-container', mainInformationInnerHtml);
};
