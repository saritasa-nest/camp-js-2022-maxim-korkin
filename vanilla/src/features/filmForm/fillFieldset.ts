import { Planet } from '../../interfaces/planets/domain/Planet';
import { Character } from '../../interfaces/characters/domain/Character';

/**
 * Function for adding checkboxes with possible entities to the fieldset.
 * @param selector - Selector of the fieldset.
 * @param entities - List of entities.
 * @param checkboxName - Name which to give to checkboxes.
 */
export const fillFieldset = (selector: string, entities: Character[] | Planet[], checkboxName: string): void => {
  const fieldSet = document.querySelector<HTMLFieldSetElement>(selector);

  if (fieldSet !== null) {
    entities.forEach(entity => {
      fieldSet.innerHTML += `
        <label>
          <input type="checkbox" name="${checkboxName}" value="${entity.pk}">
          <span>${entity.name}</span>
        </label>
      `;
    });
  }
};
