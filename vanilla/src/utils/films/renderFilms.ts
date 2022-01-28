import { QuerySnapshot } from 'firebase/firestore';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';
import { FirstAndLastFilms } from '../../interfaces/films/FirstAndLastFilms';
import { FilmMapper } from '../mappers/FilmMapper';

export const renderFilms = (filmDocs: QuerySnapshot<FilmDTO>): FirstAndLastFilms => {
  const filmsTableBody = document.querySelector('.films-table-body');

  let newFirstAndLastFilms: FirstAndLastFilms = {
    firstFilm: null,
    lastFilm: null,
  };

  if (filmsTableBody !== null) {
    filmDocs.forEach(filmDoc => {
      const film = FilmMapper.mapFilmDTOToFilm(filmDoc.data());
      filmsTableBody.innerHTML += `
      <tr>
        <td>${film.fields.episodeID}</td>
        <td>${film.fields.title}</td>
        <td>${film.fields.releaseDate}</td>
        <td>${film.fields.producer}</td>
        <td>${film.fields.director}</td>
      </tr>`;
    });

    const firstFilmDoc = filmDocs.docs[0];
    const lastFilmDoc = filmDocs.docs[filmDocs.docs.length - 1];

    newFirstAndLastFilms = {
      firstFilm: firstFilmDoc,
      lastFilm: lastFilmDoc,
    };
  }

  return newFirstAndLastFilms;
};
