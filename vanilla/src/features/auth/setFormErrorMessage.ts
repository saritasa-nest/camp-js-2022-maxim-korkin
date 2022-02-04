/**
 * Function for displaying a message inside the form in case of errors.
 * @param form - The form where the message should be displayed.
 * @param message - String with the message, use empty string to remove message from the form.
 */
export function setFormErrorMessage(form: HTMLFormElement, message: string): void {
  if (message.trim() !== '') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('form-error-message');
    messageElement.innerHTML = `<p>${message}</p>`;
    form.insertBefore(messageElement, form.querySelector('btn'));
  } else {
    const messageElement = form.querySelector('.form-error-message');
    if (messageElement !== null) {
      messageElement.remove();
    }
  }
}
