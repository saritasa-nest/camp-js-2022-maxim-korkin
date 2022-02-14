import { QuerySnapshot } from 'firebase/firestore';

/**
 * Service class with utility functions related to Firebase.
 */
export class FirebaseService {

  /**
   * Method maps query snapshot from Firestore to regular array.
   * @param snapshot Query snapshot with Dtos.
   * @param fromDtoMapper Mapper method which perform mapping.
   * @returns Array with entities.
   */
  public static mapQuerySnapshotToArray<TDto, TData>(snapshot: QuerySnapshot<TDto>, fromDtoMapper: (dto: TDto) => TData): TData[] {
    return snapshot.docs.map(dto => fromDtoMapper(dto.data()));
  }
}
