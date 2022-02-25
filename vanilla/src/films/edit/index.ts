import { Datepicker } from 'materialize-css';

import { composeFilmFromForm } from '../../features/filmForm/composeFilmFromForm';
import { getSearchParam } from '../../utils/getSearchParam';
import { initFilmForm } from '../../features/filmForm/initFilmForm';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { FilmsService } from '../../services/films/FilmsService';
import { fillFilmFormValues } from '../../features/filmForm/fillFilmFormValues';
import { renderFilmNotFound } from '../../features/filmDetails/renderFilmNotFound';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.datepicker');

  Datepicker.init(elems);
});
const primaryKey = Number(getSearchParam('pk'));

if (!isNaN(primaryKey) && primaryKey !== 0) {
  const form = createFilmForm('Edit film');

  const container = document.querySelector('.film-form-container');
  container?.append(form);

  await initFilmForm(form);

  const film = await FilmsService.fetchFilmByPrimaryKey(primaryKey);

  if (film !== null) {
    fillFilmFormValues(form, film);

    form.addEventListener('submit', async event => {
      event.preventDefault();

      const newFilm = composeFilmFromForm(form, primaryKey);

      if (newFilm !== null) {
        await FilmsService.updateFilm(newFilm);

        document.location = '/';
      }
    });
  } else {
    renderFilmNotFound();
  }
} else {
  renderFilmNotFound();
}
