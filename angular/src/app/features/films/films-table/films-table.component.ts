import { BehaviorSubject, Subject, combineLatest, map, switchMap, tap, takeUntil, debounceTime, withLatestFrom, Observable, merge } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { FilmSortingField } from 'src/app/features/films/enums/FilmSortingField';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';
import { Film } from 'src/app/core/models/Film';
import { PaginationDirection } from 'src/app/core/utils/enums/PaginationDirection';
import { SortingDirection } from 'src/app/core/utils/enums/SortingDirection';
import { Router } from '@angular/router';
import { SortingOptions } from 'src/app/features/films/interfaces/FilmsSortingOptions';

import { SearchingInputComponent } from '../searching-input/searching-input.component';
import { PaginationButtonsComponent } from '../pagination-buttons/pagination-buttons.component';

/**
 * Maximum count of films on a single page.
 */
const COUNT_OF_FILMS_ON_PAGE = 3;

/**
 * Count of fetched films which shows that there is next or previous page.
 */
const COUNT_OF_FILMS_FOR_NEXT_PAGE = COUNT_OF_FILMS_ON_PAGE + 1;

const DEFAULT_SORTING_OPTIONS: SortingOptions = { sortingField: FilmSortingField.EpisodeId, direction: SortingDirection.Ascending };

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
  public readonly isFirstPage$ = new BehaviorSubject(true);

  private readonly sortingOptions$ = new BehaviorSubject<SortingOptions>(DEFAULT_SORTING_OPTIONS);

  private readonly paginationMode$ = new Subject<PaginationDirection>();

  private readonly searchingValue$ = new BehaviorSubject<string>('');

  private firstVisibleFilm: Film | null = null;

  private lastVisibleFilm: Film | null = null;

  @ViewChild(PaginationButtonsComponent)
  private readonly paginationButtons!: PaginationButtonsComponent;

  @ViewChild(SearchingInputComponent)
  private readonly searchingInput!: SearchingInputComponent;

  private readonly destroy$ = new Subject<void>();

  /** Films on the current page. */
  public readonly films$ = this.initFilmsStream();

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

  /** Container for MatSortables to manage the sort state. */
  @ViewChild(MatSort)
  private readonly filmsSortHeaders!: MatSort;

  public constructor(
    private readonly filmsService: FilmsService,
    private readonly router: Router,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    /** Emitting and updating values to fetch first page when sorting field or direction is changed or when field.
     * Or when user updates searching value. */
    merge(
      this.sortingOptions$,
      this.searchingValue$,
    ).pipe(
      takeUntil(this.destroy$),
    )
      .subscribe({
        next: () => {
          this.resetValuesForFirstPageFetching();
        },
      });
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * @inheritdoc
   */
  public ngAfterViewInit(): void {
    this.paginationButtons.paginationMode$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(this.paginationMode$);
    this.searchingInput.searchChange$.pipe(
      takeUntil(this.destroy$),
    ).subscribe(this.searchingValue$);
  }

  /**
   * Method to call on sort changing event.
   * @param sortState - New sort state.
   */
  public sortChange(sortState: Sort): void {
    const newSortingOptions = this.mapSortStateIntoSortingOptions(sortState);
    this.sortingOptions$.next(newSortingOptions);
  }

  /**
   * Method changes current sorting view. Used as a side effect at films fetching to change sorting view to title when searching.
   * @param active - New active header.
   * @param direction - New direction.
   */
  public setSortingHeaders(active: FilmSortingField, direction: SortingDirection): void {
    this.filmsSortHeaders.active = this.mapSortingFieldToHeader(active);
    this.filmsSortHeaders.direction = direction;
  }

  /**
   * A function to call when a user clicks a row.
   * @param film - Film to provide to details page.
   */
  public navigateToFilmDetailsPage(film: Film): void {
    this.router.navigateByUrl(`films/film/${film.pk}`, { state: film });
  }

  /**
   * Method used as a side-effect in film fetching. Checks if this is first or last page.
   * @param countOfFilms - Count of fetched films.
   * @param paginationMode - Pagination mode.
   */
  private updatePaginationStatus(countOfFilms: number, paginationMode: PaginationDirection): void {
    if (this.firstVisibleFilm === null) {
      this.isLastPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
    } else if (paginationMode === PaginationDirection.Next) {
      this.isLastPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
      this.isFirstPage$.next(false);
    } else {
      this.isFirstPage$.next(countOfFilms !== COUNT_OF_FILMS_FOR_NEXT_PAGE);
      this.isLastPage$.next(false);
    }
  }

  /**
   * Method used in films fetching. Removes film which indicates existence of next or previous page.
   * @param films - Array of films.
   * @param paginationMode - Pagination mode.
   */
  private parseFilmsList(films: Film[], paginationMode: PaginationDirection): Film[] {
    /** Case when we dont have film we dont need to display. */
    if (films.length !== COUNT_OF_FILMS_FOR_NEXT_PAGE) {
      return films;
    }

    /** Removes last film if we loaded next page. */
    if (paginationMode === PaginationDirection.Next) {
      return films.slice(0, -1);
    }

    /** Removes first film if we loaded previous page. */
    return films.slice(1);
  }

  /**
   * Method used as a side-effect in film fetching. Updates first and last films on the current page.
   * @param films - Films array.
   * Make sure that this array contains only films on the current page without film indicating existence of next or previous page.
   */
  private updateFirstAndLastFilms(films: Film[]): void {
    this.firstVisibleFilm = films[0];
    this.lastVisibleFilm = films.slice(-1)[0];
  }

  /**
   * Resets value when need to fetch the first page.
   */
  private resetValuesForFirstPageFetching(): void {
    this.firstVisibleFilm = null;
    this.lastVisibleFilm = null;
    this.paginationMode$.next(PaginationDirection.Next);
    this.isFirstPage$.next(true);
    this.isLastPage$.next(true);
  }

  private mapSortStateIntoSortingOptions(sortState: Sort): SortingOptions {
    let sortingField = this.mapHeaderToSortingField(sortState.active);

    let direction: SortingDirection;
    switch (sortState.direction) {
      case 'asc':
        direction = SortingDirection.Ascending;
        break;
      case 'desc':
        direction = SortingDirection.Descending;
        break;
      default:
        /** MatSort direction is equal to '' when we dont sort by specific field so using default values. */
        sortingField = FilmSortingField.EpisodeId;
        direction = SortingDirection.Ascending;
    }

    return {
      sortingField,
      direction,
    };
  }

  private mapHeaderToSortingField(headerName: string): FilmSortingField {
    switch (headerName) {
      case this.episodeIdHeader:
        return FilmSortingField.EpisodeId;
      case this.titleHeader:
        return FilmSortingField.Title;
      case this.releaseDateHeader:
        return FilmSortingField.ReleaseDate;
      case this.directorHeader:
        return FilmSortingField.Director;
      default:
        return FilmSortingField.EpisodeId;
    }
  }

  private mapSortingFieldToHeader(sortingField: FilmSortingField): string {
    switch (sortingField) {
      case FilmSortingField.Director:
        return this.directorHeader;
      case FilmSortingField.EpisodeId:
        return this.episodeIdHeader;
      case FilmSortingField.ReleaseDate:
        return this.releaseDateHeader;
      case FilmSortingField.Title:
        return this.titleHeader;
      default:
        return this.episodeIdHeader;
    }
  }

  private initFilmsStream(): Observable<readonly Film[]> {
    return combineLatest(
      [this.sortingOptions$, this.paginationMode$, this.searchingValue$],
    ).pipe(
      debounceTime(300),
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
      tap(fetchOptions => {

        if (fetchOptions.titleSearchingValue !== '') {
          this.isSearching$.next(true);
          this.setSortingHeaders(FilmSortingField.Title, SortingDirection.Ascending);
        } else {
          const { sortingField, direction } = fetchOptions.sortingOptions;
          this.isSearching$.next(false);
          this.setSortingHeaders(sortingField, direction);
        }
      }),
      switchMap(fetchOptions => this.filmsService.fetchFilms(fetchOptions)),
      withLatestFrom(this.paginationMode$),
      tap(([films, paginationMode]) => this.updatePaginationStatus(films.length, paginationMode)),
      map(([films, paginationMode]) => this.parseFilmsList(films, paginationMode)),
      tap(films => this.updateFirstAndLastFilms(films)),
      takeUntil(this.destroy$),
    );
  }
}
