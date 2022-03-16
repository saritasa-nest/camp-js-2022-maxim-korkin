import { BaseEntity } from './../../BaseEntity';

/**
 * Interface describing the planet.
 */
export interface Planet extends BaseEntity {

  /** Climate of the planet. */
  readonly climate: string;

  /** Diameter of the planet. */
  readonly diameter: string;

  /** Gravity of the planet. */
  readonly gravity: string;

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
}
