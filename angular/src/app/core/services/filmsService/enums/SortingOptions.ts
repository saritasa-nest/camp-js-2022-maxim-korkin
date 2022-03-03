import { SortingFields } from './SortingFields';

/**
 * Interface for sorting options.
 */
export interface SortingOptions {

  /**
   * Sorting field.
   */
  sortingField: SortingFields;

  /**
   * Ascending or descending sorting order.
   */
  readonly direction: 'asc' | 'desc';
}
