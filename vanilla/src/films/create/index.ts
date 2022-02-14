import { Datepicker } from 'materialize-css';

import { removeProducerInput } from '../../features/filmForm/removeProducerInput';
import { addProducerInput } from '../../features/filmForm/addProducerInput';
import { createFilmForm } from '../../features/filmForm/createFilmForm';

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.datepicker');
  Datepicker.init(elems);
});

const form = createFilmForm();

const container = document.querySelector('.film-creation-container');
container?.append(form);

const addProducerButton = document.querySelector('.add-producer-button');
addProducerButton?.addEventListener('click', addProducerInput);

const removeProducerButton = document.querySelector('.remove-producer-button');
removeProducerButton?.addEventListener('click', removeProducerInput);
