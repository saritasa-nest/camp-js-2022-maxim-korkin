import { FilmFormSelectors } from '../../enums/filmForm/FilmFormSelectors';

import { toggleRemoveProducerButton } from './toggleRemoveProducerButton';

const MIN_COUNT_OF_INPUTS = 1;

const COUNT_OF_INPUTS_FOR_BUTTON_DISABLING = 2;

/**
 * Function removes the last producer text input in the film form.
 */
export const removeProducerInput = (): void => {
  const producerInputsCount = document.querySelectorAll(FilmFormSelectors.ProducerInput).length;

  if (producerInputsCount > MIN_COUNT_OF_INPUTS) {
    if (producerInputsCount === COUNT_OF_INPUTS_FOR_BUTTON_DISABLING) {
      toggleRemoveProducerButton();
    }

    const lastProducerInput = document.querySelectorAll(FilmFormSelectors.ProducerInput)[producerInputsCount - 1];

    const producersContainer = document.querySelector(FilmFormSelectors.ProducerInputsContainer);

    producersContainer?.removeChild(lastProducerInput);
  }
};
