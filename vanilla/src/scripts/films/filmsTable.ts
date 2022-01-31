import { Modes } from '../../utils/enums/filmsPaginationModes';

import { displayFilmsTable } from '../../utils/films/displayFilmsTable';

const displayFilms = displayFilmsTable();

displayFilms(Modes.Init);

const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

if (nextButton !== null) {
  nextButton.addEventListener('click', () => {
    displayFilms(Modes.Next);
  });
}

if (prevButton !== null) {
  prevButton.addEventListener('click', () => {
    displayFilms(Modes.Prev);
  });
}
