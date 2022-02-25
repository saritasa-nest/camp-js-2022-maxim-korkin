/**
 * Function renders film not found page.
 */
export const renderFilmNotFound = (): void => {
    const filmNotFoundInnerHtml = `
      <h1>404 - Film not found</h1>
      <a href="/">Back to the films table.</a>
    `;

    const bodyElement = document.getElementsByTagName('body')[0];

    bodyElement.innerHTML = filmNotFoundInnerHtml;
};
