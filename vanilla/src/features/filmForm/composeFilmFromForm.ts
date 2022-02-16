import { Film } from '../../interfaces/films/domain/Film';
import { FilmsService } from '../../services/films/FilmsService';

export const composeFilmFromForm = async(form: HTMLFormElement): Promise<Film> => {
  const data = new FormData(form);

  const title = data.get('title') as string;
  const openingCrawl = data.get('opening-crawl') as string;
  const episodeId = Number(data.get('episode-id'));
  const director = data.get('director') as string;
  const producer = data.getAll('producer').toString();
  const releaseDate = new Date(data.get('release-date') as string);

  const characterPrimaryKeys = data.getAll('character').map(pk => Number(pk));
  const planetPrimaryKeys = data.getAll('planet').map(pk => Number(pk));

  const highestPrimaryKey = await FilmsService.getMaximumPrimaryKey();

  return {
    title,
    openingCrawl,
    episodeId,
    director,
    producer,
    releaseDate,
    characterIds: characterPrimaryKeys,
    planetIds: planetPrimaryKeys,
    created: new Date(),
    edited: new Date(),
    specieIds: [],
    starshipIds: [],
    vehicleIds: [],
    pk: highestPrimaryKey + 1,
  };
};
