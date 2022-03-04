import { BehaviorSubject, Subject, combineLatest, map, switchMap, tap, withLatestFrom, auditTime } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { SortingFields } from 'src/app/core/utils/enums/SortingFields';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';
import { Film } from 'src/app/core/models/Film';
import { PaginationModes } from 'src/app/core/utils/enums/PaginationModes';

import { SearchingInputComponent } from '../searching-input/searching-input.component';
import { SortingOptions } from '../../../core/utils/interfaces/SortingOptions';
import { PaginationButtonsComponent } from '../pagination-buttons/pagination-buttons.component';

/**
 * Maximum count of films on a single page.
 */
const COUNT_OF_FILMS_ON_PAGE = 3;

/**
 * Count of fetched films which shows that there is next or previous page.
 */
const COUNT_OF_FILMS_FOR_NEXT_PAGE = COUNT_OF_FILMS_ON_PAGE + 1;

const DEFAULT_SORTING_OPTIONS: SortingOptions = { sortingField: SortingFields.EpisodeId, direction: 'asc' };

/**
 * Component for the films table.
 */
@Component({
  selector: 'sw-films-table',
  templateUrl: './films-table.component.html',
  styleUrls: ['./films-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsTableComponent implements OnInit, OnDestroy, AfterViewInit {

  /** Shows if we are searching or not. Used for disabling sorting field changing. */
  public readonly isSearching$ = new BehaviorSubject(false);

  /** Shows if the current page is the last one. */
  public readonly isLastPage$ = new BehaviorSubject(true);

  /** Shows if the current page is the first one. */
  public readonly isFirstPage$ = new BehaviorSubject<boolean>(true);

  private readonly sortingOptions$ = new BehaviorSubject<SortingOptions>(DEFAULT_SORTING_OPTIONS);

  private readonly paginationMode$ = new Subject<PaginationModes>();

  private readonly searchingValue$ = new Subject<string>();

  private firstVisibleFilm: Film | null = null;

  private lastVisibleFilm: Film | null = null;

  @ViewChild(PaginationButtonsComponent)
  private readonly paginationButtons!: PaginationButtonsComponent;

  @ViewChild(SearchingInputComponent)
  private readonly searchingInput!: SearchingInputComponent;

  /** Films on the current page. */
  public readonly films$ = combineLatest(
    [this.sortingOptions$, this.paginationMode$, this.searchingValue$],
  ).pipe(
    auditTime(1),
    map(([sortingOptions, paginationMode, searchingValue]) => (
      {
        sortingOptions,
        paginationMode,
        lastVisibleFilm: this.lastVisibleFilm,
        firstVisibleFilm: this.firstVisibleFilm,
        countOfFilmsOnPage: COUNT_OF_FILMS_ON_PAGE,
        titleSearchingValue: searchingValue,
      }
    )),
    tap(fetchOptions => this.isSearching$.next(fetchOptions.titleSearchingValue !== '')),
    switchMap(fetchOptions => this.filmsService.fetchFilms(fetchOptions)),
    withLatestFrom(this.paginationMode$),
    tap(([films, paginationMode]) => this.updatePaginationStatus(films.length, paginationMode)),
    map(([films, paginationMode]) => this.parseFilmsList(films, paginationMode)),
    tap(films => this.updateFirstAndLastFilms(films)),
  );

  private readonly episodeIdHeader = 'Episode Id';

  private readonly titleHeader = 'Title';

  private readonly releaseDateHeader = 'Release Date';

  private readonly producersHeader = 'Producers';

  private readonly directorHeader = 'Director';

  /** List of table headers. */
  public readonly tableHeaders = [
    this.episodeIdHeader,
    this.titleHeader,
    this.releaseDateHeader,
    this.producersHeader,
    this.directorHeader,
  ];

  @ViewChild(MatSort)
  private readonly filmsSort!: MatSort;

  public constructor(
    private readonly filmsService: FilmsService,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.sortingOptions$.subscribe({
      next: () => {
        this.firstVisibleFilm = null;
        this.lastVisibleFilm = null;
        this.paginationMode$.next(PaginationModes.NEXT);
        this.isFirstPage$.next(true);
        this.isLastPage$.next(true);
      },
    });

    this.searchingValue$.subscribe({
      next: () => {
        this.firstVisibleFilm = null;
        this.lastVisibleFilm = null;
        this.paginationMode$.next(PaginationModes.NEXT);
        this.isFirstPage$.next(true);
        this.isLastPage$.next(true);
      },
    });
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.isSearching$.complete();
    this.isLastPage$.complete();
    this.isFirstPage$.complete();
    this.sortingOptions$.complete();
    this.paginationMode$.complete();
  }

  /**
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
    this.paginationButtons.paginationMode$.subscribe(this.paginationMode$);
    this.searchingInput.searchChange$.subscribe(this.searchingValue$);
  }

  /**
   * Method to call on sort changing event.
   * @param sortState - New sort state.
   */
  public sortChange(sortState: Sort): void {
    const newSortingOptions = this.parseSortStateIntoSortingOptions(sortState);
    this.sortingOptions$.next(newSortingOptions);
  }

  /**
   * Method changes current sorting for ascending title.
   */
  public setTitleSorting(): void {
    this.filmsSort.active = this.titleHeader;
    this.filmsSort.direction = 'asc';
  }

  /**
   * Method used as a side-effect in film fetching. Checks if this is first or last page.
   * @param countOfFilms - Count of fetched films.
   * @param paginationMode - Pagination mode.
   */
  private updatePaginationStatus(countOfFilms: number, paginationMode: PaginationModes): void {
    if (this.firstVisibleFilm === null) {
      this.isLastPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
    } else if (paginationMode === PaginationModes.NEXT) {
      this.isLastPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
      this.isFirstPage$.next(false);
    } else {
      this.isFirstPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
      this.isLastPage$.next(false);
    }
  }

  /**
   * Method used in films fetching. Removes film which displays existence of next or previous page.
   * @param films - Array of films.
   * @param paginationMode - Pagination mode.
   */
  private parseFilmsList(films: Film[], paginationMode: PaginationModes): Film[] {
    if (films.length !== COUNT_OF_FILMS_FOR_NEXT_PAGE) {
      return films;
    }
    if (paginationMode === PaginationModes.NEXT) {
      return films.slice(0, -1);
    }
    return films.slice(1);
  }

  /**
   * Method used as a side-effect in film fetching. Updates first and last films on the current page.
   * @param films - Films array.
   * Make sure that this array contains only films on the current page without film displaying existence of next or previous page.
   */
  private updateFirstAndLastFilms(films: Film[]): void {
    this.firstVisibleFilm = films[0];
    this.lastVisibleFilm = films.slice(-1)[0];
  }

  private parseSortStateIntoSortingOptions(sortState: Sort): SortingOptions {
    let sortingField: SortingFields;
    switch (sortState.active) {
      case this.episodeIdHeader:
        sortingField = SortingFields.EpisodeId;
        break;
      case this.titleHeader:
        sortingField = SortingFields.Title;
        break;
      case this.releaseDateHeader:
        sortingField = SortingFields.ReleaseDate;
        break;
      case this.directorHeader:
        sortingField = SortingFields.Director;
        break;
      default:
        sortingField = SortingFields.EpisodeId;
    }

    let direction: 'asc' | 'desc';
    switch (sortState.direction) {
      case 'asc':
        direction = 'asc';
        break;
      case 'desc':
        direction = 'desc';
        break;
      default:
        /** MatSort direction is equal to '' when we dont want to sort by specific field.
         * so use default values. */
        sortingField = SortingFields.EpisodeId;
        direction = 'asc';
    }

    return {
      sortingField,
      direction,
    };
  }
}
