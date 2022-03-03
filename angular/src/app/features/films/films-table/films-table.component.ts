import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { SortingFields } from 'src/app/core/services/filmsService/enums/SortingFields';
import { FilmsService } from 'src/app/core/services/filmsService/films.service';

import { SortingDirections } from './../../../core/services/filmsService/enums/SortingDirections';

import { SortingOptions } from './../../../core/services/filmsService/enums/SortingOptions';

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

  private readonly episodeIdHeader = 'Episode Id';

  private readonly titleHeader = 'Title';

  private readonly releaseDateHeader = 'Release Date';

  private readonly producersHeader = 'Producers';

  private readonly directorHeader = 'director';

  public constructor(
    private readonly filmsService: FilmsService,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.filmsService.resetPagination();
  }

  /**
   * Method to call on sort changing event.
   * @param sortState - New sort state.
   */
  public sortChange(sortState: Sort): void {
    const sortingOptions = this.parseSortStateIntoSortingOptions(sortState);

    this.filmsService.changeSorting(sortingOptions);
  }

  private parseSortStateIntoSortingOptions(sortState: Sort): SortingOptions {
    let sortingField: SortingFields;
    switch (sortState.active) {
      case this.episodeIdHeader:
        sortingField = SortingFields.EpisodeId;
        break;
      case this.titleHeader:
        sortingField = SortingFields.Title;
        break;
      case this.releaseDateHeader:
        sortingField = SortingFields.ReleaseDate;
        break;
      case this.directorHeader:
        sortingField = SortingFields.Director;
        break;
      default:
        sortingField = SortingFields.EpisodeId;
    }

    let direction: SortingDirections;
    switch (sortState.direction) {
      case 'asc':
        direction = SortingDirections.ASCENDING;
        break;
      case 'desc':
        direction = SortingDirections.DESCENDING;
        break;
      default:
        /** Direction is equal to '' when we dont want to sort by specific field.
         * so use default values. */
        sortingField = SortingFields.EpisodeId;
        direction = SortingDirections.ASCENDING;
    }

    return {
      sortingField,
      direction,
    };
  }
}
