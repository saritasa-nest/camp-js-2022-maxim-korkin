import { Datepicker } from 'materialize-css';

import { CharactersService } from '../../services/characters/CharactersService';
import { removeProducerInput } from '../../features/filmForm/removeProducerInput';
import { addProducerInput } from '../../features/filmForm/addProducerInput';
import { createFilmForm } from '../../features/filmForm/createFilmForm';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.datepicker');
  Datepicker.init(elems);
});

const characters = await CharactersService.fetchAllCharacters();

const form = createFilmForm(characters);

const container = document.querySelector('.film-creation-container');
container?.append(form);

const addProducerButton = document.querySelector('.add-producer-button');
addProducerButton?.addEventListener('click', addProducerInput);

const removeProducerButton = document.querySelector('.remove-producer-button');
removeProducerButton?.addEventListener('click', removeProducerInput);
