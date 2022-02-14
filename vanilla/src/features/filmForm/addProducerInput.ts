/**
 * Function creates a new producer text input in the film form.
 */
export const addProducerInput = (): void => {
  const producerInputsCount = document.querySelectorAll('.producer-input').length;

  const producerInput = document.createElement('section');

  producerInput.classList.add('input-field', 'producer-input');

  producerInput.innerHTML = `
    <input id="producers-input-${producerInputsCount + 1}" type="text">
    <label for="producers-input-${producerInputsCount + 1}">Producer</label>
  `;

  const producersContainer = document.querySelector('.producer-inputs-container');

  producersContainer?.append(producerInput);
};
