import { Datepicker } from 'materialize-css';

import { getPrimaryKeyFromSearchParams } from '../../utils/getPrimaryKeyFromSearchParams';
import { initFilmForm } from '../../features/filmForm/initFilmForm';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { FilmsService } from '../../services/films/FilmsService';
import { composeFilmFromForm } from '../../features/filmForm/composeFilmFromForm';
import { fillFormValues } from '../../features/filmForm/fillFormValues';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.datepicker');

  const options = {
    format: 'dd.mm.yyyy',
  };

  Datepicker.init(elems, options);
});

const form = createFilmForm();

const container = document.querySelector('.film-creation-container');
container?.append(form);

await initFilmForm(form);

const primaryKey = getPrimaryKeyFromSearchParams();

if (primaryKey !== null) {
  const film = await FilmsService.fetchFilmByPrimaryKey(primaryKey);

  if (film !== null) {
    fillFormValues(form, film);
  }
} else {
  document.location = '/';
}

form.addEventListener('submit', async event => {
  event.preventDefault();

  // TODO: add film updating
});
