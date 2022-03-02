import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Film } from 'src/app/core/models/Film';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';
import { PaginationModes } from 'src/app/core/services/filmsService/PaginationModes';

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

  /** Stream of films. */
  public films$: Observable<Film[]>;

  /** List of table headers. */
  public tableHeaders = ['Episode Id', 'Title', 'Release Date', 'Producers', 'Director'];

  private destroy$ = new Subject<void>();

  public constructor(
    private readonly filmsService: FilmsService,
  ) {
    this.films$ = this.filmsService.fetchFilms(PaginationModes.INIT).pipe(
      takeUntil(this.destroy$),
    );
  }

  public ngOnInit(): void {
    this.films$.subscribe({
      next: () => console.log('next'),
      complete: () => console.log('complete'),
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
   * Next page of films.
   */
  public loadFilms(paginationMode: PaginationModes): void {
    this.films$ = this.filmsService.fetchFilms(paginationMode).pipe(
      takeUntil(this.destroy$),
    );
  }
}
