/**
 * Function for enabling and disabling producer input removing button in the film form.
 */
export const switchRemoveProducerButton = (): void => {
  const removeProducerButton = document.querySelector<HTMLButtonElement>('.remove-producer-button');

  if (removeProducerButton !== null) {
     removeProducerButton.disabled = !removeProducerButton.disabled;
  }
};
