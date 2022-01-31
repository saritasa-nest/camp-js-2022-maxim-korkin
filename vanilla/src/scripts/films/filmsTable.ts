import { Mutex } from 'async-mutex';

import { Modes } from '../../utils/enums/filmsPaginationModes';

import { displayFilmsTable } from '../../utils/films/displayPageOfFilms';

const displayFilms = displayFilmsTable();

const mutex = new Mutex();

displayFilms(Modes.Init);

const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');

if (nextButton !== null) {
  nextButton.addEventListener('click', () => {
    mutex.runExclusive(() => {
      displayFilms(Modes.Next);
    });
  });
}

if (prevButton !== null) {
  prevButton.addEventListener('click', () => {
    mutex.runExclusive(() => {
      displayFilms(Modes.Prev);
    });
  });
}
