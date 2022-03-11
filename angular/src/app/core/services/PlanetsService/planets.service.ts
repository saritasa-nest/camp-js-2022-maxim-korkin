import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, Firestore, query, where } from '@angular/fire/firestore';
import { combineLatest, map, Observable } from 'rxjs';

import { Planet } from '../../models/Planet';
import { splitArray } from '../../utils/splitArray';
import { PlanetDto } from '../mappers/dto/PlanetDto/PlanetDto';

import { PlanetsMapper } from './../mappers/planets-mapper.service';

const PLANETS_COLLECTION_NAME = 'planets';

/**
 * Planets service.
 */
@Injectable({
  providedIn: 'root',
})
export class PlanetsService {

  private readonly planetsCollection: CollectionReference<PlanetDto>;

  public constructor(
    private readonly firestore: Firestore,
    private readonly planetMapper: PlanetsMapper,
  ) {
    this.planetsCollection = collection(this.firestore, PLANETS_COLLECTION_NAME) as CollectionReference<PlanetDto>;
  }

  /**
   * Fetches Planets by primary keys.
   * @param pks - Primary keys to fetch planets.
   */
  public fetchPlanetsByPrimaryKeys(pks: readonly number[]): Observable<Planet[]> {
    const splittedPks = splitArray(pks);

    const characters: Observable<Planet[]>[] = [];
    splittedPks.forEach(partOfPks => {
      const charactersQuery = query(this.planetsCollection, where('pk', 'in', partOfPks));
      characters.push(collectionData<PlanetDto>(charactersQuery).pipe(
        map(characterDtos => characterDtos.map(characterDto => this.planetMapper.fromDto(characterDto))),
      ));
    });

    return combineLatest(characters).pipe(
      map(characterArrays => characterArrays.reduce((allCharacters, characterArray) => [...allCharacters, ...characterArray])),
    );
  }
}
