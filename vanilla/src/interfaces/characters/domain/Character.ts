import { BaseEntity } from './../../BaseEntity';

/**
 * Interface describing the character.
 */
export interface Character extends BaseEntity {

  /** Birth year of the character. */
  readonly birthYear: string;

  /** Eye color of the character. */
  readonly eyeColor: string;

  /** Gender of the character. */
  readonly gender: string;

  /** Hair color of the character. */
  readonly hairColor: string;

  /** Height of the character. */
  readonly height: number;

  /** Primary key of the homeworld of the character. */
  readonly homeworldPk: number;

  /** Mass of the character. */
  readonly mass: number;

  /** Skin color of the character. */
  readonly skinColor: string;
}
