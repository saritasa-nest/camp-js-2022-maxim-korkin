import { Injectable } from '@angular/core';

import { Film } from '../../models/film';

import { FilmDto } from './dto/film-dto/film-dto.dto';

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
      director: fields.director,
      episodeId: fields.episode_id,
      openingCrawl: fields.opening_crawl,
      producers: fields.producer.split(', '),
      releaseDate: new Date(fields.release_date),
      title: fields.title,
      pk: dto.pk,
    };
  }
}
