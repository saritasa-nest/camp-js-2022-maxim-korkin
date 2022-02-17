import { BaseEntity } from '../../interfaces/BaseEntity';

/**
 * Function for adding checkboxes with possible entities to the fieldset.
 * @param selector - Selector of the fieldset.
 * @param entities - List of entities.
 * @param checkboxName - Name which to give to checkboxes.
 */
export const addCheckboxes = <T extends BaseEntity>(selector: string, entities: T[], checkboxName: string): void => {
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
