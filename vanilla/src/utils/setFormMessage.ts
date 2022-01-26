/**
 * Function for displaying a message inside the form in case of errors.
 * @param form - The form where the message should be displayed.
 * @param message - String with the message.
 */
export default function setFormMessage(form: HTMLFormElement, message: string): void {
  const messageElement = form.querySelector('.form-error-message');
  if (messageElement) {
    messageElement.innerHTML = `<p>${message}</p>`;
  }
}
