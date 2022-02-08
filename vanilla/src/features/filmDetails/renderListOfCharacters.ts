import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders list of characters of the film.
 * @param characterIds - Array with the ids of the charecters.
 */
export const renderListOfCharacters = (characterIds: readonly number[]): void => {
  const listOfCharactersInnerHtml = `
    <h3>List of characters</h3>
    <p>${characterIds}</p>
  `;

  appendSectionToSelector('.film-details-container', listOfCharactersInnerHtml);
};
