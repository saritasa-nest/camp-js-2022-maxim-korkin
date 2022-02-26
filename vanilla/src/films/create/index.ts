import { Datepicker } from 'materialize-css';

import { initFilmForm } from '../../features/filmForm/initFilmForm';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { FilmsService } from '../../services/films/FilmsService';

/**
 * Function which inits film creation page.
 */
async function initCreatePage(): Promise<void> {
  document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.datepicker');

    Datepicker.init(elems);
  });

  const form = createFilmForm('Create film');

  const container = document.querySelector('.film-form-container');
  container?.append(form);

  await initFilmForm(form);

  form.addEventListener('submit', async event => {
    event.preventDefault();

    await FilmsService.addFilmFromFormValues(form);

    document.location = '/';
  });
}

initCreatePage();
