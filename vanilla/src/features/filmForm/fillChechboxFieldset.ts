/**
 * Function for checking checkboxes.
 * @param selector - Selector of the fieldset which contains checkboxes.
 * @param pks - Array with the primary keys of elements which need to check.
 */
export const fillCheckboxFieldset = (selector: string, pks: readonly number[]): void => {
  const fieldset = document.querySelector<HTMLFieldSetElement>(selector);

  if (fieldset !== null) {
    Array.from(fieldset.getElementsByTagName('input')).forEach(inputField => {
      if (pks.includes(Number(inputField.value))) {
        inputField.checked = true;
      }
    });
  }
};
