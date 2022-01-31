import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

import { FilmsService } from '../../services/films/FilmsService';

import { Modes } from '../enums/filmsPaginationModes';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

import { mapQuerySnapshotToArray } from './mapQuerySnapshotToArray';

import { renderFilms } from './renderFilms';

import { Film } from './../../interfaces/films/film/Film';

/**
 * Closure for fetching and displaying pages with films.
 * @param mode - Describes which page to show. Init - first load, Next - next page, Prev - previous page.
 * @returns Function which fetches required list of films and displays it on the page.
 */
export const displayFilmsTable = (): Function => {
  let filmDocs: QuerySnapshot<FilmDTO>;

  let films: Film[];

  let lastFilmDoc: QueryDocumentSnapshot<FilmDTO>;

  let firstFilmDoc: QueryDocumentSnapshot<FilmDTO>;

  return async(mode = Modes.Init): Promise<void> => {
      const filmsTableBody = document.querySelector('.films-table-body');

      if (filmsTableBody !== null) {
        if (mode === Modes.Init) {
          filmDocs = await FilmsService.fetchFirstPageOfFilms();

          lastFilmDoc = filmDocs.docs[filmDocs.docs.length - 1];
          firstFilmDoc = filmDocs.docs[0];

          films = mapQuerySnapshotToArray(filmDocs);
        } else if (mode === Modes.Next) {
          const lastFilmDocCopy = lastFilmDoc;
          const newFilmDocs = await FilmsService.fetchNextPageOfFilms(lastFilmDocCopy);

          if (lastFilmDocCopy === lastFilmDoc && newFilmDocs.docs.length !== 0) {
            filmDocs = newFilmDocs;

            lastFilmDoc = filmDocs.docs[filmDocs.docs.length - 1];
            firstFilmDoc = filmDocs.docs[0];

            films = mapQuerySnapshotToArray(filmDocs);
          }
        } else if (mode === Modes.Prev) {
          const firstFilmDocCopy = firstFilmDoc;
          const newFilmDocs = await FilmsService.fetchPrevPageOfFilms(firstFilmDocCopy);

          if (firstFilmDocCopy === firstFilmDoc && newFilmDocs.docs.length !== 0) {
            filmDocs = newFilmDocs;

            lastFilmDoc = filmDocs.docs[filmDocs.docs.length - 1];
            firstFilmDoc = filmDocs.docs[0];

            films = mapQuerySnapshotToArray(filmDocs);
          }
        }

        if (films.length !== 0) {
          renderFilms(films);
        }
      }
    };
};
