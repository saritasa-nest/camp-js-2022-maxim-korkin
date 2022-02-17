/* eslint-disable @typescript-eslint/naming-convention */

import { Film } from '../interfaces/films/domain/Film';
import { FilmDto } from '../interfaces/films/DTO/FilmDto';
import { FilmFieldsDto } from '../interfaces/films/DTO/FilmFieldsDto';

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
      producer: fields.producer,
      releaseDate: new Date(fields.release_date),
      title: fields.title,
      pk: dto.pk,
    };
  }

  /**
   * Method gets Film object and then converts it into FilmDto object and returns it.
   * @param film - Film object which need to be converted into FilmDto object.
   * @param created - Date of creation.
   * @param edited - Date of edition.
   * @param specieIds - Array containing primary keys of species.
   * @param starshipIds - Array containing primary keys of starships.
   * @param vehicleIds - Array containing primary keys of vehicles.
   * @returns Converted FilmDto object.
   */
  public static toDto(film: Film,
    created = new Date(),
    edited = new Date(),
    specieIds: readonly number[] = [],
    starshipIds: readonly number[] = [],
    vehicleIds: readonly number[] = []): FilmDto {
    const newFilmDtoFields: FilmFieldsDto = {
      characters: film.characterIds,
      created: created.toISOString(),
      director: film.director,
      edited: edited.toISOString(),
      episode_id: film.episodeId,
      opening_crawl: film.openingCrawl,
      planets: film.planetIds,
      producer: film.producer,
      release_date: film.releaseDate.toISOString(),
      species: specieIds,
      starships: starshipIds,
      title: film.title,
      vehicles: vehicleIds,
    };

    return {
      fields: newFilmDtoFields,
      model: 'resources.film',
      pk: film.pk,
    };
  }
}
