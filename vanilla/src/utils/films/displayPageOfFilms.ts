import { FilmsService } from '../../services/films/FilmsService';

import { FirstAndLastFilms } from '../../interfaces/films/FirstAndLastFilms';

import { Modes } from '../enums/filmsPaginationModes';

import { renderFilms } from './renderFilms';

/**
 * Function dor displaying pages with films.
 * @param firstAndLastFilms - Object containing first and last films on the page.
 * @param mode - Describes what page to show. Init - first load, Next - next page, Prev - previous page.
 * @returns New object containing first and last films on the page.
 */
export const displayPageOfFilms = async(
  firstAndLastFilms: FirstAndLastFilms,
  mode = Modes.Init,
): Promise<FirstAndLastFilms> => {
  const filmsTableBody = document.querySelector('.films-table-body');

  let newFirstAndLastFilms: FirstAndLastFilms = {
    firstFilm: null,
    lastFilm: null,
  };

  if (filmsTableBody !== null) {
    filmsTableBody.innerHTML = '';

    if (mode === Modes.Init) {
      const filmDocs = await FilmsService.fetchFirstPageOfFilms();
      newFirstAndLastFilms = renderFilms(filmDocs);
    } else if (mode === Modes.Next && firstAndLastFilms.lastFilm !== null) {
      const filmDocs = await FilmsService.fetchNextPageOfFilms(firstAndLastFilms.lastFilm);
      newFirstAndLastFilms = renderFilms(filmDocs);
    } else if (mode === Modes.Prev && firstAndLastFilms.firstFilm !== null) {
      const filmDocs = await FilmsService.fetchPrevPageOfFilms(firstAndLastFilms.firstFilm);
      newFirstAndLastFilms = renderFilms(filmDocs);
    }
  }

  return newFirstAndLastFilms;
};
