/* eslint-disable @typescript-eslint/naming-convention */

import { PlanetFieldsDto } from './../interfaces/planets/DTO/PlanetFieldsDto';
import { Planet } from './../interfaces/planets/planet/Planet';
import { PlanetDto } from './../interfaces/planets/DTO/PlanetDto';

/**
 * Class for mapping Planet and PlanetDto objects to each other.
 */
export class PlanetMapper {

  /**
   * Method gets PlanetDto object and then converts it into Planet object and returns it.
   * @param dto - PlanetDto object which need to be converted into Planet object.
   * @returns Converted Planet object.
   */
  public static fromDto(dto: PlanetDto): Planet {
    const { fields } = dto;
    return {
      climate: fields.climate,
      created: new Date(fields.created),
      diameter: fields.diameter,
      edited: new Date(fields.edited),
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

  /**
   * Method gets Planet object and then converts it into PlanetDto object and returns it.
   * @param planet - Planet object which need to be converted into PlanetDto object.
   * @returns Converted PlanetDto object.
   */
  public toDto(planet: Planet): PlanetDto {
    const newPlanetDtoFields: PlanetFieldsDto = {
      climate: planet.climate,
      created: planet.created.toISOString(),
      diameter: planet.diameter,
      edited: planet.edited.toISOString(),
      gravity: planet.gravity,
      name: planet.name,
      orbital_period: planet.orbitalPeriod,
      population: planet.population,
      rotation_period: planet.rotationPeriod,
      surface_water: planet.surfaceWater,
      terrain: planet.surfaceWater,
    };

    return {
      fields: newPlanetDtoFields,
      model: 'resources.planet',
      pk: planet.pk,
    };
  }
}
