/* eslint-disable require-atomic-updates */
// Disabled it since im using a mutex to make sure that only one instance of async function has access to outer variables.
/* eslint-disable @typescript-eslint/naming-convention */

import { getMutex } from 'simple-mutex-promise';

import { FilmsService } from '../../services/films/FilmsService';
import { Film } from '../../interfaces/films/domain/Film';
import { PaginationModes } from '../../enums/films/PaginationModes';
import { OrderingFields } from '../../enums/films/OrderingFields';
import { OrderingModes } from '../../enums/films/OrderingModes';

import { FilterSortOptions } from '../../interfaces/options/FilterSortOptions';

import { PageParameters } from '../../interfaces/options/PageParameters';

import { QueryConstraintParameters } from '../../interfaces/options/QueryConstraintParameters';

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
export class FilmsTable {
  /**
   * Last film on the page or null if the page is empty.
   */
  private static lastFilm: Film | null = null;

  /**
   * First film on the page or null if the page is empty.
   */
  private static firstFilm: Film | null = null;

  /**
   * Field used for ordering the results.
   */
  private static orderingField = OrderingFields.EpisodeId;

  /**
   * Shows if ordering should be ascending or descending.
   */
  private static orderingMode = OrderingModes.Ascending;

  /**
   * Shows if the current page is the first page possible.
   */
  private static onFirstPage: boolean;

  /**
   * Shows if the current page is the last page possible.
   */
  private static onLastPage: boolean;

  /**
   * Flag which indicates that one instance of this function is already in progress.
   */
  private static inProgress = false;

  /**
   * The actual search value entered by the user.
   */
  private static newValueSearch: null | string;

  /**
   * Mutex for making sure that another instance of async function won't have access to resources.
   */
  private static mutex = getMutex();

  private static DEFAULT_OPTIONS: FilterSortOptions = {
    mode: PaginationModes.Init,
    newOrderingField: null,
    valueSearch: null,
  };

  private static queryConstraintParameters: QueryConstraintParameters;

  /**
   * Function which fetches required films from the firestore, renders them and updates pagination buttons and table headers.
   * @param options Options for initialization, sorting and filtering.
   */
  public static async displayFilmsTable(options: Partial<FilterSortOptions> = this.DEFAULT_OPTIONS): Promise<void> {
    if (this.inProgress === true) {
      return;
    }

    this.inProgress = true;

    const [lock, release] = this.mutex.getLock();

    await lock;

    let films: Film[] = [];

    if (options.newOrderingField !== null) {
      if (options.newOrderingField === this.orderingField) {
        this.orderingMode = switchOrderMode(this.orderingMode);
      } else if (options.newOrderingField) {
        this.orderingField = options.newOrderingField;
        this.orderingMode = OrderingModes.Ascending;
      }

    }
    if (options.valueSearch) {
      this.newValueSearch = options.valueSearch;
    }
    if (options.valueSearch === '') {
      this.newValueSearch = null;
    }
    const filmsTableBody = document.querySelector('.films-table-body');

    this.queryConstraintParameters = {
      orderingField: this.orderingField,
      orderingMode: this.orderingMode,
      valueSearch: this.newValueSearch,
    };

    if (filmsTableBody !== null) {
      try {
        if (options.mode === PaginationModes.Init) {
          films = await FilmsService.fetchFirstPageOfFilms(this.queryConstraintParameters);
        } else if (options.mode === PaginationModes.Next && !this.onLastPage && this.lastFilm) {
          films = await FilmsService.fetchNextPageOfFilms(this.lastFilm, this.queryConstraintParameters);
        } else if (!this.onFirstPage && this.firstFilm) {
          films = await FilmsService.fetchPrevPageOfFilms(this.firstFilm, this.queryConstraintParameters);
        }
      } catch (error: unknown) {
        this.inProgress = false;
        release();
      }

      ({
        lastFilm: this.lastFilm, firstFilm: this.firstFilm, onFirstPage: this.onFirstPage, onLastPage: this.onLastPage,
      } = await this.getPageParameters(
        films, this.orderingField, this.orderingMode, this.newValueSearch,
      ));

      updatePaginationButtons(this.onFirstPage, this.onLastPage);

      updateFieldHeaders(this.orderingField, this.orderingMode);

      renderFilms(films);

      this.inProgress = false;
      release();
    }
  }

  /**
   * Returns the first and last films on the page and whether the given page is the first or last.
   * @param films Array of films per page.
   * @param orderingField The field by which the movies are sorted.
   * @param orderingMode Shows if ordering should be ascending or descending.
   * @param newValueSearch The actual search value entered by the user..
   */
  public static async getPageParameters(films: readonly Film[], orderingField: OrderingFields,
    orderingMode: OrderingModes, newValueSearch: string | null): Promise<PageParameters> {
    let onFirstPage: boolean;
    let onLastPage: boolean;
    if (films.length !== 0) {
      let { [films.length - 1]: lastFilm, 0: firstFilm } = films;
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
      return { lastFilm, firstFilm, onFirstPage, onLastPage };
    }
    onFirstPage = true;
    onLastPage = true;

    return { lastFilm: null, firstFilm: null, onFirstPage, onLastPage };
  }
}
