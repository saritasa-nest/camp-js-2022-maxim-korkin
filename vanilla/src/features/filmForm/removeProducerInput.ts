import { switchRemoveProducerButton } from './switchRemoveProducerButton';

const MIN_COUNT_OF_INPUTS = 1;

const COUNT_OF_INPUTS_FOR_BUTTON_DISABLING = 2;

/**
 * Function removes the last producer text input in the film form.
 */
export const removeProducerInput = (): void => {
  const producerInputsCount = document.querySelectorAll('.producer-input').length;

  if (producerInputsCount > MIN_COUNT_OF_INPUTS) {
    if (producerInputsCount === COUNT_OF_INPUTS_FOR_BUTTON_DISABLING) {
      switchRemoveProducerButton();
    }

    const lastProducerInput = document.querySelectorAll('.producer-input')[producerInputsCount - 1];

    const producersContainer = document.querySelector('.producer-inputs-container');

    producersContainer?.removeChild(lastProducerInput);
  }
};
