/* eslint-disable require-atomic-updates */
// Disabled it since im using a mutex to make sure that only one instance of async function has access to outer variables.

import { getMutex } from 'simple-mutex-promise';

import { FilmsService } from '../../services/films/FilmsService';
import { Film } from '../../interfaces/films/film/Film';
import { PaginationModes } from '../../enums/films/PaginationModes';
import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';

import { updateFieldHeaders } from './updateFieldHeaders';
import { switchOrderMode } from './switchOrderingMode';
import { updatePaginationButtons } from './updatePaginationButtons';
import { isFirstPage } from './isFirstPage';
import { isLastPage } from './isLastPage';
import { renderFilms } from './renderFilms';

/**
 * Closure for fetching and displaying pages with films.
 * @returns Function which fetches required list of films and displays it on the page.
 */
export const displayFilmsTable = (): Function => {
  /**
   * Last film on the page.
   */
  let lastFilm: Film;

  /**
   * First film on the page.
   */
  let firstFilm: Film;

  /**
   * Field used for ordering the results.
   */
  let orderingField = OrderingFields.EpisodeId;

  /**
   * Shows if ordering should be ascending or descending.
   */
  let orderingMode = OrderingModes.Ascending;

  /**
   * Shows if the current page is the first page possible.
   */
  let onFirstPage: boolean;

  /**
   * Shows if the current page is the last page possible.
   */
  let onLastPage: boolean;

  /**
   * Flag which indicates that one instance of this function is already in progress.
   */
  let inProgress = false;

  /**
   * Mutex for making sure that another instance of async function won't have access to resources.
   */
  const mutex = getMutex();

  /**
   * Function which fetches required films from the firestore, renders them and updates pagination buttons and table headers.
   * @param mode - Shows if we should fetch first, next or previous page.
   * @param newOrderingField - Shows if we should use specific field to order data. Null if we dont need to change ordering field.
   */
  return async(mode = PaginationModes.Init, newOrderingField: OrderingFields | null = null): Promise<void> => {
    if (inProgress === true) {
      return;
    }

    inProgress = true;

    const [lock, release] = mutex.getLock();

    await lock;

    let films: Film[] = [];

    if (newOrderingField !== null) {
      if (newOrderingField === orderingField) {
        orderingMode = switchOrderMode(orderingMode);
      } else {
        orderingField = newOrderingField;
        orderingMode = OrderingModes.Ascending;
      }
    }

    const filmsTableBody = document.querySelector('.films-table-body');

    if (filmsTableBody !== null) {
      try {
        if (mode === PaginationModes.Init) {
          films = await FilmsService.fetchFirstPageOfFilms(orderingField, orderingMode);
        } else if (mode === PaginationModes.Next && !onLastPage) {
          films = await FilmsService.fetchNextPageOfFilms(lastFilm, orderingField, orderingMode);
        } else if (!onFirstPage) {
          films = await FilmsService.fetchPrevPageOfFilms(firstFilm, orderingField, orderingMode);
        }
      } catch (error: unknown) {
        inProgress = false;
        release();
      }

      if (films.length !== 0) {
        lastFilm = films[films.length - 1];
        firstFilm = films[0];

        onFirstPage = await isFirstPage(firstFilm, orderingField, orderingMode);
        onLastPage = await isLastPage(lastFilm, orderingField, orderingMode);

        updatePaginationButtons(onFirstPage, onLastPage);

        updateFieldHeaders(orderingField, orderingMode);

        renderFilms(films);
      }

      inProgress = false;
      release();
    }
  };
};
