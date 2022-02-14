/**
 * Function creates HTML form element with the film fields inputs.
 * @returns Created form element.
 */
export const createFilmForm = (): HTMLFormElement => {
  const form = document.createElement('form');

  form.classList.add('film-creation-form');

  form.innerHTML = `
    <section class="input-field">
      <input id="title-input" type="text">
      <label for="title-input">Title</label>
    </section>
    <section class="input-field">
      <textarea id="opening-crawl-input" class="materialize-textarea"></textarea>
      <label for="opening-crawl-input">Opening crawl</label>
    </section>
    <section class="input-field">
      <input id="director-input" type="text">
      <label for="director-input">Director</label>
    </section>
    <section class="producers-container">
      <section class="producer-inputs-container">
        <section class="input-field producer-input">
          <input id="producers-input-1" type="text">
          <label for="producers-input-1">Producer</label>
        </section>
      </section>
      <section class="producers-btns-container">
        <button type="button" class="btn remove-producer-button">-</button>
        <button type="button" class="btn add-producer-button">+</button>
      </section>
    </section>
    <section class="input-field">
      <input id="release-date-input" type="date">
      <label for="release-date-input">Release date</label>
    </section>
  `;

  return form;
};
