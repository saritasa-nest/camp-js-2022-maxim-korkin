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
        <td>${film.fields.episodeId}</td>
        <td>${film.fields.title}</td>
        <td>${film.fields.releaseDate}</td>
        <td>${film.fields.producer}</td>
        <td>${film.fields.director}</td>
      </tr>`;
    });
  }
};
