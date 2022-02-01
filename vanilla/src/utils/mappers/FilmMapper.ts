/* eslint-disable @typescript-eslint/naming-convention */
import { FilmFields } from '../../interfaces/films/film/FilmFields';
import { Film } from '../../interfaces/films/film/Film';
import { FilmDto } from '../../interfaces/films/DTO/FilmDto';
import { FilmFieldsDto } from '../../interfaces/films/DTO/FilmFieldsDto';

/**
 * Class for mapping Film and FilmDTO objects to each other.
 */
export class FilmMapper {
  /**
   * Method gets FilmDTO object and then converts it into Film object and returns it.
   * @param filmDTOObject - FilmDTO object which need to be converted into Film object.
   * @returns Converted Film object.
   */
  public static fromDto(filmDTOObject: FilmDto): Film {
    const newFilmFields: FilmFields = {
      characterIds: filmDTOObject.fields.characters,
      created: new Date(filmDTOObject.fields.created),
      director: filmDTOObject.fields.director,
      edited: new Date(filmDTOObject.fields.edited),
      episodeId: filmDTOObject.fields.episode_id,
      openingCrawl: filmDTOObject.fields.opening_crawl,
      planetIds: filmDTOObject.fields.planets,
      producer: filmDTOObject.fields.producer,
      releaseDate: new Date(filmDTOObject.fields.release_date),
      specieIds: filmDTOObject.fields.species,
      starshipIds: filmDTOObject.fields.starships,
      title: filmDTOObject.fields.title,
      vehicleIds: filmDTOObject.fields.vehicles,
    };

    return {
      fields: newFilmFields,
      model: filmDTOObject.model,
      pk: filmDTOObject.pk,
    };
  }

  /**
   * Method gets Film object and then converts it into FilmDto object and returns it.
   * @param filmObject - Film object which need to be converted into FilmDto object.
   * @returns Converted FilmDto object.
   */
  public static toDto(filmObject: Film): FilmDto {
    const newFilmDtoFields: FilmFieldsDto = {
      characters: filmObject.fields.characterIds,
      created: filmObject.fields.created.toISOString(),
      director: filmObject.fields.director,
      edited: filmObject.fields.edited.toISOString(),
      episode_id: filmObject.fields.episodeId,
      opening_crawl: filmObject.fields.openingCrawl,
      planets: filmObject.fields.planetIds,
      producer: filmObject.fields.producer,
      release_date: filmObject.fields.releaseDate.toISOString(),
      species: filmObject.fields.specieIds,
      starships: filmObject.fields.starshipIds,
      title: filmObject.fields.title,
      vehicles: filmObject.fields.vehicleIds,
    };

    return {
      fields: newFilmDtoFields,
      model: filmObject.model,
      pk: filmObject.pk,
    };
  }
}
