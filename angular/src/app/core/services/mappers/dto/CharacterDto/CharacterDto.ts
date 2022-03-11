import { CharacterFieldsDto } from './CharacterFieldsDto';

/**
 * Dto of character.
 */
export interface CharacterDto {

  /** Fields which describe the character. */
  readonly fields: CharacterFieldsDto;

  /** Model in the DB. */
  readonly model: string;

  /** Primary key of the character. */
  readonly pk: number;
}
