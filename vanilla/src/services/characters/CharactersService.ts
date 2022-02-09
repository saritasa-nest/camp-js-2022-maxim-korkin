import { query, where, getDocs } from 'firebase/firestore';

import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreFollections';

import { FirebaseService } from './../firebase/FirebaseService';

import { Character } from './../../interfaces/characters/character/Character';
import { CharacterDto } from './../../interfaces/characters/DTO/CharacterDto';

import { getCollectionRef } from './../../firebase/getCollection';

/**
 * Service class which helps to work with characters in firestore DB.
 */
export class CharactersService {
  private static charactersCollection = getCollectionRef<CharacterDto>(FirestoreCollections.Characters);

  /**
   * Fetches characters from the firestore with the given primary keys.
   * @param primaryKeys - Array containing primary keys of the characters.
   * @returns Array with the characters data.
   */
  public static async fetchCharactersListByPrimaryKeys(primaryKeys: number[]): Promise<Character[]> {
    const charactersQuery = query(this.charactersCollection, where('pk', 'in', primaryKeys));

    const charactersSnapshot = await getDocs(charactersQuery);

    return FirebaseService.mapCharactersQuerySnapshotToArray(charactersSnapshot);
  }
}
