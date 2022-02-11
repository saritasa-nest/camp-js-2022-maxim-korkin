import { PaginationModes } from '../../enums/films/PaginationModes';

import { displayFilmsTable } from '../../features/films/displayFilmsTable';

import { OrderingFields } from '../../enums/films/OrderingFields';

import { addHeaderPagination } from '../../features/films/addHeaderPagination';

const displayFilms = displayFilmsTable();

displayFilms();

const nextButton = document.querySelector('.pagination-next-btn');
const prevButton = document.querySelector('.pagination-prev-btn');
const searchInput = document.querySelector<HTMLInputElement>('.search-input');
const searchButton = document.querySelector<HTMLButtonElement>('.search-btn');

if (searchButton !== null) {
  searchButton.addEventListener('click', () => {
    if (searchInput?.value === '') {
      return;
    }
    displayFilms({
      mode: PaginationModes.Init,
      newOrderingField: OrderingFields.Title,
      valueSearch: searchInput?.value,
    });
  });
}

if (nextButton !== null) {
  nextButton.addEventListener('click', () => {
    displayFilms({ mode: PaginationModes.Next });
  });
}

if (prevButton !== null) {
  prevButton.addEventListener('click', () => {
    displayFilms({ mode: PaginationModes.Prev });
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
