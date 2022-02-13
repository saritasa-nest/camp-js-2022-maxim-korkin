/**
 * Interface describing the character.
 */
export interface Character {

  /** Birth year of the character. */
  readonly birthYear: string;

  /** Creation date of the character in the DB. */
  readonly created: Date;

  /** Edition date of the character in the DB. */
  readonly edited: Date;

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

  /** Name of the character. */
  readonly name: string;

  /** Skin color of the character. */
  readonly skinColor: string;

  /** Primary key of the character. */
  readonly pk: number;
}
