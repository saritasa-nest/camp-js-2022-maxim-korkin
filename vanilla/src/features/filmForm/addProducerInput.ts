import { assertNotNull } from '../../utils/assertNotNull';
import { FilmFormSelectors } from '../../enums/filmForm/FilmFormSelectors';

import { toggleRemoveProducerButton } from './toggleRemoveProducerButton';

const COUNT_OF_INPUTS_FOR_REMOVE_BUTTON_ENABLING = 1;

/**
 * Function creates a new producer text input in the film form.
 */
export const addProducerInput = (): void => {
  const producerInputsCount = document.querySelectorAll(FilmFormSelectors.ProducerInput).length;

  if (producerInputsCount === COUNT_OF_INPUTS_FOR_REMOVE_BUTTON_ENABLING) {
    toggleRemoveProducerButton();
  }

  const producerInput = document.createElement('div');

  producerInput.classList.add('input-field', 'producer-input');

  producerInput.innerHTML = `
    <input name="producer" id="producers-input-${producerInputsCount + 1}" type="text" required>
    <label for="producers-input-${producerInputsCount + 1}">Producer</label>
  `;

  const producersContainer = document.querySelector(FilmFormSelectors.ProducerInputsContainer);
  assertNotNull(producersContainer);
  producersContainer.append(producerInput);
};
