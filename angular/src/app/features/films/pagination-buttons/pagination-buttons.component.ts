import { FilmsService } from 'src/app/core/services/filmsService/films.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PaginationModes } from 'src/app/core/services/filmsService/enums/PaginationModes';

/**
 * Pagination button component.
 */
@Component({
  selector: 'sw-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationButtonsComponent {

  /** Stream showing if the current page is the last one. */
  public readonly isLastPage$ = this.filmsService.isLastPage$;

  /** Stream showing if the current page is the first one. */
  public readonly isFirstPage$ = this.filmsService.isFirstPage$;

  public constructor(
    private readonly filmsService: FilmsService,
  ) { }

  /**
   * Method for displaying the next page of films.
   */
  public nextPage(): void {
    this.filmsService.changePage(PaginationModes.NEXT);
  }

  /**
   * Method for displaying the previous page of films.
   */
  public prevPage(): void {
    this.filmsService.changePage(PaginationModes.PREVIOUS);
  }
}
