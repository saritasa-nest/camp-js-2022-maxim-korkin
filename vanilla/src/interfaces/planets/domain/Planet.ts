/**
 * Interface describing the planet.
 */
export interface Planet {

  /** Climate of the planet. */
  readonly climate: string;

  /** Creation date of the planet in the DB. */
  readonly created: Date;

  /** Diameter of the planet. */
  readonly diameter: string;

  /** Edition date of the planet in the DB. */
  readonly edited: Date;

  /** Gravity of the planet. */
  readonly gravity: string;

  /** Name of the planet. */
  readonly name: string;

  /** Orbital period of the planet. */
  readonly orbitalPeriod: string;

  /** Population of the planet. */
  readonly population: string;

  /** Rotation period of the planet. */
  readonly rotationPeriod: string;

  /** Surface water of the planet. */
  readonly surfaceWater: string;

  /** Terrain of the planet. */
  readonly terrain: string;

  /** Primary key of the planet. */
  readonly pk: number;
}
