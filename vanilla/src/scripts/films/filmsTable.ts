import { PaginationModes } from '../../utils/enums/films/PaginationModes';

import { displayFilmsTable } from '../../utils/films/displayFilmsTable';

import { OrderingFields } from '../../utils/enums/films/OrderingFields';

import { addHeaderPagination } from './../../utils/films/addHeaderPagination';

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
addHeaderPagination(episodeIdHeader, OrderingFields.EpisodeId, displayFilms);

const titleHeader = document.querySelector('.title-header');
addHeaderPagination(titleHeader, OrderingFields.Title, displayFilms);

const releaseDateHeader = document.querySelector('.release-date-header');
addHeaderPagination(releaseDateHeader, OrderingFields.ReleaseDate, displayFilms);

const producerHeader = document.querySelector('.producer-header');
addHeaderPagination(producerHeader, OrderingFields.Producer, displayFilms);

const directorHeader = document.querySelector('.director-header');
addHeaderPagination(directorHeader, OrderingFields.Director, displayFilms);
