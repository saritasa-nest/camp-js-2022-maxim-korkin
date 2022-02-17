/**
 * Base interface for all classes which have primary key and name.
 */
export interface BaseEntity {

  /** Primary key. */
  readonly pk: number;

  /** Name. */
  readonly name: string;

  /** Creation date of the entity in the DB. */
  readonly created: Date;

  /** Edition date of the entity in the DB. */
  readonly edited: Date;
}
