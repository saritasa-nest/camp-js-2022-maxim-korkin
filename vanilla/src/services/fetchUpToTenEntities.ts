import { CollectionReference, getDocs, query, where } from 'firebase/firestore';

import { FirebaseService } from './firebase/FirebaseService';

/**
 * Function which fetches up to 10 entities from the firestore and pushes them into outer array.
 * @param collection - Firestore collection reference.
 * @param subArray - Subarray of primary keys.
 * @param entitiesList - Array with entities.
 * @param fromDtoMapper - Mapper method which performs mapping.
 */
export async function fetchUpToTenEntities<TDto, TData>(
  collection: CollectionReference<TDto>,
  subArray: number[],
  entitiesList: TData[],
  fromDtoMapper: (dto: TDto) => TData,
): Promise<void> {
  const planetsQuery = query(collection, where('pk', 'in', subArray));

  const snapshot = await getDocs(planetsQuery);

  entitiesList.push(...FirebaseService.mapQuerySnapshotToArray<TDto, TData>(snapshot, fromDtoMapper));
}
