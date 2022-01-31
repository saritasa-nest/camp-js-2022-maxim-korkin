import { PaginationModes } from '../../utils/enums/filmsPaginationModes';

import { displayFilmsTable } from '../../utils/films/displayFilmsTable';

const displayFilms = displayFilmsTable();

displayFilms(PaginationModes.Init);

const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

if (nextButton !== null) {
  nextButton.addEventListener('click', () => {
    displayFilms(PaginationModes.Next);
  });
}

if (prevButton !== null) {
  prevButton.addEventListener('click', () => {
    displayFilms(PaginationModes.Prev);
  });
}
