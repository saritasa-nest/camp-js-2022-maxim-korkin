/* eslint-disable require-atomic-updates */
// Disabled it since im using a mutex to make sure that only one instance of async function has access to outer variables.

import { getMutex } from 'simple-mutex-promise';

import { FilmsService } from '../../services/films/FilmsService';
import { Film } from '../../interfaces/films/domain/Film';
import { PaginationModes } from '../../enums/films/PaginationModes';
import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';

import { FetchOptionsFilterSort } from '../../interfaces/options/FetchOptionsFilterSort';

import { ParametersPagination } from '../../interfaces/options/ParametersPagination';

import { updateFieldHeaders } from './updateFieldHeaders';
import { switchOrderMode } from './switchOrderingMode';
import { updatePaginationButtons } from './updatePaginationButtons';
import { isFirstPage } from './isFirstPage';
import { isLastPage } from './isLastPage';
import { renderFilms } from './renderFilms';

export type DisplayFunction = (options?: Partial<FetchOptionsFilterSort>) => void;

/**
 * Closure for fetching and displaying pages with films.
 * @returns Function which fetches required list of films and displays it on the page.
 */
export const displayFilmsTable = (): DisplayFunction => {
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
   * The actual search value entered by the user.
   */
  let newValueSearch: null | string;

  /**
   * Mutex for making sure that another instance of async function won't have access to resources.
   */
  const mutex = getMutex();

  const DEFAULT_OPTIONS: FetchOptionsFilterSort = {
    mode: PaginationModes.Init,
    newOrderingField: null,
    valueSearch: null,
  };

  /**
   * Function which fetches required films from the firestore, renders them and updates pagination buttons and table headers.
   * @param options Options for initialization, sorting and filtering.
   */
  return async(options: Partial<FetchOptionsFilterSort> = DEFAULT_OPTIONS): Promise<void> => {
    if (inProgress === true) {
      return;
    }

    inProgress = true;

    const [lock, release] = mutex.getLock();

    await lock;

    let films: Film[] = [];

    if (options.newOrderingField !== null) {
      if (options.newOrderingField === orderingField) {
        orderingMode = switchOrderMode(orderingMode);
      } else if (options.newOrderingField) {
        orderingField = options.newOrderingField;
        orderingMode = OrderingModes.Ascending;
      }

    }
    if (options.valueSearch) {
      newValueSearch = options.valueSearch;
    }
    if (options.valueSearch === '') {
      newValueSearch = null;
    }
    const filmsTableBody = document.querySelector('.films-table-body');

    if (filmsTableBody !== null) {
      try {
        if (options.mode === PaginationModes.Init) {
          films = await FilmsService.fetchFirstPageOfFilms(orderingField, orderingMode, newValueSearch);
        } else if (options.mode === PaginationModes.Next && !onLastPage) {
          films = await FilmsService.fetchNextPageOfFilms(lastFilm, orderingField, orderingMode, newValueSearch);
        } else if (!onFirstPage) {
          films = await FilmsService.fetchPrevPageOfFilms(firstFilm, orderingField, orderingMode, newValueSearch);
        }
      } catch (error: unknown) {
        inProgress = false;
        release();
      }

     ({ lastFilm, firstFilm, onFirstPage, onLastPage } = await getParametersPagination(films, orderingField, orderingMode, newValueSearch));

      updatePaginationButtons(onFirstPage, onLastPage);

      updateFieldHeaders(orderingField, orderingMode);

      renderFilms(films);

      inProgress = false;
      release();
    }
  };
};

/**
 * Returns the first and last films on the page and whether the given page is the first or last.
 * @param films Array of films per page.
 * @param orderingField The field by which the movies are sorted.
 * @param orderingMode Shows if ordering should be ascending or descending.
 * @param newValueSearch The actual search value entered by the user..
 */
async function getParametersPagination(films: Film[], orderingField: OrderingFields,
  orderingMode: OrderingModes, newValueSearch: string | null): Promise<ParametersPagination> {
  let lastFilm: Film;
  let firstFilm: Film;
  let onFirstPage: boolean;
  let onLastPage: boolean;
  if (films.length !== 0) {
    lastFilm = films[films.length - 1];
    firstFilm = films[0];
    onFirstPage = await isFirstPage({
      film: firstFilm,
      orderingField,
      orderingMode,
      valueSearch: newValueSearch,
      newOrderingField: null,
    });
    onLastPage = await isLastPage({
      film: lastFilm,
      orderingField,
      orderingMode,
      valueSearch: newValueSearch,
      newOrderingField: null,
    });
  } else {
    lastFilm = films[0];
    firstFilm = films[0];
    onFirstPage = true;
    onLastPage = true;
  }
  return { lastFilm, firstFilm, onFirstPage, onLastPage };
}
