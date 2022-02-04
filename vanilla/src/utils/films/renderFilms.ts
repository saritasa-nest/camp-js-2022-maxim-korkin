import { Film } from './../../interfaces/films/film/Film';

/**
 * Function renders films to the films table.
 * @param films - Array with the films.
 */
export const renderFilms = (films: Film[]): void => {
  const filmsTableBody = document.querySelector('.films-table-body');

  if (filmsTableBody !== null) {
    filmsTableBody.innerHTML = '';
    films.forEach(film => {
      filmsTableBody.innerHTML += `
      <tr>
        <td>${film.episodeId}</td>
        <td>${film.title}</td>
        <td>${film.releaseDate}</td>
        <td>${film.producer}</td>
        <td>${film.director}</td>
      </tr>`;
    });
  }
};
