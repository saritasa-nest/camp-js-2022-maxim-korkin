import { Film } from 'src/models/film';
import { FilmDto } from '../dtos/film.dto';

export namespace FilmMapper {
  /**
   * Maps dto to model.
   * @param dto - Film dto.
   */
  export function fromDto(dto: FilmDto): Film {
    const { fields } = dto;
    return {
      episodeId: fields.episode_id,
      title: fields.title,
      releaseDate: new Date(fields.release_date),
      openingCrawl: fields.opening_crawl,
      director: fields.director,
      producers: fields.producer.split(',').map(producer => producer.trim()),
      id: dto.pk,
    };
  }
}
