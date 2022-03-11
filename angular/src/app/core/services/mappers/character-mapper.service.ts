import { Injectable } from '@angular/core';

import { Character } from '../../models/Character';

import { CharacterDto } from './dto/CharacterDto/CharacterDto';

/**
 * Service for mapping Character and CharacterDto to each other.
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterMapper {

  /**
   * Converts CharacterDto to model.
   * @param dto - Dto object to convert.
   */
  public fromDto(dto: CharacterDto): Character {
    const { fields } = dto;
    return {
      birthYear: fields.birth_year,
      eyeColor: fields.eye_color,
      gender: fields.gender,
      hairColor: fields.hair_color,
      height: Number(fields.height),
      mass: Number(fields.mass),
      name: fields.name,
      skinColor: fields.skin_color,
      pk: dto.pk,
    };
  }
}
