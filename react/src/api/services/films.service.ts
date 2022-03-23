import { query, getDocs } from 'firebase/firestore';
import { Film } from 'src/models/film';
import { Firebase } from './firebase.service';
import { FilmDto } from '../dtos/film.dto';
import { FilmMapper } from '../mappers/film.mapper';
/**
 * Films service.
 */
export namespace FilmsService {

  const FILMS_COLLECTION_NAME = 'films';

  const filmsCollection = Firebase.getCollectionReference<FilmDto>(FILMS_COLLECTION_NAME);

  /**
   * Function for fetching next page of films.
   */
  export async function fetchFilms(): Promise<Film[]> {
    const filmsQuery = query(filmsCollection);
    const filmsSnapshot = await getDocs(filmsQuery);
    return Firebase.mapQuerySnapshotToArray<FilmDto, Film>(filmsSnapshot, FilmMapper.fromDto);
  }
}
