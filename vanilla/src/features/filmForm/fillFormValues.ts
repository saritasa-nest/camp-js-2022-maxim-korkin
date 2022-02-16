import { addProducerInput } from './addProducerInput';
import { fillSingleValue } from './fillSingleValue';
import { Film } from './../../interfaces/films/domain/Film';

/**
 * Function for filling form inputs with film values.
 * @param form - Form to fill.
 * @param film - Film to get values from.
 */
export const fillFormValues = (form: HTMLFormElement, film: Film): void => {
  fillSingleValue('#title-input', film.title);

  fillSingleValue('#opening-crawl-input', film.openingCrawl);

  fillSingleValue('#episode-id-input', film.episodeId.toString());

  fillSingleValue('#director-input', film.director);

  const producers = film.producer.split(',');

  producers.forEach((producer, index) => {
    fillSingleValue(`#producers-input-${index + 1}`, producer.trim());
    if (index !== producers.length - 1) {
      addProducerInput();
    }
  });

  const year = film.releaseDate.getFullYear();
  const month = `0${film.releaseDate.getMonth()}`.slice(-2);
  const day = `0${film.releaseDate.getDate()}`.slice(-2);

  const dateString = `${year}-${month}-${day}`;

  fillSingleValue('#release-date-input', dateString);

  // TODO: characters and planets values filling

  const openingCrawlInput = form.querySelector('#opening-crawl-input');

  if (openingCrawlInput !== null) {
    M.textareaAutoResize(openingCrawlInput);
  }
  M.updateTextFields();
};
