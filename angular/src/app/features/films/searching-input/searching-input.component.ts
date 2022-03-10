import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

/**
 * Searching input component.
 */
@Component({
  selector: 'sw-searching-input',
  templateUrl: './searching-input.component.html',
  styleUrls: ['./searching-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchingInputComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  /** Form control for searching input. */
  public readonly searchInput = new FormControl('');

  /** Title searching value. */
  public searchChange$ = this.searchInput.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    takeUntil(this.destroy$),
  );

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
