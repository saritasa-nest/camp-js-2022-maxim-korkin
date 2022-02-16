import { switchRemoveProducerButton } from './switchRemoveProducerButton';

/**
 * Function creates a new producer text input in the film form.
 */
export const addProducerInput = (): void => {
  const producerInputsCount = document.querySelectorAll('.producer-input').length;

  if (producerInputsCount === 1) {
    switchRemoveProducerButton();
  }

  const producerInput = document.createElement('div');

  producerInput.classList.add('input-field', 'producer-input');

  producerInput.innerHTML = `
    <input name="producer" id="producers-input-${producerInputsCount + 1}" type="text">
    <label for="producers-input-${producerInputsCount + 1}">Producer</label>
  `;

  const producersContainer = document.querySelector('.producer-inputs-container');

  producersContainer?.append(producerInput);
};
