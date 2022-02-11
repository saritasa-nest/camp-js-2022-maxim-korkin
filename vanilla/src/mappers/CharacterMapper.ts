/* eslint-disable @typescript-eslint/naming-convention */

import { CharacterFieldsDto } from './../interfaces/characters/DTO/CharacterFieldsDto';
import { CharacterDto } from './../interfaces/characters/DTO/CharacterDto';

import { Character } from '../interfaces/characters/character/Character';

/**
 * Class for mapping Character and CharacterDto objects to each other.
 */
export class CharacterMapper {

  /**
   * Method gets CharacterDto object and then converts it into Character object and returns it.
   * @param dto - CharacterDto object which need to be converted into Character object.
   * @returns Converted Character object.
   */
  public static fromDto(dto: CharacterDto): Character {
    const { fields } = dto;

    return {
      birthYear: fields.birth_year,
      created: new Date(fields.created),
      edited: new Date(fields.edited),
      eyeColor: fields.eye_color,
      gender: fields.gender,
      hairColor: fields.hair_color,
      height: Number(fields.height),
      homeworldPk: fields.homeworld,
      mass: Number(fields.mass),
      name: fields.name,
      skinColor: fields.name,
      pk: dto.pk,
    };
  }

  /**
   * Method gets Character object and then converts it into CharacterDto object and returns it.
   * @param character - Character object which need to be converted into CharacterDto object.
   * @returns Converted CharacterDto object.
   */
  public static toDto(character: Character): CharacterDto {
    const newCharacterDtoFields: CharacterFieldsDto = {
      birth_year: character.birthYear,
      created: character.created.toISOString(),
      edited: character.edited.toISOString(),
      eye_color: character.eyeColor,
      gender: character.gender,
      hair_color: character.hairColor,
      height: character.height.toString(),
      homeworld: character.homeworldPk,
      mass: character.mass.toString(),
      name: character.name,
      skin_color: character.skinColor,
    };

    return {
      fields: newCharacterDtoFields,
      model: 'resources.people',
      pk: character.pk,
    };
  }
}
