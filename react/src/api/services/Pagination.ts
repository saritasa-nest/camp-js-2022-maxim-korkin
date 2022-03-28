/** Pagination info. */
export interface Pagination<T> {
  /** Fetched entities. */
  readonly entities: T[];
  /** Shows if there is next page to fetch. */
  readonly hasNext: boolean;
}
