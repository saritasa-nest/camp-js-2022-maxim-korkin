import { FilmFormValues } from '../../interfaces/films/domain/FilmFormValues';

export const getFormValues = (form: HTMLFormElement): FilmFormValues => {
  const data = new FormData(form);

  const title = data.get('title') as string;
  const openingCrawl = data.get('opening-crawl') as string;
  const episodeId = Number(data.get('episode-id'));
  const director = data.get('director') as string;
  const producer = data.getAll('producer').toString();
  const releaseDate = new Date(data.get('release-date') as string);

  const characterIds = data.getAll('character').map(pk => Number(pk));
  const planetIds = data.getAll('planet').map(pk => Number(pk));

  return {
    title,
    openingCrawl,
    episodeId,
    director,
    producer,
    releaseDate,
    characterIds,
    planetIds,
  };
};
