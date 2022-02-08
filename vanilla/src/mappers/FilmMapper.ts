/* eslint-disable @typescript-eslint/naming-convention */
import { Film } from '../interfaces/films/film/Film';
import { FilmDto } from '../interfaces/films/DTO/FilmDto';
import { FilmFieldsDto } from '../interfaces/films/DTO/FilmFieldsDto';

/**
 * Class for mapping Film and FilmDTO objects to each other.
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
      created: new Date(fields.created),
      director: fields.director,
      edited: new Date(fields.edited),
      episodeId: fields.episode_id,
      openingCrawl: fields.opening_crawl,
      planetIds: fields.planets,
      producer: fields.producer,
      releaseDate: new Date(fields.release_date),
      specieIds: fields.species,
      starshipIds: fields.starships,
      title: fields.title,
      vehicleIds: fields.vehicles,
      pk: dto.pk,
    };
  }

  /**
   * Method gets Film object and then converts it into FilmDto object and returns it.
   * @param film - Film object which need to be converted into FilmDto object.
   * @returns Converted FilmDto object.
   */
  public static toDto(film: Film): FilmDto {
    const newFilmDtoFields: FilmFieldsDto = {
      characters: film.characterIds,
      created: film.created.toISOString(),
      director: film.director,
      edited: film.edited.toISOString(),
      episode_id: film.episodeId,
      opening_crawl: film.openingCrawl,
      planets: film.planetIds,
      producer: film.producer,
      release_date: film.releaseDate.toISOString(),
      species: film.specieIds,
      starships: film.starshipIds,
      title: film.title,
      vehicles: film.vehicleIds,
    };

    return {
      fields: newFilmDtoFields,
      model: 'resources.film',
      pk: film.pk,
    };
  }
}
