import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';

/**
 * Component for the films table.
 */
@Component({
  selector: 'sw-films-table',
  templateUrl: './films-table.component.html',
  styleUrls: ['./films-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsTableComponent implements OnDestroy {

  /** Stream of films. */
  public readonly films$ = this.filmsService.films$;

  /** List of table headers. */
  public readonly tableHeaders = ['Episode Id', 'Title', 'Release Date', 'Producers', 'Director'];

  public constructor(
    private readonly filmsService: FilmsService,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.filmsService.resetPagination();
  }
}
