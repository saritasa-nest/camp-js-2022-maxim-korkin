import { SortingDirection } from '../../../core/utils/enums/SortingDirection';
import { FilmSortingField } from '../enums/FilmSortingField';

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
