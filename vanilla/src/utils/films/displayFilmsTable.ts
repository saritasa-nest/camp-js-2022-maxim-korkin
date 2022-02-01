/* eslint-disable require-atomic-updates */
// Disabled it since im using a mutex to make sure that only one instance of async function has access to outer variables.

import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

import { getMutex } from 'simple-mutex-promise';

import { FilmsService } from '../../services/films/FilmsService';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';
import { Film } from '../../interfaces/films/film/Film';

import { PaginationModes } from '../enums/films/PaginationModes';
import { OrderingFields } from '../enums/films/OrderingFields';
import { OrderingModes } from '../enums/films/OrderingModes';

import { updateFieldHeaders } from './updateFieldHeaders';
import { switchOrderMode } from './switchOrderingMode';
import { updatePaginationButtons } from './updatePaginationButtons';
import { isFirstPage } from './isFirstPage';
import { isLastPage } from './isLastPage';
import { mapQuerySnapshotToArray } from './mapQuerySnapshotToArray';
import { renderFilms } from './renderFilms';

/**
 * Closure for fetching and displaying pages with films.
 * @returns Function which fetches required list of films and displays it on the page.
 */
export const displayFilmsTable = (): Function => {
  /**
   * Snapshot with the films.
   */
  let filmDocs: QuerySnapshot<FilmDTO>;

  /**
   * Last film on the page.
   */
  let lastFilmDoc: QueryDocumentSnapshot<FilmDTO>;

  /**
   * First film on the page.
   */
  let firstFilmDoc: QueryDocumentSnapshot<FilmDTO>;

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
          filmDocs = await FilmsService.fetchFirstPageOfFilms(orderingField, orderingMode);

          lastFilmDoc = filmDocs.docs[filmDocs.docs.length - 1];
          firstFilmDoc = filmDocs.docs[0];

          films = mapQuerySnapshotToArray(filmDocs);
        } else if (mode === PaginationModes.Next && !onLastPage) {
          filmDocs = await FilmsService.fetchNextPageOfFilms(lastFilmDoc, orderingField, orderingMode);

          lastFilmDoc = filmDocs.docs[filmDocs.docs.length - 1];
          firstFilmDoc = filmDocs.docs[0];

          films = mapQuerySnapshotToArray(filmDocs);
        } else if (mode === PaginationModes.Prev && !onFirstPage) {
          filmDocs = await FilmsService.fetchPrevPageOfFilms(firstFilmDoc, orderingField, orderingMode);

          lastFilmDoc = filmDocs.docs[filmDocs.docs.length - 1];
          firstFilmDoc = filmDocs.docs[0];

          films = mapQuerySnapshotToArray(filmDocs);
        }
      } catch (error: unknown) {
        inProgress = false;
        release();
      }

      if (films.length !== 0) {
        onFirstPage = await isFirstPage(firstFilmDoc, orderingField, orderingMode);
        onLastPage = await isLastPage(lastFilmDoc, orderingField, orderingMode);
        updatePaginationButtons(onFirstPage, onLastPage);
        updateFieldHeaders(orderingField, orderingMode);
        renderFilms(films);
      }

      inProgress = false;
      release();
    }
  };
};
