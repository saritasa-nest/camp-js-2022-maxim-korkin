import { PlanetFieldsDto } from './PlanetFieldsDto';

/**
 * Dto of planet.
 */
export interface PlanetDto {

  /** Fields which describe the planet. */
  readonly fields: PlanetFieldsDto;

  /** Model in the DB. */
  readonly model: string;

  /** Primary key of the planet. */
  readonly pk: number;
}
