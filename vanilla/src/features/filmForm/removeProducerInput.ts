/**
 * Function removes the last producer text input in the film form.
 */
export const removeProducerInput = (): void => {
  const producerInputsCount = document.querySelectorAll('.producer-input').length;

  if (producerInputsCount > 1) {
    const lastProducerInput = document.querySelectorAll('.producer-input')[producerInputsCount - 1];

    const producersContainer = document.querySelector('.producer-inputs-container');

    producersContainer?.removeChild(lastProducerInput);
  }
};
