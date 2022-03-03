import { SortingFields } from './SortingFields';

/**
 * Sorting options used for making firebase query constraints for films fetching.
 */
export interface SortingOptions {

  /**
   * Sorting field.
   */
  readonly sortingField: SortingFields;

  /**
   * Ascending or descending sorting order.
   */
  readonly direction: 'asc' | 'desc';

  /**
   * Title searching value. Empty string if we dont need to search.
   */
  readonly searchingValue: string;
}
