import { FilmFormSelectors } from '../../enums/filmForm/FilmFormSelectors';

/**
 * Function for enabling and disabling producer input removing button in the film form.
 */
export const toggleRemoveProducerButton = (): void => {
  const removeProducerButton = document.querySelector<HTMLButtonElement>(FilmFormSelectors.RemoveProducerButton);

  if (removeProducerButton !== null) {
     removeProducerButton.disabled = !removeProducerButton.disabled;
  }
};
