/**
 * Function creates HTML form element with the film fields inputs.
 * @param header - Header of the form.
 * @returns Created form element.
 */
export const createFilmForm = (header: string): HTMLFormElement => {
  const form = document.createElement('form');

  form.classList.add('film-form');

  form.innerHTML = `
    <header class="film-form__header">
      <h1>${header}</h1>
    </header>
    <div class="input-field">
      <input name="title" id="title-input" type="text" required>
      <label for="title-input">Title</label>
    </div>
    <div class="input-field">
      <textarea name="opening-crawl" id="opening-crawl-input" class="materialize-textarea"></textarea required>
      <label for="opening-crawl-input">Opening crawl</label>
    </div>
    <div class="input-field">
      <input name="episode-id" id="episode-id-input" type="number" required>
      <label for="episode-id-input">Episode id</label>
    </div>
    <div class="input-field">
      <input name="director" id="director-input" type="text" required>
      <label for="director-input">Director</label>
    </div>
    <div class="film-form__producers-container">
      <div class="producer-inputs-container">
        <div class="input-field producer-input">
          <input name="producer" id="producers-input-1" type="text" required>
          <label for="producers-input-1">Producer</label>
        </div>
      </div>
      <div class="film-form__producers-buttons-container">
        <button type="button" class="btn remove-producer-button" disabled>-</button>
        <button type="button" class="btn add-producer-button">+</button>
      </div>
    </div>
    <div class="input-field">
      <input name="release-date" id="release-date-input" type="date" required>
      <label for="release-date-input">Release date</label>
    </div>
    <fieldset id="characters-container">
      <legend>Characters</legend>
    </fieldset>
    <fieldset id="planets-container">
      <legend>Planets</legend>
    </fieldset>
    <button type="submit" class="btn submit-button">Submit</button>
  `;

  return form;
};
