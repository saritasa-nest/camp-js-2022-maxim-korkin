import { Character } from '../../interfaces/characters/character/Character';

import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders list of characters of the film.
 * @param listOfCharacters - Array containing characters data or null in case of failing loading the list of characters.
 */
export const renderListOfCharacters = (listOfCharacters: Character[] | null): void => {
  let listOfCharactersInnerHtml = '<h3>List of characters</h3>';

  if (listOfCharacters === null) {
    listOfCharactersInnerHtml += '<p>Failed to load list of characters</p>';
  } else {
    listOfCharacters.forEach((character, index) => {
      listOfCharactersInnerHtml += `<p>${index + 1})${character.name}</p>`;
    });
  }

  appendSectionToSelector('.film-details-container', listOfCharactersInnerHtml);
};
