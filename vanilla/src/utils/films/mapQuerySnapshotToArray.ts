import { QuerySnapshot } from 'firebase/firestore';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';
import { Film } from '../../interfaces/films/film/Film';

import { FilmMapper } from './../mappers/FilmMapper';

/**
 * Function maps query snapshot from Firestore to regular array.
 * @param snapshot - Query snapshot with filmDTO data.
 * @returns Array with Film data.
 */
export const mapQuerySnapshotToArray = (
  snapshot: QuerySnapshot<FilmDTO>,
): Film[] => snapshot.docs.map(filmDTO => FilmMapper.mapFilmDTOToFilm(filmDTO.data()));
