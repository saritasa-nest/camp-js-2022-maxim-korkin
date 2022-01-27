/**
 * Closes modal window.
 * @param modal - Modal window to close.
 */
export function closeModal(modal: Element | null): void {
  if (modal != null) {
    M.Modal.getInstance(modal).close();
  }
}
