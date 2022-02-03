/**
 * Function updates next and prev pagination buttons so they are disabled/enabled on the last or first pages.
 * @param onFirstPage - Shows if we are on the first page of films.
 * @param onLastPage - Shows if we are on the last page of films.
 */
export const updatePaginationButtons = (onFirstPage: boolean, onLastPage: boolean): void => {
  const nextButton = document.querySelector<HTMLButtonElement>('.pagination-next-btn');
  const prevButton = document.querySelector<HTMLButtonElement>('.pagination-prev-btn');

  if (nextButton !== null) {
    if (onLastPage === true) {
      nextButton.disabled = true;
    } else {
      nextButton.disabled = false;
    }
  }

  if (prevButton !== null) {
    if (onFirstPage === true) {
      prevButton.disabled = true;
    } else {
      prevButton.disabled = false;
    }
  }
};
