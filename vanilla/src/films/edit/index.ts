import { Datepicker } from 'materialize-css';

import { composeFilmFromForm } from '../../features/filmForm/composeFilmFromForm';
import { initFilmForm } from '../../features/filmForm/initFilmForm';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { FilmsService } from '../../services/films/FilmsService';
import { fillFilmFormValues } from '../../features/filmForm/fillFilmFormValues';
import { renderFilmNotFound } from '../../features/filmDetails/renderFilmNotFound';
import { checkPrimaryKeyFromSearchParamsAndInitPage } from '../../utils/checkPrimaryKeyFromSearchParamsAndInitPage';

/**
 * Function which inits film edition page.
 * @param primaryKey - Primary key of the film.
 */
async function initEditPage(primaryKey: number): Promise<void> {
  document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.datepicker');

    Datepicker.init(elems);
  });

  const form = createFilmForm('Edit film');

  const container = document.querySelector('.film-form-container');
  container?.append(form);

  await initFilmForm(form);

  const film = await FilmsService.fetchFilmByPrimaryKey(primaryKey);

  if (film !== null) {
    fillFilmFormValues(form, film);

    form.addEventListener('submit', async event => {
      event.preventDefault();

      const newFilm = composeFilmFromForm(form);

      if (newFilm !== null) {
        await FilmsService.updateFilm(newFilm);

        document.location = '/';
      }
    });
  } else {
    renderFilmNotFound();
  }
}

checkPrimaryKeyFromSearchParamsAndInitPage(initEditPage, renderFilmNotFound);
