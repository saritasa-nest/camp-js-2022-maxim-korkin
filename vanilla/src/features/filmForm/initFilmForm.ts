import { CharactersService } from '../../services/characters/CharactersService';
import { PlanetsService } from '../../services/planets/PlanetsService';

import { fillCharacters } from './fillCharacters';
import { fillPlanets } from './fillPlanets';
import { removeProducerInput } from './removeProducerInput';
import { addProducerInput } from './addProducerInput';

/**
 * Function for filling related fields data and adding buttons actions.
 * @param form - Form to init.
 */
export const initFilmForm = async(form: HTMLFormElement): Promise<void> => {
  const characters = await CharactersService.fetchAllCharacters();

  fillCharacters(form, characters);

  const planets = await PlanetsService.fetchAllPlanets();

  fillPlanets(form, planets);

  const addProducerButton = form.querySelector('.add-producer-button');
  addProducerButton?.addEventListener('click', addProducerInput);

  const removeProducerButton = form.querySelector('.remove-producer-button');
  removeProducerButton?.addEventListener('click', removeProducerInput);
};
