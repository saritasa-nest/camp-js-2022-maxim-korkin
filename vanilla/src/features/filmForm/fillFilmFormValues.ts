import { FilmFormSelectors } from '../../enums/filmForm/FilmFormSelectors';
import { Film } from '../../interfaces/films/domain/Film';
import { getDateString } from '../../utils/getDateString';

import { addProducerInput } from './addProducerInput';
import { fillSingleValue } from './fillSingleValue';
import { fillCheckboxFieldset } from './fillCheckboxFieldset';

/**
 * Function for filling form inputs with film values.
 * @param form - Form to fill.
 * @param film - Film to get values from.
 */
export const fillFilmFormValues = (form: HTMLFormElement, film: Film): void => {
  fillSingleValue(FilmFormSelectors.Title, film.title);

  fillSingleValue(FilmFormSelectors.OpeningCrawl, film.openingCrawl);

  fillSingleValue(FilmFormSelectors.EpisodeId, film.episodeId.toString());

  fillSingleValue(FilmFormSelectors.Director, film.director);

  film.producers.forEach((producer, index, producersList) => {
    fillSingleValue(`#producers-input-${index + 1}`, producer);

    // Adding new producer input in case if the current producer was not the last one.
    if (index !== producersList.length - 1) {
      addProducerInput();
    }
  });

  const releaseDateString = getDateString(film.releaseDate);

  fillSingleValue(FilmFormSelectors.ReleaseDate, releaseDateString);

  fillCheckboxFieldset(FilmFormSelectors.CharactersFieldset, film.characterIds);

  fillCheckboxFieldset(FilmFormSelectors.PlanetsFieldset, film.planetIds);

  const openingCrawlInput = form.querySelector(FilmFormSelectors.OpeningCrawl);

  if (openingCrawlInput !== null) {
    M.textareaAutoResize(openingCrawlInput);
  }
  M.updateTextFields();
};
