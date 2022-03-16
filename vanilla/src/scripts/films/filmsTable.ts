import { PaginationModes } from '../../enums/films/PaginationModes';
import { FilmsTable } from '../../features/films/displayFilmsTable';
import { OrderingFields } from '../../enums/films/OrderingFields';
import { addHeaderPagination } from '../../features/films/addHeaderPagination';

FilmsTable.displayFilmsTable();

const nextButton = document.querySelector('.pagination-next-btn');
const prevButton = document.querySelector('.pagination-prev-btn');
const searchInput = document.querySelector<HTMLInputElement>('.search-input');
const searchButton = document.querySelector<HTMLButtonElement>('.search-btn');

if (searchButton !== null) {
  searchButton.addEventListener('click', () => {
    if (searchInput?.value === '') {
      FilmsTable.displayFilmsTable({
        mode: PaginationModes.Init,
        newOrderingField: OrderingFields.EpisodeId,
        valueSearch: searchInput?.value,
      });
      return;
    }
    FilmsTable.displayFilmsTable({
      mode: PaginationModes.Init,
      newOrderingField: OrderingFields.Title,
      valueSearch: searchInput?.value,
    });
  });
}

if (nextButton !== null) {
  nextButton.addEventListener('click', () => {
    FilmsTable.displayFilmsTable({ mode: PaginationModes.Next });
  });
}

if (prevButton !== null) {
  prevButton.addEventListener('click', () => {
    FilmsTable.displayFilmsTable({ mode: PaginationModes.Prev });
  });
}

const episodeIdHeader = document.querySelector('.episode-id-header');
addHeaderPagination(episodeIdHeader, OrderingFields.EpisodeId);

const titleHeader = document.querySelector('.title-header');
addHeaderPagination(titleHeader, OrderingFields.Title);

const releaseDateHeader = document.querySelector('.release-date-header');
addHeaderPagination(releaseDateHeader, OrderingFields.ReleaseDate);

const producerHeader = document.querySelector('.producer-header');
addHeaderPagination(producerHeader, OrderingFields.Producer);

const directorHeader = document.querySelector('.director-header');
addHeaderPagination(directorHeader, OrderingFields.Director);
