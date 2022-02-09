import { query, where, getDocs } from 'firebase/firestore';

import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreFollections';

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
  public static async fetchPlanetsListByPrimaryKeys(primaryKeys: number[]): Promise<Planet[]> {
    const planetsQuery = query(this.planetsCollection, where('pk', 'in', primaryKeys));

    const planetsSnapshot = await getDocs(planetsQuery);

    return FirebaseService.mapPlanetsQuerySnapshotToArray(planetsSnapshot);
  }
}
