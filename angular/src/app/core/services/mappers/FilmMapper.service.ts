import { Injectable } from '@angular/core';

import { Film } from '../../models/Film';

import { FilmDto } from './dto/FilmDto/FilmDto';

/**
 * Class for mapping Film and FilmDto to each other.
 */
@Injectable({
  providedIn: 'root',
})
export class FilmMapper {
  /**
   * Method for mapping FIlmDto to Film.
   * @param dto - FilmDto object.
   * @returns - Film object.
   */
  public fromDto(dto: FilmDto): Film {
    const { fields } = dto;

    return {
      characterIds: fields.characters,
      director: fields.director,
      episodeId: fields.episode_id,
      openingCrawl: fields.opening_crawl,
      planetIds: fields.planets,
      producers: fields.producer.split(', '),
      releaseDate: new Date(fields.release_date),
      specieIds: fields.species,
      starshipIds: fields.starships,
      title: fields.title,
      vehicleIds: fields.vehicles,
      pk: dto.pk,
    };
  }
}
