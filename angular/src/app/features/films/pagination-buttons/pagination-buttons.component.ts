import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { PaginationDirection } from 'src/app/core/utils/enums/pagination-direction';

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
  public hasNext: boolean | undefined = false;

  /** Shows if the current page is the first one. */
  @Input()
  public hasPrev: boolean | undefined = false;

  @Output()
  private newPaginationModeEvent = new EventEmitter<PaginationDirection>();

  /**
   * Method for fetching the next page of films.
   */
  public fetchNextPage(): void {
    this.newPaginationModeEvent.emit(PaginationDirection.Next);
  }

  /**
   * Method for fetching the previous page of films.
   */
  public fetchPrevPage(): void {
    this.newPaginationModeEvent.emit(PaginationDirection.Previous);
  }
}
