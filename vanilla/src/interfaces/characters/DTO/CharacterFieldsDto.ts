/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Interface describing the fields of DTO character.
 */
export interface CharacterFieldsDto {

  /** Birth year of the character. */
  readonly birth_year: string;

  /** Creation date of the character in the DB. */
  readonly created: string;

  /** Edition date of the character in the DB. */
  readonly edited: string;

  /** Eye color of the character. */
  readonly eye_color: string;

  /** Gender of the character. */
  readonly gender: string;

  /** Hair color of the character. */
  readonly hair_color: string;

  /** Height of the character. */
  readonly height: string;

  /** Primary key of the homeworld of the character. */
  readonly homeworld: number;

  /** Mass of the character. */
  readonly mass: string;

  /** Name of the character. */
  readonly name: string;

  /** Skin color of the character. */
  readonly skin_color: string;
}
