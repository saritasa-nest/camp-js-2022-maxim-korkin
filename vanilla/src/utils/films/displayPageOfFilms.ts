import { Film } from './../../interfaces/films/film/Film';
import { FilmsService } from '../../services/films/FilmsService';

import { FirstAndLastFilms } from '../../interfaces/films/FirstAndLastFilms';

import { Modes } from '../enums/filmsPaginationModes';

import { renderFilms } from './renderFilms';
import { QuerySnapshot } from 'firebase/firestore';
import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

/**
 * Function dor displaying pages with films.
 * @param firstAndLastFilms - Object containing first and last films on the page.
 * @param mode - Describes what page to show. Init - first load, Next - next page, Prev - previous page.
 * @returns New object containing first and last films on the page.
 */
export const displayFilmsTable = (mode = Modes.Init): Function => {
  let filmDocs: QuerySnapshot<FilmDTO>;
  let isLoaded = true;

  return async(): Promise<void> => {
    isLoaded = false;
    const filmsTableBody = document.querySelector('.films-table-body');

    if (isLoaded && filmsTableBody !== null) {
      filmsTableBody.innerHTML = '';

      if (mode === Modes.Init) {
        filmDocs = await FilmsService.fetchFirstPageOfFilms();
      } else if (mode === Modes.Next) {
        
      } else if (mode === Modes.Prev && firstAndLastFilms.firstFilm !== null) {
        filmDocs = await FilmsService.fetchPrevPageOfFilms(firstAndLastFilms.firstFilm);
      }

      renderFilms(filmDocs);
    }
    isLoaded = true;
  }
};
