import { Character } from './../../interfaces/characters/domain/Character';

/**
 * Function creates HTML form element with the film fields inputs.
 * @param characters - Array with the characters data.
 * @returns Created form element.
 */
export const createFilmForm = (characters: Character[]): HTMLFormElement => {
  const form = document.createElement('form');

  form.classList.add('film-creation-form');

  let formInnerHTML = `
    <div class="input-field">
      <input id="title-input" type="text">
      <label for="title-input">Title</label>
    </div>
    <div class="input-field">
      <textarea id="opening-crawl-input" class="materialize-textarea"></textarea>
      <label for="opening-crawl-input">Opening crawl</label>
    </div>
    <div class="input-field">
      <input id="director-input" type="text">
      <label for="director-input">Director</label>
    </div>
    <div class="producers-container">
      <div class="producer-inputs-container">
        <div class="input-field producer-input">
          <input id="producers-input-1" type="text">
          <label for="producers-input-1">Producer</label>
        </div>
      </div>
      <div class="producers-btns-container">
        <button type="button" class="btn remove-producer-button">-</button>
        <button type="button" class="btn add-producer-button">+</button>
      </div>
    </div>
    <div class="input-field">
      <input id="release-date-input" type="date">
      <label for="release-date-input">Release date</label>
    </div>
  `;

  characters.forEach(character => {
    formInnerHTML += `
      <label>
        <input type="checkbox" name="${character.pk}">
        <span>${character.name}</span>
      </label>
    `;
  });

  form.innerHTML = formInnerHTML;

  return form;
};
