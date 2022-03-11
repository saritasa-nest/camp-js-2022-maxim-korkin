import { collectionData } from 'rxfire/firestore';
import { query, where } from 'firebase/firestore';
import { Observable, map, combineLatest } from 'rxjs';
import { Injectable } from '@angular/core';
import { collection, CollectionReference, Firestore } from '@angular/fire/firestore';

import { Character } from '../../models/Character';
import { splitArray } from '../../utils/splitArray';
import { CharacterMapper } from '../mappers/character-mapper.service';
import { CharacterDto } from '../mappers/dto/CharacterDto/CharacterDto';

const CHARACTERS_COLLECTION_NAME = 'characters';

/**
 * Characters service.
 */
@Injectable({
  providedIn: 'root',
})
export class CharactersService {

  private readonly charactersCollection: CollectionReference<CharacterDto>;

  public constructor(
    private readonly firestore: Firestore,
    private readonly characterMapper: CharacterMapper,
  ) {
    this.charactersCollection = collection(this.firestore, CHARACTERS_COLLECTION_NAME) as CollectionReference<CharacterDto>;
  }

  /**
   * Fetches characters by primary keys.
   * @param pks - Primary keys to fetch characters.
   */
  public fetchCharactersByPrimaryKeys(pks: readonly number[]): Observable<Character[]> {
    const splittedPks = splitArray(pks);

    const characters: Observable<Character[]>[] = [];
    splittedPks.forEach(partOfPks => {
      const charactersQuery = query(this.charactersCollection, where('pk', 'in', partOfPks));
      characters.push(collectionData<CharacterDto>(charactersQuery).pipe(
        map(characterDtos => characterDtos.map(characterDto => this.characterMapper.fromDto(characterDto))),
      ));
    });

    return combineLatest(characters).pipe(
      map(characterArrays => characterArrays.reduce((allCharacters, characterArray) => [...allCharacters, ...characterArray])),
    );
  }
}
