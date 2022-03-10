import { BehaviorSubject } from 'rxjs';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PaginationModes } from 'src/app/core/utils/enums/PaginationModes';

/**
 * Pagination buttons component.
 */
@Component({
  selector: 'sw-pagination-buttons',
  templateUrl: './pagination-buttons.component.html',
  styleUrls: ['./pagination-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationButtonsComponent {

  /** Shows if the current page is the last one. */
  @Input()
  public isLastPage = true;

  /** Shows if the current page is the first one. */
  @Input()
  public isFirstPage = true;

  /** Pagination mode. */
  public paginationMode$ = new BehaviorSubject<PaginationModes>(PaginationModes.NEXT);

  /**
   * Method for displaying the next page of films.
   */
  public nextPage(): void {
    this.paginationMode$.next(PaginationModes.NEXT);
  }

  /**
   * Method for displaying the previous page of films.
   */
  public prevPage(): void {
    this.paginationMode$.next(PaginationModes.PREVIOUS);
  }
}
