import { query, where, getDocs } from 'firebase/firestore';

import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreFollections';

import { CharacterMapper } from './../../mappers/CharacterMapper';

import { splitArray } from './../../utils/splitArray';

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
  public static async fetchCharactersListByPrimaryKeys(primaryKeys: readonly number[]): Promise<Character[]> {

    const splitedPrimaryKeys = splitArray<number>(primaryKeys);

    const characters: Character[] = [];

    const promisesList = [];

    /**
     * Fetches up to ten characters.
     * @param subArray - Subarray of primary keys.
     */
    const fetchUpToTenCharacters = async(subArray: number[]): Promise<void> => {
      const charactersQuery = query(this.charactersCollection, where('pk', 'in', subArray));

      const charactersSnapshot = await getDocs(charactersQuery);

      characters.push(...FirebaseService.mapQuerySnapshotToArray<CharacterDto, Character>(charactersSnapshot, CharacterMapper.fromDto));
    };

    for (const subArray of splitedPrimaryKeys) {
      promisesList.push(fetchUpToTenCharacters(subArray));
    }

    await Promise.all(promisesList);

    return characters;
  }
}
