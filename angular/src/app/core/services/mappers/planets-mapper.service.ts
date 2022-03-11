import { Injectable } from '@angular/core';

import { Planet } from '../../models/Planet';

import { PlanetDto } from './dto/PlanetDto/PlanetDto';

/**
 * Service for mapping Planet and PlanetDto to each other.
 */
@Injectable({
  providedIn: 'root',
})
export class PlanetsMapper {

  /**
   * Converts PlanetDto to model.
   * @param dto - Dto object to convert.
   */
  public fromDto(dto: PlanetDto): Planet {
    const { fields } = dto;
    return {
      climate: fields.climate,
      diameter: fields.diameter,
      gravity: fields.gravity,
      name: fields.name,
      orbitalPeriod: fields.orbital_period,
      population: fields.population,
      rotationPeriod: fields.rotation_period,
      surfaceWater: fields.surface_water,
      terrain: fields.terrain,
      pk: dto.pk,
    };
  }
}
