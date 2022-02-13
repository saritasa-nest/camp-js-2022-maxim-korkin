import { CharacterFieldsDto } from './CharacterFieldsDto';

/**
 * Interface describing the DTO of character.
 */
export interface CharacterDto {

  /** Fields which describe the character. */
  readonly fields: CharacterFieldsDto;

  /** Model in the DB. */
  readonly model: string;

  /** Primary key of the character. */
  readonly pk: number;
}
