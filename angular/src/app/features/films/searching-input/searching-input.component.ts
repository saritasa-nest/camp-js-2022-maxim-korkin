import { Component, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';

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

  /** Form control for searching input. */
  public readonly searchInput = new FormControl('');

  private searchChange$ = this.searchInput.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
  );

  /**
   * Method for changing current sorting for ascending title.
   */
  @Input()
  public setTitleSorting = (): void => {
    console.error('Something went wrong with table headers on searching');
  };

  private destroy$ = new Subject<void>();

  public constructor(
    private readonly filmsService: FilmsService,
  ) { }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
