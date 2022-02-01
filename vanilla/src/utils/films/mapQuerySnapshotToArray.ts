import { QuerySnapshot } from 'firebase/firestore';

import { FilmDto } from '../../interfaces/films/DTO/FilmDto';
import { Film } from '../../interfaces/films/film/Film';

import { FilmMapper } from './../mappers/FilmMapper';

/**
 * Function maps query snapshot from Firestore to regular array.
 * @param snapshot - Query snapshot with filmDTOs data.
 * @returns Array with films data.
 */
export const mapQuerySnapshotToArray = (
  snapshot: QuerySnapshot<FilmDto>,
): Film[] => snapshot.docs.map(filmDTO => FilmMapper.fromDto(filmDTO.data()));
