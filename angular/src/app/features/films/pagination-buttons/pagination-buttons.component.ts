import { BehaviorSubject } from 'rxjs';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PaginationDirection } from 'src/app/core/utils/enums/PaginationDirection';

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
  public paginationMode$ = new BehaviorSubject<PaginationDirection>(PaginationDirection.Next);

  /**
   * Method for fetching the next page of films.
   */
  public fetchNextPage(): void {
    this.paginationMode$.next(PaginationDirection.Next);
  }

  /**
   * Method for fetching the previous page of films.
   */
  public fetchPrevPage(): void {
    this.paginationMode$.next(PaginationDirection.Previous);
  }
}
