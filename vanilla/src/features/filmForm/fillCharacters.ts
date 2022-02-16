import { Character } from '../../interfaces/characters/domain/Character';

/**
 * Function for adding checkboxes with possible characters to the film form.
 * @param form - Form in which to add characters.
 * @param characters - List of characters.
 */
export const fillCharacters = (form: HTMLFormElement, characters: Character[]): void => {
  const charactersContainer = form.querySelector<HTMLFieldSetElement>('.characters-container');

  if (charactersContainer !== null) {
    characters.forEach(character => {
      charactersContainer.innerHTML += `
        <label>
          <input type="checkbox" name="character" value="${character.pk}">
          <span>${character.name}</span>
        </label>
      `;
    });
  }
};
