import { Film } from '../../interfaces/films/domain/Film';

/**
 * Function for getting film values from the form and creating film object.
 * @param form - Form to get values from.
 * @param primaryKey - Primary key of the new film.
 * @returns - New film object.
 */
export const composeFilmFromForm = (form: HTMLFormElement, primaryKey: number): Film | null => {
  const data = new FormData(form);

  const title = data.get('title');
  const openingCrawl = data.get('opening-crawl');
  const episodeId = data.get('episode-id');
  const director = data.get('director');
  const producer = data.getAll('producer');
  const releaseDate = data.get('release-date');

  const characterIds = data.getAll('character');
  const planetIds = data.getAll('planet');

  if (
    title === null ||
    openingCrawl === null ||
    episodeId === null ||
    director === null ||
    producer.length === 0 ||
    releaseDate === null) {
      return null;
    }

  return {
    title: title as string,
    openingCrawl: openingCrawl as string,
    episodeId: Number(episodeId),
    director: director as string,
    producer: producer.toString(),
    releaseDate: new Date(releaseDate as string),
    characterIds: characterIds.map(pk => Number(pk)),
    planetIds: planetIds.map(pk => Number(pk)),
    pk: primaryKey,
  };
};
