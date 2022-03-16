/**
 * Base interface for all classes which have primary key and name.
 */
export interface BaseEntity {

  /** Primary key. */
  readonly pk: number;

  /** Name. */
  readonly name: string;
}
