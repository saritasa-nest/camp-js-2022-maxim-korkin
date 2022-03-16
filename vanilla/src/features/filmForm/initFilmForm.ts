import { Planet } from '../../interfaces/planets/domain/Planet';
import { Character } from '../../interfaces/characters/domain/Character';
import { FilmFormSelectors } from '../../enums/filmForm/FilmFormSelectors';
import { CharactersService } from '../../services/characters/CharactersService';
import { PlanetsService } from '../../services/planets/PlanetsService';
import { assertNotNull } from '../../utils/assertNotNull';

import { removeProducerInput } from './removeProducerInput';
import { addProducerInput } from './addProducerInput';
import { addCheckboxes } from './addCheckboxes';

/**
 * Function for filling related fields data and adding buttons actions.
 * @param form - Form to init.
 */
export const initFilmForm = async(form: HTMLFormElement): Promise<void> => {

  const characters: Character[] = [];

  const planets: Planet[] = [];

  const addCharactersPromise = (async(): Promise<void> => {
    characters.push(...await CharactersService.fetchAllCharacters());
  })();

  const addPlanetsPromise = (async(): Promise<void> => {
    planets.push(...await PlanetsService.fetchAllPlanets());
  })();

  await Promise.all([addCharactersPromise, addPlanetsPromise]);

  addCheckboxes<Character>(FilmFormSelectors.CharactersFieldset, characters, 'character');

  addCheckboxes<Planet>(FilmFormSelectors.PlanetsFieldset, planets, 'planet');

  const addProducerButton = form.querySelector(FilmFormSelectors.AddProducerButton);
  assertNotNull(addProducerButton);
  addProducerButton.addEventListener('click', addProducerInput);

  const removeProducerButton = form.querySelector(FilmFormSelectors.RemoveProducerButton);
  assertNotNull(removeProducerButton);
  removeProducerButton.addEventListener('click', removeProducerInput);
};
