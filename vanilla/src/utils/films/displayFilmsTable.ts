/* eslint-disable require-atomic-updates */
// Disabled it since im using a mutex to make sure that only one instance of async function has access to outer variables.

import { QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

import { getMutex } from 'simple-mutex-promise';

import { FilmsService } from '../../services/films/FilmsService';

import { PaginationModes } from '../enums/PaginationModes';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

import { Film } from '../../interfaces/films/film/Film';

import { OrderFields } from '../enums/OrderFields';

import { OrderModes } from './../enums/OrderModes';

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
  let filmDocs: QuerySnapshot<FilmDTO>;

  let films: Film[];

  let lastFilmDoc: QueryDocumentSnapshot<FilmDTO>;

  let firstFilmDoc: QueryDocumentSnapshot<FilmDTO>;

  let orderingField = OrderFields.EpisodeId;

  let orderingMode = OrderModes.Ascending;

  let onFirstPage: boolean;

  let onLastPage: boolean;

  let inProgress = false;

  const mutex = getMutex();

  return async(mode = PaginationModes.Init, newOrderingField: OrderFields | null = null): Promise<void> => {
    if (inProgress === true) {
      return;
    }

    inProgress = true;

    const [lock, release] = mutex.getLock();

    await lock;

    if (newOrderingField !== null) {
      if (newOrderingField === orderingField) {
        orderingMode = switchOrderMode(orderingMode);
      } else {
        orderingField = newOrderingField;
        orderingMode = OrderModes.Ascending;
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
        renderFilms(films);
      }

      inProgress = false;
      release();
    }
  };
};
