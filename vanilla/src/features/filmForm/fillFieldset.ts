import { Planet } from '../../interfaces/planets/domain/Planet';
import { Character } from '../../interfaces/characters/domain/Character';

/**
 * Function for adding checkboxes with possible entities to the fieldset.
 * @param selector - Selector of the fieldset.
 * @param entities - List of entities.
 * @param checkboxName - Name which to give to checkboxes.
 */
export const fillFieldset = (selector: string, entities: Character[] | Planet[], checkboxName: string): void => {
  const charactersContainer = document.querySelector<HTMLFieldSetElement>(selector);

  if (charactersContainer !== null) {
    entities.forEach(entity => {
      charactersContainer.innerHTML += `
        <label>
          <input type="checkbox" name="${checkboxName}" value="${entity.pk}">
          <span>${entity.name}</span>
        </label>
      `;
    });
  }
};
