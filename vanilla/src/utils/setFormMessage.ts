/**
 * Function for displaying a message inside the form in case of errors.
 * @param form - The form where the message should be printed.
 * @param message - String with the message.
 */
export default function setStatus(form: HTMLFormElement, message: string): void {
  const statusElement = form.querySelector('.status');
  if (statusElement) {
    statusElement.innerHTML = `<p>${message}</p>`;
  }
}
