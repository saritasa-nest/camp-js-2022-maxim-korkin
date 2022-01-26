/**
 * Function for displaying a message inside the form in case of errors.
 * @param form - The form where the message should be showed.
 * @param message - String with the message.
 */
export default function setFormMessage(form: HTMLFormElement, message: string): void {
  const statusElement = form.querySelector('.message');
  if (statusElement) {
    statusElement.innerHTML = `<p>${message}</p>`;
  }
}
