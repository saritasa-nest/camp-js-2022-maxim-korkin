import { CharactersService } from '../../services/characters/CharactersService';
import { PlanetsService } from '../../services/planets/PlanetsService';

import { addCheckboxes } from './addCheckboxes';
import { removeProducerInput } from './removeProducerInput';
import { addProducerInput } from './addProducerInput';

/**
 * Function for filling related fields data and adding buttons actions.
 * @param form - Form to init.
 */
export const initFilmForm = async(form: HTMLFormElement): Promise<void> => {
  const characters = await CharactersService.fetchAllCharacters();

  addCheckboxes('.characters-container', characters, 'character');

  const planets = await PlanetsService.fetchAllPlanets();

  addCheckboxes('.planets-container', planets, 'planet');

  const addProducerButton = form.querySelector('.add-producer-button');
  addProducerButton?.addEventListener('click', addProducerInput);

  const removeProducerButton = form.querySelector('.remove-producer-button');
  removeProducerButton?.addEventListener('click', removeProducerInput);
};
