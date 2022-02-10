import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreFollections';

import { fetchUpToTenEnteties } from '../fetchUpToTenEnteties';

import { CharacterMapper } from './../../mappers/CharacterMapper';

import { splitArray } from './../../utils/splitArray';

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

    for (const subArray of splitedPrimaryKeys) {
      promisesList.push(fetchUpToTenEnteties<CharacterDto, Character>(
        this.charactersCollection,
        subArray,
        characters,
        CharacterMapper.fromDto,
      ));
    }

    await Promise.all(promisesList);

    return characters;
  }
}
