import { Film } from './../../interfaces/films/film/Film';

export const renderFilms = (films: Film[]): void => {
  const filmsTableBody = document.querySelector('.films-table-body');

  if (filmsTableBody !== null) {
    films.forEach(film => {
      filmsTableBody.innerHTML += `
      <tr>
        <td>${film.fields.episodeID}</td>
        <td>${film.fields.title}</td>
        <td>${film.fields.releaseDate}</td>
        <td>${film.fields.producer}</td>
        <td>${film.fields.director}</td>
      </tr>`;
    });
  }
};
