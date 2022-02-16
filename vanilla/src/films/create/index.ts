import { Datepicker } from 'materialize-css';

import { initFilmForm } from '../../features/filmForm/initFilmForm';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { FilmsService } from '../../services/films/FilmsService';
import { composeFilmFromForm } from '../../features/filmForm/composeFilmFromForm';

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

form.addEventListener('submit', async event => {
  event.preventDefault();

  const highestPrimaryKey = await FilmsService.getMaximumPrimaryKey();

  const newFilm = composeFilmFromForm(form, highestPrimaryKey + 1);

  if (newFilm !== null) {
    await FilmsService.addFilm(newFilm);
    document.location = '/';
  }
});
