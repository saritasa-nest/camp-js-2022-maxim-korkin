import { FilmFormSelectors } from '../../enums/filmForm/FilmFormSelectors';
import { assertNotNull } from '../../utils/assertNotNull';

/**
 * Function for enabling and disabling producer input removing button in the film form.
 */
export const toggleRemoveProducerButton = (): void => {
  const removeProducerButton = document.querySelector<HTMLButtonElement>(FilmFormSelectors.RemoveProducerButton);

  assertNotNull(removeProducerButton);

  removeProducerButton.disabled = !removeProducerButton.disabled;
};
