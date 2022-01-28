import { FilmsService } from '../../services/films/FilmsService';

import { FilmMapper } from './../../mappers/FilmMapper';

export const displayFirstPageOfFilms = async(): Promise<void> => {
  const filmsTableBody = document.querySelector('.films-table-body');

  if (filmsTableBody !== null) {
    filmsTableBody.innerHTML = '';

    const films = await FilmsService.fetchFirstPageOfFilms();

    films.forEach(elem => {
      const film = FilmMapper.mapFilmDTOToFilm(elem.data());
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
