/**
 * Base interface for dto.
 */
export interface BaseDto<T> {

  /** Fields which describe entity. */
  readonly fields: T;

  /** Model in db. */
  readonly model: string;

  /** Primary key. */
  readonly pk: number;
}
