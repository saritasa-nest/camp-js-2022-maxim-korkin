import { FilmFields } from '../../interfaces/films/film/FilmFields';

import { Film } from '../../interfaces/films/film/Film';

import { FilmDTO } from '../../interfaces/films/DTO/FilmDTO';

/**
 * Class for mapping Film and FilmDTO objects to each other.
 */
export class FilmMapper {
  /**
   * Method gets FilmDTO object then converts it into Film object and returns it.
   * @param filmDTOObject - FilmDTO object which will be converted into Film object.
   * @returns Converted Film object.
   */
  public static mapFilmDTOToFilm(filmDTOObject: FilmDTO): Film {
    const newFilmFields: FilmFields = {
      ...filmDTOObject.fields,
      created: new Date(filmDTOObject.fields.created),
      edited: new Date(filmDTOObject.fields.edited),
      releaseDate: new Date(filmDTOObject.fields.release_date),
      openingCrawl: filmDTOObject.fields.opening_crawl,
      episodeID: filmDTOObject.fields.episode_id,
    };

    return {
      fields: newFilmFields,
      model: filmDTOObject.model,
      pk: filmDTOObject.pk,
    };
  }
}
