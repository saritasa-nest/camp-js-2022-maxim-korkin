import { FirestoreCollections } from '../../enums/FirestoreCollections/FirestoreCollections';
import { fetchUpToTenEntities } from '../fetchUpToTenEntities';

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
    const splittedPrimaryKeys = splitArray<number>(primaryKeys);

    const characters: Character[] = [];

    const promisesList = [];

    for (const subArray of splittedPrimaryKeys) {
      promisesList.push(fetchUpToTenEntities<CharacterDto, Character>(
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
