import { PaginationModes } from '../../utils/enums/PaginationModes';

import { displayFilmsTable } from '../../utils/films/displayFilmsTable';

import { OrderFields } from '../../utils/enums/OrderFields';

const displayFilms = displayFilmsTable();

displayFilms(PaginationModes.Init);

const nextButton = document.querySelector('.pagination-next-btn');
const prevButton = document.querySelector('.pagination-prev-btn');

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

const episodeIdHeader = document.querySelector('.episode-id-header');
const titleHeader = document.querySelector('.title-header');
const releaseDateHeader = document.querySelector('.release-date-header');
const producerHeader = document.querySelector('.producer-header');
const directorHeader = document.querySelector('.director-header');

if (episodeIdHeader !== null) {
  episodeIdHeader.addEventListener('click', () => {
    displayFilms(PaginationModes.Init, OrderFields.EpisodeId);
  });
}

if (titleHeader !== null) {
  titleHeader.addEventListener('click', () => {
    displayFilms(PaginationModes.Init, OrderFields.Title);
  });
}

if (releaseDateHeader !== null) {
  releaseDateHeader.addEventListener('click', () => {
    displayFilms(PaginationModes.Init, OrderFields.ReleaseDate);
  });
}

if (producerHeader !== null) {
  producerHeader.addEventListener('click', () => {
    displayFilms(PaginationModes.Init, OrderFields.Producer);
  });
}

if (directorHeader !== null) {
  directorHeader.addEventListener('click', () => {
    displayFilms(PaginationModes.Init, OrderFields.Director);
  });
}
