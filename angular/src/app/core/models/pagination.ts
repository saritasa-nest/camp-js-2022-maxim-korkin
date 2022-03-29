/**
 * Pagination info.
 */
export interface Pagination<T> {

  /** Entities. */
  readonly items: readonly T[];

  /** Shows if there is next page. */
  readonly hasNext: boolean;

  /** Shows if there is prev page. */
  readonly hasPrev: boolean;
}
