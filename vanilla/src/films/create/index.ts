import { Datepicker } from 'materialize-css';

import { fillPlanets } from '../../features/filmForm/fillPlanets';
import { removeProducerInput } from '../../features/filmForm/removeProducerInput';
import { addProducerInput } from '../../features/filmForm/addProducerInput';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { fillCharacters } from '../../features/filmForm/fillCharacters';
import { CharactersService } from '../../services/characters/CharactersService';
import { PlanetsService } from '../../services/planets/PlanetsService';
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

const characters = await CharactersService.fetchAllCharacters();

fillCharacters(form, characters);

const planets = await PlanetsService.fetchAllPlanets();

fillPlanets(form, planets);

const addProducerButton = form.querySelector('.add-producer-button');
addProducerButton?.addEventListener('click', addProducerInput);

const removeProducerButton = form.querySelector('.remove-producer-button');
removeProducerButton?.addEventListener('click', removeProducerInput);

form.addEventListener('submit', async event => {
  event.preventDefault();

  const film = await composeFilmFromForm(form);

  await FilmsService.addFilm(film);
});
