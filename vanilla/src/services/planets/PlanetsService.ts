import { query, where, getDocs } from 'firebase/firestore';

import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreFollections';

import { splitArray } from '../../utils/splitArray';

import { PlanetMapper } from './../../mappers/PlanetMapper';

import { FirebaseService } from './../firebase/FirebaseService';

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
    const splitedPrimaryKeys = splitArray<number>(primaryKeys);

    const planets: Planet[] = [];

    const promisesList = [];

    /**
     * Fetches up to ten planets.
     * @param subArray - Subarray of primary keys.
     */
    const fetchUpToTenPlanets = async(subArray: number[]): Promise<void> => {
      const planetsQuery = query(this.planetsCollection, where('pk', 'in', subArray));

      const planetsSnapshot = await getDocs(planetsQuery);

      planets.push(...FirebaseService.mapQuerySnapshotToArray<PlanetDto, Planet>(planetsSnapshot, PlanetMapper.fromDto));
    };

    for (const subArray of splitedPrimaryKeys) {
      promisesList.push(fetchUpToTenPlanets(subArray));
    }

    await Promise.all(promisesList);

    return planets;
  }
}
