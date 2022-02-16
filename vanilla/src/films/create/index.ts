import { Datepicker } from 'materialize-css';

import { fillPlanets } from '../../features/filmForm/fillPlanets';
import { removeProducerInput } from '../../features/filmForm/removeProducerInput';
import { addProducerInput } from '../../features/filmForm/addProducerInput';
import { createFilmForm } from '../../features/filmForm/createFilmForm';
import { fillCharacters } from '../../features/filmForm/fillCharacters';
import { CharactersService } from '../../services/characters/CharactersService';
import { PlanetsService } from '../../services/planets/PlanetsService';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.datepicker');
  Datepicker.init(elems);
});

const form = createFilmForm();

const container = document.querySelector('.film-creation-container');
container?.append(form);

const characters = await CharactersService.fetchAllCharacters();

fillCharacters(form, characters);

const planets = await PlanetsService.fetchAllPlanets();

fillPlanets(form, planets);

const addProducerButton = document.querySelector('.add-producer-button');
addProducerButton?.addEventListener('click', addProducerInput);

const removeProducerButton = document.querySelector('.remove-producer-button');
removeProducerButton?.addEventListener('click', removeProducerInput);
