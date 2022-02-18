import { Datepicker } from 'materialize-css';

import { composeFilmFromForm } from '../../features/filmForm/composeFilmFromForm';
import { getSearchParam } from '../../utils/getSearchParam';
import { initFilmForm } from '../../features/filmForm/initFilmForm';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { FilmsService } from '../../services/films/FilmsService';
import { fillFormValues } from '../../features/filmForm/fillFormValues';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.datepicker');

  const options = {
    format: 'dd.mm.yyyy',
  };

  Datepicker.init(elems, options);
});
const primaryKey = Number(getSearchParam('pk'));

if (!isNaN(primaryKey) && primaryKey !== 0) {
  const form = createFilmForm();

  const container = document.querySelector('.film-creation-container');
  container?.append(form);

  await initFilmForm(form);

  const film = await FilmsService.fetchFilmByPrimaryKey(primaryKey);

  if (film !== null) {
    fillFormValues(form, film);

    form.addEventListener('submit', async event => {
      event.preventDefault();

      const newFilm = composeFilmFromForm(form, primaryKey);

      if (newFilm !== null) {
        await FilmsService.updateFilm(newFilm);

        document.location = '/';
      }
    });
  }
} else {
  document.location = '/';
}
