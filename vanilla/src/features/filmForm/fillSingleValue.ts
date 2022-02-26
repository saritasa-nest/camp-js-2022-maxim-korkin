import { assertNotNull } from '../../utils/assertNotNull';

/**
 * Function for filling value to the input field.
 * @param selector - Selector if the input field.
 * @param value - Value to insert into input field.
 */
export const fillSingleValue = (selector: string, value: string): void => {
  const inputField = document.querySelector<HTMLInputElement>(selector);

  assertNotNull(inputField);

  inputField.value = value;
};
