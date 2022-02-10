import { CharactersService } from './../../services/characters/CharactersService';
import { appendSectionToSelector } from './appendSectionToSelector';

/**
 * Function renders list of characters of the film.
 * @param characterIds - Array with the ids of the charecters.
 */
export const renderListOfCharacters = async(characterIds: readonly number[]): Promise<void> => {
  let listOfCharactersInnerHtml = '<h3>List of characters</h3>';

  try {
    const listOfCharacters = await CharactersService.fetchCharactersListByPrimaryKeys(characterIds);

    listOfCharacters.forEach((character, index) => {
      listOfCharactersInnerHtml += `<p>${index + 1})${character.name}</p>`;
    });
  } catch (error: unknown) {
    listOfCharactersInnerHtml += '<p>Failed to load list of characters.</p>';
  }

  appendSectionToSelector('.film-details-container', listOfCharactersInnerHtml);
};
