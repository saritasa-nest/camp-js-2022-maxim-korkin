import { QuerySnapshot } from 'firebase/firestore';

import { FilmDto } from '../../interfaces/films/DTO/FilmDto';
import { Film } from '../../interfaces/films/film/Film';
import { FilmMapper } from '../../mappers/FilmMapper';

/**
 * Service class with utility functions related to Firebase.
 */
export class FirebaseService {
  /**
   * Method maps query snapshot from Firestore to regular array.
   * @param snapshot - Query snapshot with filmDTOs data.
   * @returns Array with films data.
   */
  public static mapQuerySnapshotToArray(snapshot: QuerySnapshot<FilmDto>): Film[] {
    return snapshot.docs.map(dto => FilmMapper.fromDto(dto.data()));
  }
}
