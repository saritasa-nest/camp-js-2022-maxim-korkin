import { Datepicker } from 'materialize-css';

import { composeFilmFromForm } from '../../features/filmForm/composeFilmFromForm';
import { getPrimaryKeyFromSearchParams } from '../../utils/getPrimaryKeyFromSearchParams';
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
const primaryKey = getPrimaryKeyFromSearchParams();

if (primaryKey !== null) {
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

  // TODO: add film updating
});
  }
} else {
  document.location = '/';
}
