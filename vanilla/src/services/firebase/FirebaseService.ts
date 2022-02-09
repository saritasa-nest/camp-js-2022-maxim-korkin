import { QuerySnapshot } from 'firebase/firestore';

import { FilmDto } from '../../interfaces/films/DTO/FilmDto';
import { Film } from '../../interfaces/films/film/Film';
import { FilmMapper } from '../../mappers/FilmMapper';

import { PlanetDto } from '../../interfaces/planets/DTO/PlanetDto';
import { PlanetMapper } from '../../mappers/PlanetMapper';
import { Planet } from '../../interfaces/planets/planet/Planet';

import { Character } from './../../interfaces/characters/character/Character';
import { CharacterMapper } from './../../mappers/CharacterMapper';
import { CharacterDto } from './../../interfaces/characters/DTO/CharacterDto';

/**
 * Service class with utility functions related to Firebase.
 */
export class FirebaseService {
  /**
   * Method maps query snapshot from Firestore to regular array.
   * @param snapshot - Query snapshot with FilmDtos data.
   * @returns Array with films data.
   */
  public static mapFilmsQuerySnapshotToArray(snapshot: QuerySnapshot<FilmDto>): Film[] {
    return snapshot.docs.map(dto => FilmMapper.fromDto(dto.data()));
  }

  /**
   * Method maps query snapshot from Firestore to regular array.
   * @param snapshot - Query snapshot with CharacterDtos data.
   * @returns Array with characters data.
   */
  public static mapCharactersQuerySnapshotToArray(snapshot: QuerySnapshot<CharacterDto>): Character[] {
    return snapshot.docs.map(dto => CharacterMapper.fromDto(dto.data()));
  }

  /**
   * Method maps query snapshot from Firestore to regular array.
   * @param snapshot - Query snapshot with PlanetDtos data.
   * @returns Array with planets data.
   */
  public static mapPlanetsQuerySnapshotToArray(snapshot: QuerySnapshot<PlanetDto>): Planet[] {
    return snapshot.docs.map(dto => PlanetMapper.fromDto(dto.data()));
  }
}
