export const updatePaginationButtons = (onFirstPage: boolean, onLastPage: boolean): void => {
  const nextButton: HTMLButtonElement | null = document.querySelector('.pagination-next-btn');
  const prevButton: HTMLButtonElement | null = document.querySelector('.pagination-prev-btn');

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
