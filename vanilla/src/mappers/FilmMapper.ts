/* eslint-disable @typescript-eslint/naming-convention */

import { Film } from '../interfaces/films/domain/Film';
import { FilmDto } from '../interfaces/films/DTO/FilmDto';
import { FilmFieldsDto } from '../interfaces/films/DTO/FilmFieldsDto';
import { getDateString } from '../utils/getDateString';
import { EditableFilmFieldsDto } from '../interfaces/films/DTO/EditableFilmFieldsDto';

/**
 * Class for mapping Film and FilmDto objects to each other.
 */
export class FilmMapper {
  /**
   * Method gets FilmDTO object and then converts it into Film object and returns it.
   * @param dto - FilmDTO object which need to be converted into Film object.
   * @returns Converted Film object.
   */
  public static fromDto(dto: FilmDto): Film {
    const { fields } = dto;
    return {
      characterIds: fields.characters,
      director: fields.director,
      episodeId: fields.episode_id,
      openingCrawl: fields.opening_crawl,
      planetIds: fields.planets,
      producers: fields.producer.split(', '),
      releaseDate: new Date(fields.release_date),
      title: fields.title,
      pk: dto.pk,
    };
  }

  /**
   * Method gets Film object and then converts it into FilmDto object and returns it.
   * @param film - Film object which need to be converted into FilmDto object.
   * @param primaryKey - Primary key of the film.
   * @returns Converted FilmDto object.
   */
  public static toDto(film: Film, primaryKey: number): FilmDto {
    const newFilmDtoFields: FilmFieldsDto = {
      characters: film.characterIds,
      created: (new Date()).toISOString(),
      director: film.director,
      edited: (new Date()).toISOString(),
      episode_id: film.episodeId,
      opening_crawl: film.openingCrawl,
      planets: film.planetIds,
      producer: film.producers.join(', '),
      release_date: film.releaseDate.toISOString(),
      species: [],
      starships: [],
      title: film.title,
      vehicles: [],
    };

    return {
      fields: newFilmDtoFields,
      model: 'resources.film',
      pk: primaryKey,
    };
  }

  /**
   * Method gets Film object and then converts it into EditableFilmFieldsDto object and returns it.
   * @param film - Film object which need to be converted into EditableFilmFieldsDto object.
   * @returns Converted EditableFilmFieldsDto object.
   */
  public static toEditableFieldsDto(film: Film): EditableFilmFieldsDto {
    return {
      'fields.characters': film.characterIds,
      'fields.director': film.director,
      'fields.edited': (new Date()).toISOString(),
      'fields.episode_id': film.episodeId,
      'fields.opening_crawl': film.openingCrawl,
      'fields.planets': film.planetIds,
      'fields.producer': film.producers.join(', '),
      'fields.release_date': getDateString(film.releaseDate),
      'fields.title': film.title,
    };
  }
}
