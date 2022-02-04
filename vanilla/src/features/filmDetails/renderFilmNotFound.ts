import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders film not found page.
 */
export const renderFilmNotFound = (): void => {
    const filmNotFoundInnerHtml = `
      <h4>404 - Film not found</h4>
      <a href="/">Back to the films table.</a>
    `;

    appendSectionToSelector('.film-details-container', filmNotFoundInnerHtml);
};
