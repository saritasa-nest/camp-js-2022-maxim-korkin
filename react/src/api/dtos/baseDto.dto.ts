/** Base dto. */
export interface BaseDto<T> {
  /** Fields of the entity. */
  readonly fields: T;

  /** Model in DB. */
  readonly model: string;

  /** Primary key of the entity. */
  readonly pk: number;
}
