import { SortingDirection } from '../../utils/enums/sorting-direction';

import { FilmSortingField } from './film-sorting-field';

/**
 * Sorting options used for making firebase query constraints for films fetching.
 */
export interface SortingOptions {

  /**
   * Sorting field.
   */
  readonly sortingField: FilmSortingField;

  /**
   * Ascending or descending sorting order.
   */
  readonly direction: SortingDirection;
}
