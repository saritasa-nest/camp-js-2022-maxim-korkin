import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Film } from 'src/app/core/models/Film';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';
import { PaginationModes } from 'src/app/core/services/filmsService/enums/PaginationModes';

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
  public readonly films$: Observable<Film[]>;

  /** List of table headers. */
  public readonly tableHeaders = ['Episode Id', 'Title', 'Release Date', 'Producers', 'Director'];

  public constructor(
    private readonly filmsService: FilmsService,
  ) {
    this.films$ = this.filmsService.films$;
  }

  public ngOnInit(): void {
    // this.films$.subscribe({
    //   next: films => console.log(films),
    //   complete: () => console.log('complete'),
    // });
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.filmsService.resetFirstAndLastFilm();
  }

  public nextPage(): void {
    this.filmsService.changePage(PaginationModes.NEXT);
  }
}
