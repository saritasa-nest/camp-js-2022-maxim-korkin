import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreCollections';

import { splitArray } from '../../utils/splitArray';

import { fetchUpToTenEntities } from '../fetchUpToTenEntities';

import { PlanetMapper } from './../../mappers/PlanetMapper';

import { Planet } from './../../interfaces/planets/planet/Planet';
import { PlanetDto } from './../../interfaces/planets/DTO/PlanetDto';

import { getCollectionRef } from './../../firebase/getCollection';

/**
 * Service class which helps to work with planets in firestore DB.
 */
export class PlanetsService {
  private static planetsCollection = getCollectionRef<PlanetDto>(FirestoreCollections.Planets);

  /**
   * Fetches planets from the firestore with the given primary keys.
   * @param primaryKeys - Array containing primary keys of the planets.
   * @returns Array with the planets data.
   */
  public static async fetchPlanetsListByPrimaryKeys(primaryKeys: readonly number[]): Promise<Planet[]> {
    const splittedPrimaryKeys = splitArray<number>(primaryKeys);

    const planets: Planet[] = [];

    const promisesList = [];

    for (const subArray of splittedPrimaryKeys) {
      promisesList.push(fetchUpToTenEntities<PlanetDto, Planet>(
        this.planetsCollection,
        subArray,
        planets,
        PlanetMapper.fromDto,
      ));
    }

    await Promise.all(promisesList);

    return planets;
  }
}
