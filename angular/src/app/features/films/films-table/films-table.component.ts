import { BehaviorSubject, Subject, combineLatest, map, switchMap, tap, takeUntil, Observable, merge, shareReplay } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { FilmSortingField } from 'src/app/core/services/filmsService/enums/film-sorting-field';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';
import { Film } from 'src/app/core/models/film';
import { PaginationDirection } from 'src/app/core/utils/enums/pagination-direction';
import { SortingDirection } from 'src/app/core/utils/enums/sorting-direction';
import { SortingOptions } from 'src/app/core/services/filmsService/interfaces/films-sorting-options';
import { Pagination } from 'src/app/core/models/pagination';

/**
 * Maximum count of films on a single page.
 */
const COUNT_OF_FILMS_ON_PAGE = 10;

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
export class FilmsTableComponent implements OnInit, OnDestroy {

  /** Shows if we are searching or not. Used for disabling sorting field changing. */
  public readonly isSearching$ = new BehaviorSubject(false);

  private readonly sortingOptions$ = new BehaviorSubject<SortingOptions>(DEFAULT_SORTING_OPTIONS);

  private readonly paginationDirection$ = new BehaviorSubject<PaginationDirection>(PaginationDirection.Next);

  private readonly searchingValue$ = new BehaviorSubject<string>('');

  private firstVisibleFilm: Film | null = null;

  private lastVisibleFilm: Film | null = null;

  private readonly destroy$ = new Subject<void>();

  /** Films and pagination info on the current page. */
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
  private readonly filmsSortHeaders?: MatSort;

  public constructor(
    private readonly filmsService: FilmsService,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    /* Emitting and updating values to fetch first page when sorting field or direction is changed
     or when user updates searching value. */
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
   * Emits new searching value.
   * @param value - New searching value. */
  public onSearchingValueChange(value: string): void {
    this.searchingValue$.next(value);
  }

  /**
   * Emits new pagination direction.
   * @param paginationDirection - New searching pagination direction. */
  public onPaginationDirectionChange(paginationDirection: PaginationDirection): void {
    this.paginationDirection$.next(paginationDirection);
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
    if (this.filmsSortHeaders) {
      this.filmsSortHeaders.active = this.mapSortingFieldToHeader(active);
      this.filmsSortHeaders.direction = direction;
    }
  }

  /**
   * Method used as a side-effect in film fetching. Updates first and last films on the current page.
   * @param films - Films array.
   * Make sure that this array contains only films on the current page without film indicating existence of next or previous page.
   */
  private updateFirstAndLastFilms(films: readonly Film[]): void {
    this.firstVisibleFilm = films[0];
    this.lastVisibleFilm = films.slice(-1)[0];
  }

  /**
   * Resets value when need to fetch the first page.
   */
  private resetValuesForFirstPageFetching(): void {
    this.firstVisibleFilm = null;
    this.lastVisibleFilm = null;
    this.paginationDirection$.next(PaginationDirection.Next);
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
        /** All table header should be declared above. If not then the error will be thrown so please add missing header case. */
        throw new Error('Failed to recognize table header.');
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
        /** All film sorting fields should be declared above. If not then the error will be thrown so please add missing field case. */
        throw new Error('Failed to recognize FilmSortingField.');
    }
  }

  private initFilmsStream(): Observable<Pagination<Film>> {
    return combineLatest(
      [this.sortingOptions$, this.paginationDirection$, this.searchingValue$],
    ).pipe(
      shareReplay(1),
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
      tap(films => this.updateFirstAndLastFilms(films.items)),
      takeUntil(this.destroy$),
    );
  }
}
