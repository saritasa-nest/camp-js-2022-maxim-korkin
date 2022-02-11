import { CollectionReference, getDocs, query, where } from 'firebase/firestore';

import { FirebaseService } from './firebase/FirebaseService';

/**
 * Function which fetches up to 10 enteties from the firestore and pushs them into outer array.
 * @param collection - Firestore follcetion reference.
 * @param subArray - Subarray of primary keys.
 * @param entetiesList - Array with enteties.
 * @param fromDtoMapper - Mapper method which performs mapping.
 */
export async function fetchUpToTenEntities<TDto, TData>(
  collection: CollectionReference<TDto>,
  subArray: number[],
  entetiesList: TData[],
  fromDtoMapper: (dto: TDto) => TData,
): Promise<void> {
  const planetsQuery = query(collection, where('pk', 'in', subArray));

  const snapshot = await getDocs(planetsQuery);

  entetiesList.push(...FirebaseService.mapQuerySnapshotToArray<TDto, TData>(snapshot, fromDtoMapper));
}
