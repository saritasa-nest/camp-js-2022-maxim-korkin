/* eslint-disable @typescript-eslint/naming-convention */

/**
 * Fields of the Dto planet.
 */
export interface PlanetFieldsDto {

  /** Climate of the planet. */
  readonly climate: string;

  /** Creation date of the planet in the DB. */
  readonly created: string;

  /** Diameter of the planet. */
  readonly diameter: string;

  /** Edition date of the planet in the DB. */
  readonly edited: string;

  /** Gravity of the planet. */
  readonly gravity: string;

  /** Name of the planet. */
  readonly name: string;

  /** Orbital period of the planet. */
  readonly orbital_period: string;

  /** Population of the planet. */
  readonly population: string;

  /** Rotation period of the planet. */
  readonly rotation_period: string;

  /** Surface water of the planet. */
  readonly surface_water: string;

  /** Terrain of the planet. */
  readonly terrain: string;
}
